import {
  Users,
  UserCheck,
  BadgeCheck,
  TrendingUp,
} from "lucide-react";

import { Card, CardContent } from "../ui/card";
const stats = [
  {
    title: "Total Leads",
    value: "128",
    icon: Users,
  },
  {
    title: "Contacted",
    value: "64",
    icon: UserCheck,
  },
  {
    title: "Qualified",
    value: "32",
    icon: BadgeCheck,
  },
  {
    title: "Conversion Rate",
    value: "24%",
    icon: TrendingUp,
  },
];

const StatsCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <Card
            key={stat.title}
            className="shadow-sm border-0"
          >
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  {stat.title}
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  {stat.value}
                </h2>
              </div>

              <div className="bg-slate-100 p-3 rounded-xl">
                <Icon className="w-6 h-6" />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default StatsCards;