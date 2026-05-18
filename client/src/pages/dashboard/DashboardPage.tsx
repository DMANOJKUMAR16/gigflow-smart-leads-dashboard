import { useQuery } from "@tanstack/react-query";

import StatsCards from "../../components/dashboard/StatsCards";

import { getDashboardStats } from "../../services/dashboard.service";

import LeadsChart from "../../components/dashboard/LeadsChart";

const DashboardPage = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: getDashboardStats,
  });

  if (isLoading) {
    return (
      <div className="text-xl font-semibold">
        Loading dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 font-semibold">
        Failed to load dashboard data
      </div>
    );
  }

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

      <StatsCards
        stats={
          data || {
            totalLeads: 0,
            contactedLeads: 0,
            qualifiedLeads: 0,
            wonLeads: 0,
          }
        }
      />
     <LeadsChart stats={data} />
    </div>
  );
};

export default DashboardPage;