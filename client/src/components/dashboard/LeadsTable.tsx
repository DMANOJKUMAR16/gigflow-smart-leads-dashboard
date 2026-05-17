interface Lead {
  _id: string;
  name: string;
  email: string;
  company: string;
  status: string;
}

interface Props {
  leads: Lead[];
}

const LeadsTable = ({ leads }: Props) => {
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
            <th className="text-left p-4">Name</th>
            <th className="text-left p-4">Email</th>
            <th className="text-left p-4">Company</th>
            <th className="text-left p-4">Status</th>
          </tr>
        </thead>

        <tbody>
          {leads.map((lead) => (
            <tr
              key={lead._id}
              className="border-t"
            >
              <td className="p-4">{lead.name}</td>

              <td className="p-4">{lead.email}</td>

              <td className="p-4">{lead.company}</td>

              <td className="p-4">
                <span className="px-3 py-1 rounded-full text-sm bg-slate-100">
                  {lead.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeadsTable;