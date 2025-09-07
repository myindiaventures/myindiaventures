import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  Mountain, 
  Shield, 
  Users, 
  Heart, 
  Target,
  Compass,
  Star
} from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWIthFallback';

export function AboutPage({ navigateToPage }) {
  const values = [
    {
      icon: Shield,
      title: "Safety First",
      description: "Your safety is our top priority. All our adventures are led by certified guides with comprehensive safety protocols."
    },
    {
      icon: Heart,
      title: "Passionate Team",
      description: "Our team lives and breathes adventure. We're not just guides, we're fellow adventurers who understand your passion."
    },
    {
      icon: Target,
      title: "Excellence",
      description: "We strive for excellence in every aspect - from planning to execution, ensuring unforgettable experiences."
    },
    {
      icon: Users,
      title: "Community",
      description: "Building a community of adventurers who support, inspire, and explore together across incredible landscapes."
    }
  ];

  const team = [
    {
      name: "Rajesh Kumar",
      role: "Founder & Lead Guide",
      experience: "15+ years",
      speciality: "High Altitude Trekking",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1080"
    },
    {
      name: "Priya Sharma",
      role: "Adventure Specialist",
      experience: "12+ years",
      speciality: "Solo Travel & Women's Groups",
      image: "https://images.unsplash.com/photo-1573496267526-8fba73ad0b87?w=1080"
    },
    {
      name: "Arjun Singh",
      role: "Photography Guide",
      experience: "10+ years",
      speciality: "Adventure Photography",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=1080"
    },
    {
      name: "Anita Verma",
      role: "Safety Coordinator",
      experience: "8+ years",
      speciality: "Medical Support & Training",
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=1080"
    }
  ];

  const stats = [
    { number: "15,000+", label: "Happy Adventurers" },
    { number: "500+", label: "Adventures Completed" },
    { number: "50+", label: "Expert Guides" },
    { number: "4.9", label: "Average Rating" }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-miv-navy to-miv-sky-blue relative overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1080"
            alt="About MIV"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About
              <span className="block text-miv-cyan">MY INDIA VENTURES</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
              Pioneering adventure experiences across India since 2010, connecting souls with the wilderness.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                To make adventure accessible to everyone while preserving the natural beauty of India's wilderness. 
                We believe that every person deserves to experience the transformative power of nature and adventure.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Through carefully curated experiences, expert guidance, and unwavering commitment to safety, 
                we create memories that last a lifetime while fostering a deep connection with India's incredible landscapes.
              </p>
              <div className="flex items-center space-x-4">
                <div className="bg-miv-cyan rounded-lg p-3">
                  <Mountain className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Adventure for All</h3>
                  <p className="text-muted-foreground">From beginners to experts, we have something for everyone</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1464822759844-d150baec843a?w=1080"
                alt="Our mission"
                className="w-full h-80 object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do, from planning adventures to building lasting relationships.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="bg-miv-cyan/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                      <IconComponent className="h-8 w-8 text-miv-cyan" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-3">{value.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Impact</h2>
            <p className="text-muted-foreground">Numbers that reflect our commitment to exceptional adventure experiences</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-miv-cyan mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Meet Our Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Experienced adventurers and certified guides who are passionate about sharing India's natural wonders with you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="relative">
                  <ImageWithFallback
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-miv-cyan text-white">
                      {member.experience}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6 text-center">
                  <h3 className="font-semibold text-foreground mb-1">{member.name}</h3>
                  <p className="text-miv-cyan text-sm font-medium mb-2">{member.role}</p>
                  <p className="text-muted-foreground text-sm">{member.speciality}</p>
                  <div className="flex justify-center mt-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=1080"
                alt="Our story"
                className="w-full h-80 object-cover rounded-2xl"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Founded in 2010 by a group of passionate mountaineers, My India Ventures started with a simple dream: 
                to share the incredible beauty and transformative power of India's wilderness with fellow adventure seekers.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                What began as weekend treks with friends has grown into India's premier adventure platform, 
                but our core values remain unchanged. We're still the same group of adventure-loving individuals 
                who believe in the power of nature to inspire, challenge, and transform lives.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="bg-green-500 w-2 h-2 rounded-full mr-3"></div>
                  <span className="text-muted-foreground">ISO 9001:2015 Certified Adventure Company</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-green-500 w-2 h-2 rounded-full mr-3"></div>
                  <span className="text-muted-foreground">Ministry of Tourism Recognized</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-green-500 w-2 h-2 rounded-full mr-3"></div>
                  <span className="text-muted-foreground">Winner of Best Adventure Company Award 2023</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-miv-navy to-miv-sky-blue">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Adventure?</h2>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Join thousands of adventurers who have discovered their limits and created unforgettable memories with us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-miv-navy hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold text-lg"
                onClick={() => navigateToPage('events')}
              >
                <Compass className="h-5 w-5 mr-2" />
                Explore Adventures
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-white hover:text-miv-navy px-8 py-4 rounded-xl font-semibold text-lg"
                onClick={() => navigateToPage('contact')}
              >
                Get In Touch
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
