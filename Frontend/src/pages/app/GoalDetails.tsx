import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Edit,
  Trash2,
  TrendingUp,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  formatDeadline,
  getPriorityColor,
  getStatusColor,
} from "@/utils/goalUtils";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Goal } from "@/types/goal";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { goalsService } from "@/services/goalsService";
import { useToast } from "@/contexts/ToastContext";

function GoalDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [goal, setGoal] = useState<Goal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

    fetchGoal();
  }, [id, addToast]);

  const handleProgressIncrement = async () => {
    if (!goal || goal.progress >= 100) return;

    try {
      const newProgress = Math.min(goal.progress + 10, 100);
      const response = await goalsService.updateGoalProgress(
        goal.id,
        newProgress
      );
      setGoal(response.data);
      addToast({ message: "Progress updated successfully", type: "success" });
    } catch (err: any) {
      const errorMessage = err.message || "Failed to update progress";
      addToast({ message: errorMessage, type: "error" });
    }
  };

  const handleMarkCompleted = async () => {
    if (!goal || goal.status === "completed") return;

    try {
      const response = await goalsService.updateGoalStatus(
        goal.id,
        "completed"
      );
      setGoal(response.data);
      addToast({ message: "Goal marked as completed!", type: "success" });
    } catch (err: any) {
      const errorMessage = err.message || "Failed to update status";
      addToast({ message: errorMessage, type: "error" });
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
                  The goal you're looking for doesn't exist or you don't have
                  permission to view it.
                </p>
                <Button onClick={() => navigate("/app")}>
                  Go back to Goals
                </Button>
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

        {/* Goal Details Card */}
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-lg">
            <CardHeader className="pb-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-3">
                  <Badge
                    className={`text-sm ${getPriorityColor(goal.priority)}`}
                  >
                    {goal.priority} priority
                  </Badge>
                  <Badge variant="outline" className="text-sm">
                    {goal.category}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={`text-sm ${getStatusColor(goal.status)}`}
                  >
                    {goal.status.replace("-", " ")}
                  </Badge>
                </div>
              </div>

              <CardTitle className="text-2xl leading-tight text-card-foreground mb-3">
                {goal.title}
              </CardTitle>

              <CardDescription className="text-base leading-relaxed">
                {goal.description}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Progress Section */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-lg font-medium text-foreground">
                    Progress
                  </span>
                  <span className="text-lg font-semibold text-foreground">
                    {goal.progress}%
                  </span>
                </div>
                <Progress value={goal.progress} className="h-3" />
              </div>

              <Separator />

              {/* Goal Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-2">
                      Deadline
                    </h3>
                    <div className="flex items-center text-base text-foreground">
                      <Calendar className="mr-2 h-4 w-4" />
                      {formatDeadline(goal.deadline)}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-2">
                      Created
                    </h3>
                    <p className="text-base text-foreground">
                      {new Date(goal.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex gap-3 flex-1">
                  <Button
                    size="default"
                    variant="outline"
                    className="flex-1"
                    onClick={handleProgressIncrement}
                    disabled={goal.progress >= 100}
                  >
                    <TrendingUp className="mr-2 h-4 w-4" />
                    +10%
                  </Button>
                  <Button
                    size="default"
                    variant="outline"
                    className="flex-1"
                    onClick={handleMarkCompleted}
                    disabled={goal.status === "completed"}
                  >
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Complete
                  </Button>
                </div>

                <div className="flex gap-3">
                  <Button
                    size="default"
                    variant="outline"
                    onClick={() => {
                      // TODO: Implement edit functionality
                      addToast({
                        message: "Edit functionality coming soon!",
                        type: "info",
                      });
                    }}
                    className="flex-1"
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                  <Button
                    size="default"
                    variant="outline"
                    className="flex-1 text-destructive hover:text-destructive"
                    onClick={handleDelete}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default GoalDetails;
