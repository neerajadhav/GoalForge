import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  Clock,
  Filter,
  Plus,
  Search,
  Target,
  TrendingUp,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";

function Goals() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddGoal, setShowAddGoal] = useState(false);

  const { user } = useAuth();

  const goals = [
    {
      id: 1,
      title: "Complete React Certification",
      description:
        "Finish the advanced React course and pass the certification exam",
      progress: 75,
      status: "in-progress",
      category: "Learning",
      deadline: "2025-08-15",
      priority: "high",
    },
    {
      id: 2,
      title: "Read 12 Books This Year",
      description: "Read one book per month to expand knowledge and vocabulary",
      progress: 45,
      status: "in-progress",
      category: "Personal",
      deadline: "2025-12-31",
      priority: "medium",
    },
    {
      id: 3,
      title: "Launch Side Project",
      description: "Build and deploy a full-stack web application",
      progress: 30,
      status: "in-progress",
      category: "Career",
      deadline: "2025-09-30",
      priority: "high",
    },
    {
      id: 4,
      title: "Exercise Regularly",
      description: "Work out at least 3 times per week",
      progress: 90,
      status: "on-track",
      category: "Health",
      deadline: "2025-12-31",
      priority: "medium",
    },
  ];

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
        return "destructive";
      case "medium":
        return "default";
      case "low":
        return "secondary";
      default:
        return "outline";
    }
  };

  const filteredGoals = goals.filter(
    (goal) =>
      goal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      goal.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-card-foreground">
            Welcome back, {user?.username}!
          </h1>
          <p className="text-muted-foreground">
            Here&apos;s what you need to focus on today.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Goals
                  </p>
                  <p className="text-2xl font-bold">{goals.length}</p>
                </div>
                <Target className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    In Progress
                  </p>
                  <p className="text-2xl font-bold">
                    {goals.filter((g) => g.status === "in-progress").length}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">On Track</p>
                  <p className="text-2xl font-bold">
                    {goals.filter((g) => g.status === "on-track").length}
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">At Risk</p>
                  <p className="text-2xl font-bold">
                    {goals.filter((g) => g.status === "at-risk").length}
                  </p>
                </div>
                <AlertCircle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Dialog open={showAddGoal} onOpenChange={setShowAddGoal}>
          <DialogContent className="bg-background max-w-2xl w-[calc(100vw-10px)] max-h-[calc(100vh-10px)] sm:rounded-lg p-4 sm:p-6 overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create a New Goal</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 p-0 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Goal Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Learn Spanish fluently"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    placeholder="e.g., Learning, Health, Career"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deadline">Target Deadline</Label>
                  <Input id="deadline" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority Level</Label>
                  <Input id="priority" placeholder="High, Medium, Low" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">
                  Description & Success Criteria
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe your goal in detail..."
                  rows={4}
                  className="resize-none"
                />
              </div>
              <div className="bg-muted/30 rounded-lg p-4 border border-muted">
                <div className="flex items-center mb-2">
                  <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                  <span className="text-sm font-medium text-foreground">
                    Pro Tip
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Make your goals SMART: Specific, Measurable, Achievable,
                  Relevant, and Time-bound for better success rates.
                </p>
              </div>
              <div className="flex gap-4 pt-4">
                <Button className="flex-1">
                  <Target className="mr-2 h-4 w-4" />
                  Create Goal
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowAddGoal(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <hr className="mt-4 mb-6 border-t border-muted" />

        <div className="flex flex-col md:flex-row justify-between gap-6 mb-6">
          <div className="max-w-full flex gap-2 md:w-[500px]">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-[10px] h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search goals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
          <div className="fixed z-10 bottom-5 right-5 md:static md:flex items-center justify-end gap-2">
            <Button
              onClick={() => setShowAddGoal(true)}
              className="group transition-all duration-300 bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg"
            >
              <Plus className="h-4 w-4 group-hover:rotate-90 transition-transform duration-300" />
              <span className="ml-2 hidden md:inline">Add New Goal</span>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredGoals.map((goal) => (
            <Card
              key={goal.id}
              className="group hover:shadow-lg transition-all duration-300"
            >
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
          ))}
        </div>
      </div>
    </div>
  );
}

export default Goals;
