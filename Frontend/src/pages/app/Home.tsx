import { calculateGoalStats, filterGoals } from "@/utils/goalUtils";

import { CreateGoalDialog } from "@/components/CreateGoalDialog";
import { GoalsGrid } from "@/components/GoalsGrid";
import { SearchAndFilters } from "@/components/SearchAndFilters";
import { StatsGrid } from "@/components/StatsGrid";
import { WelcomeHeader } from "@/components/WelcomeHeader";
import { mockGoals } from "@/data/mockGoals";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";

function Goals() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddGoal, setShowAddGoal] = useState(false);

  const { user } = useAuth();

  const goals = mockGoals;
  const stats = calculateGoalStats(goals);
  const filteredGoals = filterGoals(goals, searchTerm);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-4">
        <WelcomeHeader username={user?.username} />

        <StatsGrid stats={stats} />

        <CreateGoalDialog open={showAddGoal} onOpenChange={setShowAddGoal} />

        <hr className="my-6 border-t border-muted" />

        <SearchAndFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onAddGoalClick={() => setShowAddGoal(true)}
        />

        <GoalsGrid goals={filteredGoals} />
      </div>
    </div>
  );
}

export default Goals;
