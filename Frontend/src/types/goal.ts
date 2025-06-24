export interface Goal {
  id: number;
  title: string;
  description: string;
  progress: number;
  status: 'completed' | 'on-track' | 'in-progress' | 'overdue' | 'paused';
  category: string;
  deadline: string;
  priority: 'high' | 'medium' | 'low';
  created_at: string;
  updated_at: string;
}

export interface CreateGoalRequest {
  title: string;
  description: string;
  progress?: number;
  status?: Goal['status'];
  category: string;
  deadline?: string;
  priority: Goal['priority'];
}

export interface UpdateGoalRequest {
  title?: string;
  description?: string;
  progress?: number;
  status?: Goal['status'];
  category?: string;
  deadline?: string;
  priority?: Goal['priority'];
}

export interface GoalStats {
  total: number;
  inProgress: number;
  onTrack: number;
  atRisk: number;
}

export interface GoalListResponse {
  data: Goal[];
  total: number;
  page: number;
  page_size: number;
  message: string;
}

export interface GoalResponse {
  data: Goal;
  message: string;
}

export interface GoalStatsResponse {
  data: {
    total_goals: number;
    completed_goals: number;
    in_progress_goals: number;
    overdue_goals: number;
    average_progress: number;
  };
  message: string;
}

export interface GoalFilters {
  page?: number;
  page_size?: number;
  category?: string;
  status?: Goal['status'];
  priority?: Goal['priority'];
  search?: string;
}
