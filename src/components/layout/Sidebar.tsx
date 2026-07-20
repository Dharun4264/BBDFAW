interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const navigationItems = [
  { label: "Dashboard", icon: "📊", href: "#dashboard" },
  { label: "Upload Evidence", icon: "🗂️", href: "#upload-evidence" },
  { label: "Timeline Grid", icon: "🕒", href: "#timeline-grid" },
  { label: "Analyst Notes", icon: "📝", href: "#analyst-notes" },
  { label: "Export Report", icon: "📤", href: "#export-report" },
] as const;

export function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  return (
    <aside
      className={`flex min-h-screen shrink-0 flex-col overflow-hidden border-r border-slate-800 bg-slate-900 font-mono transition-[width] duration-300 ease-in-out ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      <div className="flex h-16 items-center border-b border-slate-800 px-4">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-cyan-400/40 bg-cyan-400/10 text-lg text-cyan-300">
          ⚡
        </span>
        {isOpen && (
          <div className="ml-3 min-w-0">
            <p className="truncate text-xs font-semibold tracking-wide text-slate-100">BBDFAW / PWNDORA</p>
            <p className="truncate text-[10px] tracking-wider text-slate-500">WORKBENCH</p>
          </div>
        )}
      </div>

      <nav className="flex-1 space-y-1 p-3" aria-label="Forensics navigation">
        {navigationItems.map(({ label, icon, href }) => (
          <a
            key={label}
            href={href}
            title={isOpen ? undefined : label}
            className="flex h-11 items-center rounded-md px-3 font-mono text-sm text-slate-400 transition-colors hover:bg-slate-800 hover:text-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/70"
          >
            <span className="flex w-5 shrink-0 justify-center text-base" aria-hidden="true">
              {icon}
            </span>
            {isOpen && <span className="ml-3 whitespace-nowrap">{label}</span>}
          </a>
        ))}
      </nav>

      {isOpen && (
        <div className="m-3 rounded-md border border-emerald-400/20 bg-emerald-400/5 p-3">
          <p className="text-xs font-semibold text-emerald-400">STATUS: READY</p>
          <p className="mt-1 text-[10px] text-emerald-400/80">100% Client Parsing</p>
        </div>
      )}

      <button
        type="button"
        onClick={toggleSidebar}
        className="m-3 rounded-md border border-slate-800 py-2 text-xs text-slate-400 transition-colors hover:bg-slate-800 hover:text-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/70"
        aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
      >
        {isOpen ? "COLLAPSE" : ">"}
      </button>
    </aside>
  );
}
