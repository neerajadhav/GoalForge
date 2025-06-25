import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle2, Edit, PlusCircle, Trash2, X } from "lucide-react";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import type { Roadmap } from "@/types/roadmap";
import { StepDialog } from "@/components/StepDialog";
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
  newStepDescription: string;
  setNewStepDescription: (desc: string) => void;
  stepEditDescription: string;
  setStepEditDescription: (desc: string) => void;
  onAddStepWithDescription?: (title: string, description: string) => void;
  onSaveStepWithDescription?: (stepId: number, title: string, description: string) => void;
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
  newStepDescription,
  setNewStepDescription,
  stepEditDescription,
  setStepEditDescription,
  onAddStepWithDescription,
  onSaveStepWithDescription,
}: RoadmapStepsCardProps) {
  // Modal state for add/edit
  const [stepDialogOpen, setStepDialogOpen] = useState(false);
  const [stepDialogMode, setStepDialogMode] = useState<'add' | 'edit'>("add");
  const [editingStepId, setEditingStepId] = useState<number | null>(null);
  const [stepDialogInitialTitle, setStepDialogInitialTitle] = useState("");
  const [stepDialogInitialDescription, setStepDialogInitialDescription] = useState("");

  // Replace add step input with modal
  const handleOpenAddStep = () => {
    setStepDialogMode("add");
    setStepDialogInitialTitle("");
    setStepDialogInitialDescription("");
    setNewStepDescription("");
    setStepDialogOpen(true);
  };
  const handleOpenEditStep = (stepId: number, currentTitle: string, currentDescription?: string) => {
    setStepDialogMode("edit");
    setEditingStepId(stepId);
    setStepDialogInitialTitle(currentTitle);
    setStepDialogInitialDescription(currentDescription || "");
    setStepEditDescription(currentDescription || "");
    setStepDialogOpen(true);
  };

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
                          className="w-full border bg-primary-foreground px-3 py-1 rounded text-sm"
                          value={stepEditTitle}
                          onChange={(e) => setStepEditTitle(e.target.value)}
                          disabled={stepLoading === step.id}
                          onClick={(e) => e.stopPropagation()} // Prevent parent click
                        />
                      ) : (
                        <div>
                          <p
                            className={`text-sm ${
                              step.is_completed
                                ? "line-through text-muted-foreground"
                                : "text-foreground"
                            }`}
                          >
                            {step.title}
                          </p>
                          {step.description && (
                            <p className="text-xs text-muted-foreground mt-1 ml-1">
                              {step.description}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-1 ml-2">
                    {stepEditId === step.id ? (
                      <>
                        <Button
                          size="icon"
                          variant={"ghost"}
                          onClick={() => onSaveStep(step.id)}
                          disabled={stepLoading === step.id}
                          className="cursor-pointer"
                        >
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => setStepEditId(null)}
                          disabled={stepLoading === step.id}
                          className="cursor-pointer"
                        >
                          <span className="sr-only">Cancel</span>
                          <X className="w-4 h-4 text-muted-foreground" />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenEditStep(step.id, step.title, step.description);
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
            {/* Add Step Button */}
            <div className="flex items-center gap-2 pt-2">
              <Button
                size="sm"
                onClick={handleOpenAddStep}
                disabled={stepLoading === -1}
              >
                <PlusCircle className="h-4 w-4 mr-1" /> Add Step
              </Button>
            </div>
            {/* Step Dialog Modal */}
            <StepDialog
              open={stepDialogOpen}
              onOpenChange={setStepDialogOpen}
              initialTitle={stepDialogInitialTitle}
              initialDescription={stepDialogInitialDescription}
              loading={stepLoading === -1}
              submitLabel={stepDialogMode === "add" ? "Add Step" : "Save Step"}
              onSubmit={(title, description) => {
                if (stepDialogMode === "add") {
                  setNewStepTitle(title);
                  setNewStepDescription(description);
                  if (onAddStepWithDescription) {
                    onAddStepWithDescription(title, description);
                  } else {
                    onAddStep();
                  }
                } else if (stepDialogMode === "edit" && editingStepId !== null) {
                  setStepEditTitle(title);
                  setStepEditDescription(description);
                  if (onSaveStepWithDescription) {
                    onSaveStepWithDescription(editingStepId, title, description);
                  } else {
                    onSaveStep(editingStepId);
                  }
                }
                setStepDialogOpen(false);
              }}
            />
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
