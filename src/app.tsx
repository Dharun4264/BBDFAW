import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Timeline from './pages/Timeline';
import Upload from './pages/Upload';
import NotFound from './pages/NotFound';

const App = () => {
  const [aiEngineActive, setAiEngineActive] = useState<boolean>(false);
  const [systemStatus, setSystemStatus] = useState<string>('INITIALIZING...');

  useEffect(() => {
    const bootTimer = setTimeout(() => {
      setSystemStatus('SYSTEM ONLINE');
    }, 2500);

    return () => clearTimeout(bootTimer);
  }, []);

  const toggleAiEngine = () => {
    setAiEngineActive((prev) => !prev);
  };

  return (
    <BrowserRouter>
      <div className="relative min-h-screen w-full bg-slate-950 font-mono text-slate-200 overflow-hidden">
        {/* Ambient glow layers */}
        <div className="pointer-events-none absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-emerald-500/20 blur-[150px]" />
        <div className="pointer-events-none absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-cyan-500/20 blur-[150px]" />

        {/* Fixed header */}
        <header className="fixed top-0 left-0 z-50 flex h-14 w-full items-center justify-between border-b border-slate-800 bg-slate-950/80 px-6 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold tracking-widest text-emerald-400">
              PWNDORA
            </span>
            <span
              className={`text-xs tracking-wide ${
                systemStatus === 'SYSTEM ONLINE' ? 'text-emerald-400' : 'text-amber-400 animate-pulse'
              }`}
            >
              {systemStatus}
            </span>
          </div>

          <button
            onClick={toggleAiEngine}
            className={`rounded border px-3 py-1 text-xs font-semibold tracking-wide transition-colors ${
              aiEngineActive
                ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                : 'border-slate-700 bg-slate-900 text-slate-400'
            }`}
          >
            AI ENGINE: {aiEngineActive ? 'ACTIVE' : 'STANDBY'}
          </button>
        </header>

        {/* Main content */}
        <div className="relative z-10 pt-14">
          <Layout>
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/timeline" element={<Timeline />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
