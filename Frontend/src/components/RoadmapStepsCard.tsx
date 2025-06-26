import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CheckCircle2,
  Edit,
  Loader2,
  MoreHorizontal,
  MoreVertical,
  PlusCircle,
  Trash2,
  X,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import type { Roadmap } from "@/types/roadmap";
import { Skeleton } from "./ui/skeleton";
import { StepDialog } from "@/components/StepDialog";
import { calculateRoadmapProgress } from "@/utils/roadmapUtils";
import { useState } from "react";

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
  onSaveStepWithDescription?: (
    stepId: number,
    title: string,
    description: string
  ) => void;
  onDeleteRoadmap?: () => void;
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
  onSaveStep,
  onDeleteStep,
  onAddStep,
  onAddRoadmap,
  setStepEditTitle,
  setStepEditId,
  setNewStepTitle,
  setNewStepDescription,
  setStepEditDescription,
  onAddStepWithDescription,
  onSaveStepWithDescription,
  onDeleteRoadmap,
}: RoadmapStepsCardProps) {
  // Modal state for add/edit
  const [stepDialogOpen, setStepDialogOpen] = useState(false);
  const [stepDialogMode, setStepDialogMode] = useState<"add" | "edit">("add");
  const [editingStepId, setEditingStepId] = useState<number | null>(null);
  const [stepDialogInitialTitle, setStepDialogInitialTitle] = useState("");
  const [stepDialogInitialDescription, setStepDialogInitialDescription] =
    useState("");

  // Replace add step input with modal
  const handleOpenAddStep = () => {
    setStepDialogMode("add");
    setStepDialogInitialTitle("");
    setStepDialogInitialDescription("");
    setNewStepDescription("");
    setStepDialogOpen(true);
  };
  const handleOpenEditStep = (
    stepId: number,
    currentTitle: string,
    currentDescription?: string
  ) => {
    setStepDialogMode("edit");
    setEditingStepId(stepId);
    setStepDialogInitialTitle(currentTitle);
    setStepDialogInitialDescription(currentDescription || "");
    setStepEditDescription(currentDescription || "");
    setStepDialogOpen(true);
  };

  // Helper to render bold (**text**) and italics (*text*) safely
  function renderDescriptionWithMarkdown(text: string) {
    if (!text) return "";
    // Escape HTML special chars
    let safe = text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    // Bold: **text**
    safe = safe.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    // Italic: *text*
    safe = safe.replace(/\*(.*?)\*/g, "<em>$1</em>");
    // Preserve line breaks
    safe = safe.replace(/\n/g, "<br />");
    return safe;
  }

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
          <div className="flex flex-col items-center justify-center space-y-4 py-10">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Generating your roadmap...
            </p>

            <div className="w-full max-w-md space-y-3">
              <Skeleton className="h-5 w-3/4 rounded-lg" />
              <Skeleton className="h-5 w-5/6 rounded-lg" />
              <Skeleton className="h-5 w-2/3 rounded-lg" />
            </div>
          </div>
        ) : roadmapError ? (
          <div className="space-y-3">
            <p className="text-destructive text-sm">{roadmapError}</p>
            <Button
              onClick={onAddRoadmap}
              size="sm"
              disabled={stepLoading === -1}
            >
              Generate Roadmap
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
                  <div className="flex items-start gap-3 w-full">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <div
                        className={`font-bold w-8 h-8 flex items-center justify-center rounded
                      ${
                        step.is_completed
                          ? "bg-green-600 text-white"
                          : "bg-primary-foreground text-primary border"
                      }`}
                      >
                        {index + 1}
                      </div>
                      <div className="flex gap-1">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              size="icon"
                              variant="outline"
                              className="w-8 h-8 p-0 rounded-full"
                            >
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="start"
                            className="w-32 p-1"
                          >
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOpenEditStep(
                                  step.id,
                                  step.title,
                                  step.description
                                );
                              }}
                              disabled={stepLoading === step.id}
                            >
                              <Edit className="w-4 h-4 mr-2" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              variant="destructive"
                              onClick={(e) => {
                                e.stopPropagation();
                                onDeleteStep(step.id);
                              }}
                              disabled={stepLoading === step.id}
                            >
                              <Trash2 className="w-4 h-4 mr-2" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
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
                            className={`font-bold ${
                              step.is_completed
                                ? "line-through text-muted-foreground"
                                : "text-foreground"
                            }`}
                          >
                            {step.title}
                          </p>
                          {step.description && (
                            <p
                              className={`text-sm mt-1 ${
                                step.is_completed
                                  ? "line-through text-muted-foreground line-clamp-2"
                                  : "text-foreground"
                              }`}
                              style={{ whiteSpace: "pre-line" }}
                              dangerouslySetInnerHTML={{
                                __html: renderDescriptionWithMarkdown(
                                  step.description
                                ),
                              }}
                            />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Add Step Button */}
            <div className="flex justify-between items-center gap-2 pt-2">
              {/* Delete Roadmap Button */}
              {onDeleteRoadmap && (
                <Button
                  variant="outline"
                  size="sm"
                  className="text-destructive"
                  onClick={async () => {
                    await onDeleteRoadmap();
                    window.location.reload();
                  }}
                >
                  <Trash2 className="h-4 w-4 mr-1" /> Delete Roadmap
                </Button>
              )}
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
                } else if (
                  stepDialogMode === "edit" &&
                  editingStepId !== null
                ) {
                  setStepEditTitle(title);
                  setStepEditDescription(description);
                  if (onSaveStepWithDescription) {
                    onSaveStepWithDescription(
                      editingStepId,
                      title,
                      description
                    );
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
