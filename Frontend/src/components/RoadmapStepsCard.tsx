import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle2, Edit, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { Roadmap } from "@/types/roadmap";
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
    <Card className="shadow-lg h-full">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <CheckCircle2 className="h-6 w-6 text-blue-500" />
          Roadmap & Steps
        </CardTitle>
        <CardDescription>
          Track your progress and manage steps for this goal.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {roadmapLoading ? (
          <div className="text-sm text-muted-foreground">
            Loading roadmap...
          </div>
        ) : roadmapError ? (
          <>
            <div className="text-sm text-destructive">{roadmapError}</div>
            <div className="flex gap-2 mt-4">
              <Button
                size="sm"
                onClick={onAddRoadmap}
                disabled={stepLoading === -1}
              >
                Add Roadmap
              </Button>
            </div>
          </>
        ) : roadmap ? (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-semibold text-lg">
                {calculateRoadmapProgress(roadmap)}%
              </span>
              <span className="text-xs text-muted-foreground">complete</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2 mb-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${calculateRoadmapProgress(roadmap)}%` }}
              />
            </div>
            <ul className="space-y-2 mt-2">
              {roadmap.steps.map((step) => (
                <li key={step.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={step.is_completed}
                    disabled={stepLoading === step.id}
                    onChange={() => onToggleStep(step.id, step.is_completed)}
                    className="accent-blue-500"
                  />
                  {stepEditId === step.id ? (
                    <>
                      <input
                        className="border rounded px-2 py-1 text-sm"
                        value={stepEditTitle}
                        onChange={(e) => setStepEditTitle(e.target.value)}
                        disabled={stepLoading === step.id}
                      />
                      <Button
                        size="sm"
                        onClick={() => onSaveStep(step.id)}
                        disabled={stepLoading === step.id}
                      >
                        Save
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setStepEditId(null)}
                        disabled={stepLoading === step.id}
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <span
                        className={
                          step.is_completed
                            ? "line-through text-muted-foreground"
                            : ""
                        }
                      >
                        {step.title}
                      </span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onEditStep(step.id, step.title)}
                        disabled={stepLoading === step.id}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-destructive"
                        onClick={() => onDeleteStep(step.id)}
                        disabled={stepLoading === step.id}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </>
                  )}
                </li>
              ))}
            </ul>
            <div className="flex gap-2 mt-4">
              <input
                className="flex-1 border rounded px-2 py-1 text-sm"
                placeholder="Add new step..."
                value={newStepTitle}
                onChange={(e) => setNewStepTitle(e.target.value)}
                disabled={stepLoading === -1}
                onKeyDown={(e) => {
                  if (e.key === "Enter") onAddStep();
                }}
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
        ) : (
          <div>
            <div className="text-sm text-muted-foreground mb-2">
              No roadmap available for this goal.
            </div>
            <div className="flex gap-2 mt-4">
              <input
                className="flex-1 border rounded px-2 py-1 text-sm"
                placeholder="Add first step to create a roadmap..."
                value={newStepTitle}
                onChange={(e) => setNewStepTitle(e.target.value)}
                disabled={stepLoading === -1}
                onKeyDown={(e) => {
                  if (e.key === "Enter") onAddStep();
                }}
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
