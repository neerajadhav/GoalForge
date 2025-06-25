import { Calendar, Edit, Trash2 } from "lucide-react";
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

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CreateGoalDialog } from "./CreateGoalDialog";
import type { Goal } from "@/types/goal";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

interface GoalInfoCardProps {
  goal: Goal;
  setGoal: (goal: Goal) => void;
  onDelete: () => void;
  addToast: (toast: { message: string; type: string }) => void;
}

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

export function GoalInfoCard({
  goal,
  setGoal,
  onDelete,
  addToast,
}: GoalInfoCardProps) {
  const [editOpen, setEditOpen] = useState(false);

  return (
    <>
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex flex-col gap-3 mb-4">
            <div className="flex flex-wrap gap-2">
              <Badge
                className={`text-xs ${getPriorityColor(goal.priority)}`}
                key={goal.priority}
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
            {goal.description && (
              <p
                className="text-sm text-foreground mt-1"
                style={{ whiteSpace: "pre-line" }}
                dangerouslySetInnerHTML={{
                  __html: renderDescriptionWithMarkdown(goal.description),
                }}
              />
            )}
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="space-y-4">
          <div className="flex gap-3 justify-between">
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
          {/* <Separator /> */}
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                className="flex-1"
                onClick={() => setEditOpen(true)}
              >
                <Edit className="mr-1 h-3 w-3" />
                Edit
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="flex-1 text-destructive hover:text-destructive"
                onClick={onDelete}
              >
                <Trash2 className="mr-1 h-3 w-3" />
                Delete
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      <CreateGoalDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        initialData={{
          title: goal.title,
          description: goal.description,
          category: goal.category,
          priority: goal.priority,
          status: goal.status,
          deadline: goal.deadline,
        }}
        submitLabel="Update Goal"
        onCreateGoal={async (data) => {
          const mod = await import("@/services/goalsService");
          const updated = await mod.goalsService.updateGoal(goal.id, data);
          setGoal(updated.data); // update parent state instantly
          addToast({ message: "Goal updated!", type: "success" });
          setEditOpen(false);
        }}
      />
    </>
  );
}
