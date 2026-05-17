import { useState } from "react";

import { useQuery } from "@tanstack/react-query";

import LeadsTable from "../../components/dashboard/LeadsTable";

import { getLeads } from "../../services/leads.service";

const LeadsPage = () => {
  const [searchInput, setSearchInput] =
    useState("");

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["leads", search, status],

    queryFn: () => getLeads(search, status),
  });

  const handleSearch = () => {
    setSearch(searchInput);
  };

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

      <LeadsTable leads={data || []} />
    </div>
  );
};

export default LeadsPage;