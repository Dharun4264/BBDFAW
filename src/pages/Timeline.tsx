import React, { useState, useEffect } from 'react';

interface ForensicFinding {
  id: string;
  timestamp: string;
  artifactType: string;
  extractedField: string;
  value: string;
  significance: string;
  threatScore?: number;
  mitreTactic?: string;
}

const Timeline = () => {
  const [findings, setFindings] = useState<ForensicFinding[]>([]);

  useEffect(() => {
    // Dynamically load the parsed findings from browser memory
    const storedFindings = sessionStorage.getItem('pwndora_findings');
    if (storedFindings) {
      setFindings(JSON.parse(storedFindings));
    }
  }, []);

  // Conditional CSS styling for the Heuristic Threat Engine
  const getScoreBadge = (score?: number) => {
    if (score === undefined) return <span className="text-slate-500">N/A</span>;
    if (score > 75) return <span className="bg-red-500/20 text-red-400 border border-red-500 px-2 py-1 rounded-md shadow-[0_0_10px_rgba(239,68,68,0.5)] shadow-red-500/50">{score}% CRITICAL</span>;
    if (score > 40) return <span className="bg-orange-500/20 text-orange-400 border border-orange-500 px-2 py-1 rounded-md">{score}% HIGH</span>;
    return <span className="bg-cyan-500/20 text-cyan-400 border border-cyan-500 px-2 py-1 rounded-md">{score}% LOW</span>;
  };

  return (
    <div className="p-6 text-slate-200 min-h-screen">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-wide text-cyan-300 uppercase">Forensic Findings Viewer</h1>
          <p className="text-sm text-slate-400 mt-1">Chronological reconstruction of extracted artifact fields with heuristic threat scoring.</p>
        </div>
        <div className="space-x-4">
          <button className="px-4 py-2 bg-slate-900 border border-slate-700 text-xs text-cyan-400 hover:bg-slate-800 hover:border-cyan-500 rounded-md transition-all uppercase tracking-wider shadow-lg">Export CSV</button>
          <button className="px-4 py-2 bg-slate-900 border border-slate-700 text-xs text-cyan-400 hover:bg-slate-800 hover:border-cyan-500 rounded-md transition-all uppercase tracking-wider shadow-lg">Export JSON</button>
        </div>
      </div>

      <div className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-x-auto shadow-2xl backdrop-blur-md">
        <table className="w-full text-left border-collapse text-sm whitespace-nowrap">
          <thead>
            <tr className="bg-slate-950/80 border-b border-slate-800 text-cyan-500 text-[11px] uppercase tracking-widest">
              <th className="p-4 font-semibold">Timestamp</th>
              <th className="p-4 font-semibold">Artifact Type</th>
              <th className="p-4 font-semibold">Extracted Field</th>
              <th className="p-4 font-semibold">Value</th>
              <th className="p-4 font-semibold">MITRE Tactic</th>
              <th className="p-4 font-semibold">Threat Score</th>
            </tr>
          </thead>
          <tbody>
            {findings.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-12 text-center text-slate-500 text-sm">
                  No artifacts ingested yet. Use the Evidence Vault to upload files.
                </td>
              </tr>
            ) : (
              findings.map((finding) => (
                <tr key={finding.id} className="border-b border-slate-800/50 hover:bg-slate-800/40 transition-colors">
                  <td className="p-4 font-mono text-xs text-slate-400">{new Date(finding.timestamp).toLocaleString()}</td>
                  <td className="p-4 text-slate-300 text-xs uppercase tracking-wide">{finding.artifactType}</td>
                  <td className="p-4 text-emerald-400 text-xs">{finding.extractedField}</td>
                  <td className="p-4 font-mono text-xs text-slate-300 max-w-xs truncate" title={finding.value}>{finding.value}</td>
                  <td className="p-4 text-purple-400 text-xs font-mono">{finding.mitreTactic || 'None'}</td>
                  <td className="p-4 text-xs font-bold font-mono tracking-wide">{getScoreBadge(finding.threatScore)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Timeline;