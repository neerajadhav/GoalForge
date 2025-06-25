import { Calendar, Trash2 } from "lucide-react";
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
import { memo, useCallback, useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Goal } from "@/types/goal";
import { Separator } from "@/components/ui/separator";
import { calculateRoadmapProgress } from "@/utils/roadmapUtils";
import { roadmapService } from "@/services/roadmapService";
import { useNavigate } from "react-router-dom";

interface GoalCardProps {
  goal: Goal;
  onDelete?: (id: number) => void;
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

export const GoalCard = memo(function GoalCard({
  goal,
  onDelete,
}: GoalCardProps) {
  const navigate = useNavigate();
  const [progress, setProgress] = useState<number | null>(null);

  useEffect(() => {
    let mounted = true;
    roadmapService
      .getRoadmapByGoal(goal.id)
      .then((roadmap) => {
        if (mounted) setProgress(calculateRoadmapProgress(roadmap));
      })
      .catch(() => {
        if (mounted) setProgress(null);
      });
    return () => {
      mounted = false;
    };
  }, [goal.id]);

  const handleView = useCallback(() => {
    navigate(`/app/goal/${goal.id}`);
  }, [goal.id, navigate]);

  const handleDelete = useCallback(() => {
    if (onDelete) {
      onDelete(goal.id);
    }
  }, [goal.id, onDelete]);

  return (
    <Card className="flex justify-around shadow-lg group hover:shadow-xl transition-all duration-300">
      <CardHeader>
        <div className="flex flex-col gap-3 mb-4">
          <div className="flex flex-wrap gap-2">
            <Badge className={`text-xs ${getPriorityColor(goal.priority)}`}>
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
        <CardTitle className="text-xl leading-tight text-card-foreground mb-2 line-clamp-1">
          {goal.title}
        </CardTitle>
        <CardDescription className="text-sm leading-relaxed line-clamp-4">
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
      <div className="flex-1 flex flex-col gap-6 justify-end">
        <Separator />
        <CardContent className="space-y-4">
          <div className="flex justify-between gap-3">
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
          {/* Roadmap Progress */}
          {/* <Separator /> */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-muted-foreground">
              Roadmap Progress:
            </span>
            {progress !== null ? (
              <span className="text-xs font-semibold">{progress}%</span>
            ) : (
              <span className="text-xs text-muted-foreground">N/A</span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                className="flex-1"
                onClick={handleView}
              >
                View
              </Button>
              {onDelete && (
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 text-destructive hover:text-destructive"
                  onClick={handleDelete}
                >
                  <Trash2 className="mr-1 h-3 w-3" />
                  Delete
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
});
