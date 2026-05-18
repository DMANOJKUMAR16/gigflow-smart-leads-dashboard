import { useState } from "react";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import LeadsTable from "../../components/dashboard/LeadsTable";

import CreateLeadModal from "../../components/dashboard/CreateLeadModal";

import {
  createLead,
  getLeads,
  updateLeadStatus,
} from "../../services/leads.service";

const LeadsPage = () => {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);

  const [searchInput, setSearchInput] =
    useState("");

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["leads", search, status],

    queryFn: () => getLeads(search, status),
  });

  const mutation = useMutation({
    mutationFn: createLead,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["leads"],
      });
    },
  });

  const statusMutation = useMutation({
  mutationFn: ({
    leadId,
    status,
  }: {
    leadId: string;
    status: string;
  }) =>
    updateLeadStatus(
      leadId,
      status
    ),

  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ["leads"],
    });

    queryClient.invalidateQueries({
      queryKey: ["dashboard-stats"],
    });
  },
});

  const handleSearch = () => {
    setSearch(searchInput);
  };

  if (isLoading) {
    return <div>Loading leads...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Leads
          </h1>

          <p className="text-slate-500 mt-1">
            Manage your sales pipeline
          </p>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="bg-black text-white px-5 py-3 rounded-xl"
        >
          Add Lead
        </button>
      </div>

      <div className="flex gap-4 items-center">
        <input
          type="text"
          placeholder="Search leads..."
          value={searchInput}
          onChange={(e) =>
            setSearchInput(e.target.value)
          }
          className="border rounded-lg px-4 py-2 w-72"
        />

        <button
          onClick={handleSearch}
          className="bg-black text-white px-5 py-2 rounded-lg"
        >
          Search
        </button>

        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
          className="border rounded-lg px-4 py-2"
        >
          <option value="">
            All Status
          </option>

          <option value="new">
            New
          </option>

          <option value="contacted">
            Contacted
          </option>

          <option value="qualified">
            Qualified
          </option>

          <option value="won">
            Won
          </option>
        </select>
      </div>

      <LeadsTable
        leads={data || []}
        onStatusChange={(
          leadId,
          status
        ) =>
          statusMutation.mutate({
            leadId,
            status,
          })
        }
      />

      <CreateLeadModal
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={(data) =>
          mutation.mutate(data)
        }
      />
    </div>
  );
};

export default LeadsPage;