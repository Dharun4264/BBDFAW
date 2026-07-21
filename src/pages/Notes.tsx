import React, { useState } from 'react';

interface ThreatItem {
  id: string;
  indicator: string;
  type: 'IP Address' | 'File Hash' | 'Domain' | 'Executable';
  artifact: string;
  mitre: string;
  status: 'Verified' | 'Pending';
  severity: 'CRITICAL' | 'WARNING' | 'INFO';
}

const Notes = () => {
  // --- State for original IoC Tracker ---
 const [threats, setThreats] = useState<ThreatItem[]>([
  {
    id: "1",
    indicator: "malware.exe",
    type: "Executable",
    artifact: "invoice.lnk",
    mitre: "T1204",
    status: "Verified",
    severity: "CRITICAL",
  },
  {
    id: "2",
    indicator: "192.168.1.145",
    type: "IP Address",
    artifact: "Security.evtx",
    mitre: "T1071",
    status: "Verified",
    severity: "WARNING",
  },
  {
    id: "3",
    indicator: "evil-domain.com",
    type: "Domain",
    artifact: "Chrome History",
    mitre: "T1071",
    status: "Pending",
    severity: "WARNING",
  },
  {
    id: "4",
    indicator: "e3b0c44298fc1c149afbf4c8996fb924",
    type: "File Hash",
    artifact: "malware.exe",
    mitre: "T1204",
    status: "Verified",
    severity: "CRITICAL",
  },
]);
  const [newIndicator, setNewIndicator] = useState('');
  const [newType, setNewType] = useState<'IP Address' | 'File Hash' | 'Domain'>('File Hash');
  const [newSeverity, setNewSeverity] = useState<'CRITICAL' | 'WARNING' | 'INFO'>('CRITICAL');

  // --- State for new Analyst Notes (Hackathon Requirement) ---
  const [analystNote, setAnalystNote] = useState('');
  const [evidenceLink, setEvidenceLink] = useState('');
  const [mitreTag, setMitreTag] = useState('');
  const [selectedIOC, setSelectedIOC] = useState<ThreatItem | null>(null);

  const handleAddIoC = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIndicator.trim()) return;
