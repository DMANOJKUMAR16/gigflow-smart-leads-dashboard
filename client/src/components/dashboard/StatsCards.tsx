import {
  Users,
  UserCheck,
  BadgeCheck,
  TrendingUp,
} from "lucide-react";

import { Card, CardContent } from "../ui/card";

interface Props {
  stats: {
    totalLeads: number;
    contactedLeads: number;
    qualifiedLeads: number;
    wonLeads: number;
  };
}

const StatsCards = ({ stats }: Props) => {
  const cards = [
    {
      title: "Total Leads",
      value: stats.totalLeads,
      icon: Users,
    },
    {
      title: "Contacted",
      value: stats.contactedLeads,
      icon: UserCheck,
    },
    {
      title: "Qualified",
      value: stats.qualifiedLeads,
      icon: BadgeCheck,
    },
    {
      title: "Won Leads",
      value: stats.wonLeads,
      icon: TrendingUp,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <Card
            key={card.title}
            className="shadow-sm border-0"
          >
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  {card.title}
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  {card.value}
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