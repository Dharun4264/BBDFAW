# Architecture Specification: PWNDORA DFIR Workbench (BBDFAW)
**Problem Statement ID:** BSCDS26-DILE-01  
**Track:** T-04 DILE (Browser-Based Digital Forensics Artifact Workbench)

## 1. System Overview
PWNDORA is a 100% browser-native, client-side Digital Forensics and Incident Response (DFIR) triage workbench. Designed for air-gapped and secure operational environments, the system eliminates backend server round-trips, ensuring zero-latency artifact parsing and strict data privacy compliance.

## 2. Core Architectural Principles
* **Client-Side Execution:** All artifact parsing (Event Logs `.evtx`, Registry Hives `.dat/.hiv`, and LNK shortcuts `.lnk`) occurs entirely within the browser memory space using optimized JavaScript/TypeScript buffers (`FileReader`, `ArrayBuffer`).
* **Zero-Server Promise:** No forensic evidence or telemetry leaves the investigator's local machine, preventing network-based data leakage.
* **High-Volume Resiliency:** Built to handle synthetic or real forensic artifacts up to 5 MB+ without freezing the main UI thread, utilizing asynchronous chunk processing and reactive state management.

## 3. Data Flow & Pipeline
1. **Ingestion Layer (`Upload.tsx`):** Accepts user drag-and-drop or programmatic mock artifact generation (`artifactGenerator.ts`).
2. **Parsing Engine (`forensicParser.ts`):** Extracts structural metadata, timestamps, and security event indicators locally.
3. **State Persistence (`sessionStorage`):** Sanitizes and caches extracted findings temporarily for cross-module synchronization.
4. **Analysis & Visualization (`Timeline.tsx`, `ThreatIntel.tsx`):** Renders sortable event timelines, risk-scored badges (`riskColor.ts`), and MITRE ATT&CK mappings.