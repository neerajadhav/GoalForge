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

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Goal Details (1/3 width) */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg">
              <CardHeader className="pb-4">
                <div className="flex flex-col gap-3 mb-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      className={`text-xs ${getPriorityColor(goal.priority)}`}
                    >
                      {goal.priority} priority
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {goal.category}
                    </Badge>
                    <Badge
                      variant="outline"
                      className={`text-xs ${getStatusColor(goal.status)}`}
                    >
                      {goal.status.replace("-", " ")}
                    </Badge>
                  </div>
                </div>

                <CardTitle className="text-xl leading-tight text-card-foreground mb-2">
                  {goal.title}
                </CardTitle>

                <CardDescription className="text-sm leading-relaxed">
                  {goal.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Progress Section */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-foreground">
                      Progress
                    </span>
                    <span className="text-sm font-semibold text-foreground">
                      {goal.progress}%
                    </span>
                  </div>
                  <Progress value={goal.progress} className="h-2" />
                </div>

                <Separator />

                {/* Goal Info */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                      Deadline
                    </h3>
                    <div className="flex items-center text-sm text-foreground">
                      <Calendar className="mr-2 h-3 w-3" />
                      {formatDeadline(goal.deadline)}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                      Created
                    </h3>
                    <p className="text-sm text-foreground">
                      {new Date(goal.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                <Separator />

                {/* Action Buttons */}
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={handleProgressIncrement}
                      disabled={goal.progress >= 100}
                    >
                      <TrendingUp className="mr-1 h-3 w-3" />
                      +10%
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={handleMarkCompleted}
                      disabled={goal.status === "completed"}
                    >
                      <CheckCircle2 className="mr-1 h-3 w-3" />
                      Complete
                    </Button>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
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
                      <Edit className="mr-1 h-3 w-3" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 text-destructive hover:text-destructive"
                      onClick={handleDelete}
                    >
                      <Trash2 className="mr-1 h-3 w-3" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - AI Roadmap Generation (2/3 width) */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg h-full">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm font-bold">AI</span>
                  </div>
                  Generate Roadmap with AI
                </CardTitle>
                <CardDescription>
                  Let AI create a personalized roadmap to help you achieve "
                  {goal.title}"
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* AI Features Preview */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold text-sm mb-2">
                      Smart Milestones
                    </h3>
                    <p className="text-muted-foreground text-xs">
                      Break down your goal into achievable milestones
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold text-sm mb-2">
                      Time Estimates
                    </h3>
                    <p className="text-muted-foreground text-xs">
                      Get realistic time estimates for each step
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold text-sm mb-2">
                      Resource Suggestions
                    </h3>
                    <p className="text-muted-foreground text-xs">
                      Discover tools and resources to help you succeed
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold text-sm mb-2">
                      Progress Tracking
                    </h3>
                    <p className="text-muted-foreground text-xs">
                      Monitor your progress with AI-powered insights
                    </p>
                  </div>
                </div>

                <Separator />

                {/* Roadmap Preview Area */}
                <div className="border-2 border-dashed border-muted-foreground/20 rounded-lg p-8 text-center">
                  <div className="max-w-md mx-auto">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                      <TrendingUp className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">
                      Your AI Roadmap Will Appear Here
                    </h3>
                    <p className="text-muted-foreground text-sm mb-6">
                      Click the button below to generate a personalized roadmap
                      for achieving your goal
                    </p>
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                    >
                      <div className="flex items-center gap-2 text-white">
                        <div className="w-4 h-4 bg-white/20 rounded flex items-center justify-center">
                          <span className="text-white text-xs font-bold">
                            AI
                          </span>
                        </div>
                        Generate Roadmap
                      </div>
                    </Button>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="bg-muted/30 rounded-lg p-4">
                  <h4 className="font-semibold text-sm mb-2">
                    💡 How it works
                  </h4>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>
                      • AI analyzes your goal details and current progress
                    </li>
                    <li>
                      • Creates a step-by-step roadmap tailored to your timeline
                    </li>
                    <li>• Suggests resources, tools, and best practices</li>
                    <li>• Provides milestone tracking and progress insights</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GoalDetails;
