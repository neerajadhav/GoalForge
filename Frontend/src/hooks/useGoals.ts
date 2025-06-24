import type {
  CreateGoalRequest,
  Goal,
  GoalFilters,
  GoalStatsResponse,
  UpdateGoalRequest
} from '../types/goal';
import { useCallback, useEffect, useRef, useState } from 'react';

import { goalsService } from '../services/goalsService';
import { useToast } from '../contexts/ToastContext';

export function useGoals(filters?: GoalFilters) {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { addToast } = useToast();
  
  // Track if this is the initial load to avoid showing loading spinner on filter changes
  const isInitialLoad = useRef(true);
  const filtersStringRef = useRef<string>('');

  const fetchGoals = useCallback(async (showLoading = true) => {
    try {
      if (showLoading) {
        setLoading(true);
      }
      setError(null);
      
      const response = await goalsService.getGoals(filters);
      setGoals(response.data);
      setTotal(response.total);
      setPage(response.page);
      setPageSize(response.page_size);
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch goals';
      setError(errorMessage);
      addToast({ message: errorMessage, type: 'error' });
    } finally {
      if (showLoading) {
        setLoading(false);
      }
      isInitialLoad.current = false;
    }
  }, [filters, addToast]);

  const createGoal = useCallback(async (goalData: CreateGoalRequest) => {
    try {
      const response = await goalsService.createGoal(goalData);
      setGoals(prev => [response.data, ...prev]);
      addToast({ message: response.message || 'Goal created successfully', type: 'success' });
      return response.data;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to create goal';
      addToast({ message: errorMessage, type: 'error' });
      throw err;
    }
  }, [addToast]);

  const updateGoal = useCallback(async (id: number, goalData: UpdateGoalRequest) => {
    try {
      const response = await goalsService.updateGoal(id, goalData);
      setGoals(prev => prev.map(goal => 
        goal.id === id ? response.data : goal
      ));
      addToast({ message: response.message || 'Goal updated successfully', type: 'success' });
      return response.data;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to update goal';
      addToast({ message: errorMessage, type: 'error' });
      throw err;
    }
  }, [addToast]);

  const deleteGoal = useCallback(async (id: number) => {
    try {
      const response = await goalsService.deleteGoal(id);
      setGoals(prev => prev.filter(goal => goal.id !== id));
      addToast({ message: response.message || 'Goal deleted successfully', type: 'success' });
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to delete goal';
      addToast({ message: errorMessage, type: 'error' });
      throw err;
    }
  }, [addToast]);

  const updateGoalProgress = useCallback(async (id: number, progress: number) => {
    try {
      const response = await goalsService.updateGoalProgress(id, progress);
      setGoals(prev => prev.map(goal => 
        goal.id === id ? response.data : goal
      ));
      addToast({ message: 'Progress updated successfully', type: 'success' });
      return response.data;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to update progress';
      addToast({ message: errorMessage, type: 'error' });
      throw err;
    }
  }, [addToast]);

  const updateGoalStatus = useCallback(async (id: number, status: Goal['status']) => {
    try {
      const response = await goalsService.updateGoalStatus(id, status);
      setGoals(prev => prev.map(goal => 
        goal.id === id ? response.data : goal
      ));
      addToast({ message: 'Status updated successfully', type: 'success' });
      return response.data;
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to update status';
      addToast({ message: errorMessage, type: 'error' });
      throw err;
    }
  }, [addToast]);

  const refreshGoals = useCallback(() => {
    fetchGoals(true); // Always show loading when manually refreshing
  }, [fetchGoals]);

  // Fetch goals when filters change
  useEffect(() => {
    const filtersString = JSON.stringify(filters || {});
    if (filtersStringRef.current !== filtersString) {
      filtersStringRef.current = filtersString;
      // Show loading only on initial load, not on filter changes
      fetchGoals(isInitialLoad.current);
    }
  }, [filters, fetchGoals]);

  return {
    goals,
    loading: loading && isInitialLoad.current, // Only show loading on initial load
    isInitialLoading: loading && isInitialLoad.current,
    isRefreshing: loading && !isInitialLoad.current,
    error,
    total,
    page,
    pageSize,
    createGoal,
    updateGoal,
    deleteGoal,
    updateGoalProgress,
    updateGoalStatus,
    refreshGoals,
    fetchGoals: () => fetchGoals(true)
  };
}

export function useGoalStats() {
  const [stats, setStats] = useState<GoalStatsResponse['data'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToast } = useToast();

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await goalsService.getGoalStats();
      setStats(response.data);
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch goal statistics';
      setError(errorMessage);
      addToast({ message: errorMessage, type: 'error' });
    } finally {
      setLoading(false);
    }
  }, [addToast]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return {
    stats,
    loading,
    error,
    refreshStats: fetchStats
  };
}
