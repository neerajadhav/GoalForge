import type { Goal } from "@/types/goal";
import { GoalCard } from "./GoalCard";

interface GoalsGridProps {
  goals: Goal[];
}

export function GoalsGrid({ goals }: GoalsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {goals.map((goal) => (
        <GoalCard key={goal.id} goal={goal} />
      ))}
    </div>
  );
}
