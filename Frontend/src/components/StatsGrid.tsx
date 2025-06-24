import { AlertCircle, CheckCircle2, Clock, Target } from "lucide-react";

import type { GoalStatsResponse } from "@/types/goal";
import { StatsCard } from "./StatsCard";

interface StatsGridProps {
  stats: GoalStatsResponse['data'] | null;
  loading?: boolean;
}

export function StatsGrid({ stats, loading }: StatsGridProps) {
  if (loading || !stats) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-24 bg-muted/50 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  const statsData = [
    {
      title: "Total Goals",
      value: stats.total_goals,
      icon: Target,
      iconColor: "text-blue-500",
    },
    {
      title: "In Progress",
      value: stats.in_progress_goals,
      icon: Clock,
      iconColor: "text-yellow-500",
    },
    {
      title: "Completed",
      value: stats.completed_goals,
      icon: CheckCircle2,
      iconColor: "text-green-500",
    },
    {
      title: "Overdue",
      value: stats.overdue_goals,
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
