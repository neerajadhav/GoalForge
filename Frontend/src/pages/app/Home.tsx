import type { Goal, GoalFilters } from "@/types/goal";
import { useGoalStats, useGoals } from "../../hooks/useGoals";

import { CreateGoalDialog } from "@/components/CreateGoalDialog";
import { GoalsGrid } from "@/components/GoalsGrid";
import { SearchAndFilters } from "@/components/SearchAndFilters";
import { StatsGrid } from "@/components/StatsGrid";
import { WelcomeHeader } from "@/components/WelcomeHeader";
import { useAuth } from "../../contexts/AuthContext";
import { useDebounce } from "../../hooks/useDebounce";
import { useState } from "react";

function Goals() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [filters, setFilters] = useState<GoalFilters>({});
  
  // Debounce search term to prevent too many API calls
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const { user } = useAuth();
  const { 
    goals, 
    isInitialLoading, 
    createGoal, 
    deleteGoal, 
    updateGoalProgress, 
    updateGoalStatus 
  } = useGoals({ ...filters, search: debouncedSearchTerm });
  const { stats, loading: statsLoading } = useGoalStats();

  const handleCreateGoal = async (goalData: any) => {
    await createGoal(goalData);
  };

  const handleEditGoal = (goal: Goal) => {
    // TODO: Implement edit functionality
    console.log('Edit goal:', goal);
  };

  const handleDeleteGoal = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this goal?')) {
      await deleteGoal(id);
    }
  };

  const handleFiltersChange = (newFilters: GoalFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-4">
        <WelcomeHeader username={user?.username} />

        <StatsGrid stats={stats} loading={statsLoading} />

        <CreateGoalDialog 
          open={showAddGoal} 
          onOpenChange={setShowAddGoal}
          onCreateGoal={handleCreateGoal}
        />

        <hr className="my-6 border-t border-muted" />

        <SearchAndFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onAddGoalClick={() => setShowAddGoal(true)}
          filters={filters}
          onFiltersChange={handleFiltersChange}
        />

        <GoalsGrid 
          goals={goals} 
          loading={isInitialLoading}
          onUpdateProgress={updateGoalProgress}
          onUpdateStatus={updateGoalStatus}
          onEdit={handleEditGoal}
          onDelete={handleDeleteGoal}
        />
      </div>
    </div>
  );
}

export default Goals;
