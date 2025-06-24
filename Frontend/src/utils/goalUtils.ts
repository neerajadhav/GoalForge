import type { Goal, GoalStats } from "@/types/goal";

export function calculateGoalStats(goals: Goal[]): GoalStats {
  return {
    total: goals.length,
    inProgress: goals.filter((g) => g.status === "in-progress").length,
    onTrack: goals.filter((g) => g.status === "on-track").length,
    atRisk: goals.filter((g) => g.status === "at-risk").length,
  };
}

export function filterGoals(goals: Goal[], searchTerm: string): Goal[] {
  return goals.filter(
    (goal) =>
      goal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      goal.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
}
