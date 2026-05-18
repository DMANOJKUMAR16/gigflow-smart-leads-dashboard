interface Lead {
  _id: string;
  name: string;
  email: string;
  company: string;
  status: string;
}

interface Props {
  leads: Lead[];

  onStatusChange: (
    leadId: string,
    status: string
  ) => void;

  onDelete: (
    leadId: string
  ) => void;
}

const LeadsTable = ({
  leads,
  onStatusChange,
  onDelete,
}: Props) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow overflow-hidden">
      <div className="p-6 border-b dark:border-slate-700">
        <h2 className="text-xl font-semibold text-black dark:text-white">
          Recent Leads
        </h2>
      </div>

      <table className="w-full">
        <thead className="bg-slate-50 dark:bg-slate-700">
          <tr>
            <th className="text-left p-4 text-black dark:text-white">
              Name
            </th>

            <th className="text-left p-4 text-black dark:text-white">
              Email
            </th>

            <th className="text-left p-4 text-black dark:text-white">
              Company
            </th>

            <th className="text-left p-4 text-black dark:text-white">
              Status
            </th>

            <th className="text-left p-4 text-black dark:text-white">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {leads.map((lead) => (
            <tr
              key={lead._id}
              className="border-t dark:border-slate-700"
            >
              <td className="p-4 text-black dark:text-white">
                {lead.name}
              </td>

              <td className="p-4 text-black dark:text-white">
                {lead.email}
              </td>

              <td className="p-4 text-black dark:text-white">
                {lead.company}
              </td>

              <td className="p-4 text-black dark:text-white">
                <select
                  value={lead.status}
                  onChange={(e) =>
                    onStatusChange(
                      lead._id,
                      e.target.value
                    )
                  }
                  className="border dark:border-slate-600 bg-white dark:bg-slate-700 text-black dark:text-white rounded-lg px-3 py-2"
                >
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

                  <option value="lost">
                    Lost
                  </option>
                </select>
              </td>

              <td className="p-4">
                <button
                  onClick={() =>
                    onDelete(lead._id)
                  }
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeadsTable;