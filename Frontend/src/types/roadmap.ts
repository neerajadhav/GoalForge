export interface RoadmapStep {
  id: number;
  roadmap_id: number;
  title: string;
  description?: string;
  is_completed: boolean;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface Roadmap {
  id: number;
  goal_id: number;
  title: string;
  description?: string;
  progress_percentage: number;
  steps: RoadmapStep[];
  created_at: string;
  updated_at: string;
}

export interface RoadmapCreate {
  title: string;
  description?: string;
  steps?: Omit<RoadmapStep, 'id' | 'roadmap_id' | 'created_at' | 'updated_at'>[];
}

export interface RoadmapUpdate {
  title?: string;
  description?: string;
}
