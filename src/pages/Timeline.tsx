import React, { useState, useEffect } from 'react';
import { exportReportAsCSV, exportReportAsJSON } from '../utils/exporter';
const Timeline = () => {
  const [findings, setFindings] = useState<any[]>([]);

  // Load findings from sessionStorage (populated by the Upload parser)
  useEffect(() => {
    const savedFindings = JSON.parse(sessionStorage.getItem('pwndora_findings') || '[]');
    // Sort by timestamp (Requirement #4)
    const sorted = savedFindings.sort((a: any, b: any) => 
      new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );
    setFindings(sorted);
  }, []);

  return (
    <div className="flex flex-col gap-6 py-2 min-h-[calc(100vh-3.5rem)]">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-xl font-bold tracking-wider text-cyan-300 uppercase">
            Forensic Findings Viewer
          </h1>
          <p className="text-sm text-slate-400">
            Chronological reconstruction of extracted artifact fields.
          </p>
        </div>
        
        {/* Requirement #6: Export Evidence Report */}
        <div className="flex gap-3">
          <button 
            onClick={() => exportReportAsCSV(findings)}
            className="bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700/80 px-4 py-2 rounded-lg text-xs font-semibold tracking-wider transition-colors"
          >
            EXPORT CSV
          </button>
          <button 
            onClick={() => exportReportAsJSON(findings, "Analyst notes exported.")}
            className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20 px-4 py-2 rounded-lg text-xs font-semibold tracking-wider transition-colors"
          >
            EXPORT JSON
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50 shadow-xl backdrop-blur-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            {/* Requirement #4: Exact Table Columns */}
            <thead className="border-b border-slate-800 bg-slate-950/80 text-xs font-semibold tracking-widest text-slate-500 uppercase">
              <tr>
                <th className="px-6 py-4">Timestamp</th>
                <th className="px-6 py-4">Artifact Type</th>
                <th className="px-6 py-4">Extracted Field</th>
                <th className="px-6 py-4">Value</th>
                <th className="px-6 py-4">Forensic Significance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {findings.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                    No artifacts ingested yet. Use the Evidence Vault to upload files.
                  </td>
                </tr>
              ) : (
                findings.map((item, idx) => (
                  <tr key={idx} className="transition-colors duration-200 hover:bg-slate-800/40 group">
                    <td className="whitespace-nowrap px-6 py-4 font-mono text-cyan-400/90">{item.timestamp}</td>
                    <td className="px-6 py-4 font-medium text-slate-200">{item.artifactType}</td>
                    <td className="px-6 py-4 text-amber-400">{item.field}</td>
                    <td className="max-w-[200px] truncate px-6 py-4 font-mono text-xs text-slate-400" title={item.value}>{item.value}</td>
                    <td className="px-6 py-4 text-xs text-slate-400">{item.significance}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Timeline;