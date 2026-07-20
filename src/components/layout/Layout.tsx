import { useState, type ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const navigationItems = [
  "Case Overview",
  "Evidence Vault",
  "Timeline Analysis",
  "Threat Intel",
];

export function Layout({ children }: LayoutProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 font-mono text-slate-100">
      <div className="flex min-h-screen overflow-hidden">
        <aside
          className={`relative flex min-h-screen shrink-0 flex-col border-r border-slate-800 bg-slate-900 transition-[width] duration-200 ease-out ${
            isSidebarCollapsed ? "w-16" : "w-64"
          }`}
        >
          <div className="flex h-16 items-center border-b border-slate-800 px-4">
            <span className="flex h-8 w-8 items-center justify-center border border-cyan-400/60 bg-cyan-400/10 text-sm font-bold text-cyan-300">
              DF
            </span>
            {!isSidebarCollapsed && (
              <span className="ml-3 whitespace-nowrap text-sm font-semibold tracking-[0.18em] text-slate-100">
                FORENSICS
              </span>
            )}
          </div>

          <nav className="flex-1 space-y-1 p-3" aria-label="Primary navigation">
            {navigationItems.map((item, index) => (
              <a
                key={item}
                href="#"
                title={isSidebarCollapsed ? item : undefined}
                className={`flex h-10 items-center rounded-sm px-3 text-sm transition-colors ${
                  index === 0
                    ? "bg-cyan-400/10 text-cyan-300"
                    : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
                }`}
              >
                <span className="mr-3 h-2 w-2 shrink-0 rounded-full border border-current" />
                {!isSidebarCollapsed && <span className="whitespace-nowrap">{item}</span>}
              </a>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setIsSidebarCollapsed((collapsed) => !collapsed)}
            aria-label={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="m-3 flex h-10 items-center justify-center rounded-sm border border-slate-800 text-slate-400 transition-colors hover:border-cyan-400/50 hover:bg-slate-800 hover:text-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/70"
          >
            <span aria-hidden="true">{isSidebarCollapsed ? ">" : "<"}</span>
            {!isSidebarCollapsed && <span className="ml-2 text-xs">COLLAPSE</span>}
          </button>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-800 bg-slate-900/80 px-6 backdrop-blur">
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] text-cyan-300">OPERATIONS CONSOLE</p>
              <p className="mt-1 text-xs text-slate-500">Digital evidence and incident analysis</p>
            </div>
            <nav className="flex items-center gap-2" aria-label="Operational status">
              <span className="rounded-sm border border-emerald-400/30 bg-emerald-400/10 px-2 py-1 text-xs text-emerald-300">
                SYSTEMS ONLINE
              </span>
              <span className="hidden rounded-sm border border-amber-400/30 bg-amber-400/10 px-2 py-1 text-xs text-amber-300 sm:inline">
                03 ACTIVE CASES
              </span>
              <span className="hidden rounded-sm border border-slate-700 bg-slate-800 px-2 py-1 text-xs text-slate-300 md:inline">
                UTC 14:32:08
              </span>
            </nav>
          </header>

          <main className="relative flex-1 overflow-y-auto bg-slate-950 p-6">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(148,163,184,0.45)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.45)_1px,transparent_1px)] [background-size:24px_24px]"
            />
            <div className="relative z-10">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}
