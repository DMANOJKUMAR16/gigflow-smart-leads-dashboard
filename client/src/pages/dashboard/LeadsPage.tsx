import { useQuery } from "@tanstack/react-query";

import LeadsTable from "../../components/dashboard/LeadsTable";

import { getLeads } from "../../services/leads.service";

const LeadsPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["leads"],
    queryFn: getLeads,
  });

  if (isLoading) {
    return <div>Loading leads...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Leads
        </h1>

        <p className="text-slate-500 mt-1">
          Manage your sales pipeline
        </p>
      </div>

      <LeadsTable leads={data || []} />
    </div>
  );
};

export default LeadsPage;