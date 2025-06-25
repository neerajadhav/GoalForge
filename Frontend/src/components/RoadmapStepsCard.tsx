import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle2, Edit, PlusCircle, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { Roadmap } from "@/types/roadmap";
import { calculateRoadmapProgress } from "@/utils/roadmapUtils";

interface RoadmapStepsCardProps {
  roadmap: Roadmap | null;
  roadmapLoading: boolean;
  roadmapError: string | null;
  stepLoading: number | null;
  stepEditId: number | null;
  stepEditTitle: string;
  newStepTitle: string;
  onToggleStep: (stepId: number, isCompleted: boolean) => void;
  onEditStep: (stepId: number, currentTitle: string) => void;
  onSaveStep: (stepId: number) => void;
  onDeleteStep: (stepId: number) => void;
  onAddStep: () => void;
  onAddRoadmap: () => void;
  setStepEditTitle: (title: string) => void;
  setStepEditId: (id: number | null) => void;
  setNewStepTitle: (title: string) => void;
}

export function RoadmapStepsCard({
  roadmap,
  roadmapLoading,
  roadmapError,
  stepLoading,
  stepEditId,
  stepEditTitle,
  newStepTitle,
  onToggleStep,
  onEditStep,
  onSaveStep,
  onDeleteStep,
  onAddStep,
  onAddRoadmap,
  setStepEditTitle,
  setStepEditId,
  setNewStepTitle,
}: RoadmapStepsCardProps) {
  return (
    <Card className="h-full shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-blue-500" /> Goal Roadmap
        </CardTitle>
        <CardDescription className="text-sm">
          Organize, track, and manage steps for achieving your goal.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {roadmapLoading ? (
          <p className="text-muted-foreground text-sm">Loading roadmap...</p>
        ) : roadmapError ? (
          <div className="space-y-3">
            <p className="text-destructive text-sm">{roadmapError}</p>
            <Button
              onClick={onAddRoadmap}
              size="sm"
              disabled={stepLoading === -1}
            >
              Create Roadmap
            </Button>
          </div>
        ) : roadmap ? (
          <div className="space-y-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-foreground">
                  {calculateRoadmapProgress(roadmap)}%
                </span>
                <span className="text-xs text-muted-foreground">completed</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${calculateRoadmapProgress(roadmap)}%` }}
                />
              </div>
            </div>

            <div className="space-y-3">
              {roadmap.steps.map((step, index) => (
                <div
                  key={step.id}
                  className="flex items-start justify-between p-3 rounded-md border bg-muted/50 cursor-pointer hover:bg-muted"
                  onClick={(e) => {
                    // Prevent toggle if clicking on a button or when editing
                    if (
                      stepEditId === step.id ||
                      (e.target instanceof HTMLElement &&
                        (e.target.closest("button") ||
                          e.target.tagName === "INPUT"))
                    ) {
                      return;
                    }
                    onToggleStep(step.id, step.is_completed);
                  }}
                >
                  <div className="flex items-center gap-3 w-full">
                    {/* <input
                      type="checkbox"
                      checked={step.is_completed}
                      disabled={stepLoading === step.id}
                      onChange={() => onToggleStep(step.id, step.is_completed)}
                      className="mt-1 accent-blue-500"
                      onClick={(e) => e.stopPropagation()} // Prevent parent click
                    /> */}
                    <Button
                      variant={"default"}
                      size="icon"
                      disabled={stepLoading === step.id}
                      className={`font-bold
                        ${
                          step.is_completed
                            ? "bg-green-600"
                            : "bg-secondary text-foreground border"
                        }`}
                    >
                      {index + 1}
                    </Button>
                    <div className="flex-1">
                      {stepEditId === step.id ? (
                        <input
                          className="w-full border px-3 py-1 rounded text-sm"
                          value={stepEditTitle}
                          onChange={(e) => setStepEditTitle(e.target.value)}
                          disabled={stepLoading === step.id}
                          onClick={(e) => e.stopPropagation()} // Prevent parent click
                        />
                      ) : (
                        <p
                          className={`text-sm ${
                            step.is_completed
                              ? "line-through text-muted-foreground"
                              : "text-foreground"
                          }`}
                        >
                          {step.title}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-1 ml-2">
                    {stepEditId === step.id ? (
                      <>
                        <Button
                          size="icon"
                          onClick={() => onSaveStep(step.id)}
                          disabled={stepLoading === step.id}
                        >
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => setStepEditId(null)}
                          disabled={stepLoading === step.id}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            onEditStep(step.id, step.title);
                          }}
                          disabled={stepLoading === step.id}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="text-destructive"
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteStep(step.id);
                          }}
                          disabled={stepLoading === step.id}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="text"
                className="flex-1 border px-3 py-2 text-sm rounded"
                placeholder="Add a new step..."
                value={newStepTitle}
                onChange={(e) => setNewStepTitle(e.target.value)}
                disabled={stepLoading === -1}
                onKeyDown={(e) => e.key === "Enter" && onAddStep()}
              />
              <Button
                size="sm"
                onClick={onAddStep}
                disabled={stepLoading === -1 || !newStepTitle.trim()}
              >
                <PlusCircle className="h-4 w-4 mr-1" /> Add
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-muted-foreground text-sm">
              No roadmap available for this goal.
            </p>
            <div className="flex items-center gap-2">
              <input
                type="text"
                className="flex-1 border px-3 py-2 text-sm rounded"
                placeholder="Add first step to start your roadmap..."
                value={newStepTitle}
                onChange={(e) => setNewStepTitle(e.target.value)}
                disabled={stepLoading === -1}
                onKeyDown={(e) => e.key === "Enter" && onAddStep()}
              />
              <Button
                size="sm"
                onClick={onAddStep}
                disabled={stepLoading === -1 || !newStepTitle.trim()}
              >
                Add
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
