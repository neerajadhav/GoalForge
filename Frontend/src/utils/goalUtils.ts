import type { Goal, GoalStats } from "@/types/goal";

export function calculateGoalStats(goals: Goal[]): GoalStats {
  return {
    total: goals.length,
    inProgress: goals.filter((g) => g.status === "in-progress").length,
    onTrack: goals.filter((g) => g.status === "on-track").length,
    atRisk: goals.filter((g) => g.status === "overdue").length,
  };
}

// Convert backend stats to frontend format
export function convertBackendStats(backendStats: {
  total_goals: number;
  completed_goals: number;
  in_progress_goals: number;
  overdue_goals: number;
  average_progress: number;
}): GoalStats {
  return {
    total: backendStats.total_goals,
    inProgress: backendStats.in_progress_goals,
    onTrack: backendStats.completed_goals,
    atRisk: backendStats.overdue_goals,
  };
}

export function filterGoals(goals: Goal[], searchTerm: string): Goal[] {
  return goals.filter(
    (goal) =>
      goal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      goal.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      goal.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
}

// Helper function to format goal deadline
export function formatDeadline(deadline: string): string {
  const date = new Date(deadline);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

// Helper function to determine if goal is overdue
export function isGoalOverdue(deadline: string): boolean {
  const deadlineDate = new Date(deadline);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return deadlineDate < today;
}

// Helper function to get priority color
export function getPriorityColor(priority: Goal['priority']): string {
  switch (priority) {
    case 'high':
      return 'text-red-600 bg-red-50';
    case 'medium':
      return 'text-yellow-600 bg-yellow-50';
    case 'low':
      return 'text-green-600 bg-green-50';
    default:
      return 'text-gray-600 bg-gray-50';
  }
}

// Helper function to get status color
export function getStatusColor(status: Goal['status']): string {
  switch (status) {
    case 'completed':
      return 'text-green-600 bg-green-50';
    case 'on-track':
      return 'text-blue-600 bg-blue-50';
    case 'in-progress':
      return 'text-yellow-600 bg-yellow-50';
    case 'overdue':
      return 'text-red-600 bg-red-50';
    case 'paused':
      return 'text-gray-600 bg-gray-50';
    default:
      return 'text-gray-600 bg-gray-50';
  }
}
