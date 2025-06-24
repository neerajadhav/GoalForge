import { Card, CardContent } from '@/components/ui/card';
import { Home, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import ScrollToTop from '../components/ScrollToTop';

function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted flex items-center justify-center">
      <ScrollToTop />
      <div className="container mx-auto px-4">
        <Card className="max-w-2xl mx-auto text-center shadow-lg">
          <CardContent className="py-16">
            {/* 404 Illustration */}
            <div className="mb-8">
              <div className="text-8xl font-bold bg-gradient-to-r from-primary to-chart-1 bg-clip-text text-transparent mb-4">
                404
              </div>
              <div className="w-24 h-1 bg-gradient-to-r from-primary to-chart-1 mx-auto rounded-full mb-6"></div>
            </div>

            {/* Error Message */}
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Oops! Page Not Found
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
              The page you're looking for seems to have wandered off. 
              Don't worry, even the best goal-setters sometimes take a wrong turn!
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" asChild className="group">
                <Link to="/">
                  <Home className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                  Go Home
                </Link>
              </Button>
              
              <Button size="lg" variant="outline" asChild className="group">
                <Link to="/goals">
                  <Search className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                  View Goals
                </Link>
              </Button>
            </div>

            {/* Additional Help */}
            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground mb-4">
                Looking for something specific?
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <Link 
                  to="/" 
                  className="text-sm text-primary hover:text-primary/80 underline-offset-4 hover:underline"
                >
                  Home
                </Link>
                <span className="text-muted">•</span>
                <Link 
                  to="/goals" 
                  className="text-sm text-primary hover:text-primary/80 underline-offset-4 hover:underline"
                >
                  My Goals
                </Link>
                <span className="text-muted">•</span>
                <Link 
                  to="/about" 
                  className="text-sm text-primary hover:text-primary/80 underline-offset-4 hover:underline"
                >
                  About Us
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default NotFound;
