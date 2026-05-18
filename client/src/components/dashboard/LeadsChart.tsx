import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface Props {
  stats: {
    newLeads: number;
    contactedLeads: number;
    qualifiedLeads: number;
    wonLeads: number;
    lostLeads: number;
  };
}

const LeadsChart = ({ stats }: Props) => {
  const data = [
    {
      name: "New",
      value: stats.newLeads,
    },
    {
      name: "Contacted",
      value: stats.contactedLeads,
    },
    {
      name: "Qualified",
      value: stats.qualifiedLeads,
    },
    {
      name: "Won",
      value: stats.wonLeads,
    },
    {
      name: "Lost",
      value: stats.lostLeads,
    },
  ];

  const COLORS = [
    "#3b82f6",
    "#f59e0b",
    "#8b5cf6",
    "#10b981",
    "#ef4444",
  ];

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-black dark:text-white">
          Lead Analytics
        </h2>

        <p className="text-slate-500 dark:text-slate-300 mt-1">
          Lead status distribution
        </p>
      </div>

      <div className="h-[350px]">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={120}
              label
            >
              {data.map(
                (_entry, index) => (
                  <Cell
                    key={index}
                    fill={
                      COLORS[index]
                    }
                  />
                )
              )}
            </Pie>

            <Tooltip />

            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LeadsChart;