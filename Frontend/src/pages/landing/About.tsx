import {
  Award,
  Github,
  Heart,
  Lightbulb,
  Mail,
  Shield,
  Target,
  TrendingUp,
  Twitter,
  Users,
  Zap
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

function About() {
  const features = [
    {
      icon: Target,
      title: "SMART Goals",
      description: "Create Specific, Measurable, Achievable, Relevant, and Time-bound goals"
    },
    {
      icon: TrendingUp,
      title: "Progress Analytics",
      description: "Detailed insights and visualizations of your goal achievement journey"
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Share goals, get accountability partners, and achieve together"
    },
    {
      icon: Zap,
      title: "Smart Reminders",
      description: "AI-powered notifications and motivation to keep you on track"
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "Your data is encrypted and secure. We never share your personal goals"
    },
    {
      icon: Heart,
      title: "Wellness Focus",
      description: "Built with mental health and sustainable progress in mind"
    }
  ];

  const stats = [
    { label: "Active Users", value: "50K+", icon: Users },
    { label: "Goals Achieved", value: "200K+", icon: Award },
    { label: "Success Rate", value: "85%", icon: TrendingUp },
    { label: "Countries", value: "120+", icon: Target }
  ];

  const team = [
    {
      name: "Alex Johnson",
      role: "Founder & CEO",
      description: "Former productivity coach with 10+ years helping people achieve their dreams"
    },
    {
      name: "Sarah Chen",
      role: "Lead Developer",
      description: "Full-stack engineer passionate about building tools that make a difference"
    },
    {
      name: "Marcus Rodriguez",
      role: "UX Designer",
      description: "Design thinking expert focused on creating intuitive user experiences"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <Badge variant="secondary" className="mb-4">
            ✨ About GoalForge
          </Badge>
          <h1 className="text-5xl font-bold text-foreground mb-6 leading-tight">
            Forging the path to your{" "}
            <span className="bg-gradient-to-r from-primary to-chart-1 bg-clip-text text-transparent">
              dreams
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            GoalForge is more than just a goal-tracking app. We're a comprehensive platform 
            designed to help you transform your aspirations into achievements through 
            science-backed methodologies and cutting-edge technology.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="container mx-auto px-4 py-16">
        <Card className="bg-gradient-to-r from-primary to-chart-1 border-0 text-primary-foreground mb-16">
          <CardContent className="py-12">
            <div className="text-center max-w-3xl mx-auto">
              <Lightbulb className="h-16 w-16 mx-auto mb-6 opacity-90" />
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-lg opacity-90 leading-relaxed">
                We believe everyone has the potential to achieve extraordinary things. 
                Our mission is to provide the tools, insights, and motivation needed to 
                turn dreams into reality, one goal at a time.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <stat.icon className="h-8 w-8 mx-auto mb-4 text-primary" />
                <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Why Choose GoalForge?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We've built every feature with your success in mind, combining proven 
            goal-setting methodologies with modern technology.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
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

      {/* Team Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Meet Our Team
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Passionate individuals dedicated to helping you achieve your goals.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {team.map((member, index) => (
            <Card key={index} className="text-center">
              <CardHeader>
                <div className="w-20 h-20 bg-gradient-to-br from-chart-1 to-chart-3 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <CardTitle className="text-lg text-card-foreground">{member.name}</CardTitle>
                <Badge variant="secondary" className="mb-2">{member.role}</Badge>
                <CardDescription className="leading-relaxed">
                  {member.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-card-foreground">Get in Touch</CardTitle>
            <CardDescription className="text-base">
              Have questions or feedback? We'd love to hear from you!
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className="flex justify-center gap-4">
              <Button variant="outline" size="sm">
                <Mail className="mr-2 h-4 w-4" />
                Email Us
              </Button>
              <Button variant="outline" size="sm">
                <Twitter className="mr-2 h-4 w-4" />
                Twitter
              </Button>
              <Button variant="outline" size="sm">
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Button>
            </div>
            
            <Separator />
            
            <div className="text-center">
              <p className="text-muted-foreground mb-4">
                Ready to start your goal achievement journey?
              </p>
              <Button size="lg" asChild>
                <Link to="/goals">
                  <Target className="mr-2 h-4 w-4" />
                  Start Setting Goals
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default About;
