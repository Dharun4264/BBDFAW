"""
mapper.py
----------
THE DATA MAPPER
"""

import sqlite3
import shutil
import os
import tempfile
from datetime import datetime, timedelta, timezone

CHROME_EPOCH = datetime(1601, 1, 1, tzinfo=timezone.utc)


def chrome_time_to_iso(chrome_timestamp):
    if not chrome_timestamp:
        return None
    try:
        chrome_timestamp = int(chrome_timestamp)
        if chrome_timestamp == 0:
            return None
        dt = CHROME_EPOCH + timedelta(microseconds=chrome_timestamp)
        return dt.isoformat()
    except (ValueError, OverflowError, OSError):
        return None


def _safe_copy(db_path):
    tmp_dir = tempfile.mkdtemp(prefix="forensic_")
    tmp_path = os.path.join(tmp_dir, os.path.basename(db_path))
    shutil.copy2(db_path, tmp_path)
    return tmp_path


def _connect_readonly(db_path):
    safe_path = _safe_copy(db_path)
    conn = sqlite3.connect(safe_path)
    conn.row_factory = sqlite3.Row
    return conn


def extract_history(db_path):
    records = []
    try:
        conn = _connect_readonly(db_path)
        cur = conn.cursor()
        cur.execute("""
            SELECT urls.url, urls.title, urls.visit_count,
                   urls.typed_count, visits.visit_time, visits.transition
            FROM urls
            JOIN visits ON urls.id = visits.url
        """)
        for row in cur.fetchall():
            ts = chrome_time_to_iso(row["visit_time"])
            if ts is None:
                continue
            records.append({
                "timestamp": ts, "artifact_type": "Browser History",
                "extracted_field": "URL Visited", "value": row["url"],
                "source_table": "urls/visits"
            })
            if row["title"]:
                records.append({
                    "timestamp": ts, "artifact_type": "Browser History",
                    "extracted_field": "Page Title", "value": row["title"],
                    "source_table": "urls/visits"
                })
            records.append({
                "timestamp": ts, "artifact_type": "Browser History",
                "extracted_field": "Visit Count",
                "value": str(row["visit_count"]),
                "source_table": "urls/visits"
            })
            records.append({
                "timestamp": ts, "artifact_type": "Browser History",
                "extracted_field": "Typed Count",
                "value": str(row["typed_count"]),
                "source_table": "urls/visits"
            })
        conn.close()
    except sqlite3.Error as e:
        records.append(_error_record("Browser History", str(e)))
    return records


def extract_downloads(db_path):
    records = []
    try:
        conn = _connect_readonly(db_path)
        cur = conn.cursor()
        cur.execute("""
            SELECT target_path, tab_url, start_time, end_time,
                   received_bytes, total_bytes, danger_type, opened
            FROM downloads
        """)
        for row in cur.fetchall():
            ts = chrome_time_to_iso(row["start_time"])
            if ts is None:
                continue
            records.append({
                "timestamp": ts, "artifact_type": "Download",
                "extracted_field": "File Path", "value": row["target_path"],
                "source_table": "downloads"
            })
            records.append({
                "timestamp": ts, "artifact_type": "Download",
                "extracted_field": "Source URL", "value": row["tab_url"],
                "source_table": "downloads"
            })
            records.append({
                "timestamp": ts, "artifact_type": "Download",
                "extracted_field": "Danger Type",
                "value": str(row["danger_type"]),
                "source_table": "downloads"
            })
            records.append({
                "timestamp": ts, "artifact_type": "Download",
                "extracted_field": "Opened After Download",
                "value": "Yes" if row["opened"] else "No",
                "source_table": "downloads"
            })
        conn.close()
    except sqlite3.Error as e:
        records.append(_error_record("Download", str(e)))
    return records


def extract_cookies(db_path):
    records = []
    try:
        conn = _connect_readonly(db_path)
        cur = conn.cursor()
        cur.execute("""
            SELECT host_key, name, creation_utc, expires_utc,
                   last_access_utc, is_secure, is_httponly
            FROM cookies
        """)
        for row in cur.fetchall():
            ts = chrome_time_to_iso(row["creation_utc"])
            if ts is None:
                continue
            records.append({
                "timestamp": ts, "artifact_type": "Cookie",
                "extracted_field": "Host", "value": row["host_key"],
                "source_table": "cookies"
            })
            records.append({
                "timestamp": ts, "artifact_type": "Cookie",
                "extracted_field": "Cookie Name", "value": row["name"],
                "source_table": "cookies"
            })
            records.append({
                "timestamp": ts, "artifact_type": "Cookie",
                "extracted_field": "Secure Flag",
                "value": "Yes" if row["is_secure"] else "No",
                "source_table": "cookies"
            })
        conn.close()
    except sqlite3.Error as e:
        records.append(_error_record("Cookie", str(e)))
    return records


def extract_autofill(db_path):
    records = []
    try:
        conn = _connect_readonly(db_path)
        cur = conn.cursor()
        cur.execute("SELECT name, value, date_created FROM autofill")
        for row in cur.fetchall():
            ts = chrome_time_to_iso(row["date_created"] * 1_000_000
                                     if row["date_created"] else None)
            records.append({
                "timestamp": ts or "Unknown",
                "artifact_type": "Autofill Data",
                "extracted_field": row["name"], "value": row["value"],
                "source_table": "autofill"
            })
        conn.close()
    except sqlite3.Error as e:
        records.append(_error_record("Autofill Data", str(e)))
    return records


def _error_record(artifact_type, message):
    return {
        "timestamp": None, "artifact_type": artifact_type,
        "extracted_field": "Parser Error", "value": message,
        "source_table": "n/a"
    }


KNOWN_SOURCES = {
    "History": extract_history,
    "Downloads": extract_downloads,
    "Cookies": extract_cookies,
    "Web Data": extract_autofill,
}


def map_file(db_path):
    records = []
    try:
        conn = sqlite3.connect(f"file:{db_path}?mode=ro", uri=True)
        cur = conn.cursor()
        cur.execute("SELECT name FROM sqlite_master WHERE type='table'")
        tables = {row[0] for row in cur.fetchall()}
        conn.close()
    except sqlite3.Error as e:
        return [_error_record("Unknown", f"Could not open file: {e}")]

    if "urls" in tables and "visits" in tables:
        records += extract_history(db_path)
    if "downloads" in tables:
        records += extract_downloads(db_path)
    if "cookies" in tables:
        records += extract_cookies(db_path)
    if "autofill" in tables:
        records += extract_autofill(db_path)

    if not records:
        records.append(_error_record(
            "Unrecognized", "No known forensic tables found in this file."
        ))
    return records
