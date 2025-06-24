import type { Goal } from "@/types/goal";
import { GoalCard } from "./GoalCard";
import { memo } from "react";

interface GoalsGridProps {
  goals: Goal[];
  loading?: boolean;
  onUpdateProgress?: (id: number, progress: number) => void;
  onUpdateStatus?: (id: number, status: Goal['status']) => void;
  onDelete?: (id: number) => void;
}

export const GoalsGrid = memo(function GoalsGrid({ 
  goals, 
  loading, 
  onUpdateProgress, 
  onUpdateStatus, 
  onDelete 
}: GoalsGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-80 bg-muted/50 rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  if (goals.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-muted-foreground text-lg mb-2">No goals yet</div>
        <div className="text-muted-foreground text-sm">
          Create your first goal to get started on your journey!
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {goals.map((goal) => (
        <GoalCard 
          key={goal.id} 
          goal={goal} 
          onUpdateProgress={onUpdateProgress}
          onUpdateStatus={onUpdateStatus}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
});
