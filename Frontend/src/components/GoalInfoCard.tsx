import { Calendar, CheckCircle2, Edit, Trash2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDeadline, getPriorityColor, getStatusColor } from "@/utils/goalUtils";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Goal } from "@/types/goal";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";

interface GoalInfoCardProps {
  goal: Goal;
  onMarkCompleted: () => void;
  onDelete: () => void;
  addToast: (toast: { message: string; type: string }) => void;
}

export function GoalInfoCard({ goal, onMarkCompleted, onDelete }: GoalInfoCardProps) {
  const navigate = useNavigate();
  return (
    <Card className="shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex flex-col gap-3 mb-4">
          <div className="flex flex-wrap gap-2">
            <Badge className={`text-xs ${getPriorityColor(goal.priority)}`}>{goal.priority} priority</Badge>
            <Badge variant="outline" className="text-xs">{goal.category}</Badge>
            <Badge variant="outline" className={`text-xs ${getStatusColor(goal.status)}`}>{goal.status.replace("-", " ")}</Badge>
          </div>
        </div>
        <CardTitle className="text-xl leading-tight text-card-foreground mb-2">{goal.title}</CardTitle>
        <CardDescription className="text-sm leading-relaxed">{goal.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Separator />
        <div className="space-y-4">
          <div>
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">Deadline</h3>
            <div className="flex items-center text-sm text-foreground">
              <Calendar className="mr-2 h-3 w-3" />
              {formatDeadline(goal.deadline)}
            </div>
          </div>
          <div>
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">Created</h3>
            <p className="text-sm text-foreground">{new Date(goal.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
          </div>
        </div>
        <Separator />
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="flex-1" onClick={onMarkCompleted} disabled={goal.status === "completed"}>
              <CheckCircle2 className="mr-1 h-3 w-3" />
              Complete
            </Button>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="flex-1" onClick={() => {}}>
              <Edit className="mr-1 h-3 w-3" />
              Edit
            </Button>
            <Button size="sm" variant="outline" className="flex-1 text-destructive hover:text-destructive" onClick={onDelete}>
              <Trash2 className="mr-1 h-3 w-3" />
              Delete
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
