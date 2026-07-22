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

const Report = () => {
  const [findings, setFindings] = useState<ForensicFinding[]>([]);

  useEffect(() => {
    // Pull the real parsed data from memory (Solves Complaint #5)
    const storedFindings = sessionStorage.getItem('pwndora_findings');
    if (storedFindings) {
      setFindings(JSON.parse(storedFindings));
    }
  }, []);

  // -------------------------------------------------------------
  // EXPORT LOGIC: Fulfills the "JSON/CSV Export" Requirement
  // -------------------------------------------------------------
  const exportJSON = () => {
    const dataStr = JSON.stringify(findings, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `PWNDORA_Incident_Report_${Date.now()}.json`;
    link.click();
  };

  const exportCSV = () => {
    if (findings.length === 0) return;
    const headers = Object.keys(findings[0]).join(',');
    const rows = findings.map(f => Object.values(f).map(val => `"${val}"`).join(',')).join('\n');
    const csvContent = `${headers}\n${rows}`;
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `PWNDORA_Incident_Report_${Date.now()}.csv`;
    link.click();
  };

  return (
    <div className="p-6 text-slate-200 min-h-screen max-w-5xl mx-auto">
      
      {/* Fictional Scenario Header (Required by Problem Statement) */}
      <div className="bg-slate-900 border border-slate-700 p-6 rounded-xl shadow-xl mb-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="text-xs font-bold bg-cyan-900/50 text-cyan-400 border border-cyan-700 px-2 py-1 rounded uppercase tracking-widest">
              Scenario: OPERATION MIDNIGHT
            </span>
            <h1 className="text-2xl font-bold text-slate-100 mt-3">Final Evidence Export & Briefing</h1>
          </div>
          <div className="text-right font-mono text-xs text-slate-400">
            <p>Case ID: PWN-2026-03</p>
            <p>Status: <span className="text-emerald-400">Triage Complete</span></p>
          </div>
        </div>
        <p className="text-sm text-slate-400 leading-relaxed">
          <strong>SITREP:</strong> At 0200 hours, an anomalous outbound connection was detected originating from the HR subnet. 
          Analysts have secured initial triage artifacts (Registry Hives, LNKs, and EVTX logs). 
          Review the client-side parsed findings below and export the structured evidence file for handoff to the Tier 3 Incident Response team.
        </p>
      </div>

      {/* Export Controls */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-cyan-300">Artifact Findings Summary ({findings.length})</h2>
        <div className="space-x-4">
          <button onClick={exportCSV} className="px-5 py-2.5 bg-cyan-700 hover:bg-cyan-600 text-white font-mono text-xs rounded shadow-lg transition-all">
            Download CSV Report
          </button>
          <button onClick={exportJSON} className="px-5 py-2.5 bg-slate-700 hover:bg-slate-600 text-white font-mono text-xs rounded shadow-lg transition-all">
            Download JSON Report
          </button>
        </div>
      </div>

      {/* Preview Table */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-x-auto shadow-2xl p-4">
        {findings.length === 0 ? (
          <div className="text-center p-10 text-slate-500 font-mono text-sm">
            No evidence generated. Please upload artifacts in the Evidence Vault first.
          </div>
        ) : (
          <pre className="text-[11px] text-emerald-400 font-mono overflow-auto max-h-96 p-4 bg-slate-950 rounded border border-slate-800">
            {JSON.stringify(findings, null, 2)}
          </pre>
        )}
      </div>

    </div>
  );
};

export default Report;