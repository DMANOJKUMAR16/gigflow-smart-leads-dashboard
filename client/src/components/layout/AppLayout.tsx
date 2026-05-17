import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-slate-100">
      <div className="flex">
        <aside className="w-64 bg-white border-r min-h-screen p-6">
          <h1 className="text-2xl font-bold">
            GigFlow
          </h1>

          <nav className="mt-8 space-y-4">
            <p className="font-medium">
              Dashboard
            </p>

            <p className="font-medium">
              Leads
            </p>
          </nav>
        </aside>

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;