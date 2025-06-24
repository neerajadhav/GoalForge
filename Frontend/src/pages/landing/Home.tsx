import { ArrowRight, CheckCircle, Target, TrendingUp, Users, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function Home() {
  const features = [
    {
      icon: Target,
      title: "Smart Goal Setting",
      description: "Create clear, achievable goals with our proven framework"
    },
    {
      icon: TrendingUp,
      title: "Progress Tracking",
      description: "Monitor your advancement with simple, visual progress indicators"
    },
    {
      icon: Users,
      title: "Team Support",
      description: "Collaborate with others and stay accountable to your commitments"
    },
    {
      icon: Zap,
      title: "Daily Motivation",
      description: "Receive timely reminders and encouragement to stay on track"
    }
  ];

  const benefits = [
    "Set and track unlimited goals",
    "Get detailed progress analytics",
    "Collaborate with team members",
    "Receive motivational reminders",
    "Access from any device"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Turn Your Goals Into{" "}
            <span className="text-primary">Achievements</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
            GoalForge helps you set meaningful goals, track your progress, and celebrate your wins. 
            Join thousands who have transformed their ambitions into reality.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Button size="lg" className="px-8 py-3" asChild>
              <Link to="/auth/register">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="px-8 py-3" asChild>
              <Link to="/about">Learn More</Link>
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            No credit card required • Free forever plan available
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-muted/50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Everything you need to succeed
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Simple, powerful tools designed to help you achieve your most important goals.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-card border shadow-sm">
                <CardHeader className="text-center pb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
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
      </div>

      {/* Benefits Section */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Why thousands choose GoalForge
              </h2>
              <p className="text-lg text-muted-foreground">
                Start achieving your goals today with our comprehensive platform
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <ul className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-muted/50 p-8 rounded-lg border">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Start your journey today
                </h3>
                <p className="text-muted-foreground mb-6">
                  Join our community of goal-achievers and start making progress on what matters most to you.
                </p>
                <Button size="lg" className="w-full" asChild>
                  <Link to="/auth/register">
                    Create Free Account
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="bg-primary py-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold text-primary-foreground mb-4">
            Ready to achieve your goals?
          </h3>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Join thousands of successful people who use GoalForge to turn their dreams into reality.
          </p>
          <Button size="lg" variant="secondary" className="px-8 py-3" asChild>
            <Link to="/auth/register">
              Get Started Free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Home;
