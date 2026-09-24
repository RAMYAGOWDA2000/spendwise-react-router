import { NavLink, Outlet, useLocation } from "react-router-dom";
import { BarChart3, LayoutDashboard, Menu, Plus, Receipt, X } from "lucide-react";
import { useState } from "react";

const links = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/expenses", label: "Expenses", icon: Receipt },
  { to: "/reports", label: "Reports", icon: BarChart3 },
];

export default function AppLayout() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const navClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
      isActive ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"
    }`;

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
              onClick={() => setOpen(true)}
              aria-label="Open navigation"
            >
              <Menu size={21} />
            </button>
            <NavLink to="/" className="text-xl font-bold tracking-tight text-slate-900">
              SpendWise
            </NavLink>
          </div>
          <NavLink to="/expenses/new" className="btn-primary">
            <Plus size={18} />
            <span className="hidden sm:inline">Add expense</span>
          </NavLink>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl">
        <aside className="hidden w-60 shrink-0 border-r border-slate-200 bg-white lg:block">
          <nav className="sticky top-16 space-y-1 p-4">
            {links.map(({ to, label, icon: Icon, end }) => (
              <NavLink key={to} to={to} end={end} className={navClass}>
                <Icon size={18} />
                {label}
              </NavLink>
            ))}
          </nav>
        </aside>

        {open && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <div className="absolute inset-0 bg-slate-950/30" onClick={() => setOpen(false)} />
            <aside className="relative h-full w-72 bg-white p-4 shadow-xl">
              <div className="mb-5 flex items-center justify-between">
                <span className="text-lg font-bold">SpendWise</span>
                <button onClick={() => setOpen(false)} className="rounded-lg p-2 hover:bg-slate-100">
                  <X size={20} />
                </button>
              </div>
              <nav className="space-y-1">
                {links.map(({ to, label, icon: Icon, end }) => (
                  <NavLink
                    key={to}
                    to={to}
                    end={end}
                    className={navClass}
                    onClick={() => setOpen(false)}
                  >
                    <Icon size={18} />
                    {label}
                  </NavLink>
                ))}
              </nav>
            </aside>
          </div>
        )}

        <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet key={location.pathname} />
        </main>
      </div>
    </div>
  );
}