const newItem: ThreatItem = {
  id: Date.now().toString(),
  indicator: newIndicator.trim(),
  type: newType,
  artifact: "Manual Entry",
  mitre: "Pending",
  status: "Pending",
  severity: newSeverity,
};

    setThreats([newItem, ...threats]);
    setNewIndicator('');
  };

  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!analystNote.trim()) return;
    
    // In a full production app, this would push to the export state.
    alert(`Analyst Note saved for ${evidenceLink || 'General'} with tag ${mitreTag || 'None'}`);
    setAnalystNote('');
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
          Isolate Indicators of Compromise (IoCs) and maintain tactical investigation logs with MITRE ATT&CK tagging.
        </p>
      </div>
      {/* IOC Dashboard */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

  <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5 backdrop-blur-sm">
    <p className="text-xs uppercase tracking-widest text-slate-500">
      Total IOCs
    </p>
    <h2 className="mt-2 text-3xl font-bold text-cyan-400">
      {threats.length}
    </h2>
  </div>

  <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5 backdrop-blur-sm">
    <p className="text-xs uppercase tracking-widest text-slate-500">
      Critical
    </p>
    <h2 className="mt-2 text-3xl font-bold text-rose-400">
      {threats.filter(t => t.severity === "CRITICAL").length}
    </h2>
  </div>

  <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5 backdrop-blur-sm">
    <p className="text-xs uppercase tracking-widest text-slate-500">
      Warning
    </p>
    <h2 className="mt-2 text-3xl font-bold text-amber-400">
      {threats.filter(t => t.severity === "WARNING").length}
    </h2>
  </div>

  <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5 backdrop-blur-sm">
    <p className="text-xs uppercase tracking-widest text-slate-500">
      Verified
    </p>
    <h2 className="mt-2 text-3xl font-bold text-emerald-400">
      {threats.length}
    </h2>
  </div>

</div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: IoC Log and Feed */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* Add IoC Form */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5 backdrop-blur-sm">
            <h2 className="text-xs font-semibold tracking-widest text-slate-400 uppercase mb-4">
              // Log New Indicator of Compromise (IoC)
            </h2>
            <form onSubmit={handleAddIoC} className="flex flex-col sm:flex-row gap-3">
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

   {/* IOC Investigation Table */}

<div className="rounded-xl border border-slate-800 bg-slate-900/50 overflow-hidden backdrop-blur-sm">

  <div className="px-6 py-4 border-b border-slate-800 bg-slate-950/80 flex justify-between items-center">

    <h2 className="text-xs font-semibold tracking-widest text-slate-400 uppercase">
      IOC Investigation Table
    </h2>

    <span className="text-xs text-slate-500">
      {threats.length} Indicators
    </span>

  </div>

  <table className="w-full">

    <thead className="bg-slate-900 border-b border-slate-800">

      <tr className="text-left text-xs uppercase tracking-widest text-slate-500">

        <th className="px-5 py-4">IOC</th>

        <th className="px-5 py-4">Type</th>

        <th className="px-5 py-4">Artifact</th>

        <th className="px-5 py-4">MITRE</th>

        <th className="px-5 py-4">Status</th>

        <th className="px-5 py-4">Severity</th>

        <th className="px-5 py-4">Action</th>

      </tr>

    </thead>

    <tbody>

      {threats.map((item) => (

        <tr
          key={item.id}
          className="border-b border-slate-800 hover:bg-slate-800/30 transition"
        >

          <td className="px-5 py-4 font-mono text-cyan-300">
            {item.indicator}
          </td>

          <td className="px-5 py-4 text-slate-400">
            {item.type}
          </td>

          <td className="px-5 py-4 text-slate-400">
            {item.artifact}
          </td>

          <td className="px-5 py-4 text-cyan-400">
            {item.mitre}
          </td>

          <td className="px-5 py-4">

            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                item.status === "Verified"
                  ? "bg-emerald-500/20 text-emerald-400"
                  : "bg-amber-500/20 text-amber-400"
              }`}
            >
              {item.status}
            </span>

          </td>

          <td className="px-5 py-4">

            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                item.severity === "CRITICAL"
                  ? "bg-rose-500/20 text-rose-400"
                  : item.severity === "WARNING"
                  ? "bg-amber-500/20 text-amber-400"
                  : "bg-cyan-500/20 text-cyan-400"
              }`}
            >
              {item.severity}
            </span>

          </td>

          <td className="px-5 py-4">

            <button
              className="border border-cyan-500/40 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded text-xs"
            >
              View
            </button>

          </td>

        </tr>

      ))}

    </tbody>
</table>

</div>

</div> {/* End Left Column */}

<div className="flex flex-col gap-4">
          <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-5 flex flex-col flex-1 backdrop-blur-sm">
            <h2 className="text-xs font-semibold tracking-widest text-slate-400 uppercase mb-4">
              // Analyst Notes & Threat Tagging
            </h2>
            
            <form onSubmit={handleSaveNote} className="flex flex-col gap-3 flex-1">
              <div className="flex flex-col gap-3">
                {/* Evidence Link */}
                <select
                  value={evidenceLink}
                  onChange={(e) => setEvidenceLink(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-cyan-400 font-mono"
                >
                  <option value="">Link Evidence...</option>
                  <option value="invoice.lnk">invoice.lnk</option>
                  <option value="NTUSER.DAT">NTUSER.DAT</option>
                  <option value="Security.evtx">Security.evtx</option>
                </select>

                {/* MITRE ATT&CK Tag */}
                <select
                  value={mitreTag}
                  onChange={(e) => setMitreTag(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-cyan-400 font-mono"
                >
                  <option value="">Select MITRE T-Code...</option>
                  <option value="T1059">T1059 - Command & Scripting</option>
                  <option value="T1204">T1204 - User Execution</option>
                  <option value="T1105">T1105 - Ingress Tool Transfer</option>
                  <option value="T1547">T1547 - Boot or Logon Autostart</option>
                </select>
              </div>

              <textarea
                value={analystNote}
                onChange={(e) => setAnalystNote(e.target.value)}
                placeholder="Analyst observation..."
                className="flex-1 mt-2 w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-sm font-mono text-slate-300 focus:outline-none focus:border-cyan-400 resize-none min-h-[150px]"
              />

              <button
                type="submit"
                className="mt-2 bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20 px-5 py-2 rounded-lg text-sm font-semibold tracking-wide transition-colors w-full"
              >
                SAVE NOTE TO REPORT
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Notes;