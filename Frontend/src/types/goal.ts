export interface Goal {
  id: number;
  title: string;
  description: string;
  progress: number;
  status: 'completed' | 'on-track' | 'in-progress' | 'at-risk';
  category: string;
  deadline: string;
  priority: 'high' | 'medium' | 'low';
}

export interface GoalStats {
  total: number;
  inProgress: number;
  onTrack: number;
  atRisk: number;
}
