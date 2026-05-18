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
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold">
          Recent Leads
        </h2>
      </div>

      <table className="w-full">
        <thead className="bg-slate-50">
          <tr>
            <th className="text-left p-4">
              Name
            </th>

            <th className="text-left p-4">
              Email
            </th>

            <th className="text-left p-4">
              Company
            </th>

            <th className="text-left p-4">
              Status
            </th>

            <th className="text-left p-4">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {leads.map((lead) => (
            <tr
              key={lead._id}
              className="border-t"
            >
              <td className="p-4">
                {lead.name}
              </td>

              <td className="p-4">
                {lead.email}
              </td>

              <td className="p-4">
                {lead.company}
              </td>

              <td className="p-4">
                <select
                  value={lead.status}
                  onChange={(e) =>
                    onStatusChange(
                      lead._id,
                      e.target.value
                    )
                  }
                  className="border rounded-lg px-3 py-2"
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
                  className="bg-red-500 text-white px-4 py-2 rounded-lg"
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