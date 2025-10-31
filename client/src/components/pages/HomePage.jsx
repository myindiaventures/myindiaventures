import React from 'react';
import { HeroSection } from '../sections/HeroSection';
import { FeaturedTreks } from '../sections/FeaturedTreks';
import { Testimonials } from '../sections/Testimonials';
import { CTASection } from '../sections/CTASections';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Header } from '../layout/Header';
import { Footer } from '../layout/Footer';
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

export function HomePage({ navigateToPage, darkMode, toggleDarkMode }) {
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
    // {
    //   title: 'Live Tracking',
    //   description: 'Real-time GPS tracking and safety monitoring during adventures',
    //   icon: MapPin,
    //   page: 'live-tracking',
    //   status: 'Available',
    //   features: ['Real-time GPS', 'Safety Monitoring', 'Emergency Alerts']
    // },
    // {
    //   title: 'User Dashboard',
    //   description: 'Manage your bookings, track progress, and view achievements',
    //   icon: Users,
    //   page: 'user-dashboard',
    //   status: 'Available',
    //   features: ['Booking Management', 'Health Tracking', 'Achievement System']
    // },
    {
      title: 'Secure Payments',
      description: 'Safe and secure payment processing with multiple options',
      icon: CreditCard,
      page: 'payment',
      status: 'Available',
      features: ['Multiple Payment Methods', 'Secure Processing', 'Instant Confirmation']
    },
    // {
    //   title: 'Photo Gallery',
    //   description: 'Browse stunning photos and videos from past adventures',
    //   icon: Camera,
    //   page: 'gallery',
    //   status: 'Available',
    //   features: ['High-quality Media', 'Search & Filter', 'Download Options']
    // },
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
    <div>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <HeroSection navigateToPage={navigateToPage} />
      <FeaturedTreks navigateToPage={navigateToPage} />
      
      {/* All Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            {/* <Badge className="bg-green-500/10 text-green-600 border-green-500/20 mb-4">
              <CheckCircle className="h-4 w-4 mr-2" />
              All Systems Operational
            </Badge> */}
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              India's
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
            
            <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
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
              {/* <Button 
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
              </Button> */}
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

      <Testimonials navigateToPage={navigateToPage} />
      <CTASection navigateToPage={navigateToPage} />
      <Footer />
      {/* Floating WhatsApp Chat Button */}
      <a
        href="https://wa.me/917021014315?text=Hello%20👋%20Welcome%20to%20My%20India%20Ventures!%20🌍%20Let's%20plan%20your%20next%20trip%20with%20MIV%20today!%20🚀"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 z-50 group p-4"
        title="Chat with us on WhatsApp"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-7 w-7 transition-transform group-hover:scale-110"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12.04 2c-5.52 0-10 4.42-10 9.86 0 1.74.47 3.41 1.36 4.9l-1.45 5.3 5.46-1.43a10.18 10.18 0 0 0 4.63 1.13h.01c5.52 0 10-4.42 10-9.86S17.56 2 12.04 2Zm5.73 14.15c-.24.67-1.39 1.28-1.91 1.33-.49.05-1.09.07-1.77-.11-.41-.1-.94-.31-1.62-.6-2.85-1.22-4.69-4.09-4.83-4.28-.14-.19-1.15-1.53-1.15-2.91s.73-2.06.99-2.34c.26-.28.58-.35.77-.35.19 0 .38 0 .55.01.18.01.41-.07.64.49.24.58.81 2 .88 2.14.07.14.12.3.02.49-.1.19-.15.3-.3.47-.15.17-.31.37-.44.5-.15.15-.31.31-.14.61.17.3.76 1.24 1.62 2.01 1.12.99 2.07 1.3 2.36 1.45.3.14.47.12.64-.07.18-.19.74-.85.94-1.14.2-.28.4-.24.66-.14.26.09 1.68.79 1.96.93.28.14.47.21.54.33.07.12.07.71-.16 1.38Z" />
        </svg>

        {/* Tooltip on hover */}
        <span className="absolute right-16 bg-green-600 text-white text-sm font-medium py-2 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Chat with us!
        </span>
      </a>

    </div>
  );
}
