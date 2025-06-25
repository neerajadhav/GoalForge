import type { Roadmap, RoadmapCreate, RoadmapStep, RoadmapUpdate } from '../types/roadmap';

import { httpClient } from './httpClient';

class RoadmapService {
  private readonly baseUrl = '/roadmaps';

  async getRoadmapByGoal(goalId: number): Promise<Roadmap> {
    const response = await httpClient.get<Roadmap>(`${this.baseUrl}/goal/${goalId}`);
    return response.data;
  }

  async getRoadmap(roadmapId: number): Promise<Roadmap> {
    const response = await httpClient.get<Roadmap>(`${this.baseUrl}/${roadmapId}`);
    return response.data;
  }

  async createRoadmap(goalId: number, data: RoadmapCreate): Promise<Roadmap> {
    const response = await httpClient.post<Roadmap>(`${this.baseUrl}/goal/${goalId}`, data);
    return response.data;
  }

  async updateRoadmap(roadmapId: number, data: RoadmapUpdate): Promise<Roadmap> {
    const response = await httpClient.put<Roadmap>(`${this.baseUrl}/${roadmapId}`, data);
    return response.data;
  }

  async deleteRoadmap(roadmapId: number): Promise<void> {
    await httpClient.delete(`${this.baseUrl}/${roadmapId}`);
  }

  async getSteps(roadmapId: number): Promise<RoadmapStep[]> {
    const response = await httpClient.get<RoadmapStep[]>(`${this.baseUrl}/${roadmapId}/steps`);
    return response.data;
  }

  async createStep(roadmapId: number, step: Omit<RoadmapStep, 'id' | 'roadmap_id' | 'created_at' | 'updated_at'>): Promise<RoadmapStep> {
    const response = await httpClient.post<RoadmapStep>(`${this.baseUrl}/${roadmapId}/steps`, step);
    return response.data;
  }

  async updateStep(stepId: number, step: Partial<RoadmapStep>): Promise<RoadmapStep> {
    const response = await httpClient.put<RoadmapStep>(`${this.baseUrl}/steps/${stepId}`, step);
    return response.data;
  }

  async toggleStepCompletion(stepId: number): Promise<RoadmapStep> {
    const response = await httpClient.patch<RoadmapStep>(`${this.baseUrl}/steps/${stepId}/toggle`);
    return response.data;
  }

  async deleteStep(stepId: number): Promise<void> {
    await httpClient.delete(`${this.baseUrl}/steps/${stepId}`);
  }
}

export const roadmapService = new RoadmapService();
export default roadmapService;
