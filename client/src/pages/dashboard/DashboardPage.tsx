import StatsCards from "@/components/dashboard/StatsCards";

const DashboardPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="text-slate-500 mt-1">
          Welcome back to GigFlow CRM
        </p>
      </div>

      <StatsCards />
    </div>
  );
};

export default DashboardPage;