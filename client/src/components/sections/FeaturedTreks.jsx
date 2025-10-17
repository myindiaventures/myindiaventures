// src/components/sections/FeaturedTreks.jsx
import React from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { TrendingUp, Mountain } from 'lucide-react';
import { EventCard } from '../ui/EventCard';
import koraigad01 from '../../assets/locations/koraigad01.png';

export function FeaturedTreks({ navigateToPage }) {
  const treks = [
    {
      id: 1,
      title: "Koraigad Fort Trek",
      category: "trekking",
      location: "Lonavala, Maharashtra",
      duration: "1 Day",
      difficulty: "Beginner",
      rating: 4.8,
      reviews: 245,
      participants: "18",
      price: "₹1,199",
      image: koraigad01,
      description: "A short and scenic trek perfect for beginners with panoramic fort views.",
      highlights: ["AC Traveller", "Breakfast Included", "Medical Kit", "Expert Guide", "Momentos"],
      icon: Mountain,
      featured: true
    },
    // {
    //   id: 2,
    //   title: "Valley of Flowers Trek",
    //   category: "trekking",
    //   location: "Uttarakhand",
    //   duration: "6 Days",
    //   difficulty: "Intermediate",
    //   rating: 4.9,
    //   reviews: 189,
    //   participants: "12",
    //   price: "₹15,000",
    //   image: "...",
    //   description: "A colorful paradise surrounded by Himalayan peaks and rare flora.",
    //   highlights: ["Scenic Camps", "Local Cuisine", "Expert Trek Leads"],
    //   icon: Mountain,
    // },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-miv-cyan/10 border border-miv-cyan/20 mb-6">
            <TrendingUp className="h-4 w-4 text-miv-cyan mr-2" />
            <span className="text-sm font-medium text-miv-cyan">Popular Adventures</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Featured Treks & Adventures
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Handpicked adventures that promise unforgettable experiences, expert guidance, and the thrill of a lifetime.
          </p>
        </div>

        {/* Treks Grid — using EventCard */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {treks.map((trek) => (
            <div key={trek.id} className={`relative ${trek.featured ? 'ring-2 ring-miv-cyan rounded-2xl' : ''}`}>
              {trek.featured && (
                <Badge className="absolute top-4 left-4 z-10 bg-miv-cyan text-white">Featured</Badge>
              )}
              <EventCard event={trek} onBook={() => navigateToPage(`product/${trek.id}`)} />
            </div>
          ))}
        </div>

        {/* View All Adventures Button */}
        <div className="text-center mt-16">
          <Button
            variant="outline"
            size="lg"
            className="border-miv-cyan text-miv-cyan hover:bg-miv-cyan hover:text-white px-8 py-4 rounded-xl font-semibold"
            onClick={() => navigateToPage('events')}
          >
            View All Adventures
          </Button>
        </div>
      </div>
    </section>
  );
}
