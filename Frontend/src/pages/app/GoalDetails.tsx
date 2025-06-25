import {
  Card,
  CardContent
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Goal } from "@/types/goal";
import { GoalInfoCard } from '@/components/GoalInfoCard';
import type { Roadmap } from '@/types/roadmap';
import { RoadmapStepsCard } from '@/components/RoadmapStepsCard';
import { calculateRoadmapProgress } from "@/utils/roadmapUtils";
import { goalsService } from "@/services/goalsService";
import { roadmapService } from '@/services/roadmapService';
import { useToast } from "@/contexts/ToastContext";

function GoalDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [goal, setGoal] = useState<Goal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
  const [roadmapLoading, setRoadmapLoading] = useState(false);
  const [roadmapError, setRoadmapError] = useState<string | null>(null);

  // Add roadmap step CRUD state
  const [stepLoading, setStepLoading] = useState<number | null>(null);
  const [stepEditId, setStepEditId] = useState<number | null>(null);
  const [stepEditTitle, setStepEditTitle] = useState<string>("");
  const [newStepTitle, setNewStepTitle] = useState("");

  useEffect(() => {
    const fetchGoal = async () => {
      if (!id) {
        setError("Goal ID is required");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const response = await goalsService.getGoal(parseInt(id));
        setGoal(response.data);
      } catch (err: any) {
        const errorMessage = err.message || "Failed to fetch goal details";
        setError(errorMessage);
        addToast({ message: errorMessage, type: "error" });
      } finally {
        setLoading(false);
      }
    };

    const fetchRoadmap = async () => {
      if (!id) return;
      setRoadmapLoading(true);
      setRoadmapError(null);
      try {
        const roadmapData = await roadmapService.getRoadmapByGoal(parseInt(id));
        setRoadmap(roadmapData);
      } catch (err: any) {
        setRoadmapError(err.message || 'No roadmap found for this goal.');
      } finally {
        setRoadmapLoading(false);
      }
    };

    fetchGoal();
    fetchRoadmap();
  }, [id]);

  // Helper to sync goal status with roadmap progress
  const syncGoalStatusWithProgress = async (roadmapData: Roadmap) => {
    if (!goal) return;
    const progress = calculateRoadmapProgress(roadmapData);
    // Only update if there are steps in the roadmap
    if (roadmapData.steps.length === 0) return;
    if (progress === 100 && goal.status !== "completed") {
      try {
        const response = await goalsService.updateGoalStatus(goal.id, "completed");
        setGoal(response.data);
        addToast({ message: "Goal marked as completed!", type: "success" });
      } catch (err: any) {
        addToast({ message: err.message || "Failed to update goal status", type: "error" });
      }
    } else if (progress < 100 && goal.status === "completed") {
      try {
        const response = await goalsService.updateGoalStatus(goal.id, "in-progress");
        setGoal(response.data);
        addToast({ message: "Goal marked as in-progress.", type: "info" });
      } catch (err: any) {
        addToast({ message: err.message || "Failed to update goal status", type: "error" });
      }
    }
  };

  const handleDelete = async () => {
    if (!goal) return;

    if (window.confirm("Are you sure you want to delete this goal?")) {
      try {
        await goalsService.deleteGoal(goal.id);
        addToast({ message: "Goal deleted successfully", type: "success" });
        navigate("/app");
      } catch (err: any) {
        const errorMessage = err.message || "Failed to delete goal";
        addToast({ message: errorMessage, type: "error" });
      }
    }
  };

  // CRUD handlers for roadmap steps
  const handleToggleStep = async (stepId: number, isCompleted: boolean) => {
    if (!roadmap) return;
    setStepLoading(stepId);
    try {
      await roadmapService.updateStep(stepId, { is_completed: !isCompleted });
      const roadmapData = await roadmapService.getRoadmapByGoal(Number(id));
      setRoadmap(roadmapData);
      await syncGoalStatusWithProgress(roadmapData);
    } catch (err: any) {
      addToast({ message: err.message || "Failed to update step", type: "error" });
    } finally {
      setStepLoading(null);
    }
  };

  const handleDeleteStep = async (stepId: number) => {
    if (!roadmap) return;
    setStepLoading(stepId);
    try {
      await roadmapService.deleteStep(stepId);
      const roadmapData = await roadmapService.getRoadmapByGoal(Number(id));
      setRoadmap(roadmapData);
      addToast({ message: "Step deleted", type: "success" });
      await syncGoalStatusWithProgress(roadmapData);
    } catch (err: any) {
      console.error('Delete step error:', err);
      addToast({ message: err.message || "Failed to delete step", type: "error" });
    } finally {
      setStepLoading(null);
    }
  };

  const handleEditStep = (stepId: number, currentTitle: string) => {
    setStepEditId(stepId);
    setStepEditTitle(currentTitle);
  };

  const handleSaveStep = async (stepId: number) => {
    if (!stepEditTitle.trim()) return;
    setStepLoading(stepId);
    try {
      await roadmapService.updateStep(stepId, { title: stepEditTitle });
      const roadmapData = await roadmapService.getRoadmapByGoal(Number(id));
      setRoadmap(roadmapData);
      setStepEditId(null);
      setStepEditTitle("");
      addToast({ message: "Step updated", type: "success" });
      await syncGoalStatusWithProgress(roadmapData);
    } catch (err: any) {
      addToast({ message: err.message || "Failed to update step", type: "error" });
    } finally {
      setStepLoading(null);
    }
  };

  const handleAddStep = async () => {
    if (!roadmap || !newStepTitle.trim()) return;
    setStepLoading(-1);
    try {
      await roadmapService.createStep(roadmap.id, { title: newStepTitle, is_completed: false, order_index: roadmap.steps.length });
      const roadmapData = await roadmapService.getRoadmapByGoal(Number(id));
      setRoadmap(roadmapData);
      setNewStepTitle("");
      addToast({ message: "Step added", type: "success" });
      await syncGoalStatusWithProgress(roadmapData);
    } catch (err: any) {
      addToast({ message: err.message || "Failed to add step", type: "error" });
    } finally {
      setStepLoading(null);
    }
  };

  const handleAddRoadmap = async () => {
    if (!id) return;
    setRoadmapLoading(true);
    setRoadmapError(null);
    try {
      // Create a blank roadmap (title must be at least 1 character)
      const newRoadmap = await roadmapService.createRoadmap(Number(id), { title: "My Roadmap", description: "", steps: [] });
      setRoadmap(newRoadmap);
      addToast({ message: "Blank roadmap created!", type: "success" });
    } catch (err: any) {
      setRoadmapError(err.message || "Failed to create roadmap");
      addToast({ message: err.message || "Failed to create roadmap", type: "error" });
    } finally {
      setRoadmapLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center space-x-4 mb-6">
            <Button variant="ghost" size="sm" onClick={() => navigate("/app")}> 
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Goals
            </Button>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="h-96 bg-muted/50 rounded-lg animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !goal) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center space-x-4 mb-6">
            <Button variant="ghost" size="sm" onClick={() => navigate("/app")}> 
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Goals
            </Button>
          </div>
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="py-12 text-center">
                <h2 className="text-xl font-semibold text-foreground mb-2">
                  {error || "Goal not found"}
                </h2>
                <p className="text-muted-foreground mb-4">
                  The goal you're looking for doesn't exist or you don't have permission to view it.
                </p>
                <Button onClick={() => navigate("/app")}>Go back to Goals</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-4">
        {/* Header with back button */}
        <div className="flex items-center space-x-4 mb-4">
          <Button variant="ghost" size="sm" onClick={() => navigate("/app")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Goals
          </Button>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Goal Details (1/3 width) */}
          <div className="lg:col-span-1">
            {goal && (
              <GoalInfoCard
                goal={goal}
                setGoal={setGoal}
                onDelete={handleDelete}
                addToast={(toast) => addToast({ ...toast, type: toast.type as 'error' | 'success' | 'warning' | 'info' })}
              />
            )}
          </div>

          {/* Right Column - Roadmap Details (2/3 width) */}
          <div className="lg:col-span-2">
            <RoadmapStepsCard
              roadmap={roadmap}
              roadmapLoading={roadmapLoading}
              roadmapError={roadmapError}
              stepLoading={stepLoading}
              stepEditId={stepEditId}
              stepEditTitle={stepEditTitle}
              newStepTitle={newStepTitle}
              onToggleStep={handleToggleStep}
              onEditStep={handleEditStep}
              onSaveStep={handleSaveStep}
              onDeleteStep={handleDeleteStep}
              onAddStep={handleAddStep}
              onAddRoadmap={handleAddRoadmap}
              setStepEditTitle={setStepEditTitle}
              setStepEditId={setStepEditId}
              setNewStepTitle={setNewStepTitle}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default GoalDetails;
