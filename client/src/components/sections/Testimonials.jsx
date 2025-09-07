import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Star, Quote } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWIthFallback';

export function Testimonials({ navigateToPage }) {
  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      location: "Mumbai",
      rating: 5,
      trek: "Himalayan Base Camp",
      review: "The most incredible experience of my life! The guides were knowledgeable, safety was the top priority, and the views were absolutely breathtaking. MIV made my dream trek a reality.",
      avatar: "https://images.unsplash.com/photo-1573496267526-8fba73ad0b87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGhpa2luZyUyMHBvcnRyYWl0fGVufDF8fHx8MTc1NjY1MzAzM3ww&ixlib=rb-4.1.0&q=80&w=1080",
      date: "2 weeks ago"
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      location: "Delhi",
      rating: 5,
      trek: "Valley of Flowers",
      review: "Perfect organization, amazing group, and the valley was even more beautiful than the photos. The trek was challenging but manageable with the excellent support from the MIV team.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBoaWtpbmclMjBwb3J0cmFpdHxlbnwxfHx8fDE3NTY2NTMwMzZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      date: "1 month ago"
    },
    {
      id: 3,
      name: "Anita Verma",
      location: "Bangalore",
      rating: 5,
      trek: "Wilderness Camping",
      review: "As a solo female traveler, I felt completely safe and welcomed. The camping experience under the stars was magical, and I made friendships that will last a lifetime.",
      avatar: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMG91dGRvb3IlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NTY2NTMwNDB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      date: "3 weeks ago"
    },
    {
      id: 4,
      name: "Arjun Singh",
      location: "Pune",
      rating: 5,
      trek: "Himalayan Base Camp",
      review: "The level of professionalism and attention to detail was outstanding. From gear recommendations to daily support, everything was perfect. Can't wait for my next adventure with MIV!",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBvdXRkb29yJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU2NjUzMDQzfDA&ixlib=rb-4.1.0&q=80&w=1080",
      date: "2 months ago"
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-miv-cyan/10 border border-miv-cyan/20 mb-6">
            <Star className="h-4 w-4 text-miv-cyan mr-2" />
            <span className="text-sm font-medium text-miv-cyan">5-Star Reviews</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            What Adventurers Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real stories from real adventurers who trusted us with their dream expeditions.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.id}
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-8">
                {/* Quote Icon */}
                <div className="mb-6">
                  <Quote className="h-8 w-8 text-miv-cyan/40" />
                </div>

                {/* Rating */}
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <Badge variant="outline" className="ml-3 text-xs">
                    {testimonial.trek}
                  </Badge>
                </div>

                {/* Review Text */}
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.review}"
                </p>

                {/* Author Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Avatar className="h-12 w-12 mr-4">
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback>
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-foreground">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.location}</div>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">{testimonial.date}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-miv-cyan mb-2">4.9</div>
            <div className="text-muted-foreground text-sm uppercase tracking-wide">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-miv-cyan mb-2">2,000+</div>
            <div className="text-muted-foreground text-sm uppercase tracking-wide">Reviews</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-miv-cyan mb-2">98%</div>
            <div className="text-muted-foreground text-sm uppercase tracking-wide">Satisfaction</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-miv-cyan mb-2">85%</div>
            <div className="text-muted-foreground text-sm uppercase tracking-wide">Return Rate</div>
          </div>
        </div>
      </div>
    </section>
  );
}
