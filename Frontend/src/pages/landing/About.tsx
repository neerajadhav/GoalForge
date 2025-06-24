import {
  Award,
  CheckCircle,
  Heart,
  Mail,
  Shield,
  Target,
  TrendingUp,
  Users,
  Zap
} from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function About() {
  const features = [
    {
      icon: Target,
      title: "SMART Goals Framework",
      description: "Create Specific, Measurable, Achievable, Relevant, and Time-bound goals with our guided process."
    },
    {
      icon: TrendingUp,
      title: "Progress Analytics",
      description: "Visualize your progress with clear charts and insights that keep you motivated."
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Share goals with team members and work together towards common objectives."
    },
    {
      icon: Zap,
      title: "Smart Reminders",
      description: "Stay on track with timely notifications and motivational messages."
    },
    {
      icon: Shield,
      title: "Privacy & Security",
      description: "Your data is encrypted and secure. We never share your personal information."
    },
    {
      icon: Heart,
      title: "Built for Success",
      description: "Designed with research-backed methods to maximize your goal achievement rate."
    }
  ];

  const stats = [
    { label: "Active Users", value: "10,000+", icon: Users },
    { label: "Goals Achieved", value: "50,000+", icon: Award },
    { label: "Success Rate", value: "87%", icon: TrendingUp },
    { label: "Daily Active Users", value: "5,000+", icon: Target }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-foreground mb-6 leading-tight">
            About <span className="text-primary">GoalForge</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            GoalForge is a comprehensive goal management platform designed to help individuals 
            and teams turn their aspirations into achievements through proven methodologies 
            and intuitive tools.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="bg-muted/50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-6">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              We believe everyone deserves to achieve their goals. Our mission is to provide 
              simple, effective tools that help people set meaningful objectives, track their 
              progress, and celebrate their successes.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Why Choose GoalForge?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We've built every feature with your success in mind, combining proven 
              goal-setting methodologies with modern, user-friendly design.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-card border shadow-sm">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg text-card-foreground">{feature.title}</CardTitle>
                  <CardDescription className="leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-muted/50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              How GoalForge Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get started in minutes with our simple three-step process.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Set Your Goals</h3>
              <p className="text-muted-foreground">
                Create specific, measurable goals using our SMART framework guidance.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Track Progress</h3>
              <p className="text-muted-foreground">
                Monitor your advancement with visual progress indicators and analytics.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Achieve Success</h3>
              <p className="text-muted-foreground">
                Celebrate your wins and build momentum for your next achievements.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Our Values
              </h2>
              <p className="text-lg text-muted-foreground">
                The principles that guide everything we do at GoalForge.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-green-500 mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Simplicity</h3>
                  <p className="text-muted-foreground">
                    We believe powerful tools should be easy to use. Our interface is designed 
                    for clarity and efficiency.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-green-500 mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Privacy</h3>
                  <p className="text-muted-foreground">
                    Your goals and data are personal. We use industry-standard security 
                    and never share your information.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-green-500 mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Effectiveness</h3>
                  <p className="text-muted-foreground">
                    Every feature is built based on research-backed methods for goal 
                    achievement and behavior change.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <CheckCircle className="h-6 w-6 text-green-500 mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Support</h3>
                  <p className="text-muted-foreground">
                    We're committed to helping you succeed. Our team provides responsive 
                    support when you need it.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary py-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold text-primary-foreground mb-4">
            Ready to start achieving your goals?
          </h3>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Join thousands of people who are already using GoalForge to turn their dreams into reality.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" variant="secondary" className="px-8 py-3" asChild>
              <Link to="/auth/register">
                Get Started Free
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="px-8 py-3 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10" asChild>
              <Link to="/auth/login">
                Sign In
              </Link>
            </Button>
          </div>
          <p className="text-sm text-primary-foreground/60 mt-4">
            <Mail className="inline h-4 w-4 mr-1" />
            Questions? Contact us at hello@goalforge.com
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
