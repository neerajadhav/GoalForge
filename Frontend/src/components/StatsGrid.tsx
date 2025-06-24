import { AlertCircle, Clock, Target, TrendingUp } from "lucide-react";

import type { GoalStats } from "@/types/goal";
import { StatsCard } from "./StatsCard";

interface StatsGridProps {
  stats: GoalStats;
}

export function StatsGrid({ stats }: StatsGridProps) {
  const statsData = [
    {
      title: "Total Goals",
      value: stats.total,
      icon: Target,
      iconColor: "text-blue-500",
    },
    {
      title: "In Progress",
      value: stats.inProgress,
      icon: Clock,
      iconColor: "text-yellow-500",
    },
    {
      title: "On Track",
      value: stats.onTrack,
      icon: TrendingUp,
      iconColor: "text-green-500",
    },
    {
      title: "At Risk",
      value: stats.atRisk,
      icon: AlertCircle,
      iconColor: "text-red-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {statsData.map((stat) => (
        <StatsCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          iconColor={stat.iconColor}
        />
      ))}
    </div>
  );
}
