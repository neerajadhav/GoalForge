import { Calendar, CheckCircle2, Edit, Trash2, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDeadline, getPriorityColor, getStatusColor } from "@/utils/goalUtils";
import { memo, useCallback } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Goal } from "@/types/goal";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

interface GoalCardProps {
  goal: Goal;
  onUpdateProgress?: (id: number, progress: number) => void;
  onUpdateStatus?: (id: number, status: Goal['status']) => void;
  onEdit?: (goal: Goal) => void;
  onDelete?: (id: number) => void;
}

export const GoalCard = memo(function GoalCard({ goal, onUpdateProgress, onUpdateStatus, onEdit, onDelete }: GoalCardProps) {
  const handleMarkCompleted = useCallback(() => {
    if (onUpdateStatus && goal.status !== 'completed') {
      onUpdateStatus(goal.id, 'completed');
      if (onUpdateProgress) {
        onUpdateProgress(goal.id, 100);
      }
    }
  }, [goal.id, goal.status, onUpdateProgress, onUpdateStatus]);

  const handleProgressIncrement = useCallback(() => {
    if (onUpdateProgress && goal.progress < 100) {
      const newProgress = Math.min(goal.progress + 10, 100);
      onUpdateProgress(goal.id, newProgress);
      
      // Auto-update status if completed
      if (newProgress === 100 && onUpdateStatus && goal.status !== 'completed') {
        onUpdateStatus(goal.id, 'completed');
      }
    }
  }, [goal.id, goal.progress, goal.status, onUpdateProgress, onUpdateStatus]);

  const handleEdit = useCallback(() => {
    if (onEdit) {
      onEdit(goal);
    }
  }, [goal, onEdit]);

  const handleDelete = useCallback(() => {
    if (onDelete) {
      onDelete(goal.id);
    }
  }, [goal.id, onDelete]);

  return (
    <Card className="group hover:shadow-lg transition-all duration-300">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start mb-2">
          <Badge
            className={`text-xs ${getPriorityColor(goal.priority)}`}
          >
            {goal.priority} priority
          </Badge>
          <Badge variant="outline" className="text-xs">
            {goal.category}
          </Badge>
        </div>
        <CardTitle className="text-lg leading-tight text-card-foreground">
          {goal.title}
        </CardTitle>
        <CardDescription className="text-sm line-clamp-2">
          {goal.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-foreground">
              Progress
            </span>
            <span className="text-sm text-muted-foreground">
              {goal.progress}%
            </span>
          </div>
          <Progress value={goal.progress} className="h-2" />
        </div>

        <Separator />

        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center text-muted-foreground">
            <Calendar className="mr-1 h-3 w-3" />
            {formatDeadline(goal.deadline)}
          </div>
          <div className="flex items-center">
            <Badge 
              variant="outline" 
              className={`text-xs ${getStatusColor(goal.status)}`}
            >
              {goal.status.replace("-", " ")}
            </Badge>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
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
            disabled={goal.status === 'completed'}
          >
            <CheckCircle2 className="mr-1 h-3 w-3" />
            Complete
          </Button>
        </div>
        
        <div className="flex gap-2">
          {onEdit && (
            <Button 
              size="sm" 
              variant="ghost" 
              className="flex-1"
              onClick={handleEdit}
            >
              <Edit className="mr-1 h-3 w-3" />
              Edit
            </Button>
          )}
          {onDelete && (
            <Button 
              size="sm" 
              variant="ghost" 
              className="flex-1 text-destructive hover:text-destructive"
              onClick={handleDelete}
            >
              <Trash2 className="mr-1 h-3 w-3" />
              Delete
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
});
