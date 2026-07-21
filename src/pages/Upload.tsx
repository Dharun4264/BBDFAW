import { useState, useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

/* ── stage labels shown during mock ingest ─────────────────────── */
const INGEST_STAGES = [
  'Hashing evidence image…',
  'Extracting MFT records…',
  'Parsing registry hives…',
  'Building timeline artefacts…',
  'Indexing event logs…',
  'Finalising case file…',
];

const Upload = () => {
  const navigate = useNavigate();

  /* ── state & refs ──────────────────────────────────────────── */
  const [isDragOver, setIsDragOver] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stageIdx, setStageIdx] = useState(0);
  
  // 1. We create a reference to link to our hidden HTML file input
  const fileInputRef = useRef<HTMLInputElement>(null);

  /* ── mock ingest animation (2 s total) ─────────────────────── */
  useEffect(() => {
    if (!isLoading) return;

    /* progress bar: 0 → 100 over ~2 000 ms */
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 20); /* 100 steps × 20 ms = 2 000 ms */

    /* cycle through ingest stage labels */
    const stageInterval = setInterval(() => {
      setStageIdx((prev) => (prev + 1) % INGEST_STAGES.length);
    }, 333);

    /* navigate after 2 s */
    const navTimeout = setTimeout(() => {
      navigate('/timeline');
    }, 2000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(stageInterval);
      clearTimeout(navTimeout);
    };
  }, [isLoading, navigate]);

  /* ── handlers ──────────────────────────────────────────────── */
  
  // 2. This function actually starts the loading sequence
  const startIngestProcess = useCallback(() => {
    if (isLoading) return;
    setProgress(0);
    setStageIdx(0);
    setIsLoading(true);
  }, [isLoading]);

  // 3. This triggers the hidden file explorer window
  const handleBrowseClick = useCallback(() => {
    if (isLoading) return;
    fileInputRef.current?.click();
  }, [isLoading]);

  // 4. This fires ONLY when a file is selected from the file explorer
  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        startIngestProcess();
      }
    },
    [startIngestProcess]
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      if (!isLoading) setIsDragOver(true);
    },
    [isLoading],
  );

  const handleDragLeave = useCallback(() => setIsDragOver(false), []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      // 5. Check if they actually dropped a file before loading
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        startIngestProcess();
      }
    },
    [startIngestProcess],
  );

  /* ── render ────────────────────────────────────────────────── */
  return (
    <section className="flex min-h-[calc(100vh-3.5rem)] flex-col items-center px-6 py-10">
      {/* page heading */}
      <div className="mb-8 text-center">
        <h1 className="text-lg font-semibold tracking-wide text-cyan-300">
          Evidence Upload
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Ingest forensic artifacts for parsing &amp; timeline reconstruction.
        </p>
      </div>

      {/* 6. The hidden actual file input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        className="hidden" 
        accept=".e01,.dd,.raw,.zip" 
      />

      {/* ── drop-zone ────────────────────────────────────────── */}
      <div
        role="button"
        tabIndex={0}
        aria-label="Upload evidence"
        onClick={handleBrowseClick} // Changed to open browser window
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') handleBrowseClick();
        }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          group relative flex w-full max-w-4xl cursor-pointer flex-col items-center
          justify-center rounded-2xl border-[3px] border-dashed
          transition-all duration-500 ease-out
          ${
            isLoading
              ? 'pointer-events-none border-emerald-500/60 bg-emerald-500/[.04]'
              : isDragOver
                ? 'border-cyan-400 bg-cyan-500/[.06] shadow-[0_0_60px_-15px_rgba(34,211,238,.25)]'
                : 'border-slate-700 bg-slate-900/50 hover:border-emerald-500/50 hover:bg-emerald-500/[.03] hover:shadow-[0_0_80px_-20px_rgba(16,185,129,.15)]'
          }
        `}
        style={{ minHeight: 'clamp(340px, 55vh, 560px)' }}
      >
        {/* background scan-line effect */}
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl opacity-[.035]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(255,255,255,.15) 3px,rgba(255,255,255,.15) 4px)',
          }}
        />

        {/* corner accents */}
        {(['top-0 left-0', 'top-0 right-0 rotate-90', 'bottom-0 right-0 rotate-180', 'bottom-0 left-0 -rotate-90'] as const).map(
          (pos) => (
            <span
              key={pos}
              className={`pointer-events-none absolute ${pos} h-6 w-6 border-emerald-500/40 transition-colors duration-500 ${
                pos.includes('right') ? '' : 'border-l-2 border-t-2'
              }${pos.includes('right') && !pos.includes('bottom') ? ' border-r-2 border-t-2' : ''}${
                pos.includes('bottom') && pos.includes('right') ? ' border-r-2 border-b-2' : ''
              }${pos.includes('bottom') && pos.includes('left') ? ' border-l-2 border-b-2' : ''} ${
                isDragOver || isLoading ? 'border-cyan-400/70' : ''
              }`}
            />
          ),
        )}

        {/* ── idle / drag-over state ─────────────────────────── */}
        {!isLoading && (
          <div className="relative z-10 flex flex-col items-center gap-5 px-4">
            {/* shield icon */}
            <div
              className={`flex h-20 w-20 items-center justify-center rounded-full border transition-all duration-500 ${
                isDragOver
                  ? 'border-cyan-400/50 bg-cyan-500/10 shadow-[0_0_30px_-5px_rgba(34,211,238,.3)]'
                  : 'border-slate-700 bg-slate-800/60 group-hover:border-emerald-500/40 group-hover:bg-emerald-500/[.07] group-hover:shadow-[0_0_30px_-5px_rgba(16,185,129,.2)]'
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`h-9 w-9 transition-colors duration-500 ${
                  isDragOver
                    ? 'text-cyan-400'
                    : 'text-slate-500 group-hover:text-emerald-400'
                }`}
              >
                {/* upload-cloud icon */}
                <path d="M12 16V8m0 0-3 3m3-3 3 3" />
                <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
              </svg>
            </div>

            <div className="text-center">
              <p
                className={`text-base font-semibold tracking-wide transition-colors duration-300 ${
                  isDragOver ? 'text-cyan-300' : 'text-slate-300'
                }`}
              >
                {isDragOver
                  ? 'RELEASE TO INGEST'
                  : 'DROP EVIDENCE IMAGE HERE'}
              </p>
              <p className="mt-1.5 text-xs tracking-wider text-slate-500">
                or{' '}
                <span className="text-emerald-400 underline underline-offset-2">
                  click to browse
                </span>{' '}
                — .E01 / .dd / .raw / .zip
              </p>
            </div>

            {/* decorative hex badge */}
            <span className="mt-2 rounded-md border border-slate-800 bg-slate-900/80 px-3 py-1 text-[10px] font-medium tracking-[.25em] text-slate-500">
              SHA-256 VERIFIED ON INGEST
            </span>
          </div>
        )}

        {/* ── loading state ──────────────────────────────────── */}
        {isLoading && (
          <div className="relative z-10 flex w-full max-w-md flex-col items-center gap-6 px-4">
            {/* spinning ring + pulsing core */}
            <div className="relative flex h-24 w-24 items-center justify-center">
              {/* outer ring */}
              <svg
                className="absolute inset-0 animate-spin"
                style={{ animationDuration: '2.5s' }}
                viewBox="0 0 96 96"
                fill="none"
              >
                <circle
                  cx="48"
                  cy="48"
                  r="44"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-slate-800"
                />
                <path
                  d="M48 4a44 44 0 0 1 44 44"
                  stroke="url(#grad)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="grad" x1="48" y1="4" x2="92" y2="48">
                    <stop stopColor="#34d399" />
                    <stop offset="1" stopColor="#22d3ee" />
                  </linearGradient>
                </defs>
              </svg>

              {/* inner pulsing dot */}
              <span className="h-4 w-4 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_18px_4px_rgba(52,211,153,.45)]" />
            </div>

            {/* stage label */}
            <p className="h-5 text-center text-sm font-medium tracking-wide text-emerald-300 transition-all">
              {INGEST_STAGES[stageIdx]}
            </p>

            {/* progress bar */}
            <div className="w-full overflow-hidden rounded-full bg-slate-800/70">
              <div
                className="h-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-400 transition-[width] duration-100 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* percentage + time label */}
            <div className="flex w-full items-center justify-between text-[11px] tracking-wider text-slate-500">
              <span>PROCESSING</span>
              <span className="tabular-nums text-emerald-400/80">
                {progress}%
              </span>
            </div>
          </div>
        )}
      </div>

      {/* ── footer metadata strip ────────────────────────────── */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[10px] tracking-[.2em] text-slate-600">
        <span>MAX SIZE: 128 GB</span>
        <span className="hidden sm:inline">•</span>
        <span>CHAIN-OF-CUSTODY LOGGING</span>
        <span className="hidden sm:inline">•</span>
        <span>AES-256 AT REST</span>
      </div>
    </section>
  );
};

export default Upload;