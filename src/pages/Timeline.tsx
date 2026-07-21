import React from 'react';
// Importing your rescued data file!
import { UImockData } from '../data/UImockdata';

const Timeline = () => {
  // Dynamic color coding for the forensic risk levels
  const getRiskBadge = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'high':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/20 shadow-[0_0_10px_rgba(244,63,94,0.2)]';
      case 'medium':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.2)]';
      case 'low':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.2)]';
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  return (
    <div className="flex flex-col gap-6 py-2 min-h-[calc(100vh-3.5rem)]">
      {/* Header Section */}
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-bold tracking-wider text-cyan-300 uppercase">
          Forensic Event Timeline
        </h1>
        <p className="text-sm text-slate-400">
          Chronological reconstruction of ingested artifacts and system executions.
        </p>
      </div>

      {/* Main Data Table */}
      <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50 shadow-xl backdrop-blur-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            
            {/* Table Headers */}
            <thead className="border-b border-slate-800 bg-slate-950/80 text-xs font-semibold tracking-widest text-slate-500">
              <tr>
                <th className="px-6 py-4">TIMESTAMP</th>
                <th className="px-6 py-4">EVENT TYPE</th>
                <th className="px-6 py-4">TARGET FILE</th>
                <th className="px-6 py-4">EXECUTION PATH</th>
                <th className="px-6 py-4">RISK LEVEL</th>
              </tr>
            </thead>

            {/* Table Body (Mapping the Mock Data) */}
            <tbody className="divide-y divide-slate-800/50">
              {UImockData.map((item) => (
                <tr 
                  key={item.id} 
                  className="transition-colors duration-200 hover:bg-slate-800/40 group cursor-default"
                >
                  <td className="whitespace-nowrap px-6 py-4 font-mono text-cyan-400/90 group-hover:text-cyan-300">
                    {item.time}
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-200">
                    {item.event}
                  </td>
                  <td className="px-6 py-4 font-mono text-slate-400 group-hover:text-slate-300">
                    {item.file}
                  </td>
                  <td 
                    className="max-w-[250px] truncate px-6 py-4 font-mono text-xs text-slate-500 group-hover:text-slate-400" 
                    title={item.path}
                  >
                    {item.path}
                  </td>
                  <td className="px-6 py-4">
                    <span 
                      className={`inline-flex items-center rounded-sm border px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest ${getRiskBadge(item.risk)}`}
                    >
                      {item.risk}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
            
          </table>
        </div>
        
        {/* Table Footer Meta-strip */}
        <div className="border-t border-slate-800 bg-slate-950/80 px-6 py-3 text-[10px] tracking-[0.2em] text-slate-500 flex justify-between items-center">
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-500 animate-pulse"></span>
            TOTAL EVENTS: {UImockData.length}
          </span>
          <span>PARSER CONFIDENCE: 99.8%</span>
        </div>
      </div>
    </div>
  );
};

export default Timeline;