import { Calendar, CheckCircle2, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Goal } from "@/types/goal";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

interface GoalCardProps {
  goal: Goal;
}

export function GoalCard({ goal }: GoalCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-chart-2";
      case "on-track":
        return "bg-chart-1";
      case "in-progress":
        return "bg-chart-4";
      case "at-risk":
        return "bg-destructive";
      default:
        return "bg-muted";
    }
  };

  const getPriorityVariant = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive" as const;
      case "medium":
        return "default" as const;
      case "low":
        return "secondary" as const;
      default:
        return "outline" as const;
    }
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start mb-2">
          <Badge
            variant={getPriorityVariant(goal.priority)}
            className="text-xs"
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
            {new Date(goal.deadline).toLocaleDateString()}
          </div>
          <div className="flex items-center">
            <div
              className={`w-2 h-2 rounded-full ${getStatusColor(
                goal.status
              )} mr-2`}
            />
            <span className="capitalize text-muted-foreground">
              {goal.status.replace("-", " ")}
            </span>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button size="sm" variant="outline" className="flex-1">
            <TrendingUp className="mr-1 h-3 w-3" />
            View
          </Button>
          <Button size="sm" variant="outline" className="flex-1">
            <CheckCircle2 className="mr-1 h-3 w-3" />
            Update
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
