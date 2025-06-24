import { ArrowRight, Target, TrendingUp, Users, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function Home() {
  const features = [
    {
      icon: Target,
      title: "Smart Goal Setting",
      description: "Set SMART goals with AI-powered suggestions and templates",
      color: "bg-chart-1"
    },
    {
      icon: TrendingUp,
      title: "Progress Tracking",
      description: "Visualize your progress with detailed charts and analytics",
      color: "bg-chart-2"
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Share goals and collaborate with team members",
      color: "bg-chart-3"
    },
    {
      icon: Zap,
      title: "Motivation Boost",
      description: "Get personalized reminders and motivation tips",
      color: "bg-chart-4"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <Badge variant="secondary" className="mb-4">
            🚀 New Features Available
          </Badge>
          <h1 className="text-6xl font-bold text-foreground mb-6 leading-tight">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-primary to-chart-1 bg-clip-text text-transparent">
              GoalForge
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Transform your dreams into achievable goals. Track progress, stay motivated, 
            and celebrate your victories with our powerful goal management platform.
          </p>
          <div className="flex justify-center gap-4 mb-12">
            <Button size="lg" className="group" asChild>
              <Link to="/goals">
                Start Your Journey
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Everything you need to succeed
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Powerful features designed to help you set, track, and achieve your most important goals.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <CardHeader className="text-center pb-4">
                <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-lg text-card-foreground">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center pt-0">
                <CardDescription className="text-sm leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16">
        <Card className="bg-gradient-to-r from-primary to-chart-1 border-0 text-primary-foreground">
          <CardContent className="text-center py-12">
            <h3 className="text-3xl font-bold mb-4">Ready to achieve your goals?</h3>
            <p className="text-lg mb-8 opacity-90">
              Join thousands of successful goal-achievers who trust GoalForge
            </p>
            <Button size="lg" variant="secondary" className="group" asChild>
              <Link to="/goals">
                Get Started Now
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Home;
