import React from 'react';
import { HeroSection } from '../sections/HeroSection';
import { FeaturedTreks } from '../sections/FeaturedTreks';
import { Testimonials } from '../sections/Testimonials';
import { CTASection } from '../sections/CTASections';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { 
  Calendar, 
  BookOpen, 
  Phone, 
  Users, 
  Shield, 
  UserCog, 
  CreditCard, 
  MapPin, 
  BarChart3, 
  Camera, 
  Star, 
  HelpCircle, 
  ArrowRight,
  CheckCircle,
  FileText
} from 'lucide-react';

export function HomePage({ navigateToPage }) {
  const pageFeatures = [
    {
      title: 'Adventure Events',
      description: 'Discover and book amazing treks, water sports, and adventure activities',
      icon: Calendar,
      page: 'events',
      status: 'Available',
      features: ['Search & Filter', 'Booking System', 'Real-time Availability']
    },
    {
      title: 'Adventure Stories',
      description: 'Read inspiring stories, tips, and guides from fellow adventurers',
      icon: BookOpen,
      page: 'blog',
      status: 'Available',
      features: ['Expert Articles', 'Video Content', 'Community Stories']
    },
    {
      title: 'Live Tracking',
      description: 'Real-time GPS tracking and safety monitoring during adventures',
      icon: MapPin,
      page: 'live-tracking',
      status: 'Available',
      features: ['Real-time GPS', 'Safety Monitoring', 'Emergency Alerts']
    },
    {
      title: 'User Dashboard',
      description: 'Manage your bookings, track progress, and view achievements',
      icon: Users,
      page: 'user-dashboard',
      status: 'Available',
      features: ['Booking Management', 'Health Tracking', 'Achievement System']
    },
    {
      title: 'Secure Payments',
      description: 'Safe and secure payment processing with multiple options',
      icon: CreditCard,
      page: 'payment',
      status: 'Available',
      features: ['Multiple Payment Methods', 'Secure Processing', 'Instant Confirmation']
    },
    {
      title: 'Photo Gallery',
      description: 'Browse stunning photos and videos from past adventures',
      icon: Camera,
      page: 'gallery',
      status: 'Available',
      features: ['High-quality Media', 'Search & Filter', 'Download Options']
    },
    {
      title: 'Reviews & Ratings',
      description: 'Read authentic reviews from real adventure participants',
      icon: Star,
      page: 'reviews',
      status: 'Available',
      features: ['Verified Reviews', 'Photo Reviews', 'Rating System']
    },
    {
      title: 'Reports & Analytics',
      description: 'Detailed insights and reports for guides and administrators',
      icon: BarChart3,
      page: 'reports',
      status: 'Available',
      features: ['Performance Analytics', 'Financial Reports', 'User Insights']
    },
    {
      title: 'Support & FAQ',
      description: 'Get help and find answers to common questions',
      icon: HelpCircle,
      page: 'faq',
      status: 'Available',
      features: ['Comprehensive FAQ', 'Contact Support', 'Live Chat']
    }
  ];

  return (
    <>
      <HeroSection navigateToPage={navigateToPage} />
      
      {/* All Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="bg-green-500/10 text-green-600 border-green-500/20 mb-4">
              <CheckCircle className="h-4 w-4 mr-2" />
              All Systems Operational
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              Fully Functional
              <span className="block text-miv-cyan">Adventure Platform</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore all our working features and pages. Every component is fully functional and ready to use!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pageFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card 
                  key={feature.title} 
                  className="group hover:shadow-xl transition-all duration-300 border-l-4 border-l-miv-cyan animate-fade-in-up" 
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center">
                        <div className="bg-miv-cyan/10 p-3 rounded-xl mr-4">
                          <IconComponent className="h-6 w-6 text-miv-cyan" />
                        </div>
                        <div>
                          <CardTitle className="text-lg text-foreground group-hover:text-miv-cyan transition-colors">
                            {feature.title}
                          </CardTitle>
                          <Badge variant="outline" className="mt-2 bg-green-500/10 text-green-600 border-green-500/20 text-xs">
                            {feature.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground text-sm">
                      {feature.description}
                    </p>
                    
                    <div className="space-y-2">
                      {feature.features.map((featureItem, idx) => (
                        <div key={idx} className="flex items-center text-xs text-muted-foreground">
                          <div className="w-1 h-1 bg-miv-cyan rounded-full mr-2"></div>
                          {featureItem}
                        </div>
                      ))}
                    </div>

                    <Button 
                      className="w-full bg-miv-cyan hover:bg-miv-sky-blue text-white group-hover:shadow-lg transition-all"
                      onClick={() => navigateToPage(feature.page)}
                    >
                      Explore {feature.title}
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Additional Pages Section */}
          <div className="mt-16 p-8 bg-card rounded-2xl border">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">Additional Pages & Features</h3>
              <p className="text-muted-foreground">More specialized pages for comprehensive functionality</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button 
                variant="outline" 
                className="h-16 flex flex-col items-center justify-center space-y-1"
                onClick={() => navigateToPage('about')}
              >
                <FileText className="h-5 w-5" />
                <span className="text-xs">About Us</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-16 flex flex-col items-center justify-center space-y-1"
                onClick={() => navigateToPage('contact')}
              >
                <Phone className="h-5 w-5" />
                <span className="text-xs">Contact</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-16 flex flex-col items-center justify-center space-y-1"
                onClick={() => navigateToPage('guide-dashboard')}
              >
                <UserCog className="h-5 w-5" />
                <span className="text-xs">Guide Dashboard</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-16 flex flex-col items-center justify-center space-y-1"
                onClick={() => navigateToPage('admin-panel')}
              >
                <Shield className="h-5 w-5" />
                <span className="text-xs">Admin Panel</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-16 flex flex-col items-center justify-center space-y-1"
                onClick={() => navigateToPage('privacy')}
              >
                <Shield className="h-5 w-5" />
                <span className="text-xs">Privacy Policy</span>
              </Button>
              <Button 
                variant="outline" 
                className="h-16 flex flex-col items-center justify-center space-y-1"
                onClick={() => navigateToPage('terms')}
              >
                <FileText className="h-5 w-5" />
                <span className="text-xs">Terms & Conditions</span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <FeaturedTreks navigateToPage={navigateToPage} />
      <Testimonials navigateToPage={navigateToPage} />
      <CTASection navigateToPage={navigateToPage} />
    </>
  );
}
