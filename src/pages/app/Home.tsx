import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  Clock,
  Filter,
  Plus,
  Search,
  Target,
  TrendingUp
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

function Goals() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddGoal, setShowAddGoal] = useState(false);

  // Mock data for demonstration
  const goals = [
    {
      id: 1,
      title: "Complete React Certification",
      description: "Finish the advanced React course and pass the certification exam",
      progress: 75,
      status: "in-progress",
      category: "Learning",
      deadline: "2025-08-15",
      priority: "high"
    },
    {
      id: 2,
      title: "Read 12 Books This Year",
      description: "Read one book per month to expand knowledge and vocabulary",
      progress: 45,
      status: "in-progress",
      category: "Personal",
      deadline: "2025-12-31",
      priority: "medium"
    },
    {
      id: 3,
      title: "Launch Side Project",
      description: "Build and deploy a full-stack web application",
      progress: 30,
      status: "in-progress",
      category: "Career",
      deadline: "2025-09-30",
      priority: "high"
    },
    {
      id: 4,
      title: "Exercise Regularly",
      description: "Work out at least 3 times per week",
      progress: 90,
      status: "on-track",
      category: "Health",
      deadline: "2025-12-31",
      priority: "medium"
    }
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

  const filteredGoals = goals.filter(goal =>
    goal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    goal.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">My Goals</h1>
            <p className="text-lg text-muted-foreground">
              Track your progress and achieve your dreams
            </p>
          </div>
          <Button 
            onClick={() => setShowAddGoal(!showAddGoal)}
            className="group"
          >
            <Plus className="mr-2 h-4 w-4 group-hover:rotate-90 transition-transform" />
            Add New Goal
          </Button>
        </div>

        {/* Search and Filter */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
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
          </CardContent>
        </Card>

        {/* Add Goal Form */}
        {showAddGoal && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="mr-2 h-5 w-5" />
                Create New Goal
              </CardTitle>
              <CardDescription>
                Set a clear, actionable goal with measurable outcomes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Goal Title</Label>
                  <Input id="title" placeholder="e.g., Learn Spanish" />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Input id="category" placeholder="e.g., Learning" />
                </div>
                <div>
                  <Label htmlFor="deadline">Deadline</Label>
                  <Input id="deadline" type="date" />
                </div>
                <div>
                  <Label htmlFor="priority">Priority</Label>
                  <Input id="priority" placeholder="High, Medium, Low" />
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Describe your goal in detail..."
                  rows={3}
                />
              </div>
              <div className="flex gap-2">
                <Button>Create Goal</Button>
                <Button variant="outline" onClick={() => setShowAddGoal(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Goals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredGoals.map((goal) => (
            <Card key={goal.id} className="group hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start mb-2">
                  <Badge variant={getPriorityVariant(goal.priority)} className="text-xs">
                    {goal.priority} priority
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {goal.category}
                  </Badge>
                </div>
                <CardTitle className="text-lg leading-tight text-card-foreground">{goal.title}</CardTitle>
                <CardDescription className="text-sm line-clamp-2">
                  {goal.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-foreground">Progress</span>
                    <span className="text-sm text-muted-foreground">{goal.progress}%</span>
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
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(goal.status)} mr-2`} />
                    <span className="capitalize text-muted-foreground">{goal.status.replace('-', ' ')}</span>
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

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Goals</p>
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
                  <p className="text-sm font-medium text-gray-600">In Progress</p>
                  <p className="text-2xl font-bold">
                    {goals.filter(g => g.status === 'in-progress').length}
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
                    {goals.filter(g => g.status === 'on-track').length}
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
                    {goals.filter(g => g.status === 'at-risk').length}
                  </p>
                </div>
                <AlertCircle className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Goals;
