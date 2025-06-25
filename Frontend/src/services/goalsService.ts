import type {
  CreateGoalRequest,
  Goal,
  GoalFilters,
  GoalListResponse,
  GoalResponse,
  GoalStatsResponse,
  UpdateGoalRequest
} from '../types/goal';

import { httpClient } from './httpClient';

class GoalsService {
  private readonly baseUrl = '/api/goals';

  async getGoals(filters?: GoalFilters): Promise<GoalListResponse> {
    const params = new URLSearchParams();
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          params.append(key, String(value));
        }
      });
    }
    
    const query = params.toString();
    const endpoint = query ? `${this.baseUrl}?${query}` : this.baseUrl;
    
    const response = await httpClient.get<GoalListResponse>(endpoint);
    return response.data;
  }

  async getGoal(id: number): Promise<GoalResponse> {
    const response = await httpClient.get<GoalResponse>(`${this.baseUrl}/${id}`);
    return response.data;
  }

  async createGoal(goalData: CreateGoalRequest): Promise<GoalResponse> {
    const response = await httpClient.post<GoalResponse>(this.baseUrl, goalData);
    return response.data;
  }

  async updateGoal(id: number, goalData: UpdateGoalRequest): Promise<GoalResponse> {
    const response = await httpClient.put<GoalResponse>(`${this.baseUrl}/${id}`, goalData);
    return response.data;
  }

  async deleteGoal(id: number): Promise<{ message: string }> {
    const response = await httpClient.delete<{ message: string }>(`${this.baseUrl}/${id}`);
    return response.data;
  }

  async updateGoalStatus(id: number, status: Goal['status']): Promise<GoalResponse> {
    const response = await httpClient.patch<GoalResponse>(
      `${this.baseUrl}/${id}/status?status=${status}`
    );
    return response.data;
  }

  async getGoalStats(): Promise<GoalStatsResponse> {
    const response = await httpClient.get<GoalStatsResponse>(`${this.baseUrl}/stats`);
    return response.data;
  }
}

export const goalsService = new GoalsService();
export default goalsService;
