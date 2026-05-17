import { Outlet, Link } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-slate-100 flex">
      <aside className="w-64 bg-white border-r hidden md:flex flex-col">
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold">
            GigFlow
          </h1>
        </div>

        <nav className="flex flex-col p-4 gap-2">
          <Link
            to="/dashboard"
            className="px-4 py-3 rounded-lg hover:bg-slate-100 font-medium"
          >
            Dashboard
          </Link>

          <Link
            to="/leads"
            className="px-4 py-3 rounded-lg hover:bg-slate-100 font-medium"
          >
            Leads
          </Link>
        </nav>
      </aside>

      <main className="flex-1">
        <header className="bg-white border-b px-6 py-4">
          <h2 className="font-semibold text-lg">
            GigFlow Smart Leads Dashboard
          </h2>
        </header>

        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AppLayout;