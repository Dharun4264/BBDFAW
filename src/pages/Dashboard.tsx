import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6 py-2 min-h-[calc(100vh-3.5rem)]">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-bold tracking-wider text-cyan-300 uppercase">
          Case Overview // Operations Center
        </h1>
        <p className="text-sm text-slate-400">
          Real-time digital forensics telemetry and active investigation metrics.
        </p>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5 backdrop-blur-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 text-emerald-400/20 text-3xl font-mono font-bold">01</div>
          <p className="text-xs font-semibold tracking-widest text-slate-400 uppercase">Active Artifacts</p>
          <p className="text-2xl font-bold font-mono text-emerald-400 mt-2">1,482</p>
          <p className="text-[10px] text-slate-500 mt-1 tracking-wider">+124 parsed this session</p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5 backdrop-blur-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 text-rose-400/20 text-3xl font-mono font-bold">02</div>
          <p className="text-xs font-semibold tracking-widest text-slate-400 uppercase">Critical Threats</p>
          <p className="text-2xl font-bold font-mono text-rose-400 mt-2">03</p>
          <p className="text-[10px] text-slate-500 mt-1 tracking-wider">Requires immediate triage</p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5 backdrop-blur-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 text-cyan-400/20 text-3xl font-mono font-bold">03</div>
          <p className="text-xs font-semibold tracking-widest text-slate-400 uppercase">Chain of Custody</p>
          <p className="text-2xl font-bold font-mono text-cyan-400 mt-2">SECURE</p>
          <p className="text-[10px] text-slate-500 mt-1 tracking-wider">SHA-256 integrity verified</p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5 backdrop-blur-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 text-amber-400/20 text-3xl font-mono font-bold">04</div>
          <p className="text-xs font-semibold tracking-widest text-slate-400 uppercase">Parser Engine</p>
          <p className="text-2xl font-bold font-mono text-amber-400 mt-2">ONLINE</p>
          <p className="text-[10px] text-slate-500 mt-1 tracking-wider">v1.0-stable build</p>
        </div>

      </div>

      {/* Main Action Banner & Quick Launch */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: System Status Brief */}
        <div className="lg:col-span-2 rounded-xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <h2 className="text-xs font-semibold tracking-widest text-slate-300 uppercase">
                System Briefing & Directive
              </h2>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              PWNDORA has successfully initialized all forensic modules. Automated MFT record extraction, registry hive parsing, and timeline reconstruction pipelines are fully synchronized. Use the Evidence Vault to ingest new disk images or jump straight into the Timeline Analysis to inspect anomalies.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 mt-6 pt-6 border-t border-slate-800/80">
            <button
              onClick={() => navigate('/upload')}
              className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20 px-5 py-2.5 rounded-lg text-xs font-semibold tracking-wider transition-colors flex items-center gap-2"
            >
              <span>&gt; LAUNCH EVIDENCE VAULT</span>
            </button>
            <button
              onClick={() => navigate('/timeline')}
              className="bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700/80 px-5 py-2.5 rounded-lg text-xs font-semibold tracking-wider transition-colors flex items-center gap-2"
            >
              <span>&gt; VIEW TIMELINE LOGS</span>
            </button>
          </div>
        </div>

        {/* Right Col: Active Case Details */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-sm flex flex-col justify-between">
          <div>
            <h2 className="text-xs font-semibold tracking-widest text-slate-400 uppercase mb-4">
              // Target Case File
            </h2>
            <div className="space-y-3 font-mono text-xs">
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-500">Case ID:</span>
                <span className="text-slate-300">#PWN-2026-03</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-500">Lead Analyst:</span>
                <span className="text-emerald-400">Team Karur</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-500">Evidence Type:</span>
                <span className="text-slate-300">Raw Disk Image (.dd)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Status:</span>
                <span className="text-amber-400">UNDER INVESTIGATION</span>
              </div>
            </div>
          </div>

          <div className="mt-6 text-[10px] tracking-widest text-slate-600 text-center uppercase">
            Encrypted End-to-End // SOC Compliant
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;