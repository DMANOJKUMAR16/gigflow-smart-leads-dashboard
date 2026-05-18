import { Link, Outlet } from "react-router-dom";

import {
  LayoutDashboard,
  Menu,
  Moon,
  Sun,
  Users,
  X,
} from "lucide-react";

import { useState } from "react";

import { useTheme } from "next-themes";

const AppLayout = () => {
  const [open, setOpen] =
    useState(false);

  const {
    theme,
    setTheme,
  } = useTheme();

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-black dark:text-white flex">
      {/* MOBILE OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() =>
            setOpen(false)
          }
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed lg:static top-0 left-0 z-50
          h-screen w-64 bg-white dark:bg-slate-800 border-r
          transform transition-transform duration-300

          ${
            open
              ? "translate-x-0"
              : "-translate-x-full"
          }

          lg:translate-x-0
        `}
      >
        <div className="p-6 border-b flex items-center justify-between">
          <h1 className="text-3xl font-bold">
            GigFlow
          </h1>

          <button
            className="lg:hidden"
            onClick={() =>
              setOpen(false)
            }
          >
            <X size={24} />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          <Link
            to="/dashboard"
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            <LayoutDashboard
              size={20}
            />

            Dashboard
          </Link>

          <Link
            to="/leads"
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            <Users size={20} />

            Leads
          </Link>
        </nav>
      </aside>

      {/* MAIN */}
      <div className="flex-1 flex flex-col">
        {/* TOPBAR */}
        <header className="bg-white dark:bg-slate-800 border-b px-6 py-4 flex items-center gap-4">
          <button
            className="lg:hidden"
            onClick={() =>
              setOpen(true)
            }
          >
            <Menu size={26} />
          </button>

          <button
            onClick={() =>
              setTheme(
                theme === "dark"
                  ? "light"
                  : "dark"
              )
            }
            className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700"
          >
            {theme === "dark" ? (
              <Sun size={22} />
            ) : (
              <Moon size={22} />
            )}
          </button>

          <h2 className="text-2xl font-bold">
            GigFlow Smart Leads Dashboard
          </h2>
        </header>

        {/* CONTENT */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;