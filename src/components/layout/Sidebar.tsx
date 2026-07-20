import React from 'react';

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-slate-950 border-r border-slate-800 text-slate-300 flex flex-col font-mono">
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-2xl font-bold text-emerald-400 tracking-wider">PWNDORA</h1>
        <p className="text-xs text-slate-500 mt-1">DFIR Module // v1.0</p>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {['Dashboard', 'File Upload', 'Forensic Timeline', 'Analyst Notes', 'Export Report'].map((item) => (
          <a 
            key={item} 
            href="#" 
            className="block px-4 py-3 rounded-md hover:bg-slate-900 hover:text-cyan-400 transition-colors border border-transparent hover:border-slate-700"
          >
            &gt; {item}
          </a>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-sm font-semibold text-slate-400">Analyst: Team Karur</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
