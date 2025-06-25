import { Calendar, CheckCircle2, Eye, Trash2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDeadline, getPriorityColor, getStatusColor } from "@/utils/goalUtils";
import { memo, useCallback } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Goal } from "@/types/goal";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";

interface GoalCardProps {
  goal: Goal;
  onUpdateStatus?: (id: number, status: Goal['status']) => void;
  onDelete?: (id: number) => void;
}

export const GoalCard = memo(function GoalCard({ goal, onUpdateStatus, onDelete }: GoalCardProps) {
  const navigate = useNavigate();
  
  const handleMarkCompleted = useCallback(() => {
    if (onUpdateStatus && goal.status !== 'completed') {
      onUpdateStatus(goal.id, 'completed');
    }
  }, [goal.id, goal.status, onUpdateStatus]);

  const handleView = useCallback(() => {
    navigate(`/app/goal/${goal.id}`);
  }, [goal.id, navigate]);

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
            onClick={handleMarkCompleted}
            disabled={goal.status === 'completed'}
          >
            <CheckCircle2 className="mr-1 h-3 w-3" />
            Complete
          </Button>
        </div>
        
        <div className="flex gap-2">
          <Button 
            size="sm" 
            variant="outline" 
            className="flex-1"
            onClick={handleView}
          >
            <Eye className="mr-1 h-3 w-3" />
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
      </CardContent>
    </Card>
  );
});
