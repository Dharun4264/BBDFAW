import React, { useState } from 'react';

interface ThreatItem {
  id: string;
  indicator: string;
  type: 'IP Address' | 'File Hash' | 'Domain';
  severity: 'CRITICAL' | 'WARNING' | 'INFO';
}

const Notes = () => {
  const [notes, setNotes] = useState<string>(
    '# Investigation Notes - Case #03\n- Suspicious PowerShell script executed from AppData.\n- Checking outbound connections to known C2 servers.'
  );
  
  const [threats, setThreats] = useState<ThreatItem[]>([
    { id: '1', indicator: '192.168.1.145', type: 'IP Address', severity: 'WARNING' },
    { id: '2', indicator: 'e3b0c44298fc1c149afbf4c8996fb924', type: 'File Hash', severity: 'CRITICAL' },
  ]);

  const [newIndicator, setNewIndicator] = useState('');
  const [newType, setNewType] = useState<'IP Address' | 'File Hash' | 'Domain'>('File Hash');
  const [newSeverity, setNewSeverity] = useState<'CRITICAL' | 'WARNING' | 'INFO'>('CRITICAL');

  const handleAddThreat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIndicator.trim()) return;

    const newItem: ThreatItem = {
      id: Date.now().toString(),
      indicator: newIndicator.trim(),
      type: newType,
      severity: newSeverity,
    };

    setThreats([newItem, ...threats]);
    setNewIndicator('');
  };

  const getSeverityBadge = (sev: string) => {
    switch (sev) {
      case 'CRITICAL':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      case 'WARNING':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      default:
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20';
    }
  };

  return (
    <div className="flex flex-col gap-6 py-2 min-h-[calc(100vh-3.5rem)]">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold tracking-wider text-cyan-300 uppercase">
          Threat Intel & Analyst Scratchpad
        </h1>
        <p className="text-sm text-slate-400">
          Isolate Indicators of Compromise (IoCs) and maintain tactical investigation logs.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: IoC Log and Feed */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* Add IoC Form */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5 backdrop-blur-sm">
            <h2 className="text-xs font-semibold tracking-widest text-slate-400 uppercase mb-4">
              // Log New Indicator of Compromise (IoC)
            </h2>
            <form onSubmit={handleAddThreat} className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="Enter Hash, IP, or Domain..."
                value={newIndicator}
                onChange={(e) => setNewIndicator(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-400 font-mono"
              />
              <select
                value={newType}
                onChange={(e) => setNewType(e.target.value as any)}
                className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-cyan-400 font-mono"
              >
                <option value="File Hash">File Hash</option>
                <option value="IP Address">IP Address</option>
                <option value="Domain">Domain</option>
              </select>
              <select
                value={newSeverity}
                onChange={(e) => setNewSeverity(e.target.value as any)}
                className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-cyan-400 font-mono"
              >
                <option value="CRITICAL">Critical</option>
                <option value="WARNING">Warning</option>
                <option value="INFO">Info</option>
              </select>
              <button
                type="submit"
                className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20 px-5 py-2 rounded-lg text-sm font-semibold tracking-wide transition-colors"
              >
                LOG IOC
              </button>
            </form>
          </div>

          {/* IoC List Table */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/50 overflow-hidden backdrop-blur-sm">
            <div className="px-6 py-4 border-b border-slate-800 bg-slate-950/80">
              <h2 className="text-xs font-semibold tracking-widest text-slate-400 uppercase">
                Active Threat Indicators ({threats.length})
              </h2>
            </div>
            <div className="divide-y divide-slate-800/50">
              {threats.map((item) => (
                <div key={item.id} className="flex items-center justify-between px-6 py-3.5 hover:bg-slate-800/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-sm text-cyan-300">{item.indicator}</span>
                    <span className="text-xs text-slate-500 uppercase tracking-wider">[{item.type}]</span>
                  </div>
                  <span className={`px-2.5 py-1 rounded text-[10px] font-bold tracking-widest border ${getSeverityBadge(item.severity)}`}>
                    {item.severity}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Col: Markdown-style Analyst Scratchpad */}
        <div className="flex flex-col gap-4">
          <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5 flex flex-col flex-1 backdrop-blur-sm">
            <h2 className="text-xs font-semibold tracking-widest text-slate-400 uppercase mb-3">
              // Analyst Scratchpad
            </h2>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="flex-1 w-full bg-slate-950 border border-slate-800 rounded-lg p-4 text-xs font-mono text-slate-300 focus:outline-none focus:border-cyan-400 resize-none min-h-[300px]"
              placeholder="Type investigation findings here..."
            />
            <p className="text-[10px] text-slate-500 tracking-wider mt-2 text-right">
              AUTO-SAVED TO BUFFER
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Notes;