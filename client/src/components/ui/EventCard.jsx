// src/components/events/EventCard.jsx
import React from 'react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { MapPin, Users, Clock, Star, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWIthFallback';

export function EventCard({ event, onBook }) {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'Intermediate': return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      case 'Advanced': return 'bg-red-500/10 text-red-600 border-red-500/20';
      default: return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    }
  };

  const Icon = event.icon;

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* Image Section */}
      <div className="relative">
        <ImageWithFallback
          src={event.image}
          alt={event.title}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <Badge className={`${getDifficultyColor(event.difficulty)} border`}>
            {event.difficulty}
          </Badge>
          <Badge variant="secondary" className="bg-miv-cyan text-foreground">
            <Icon className="h-3 w-3 mr-1" /> {event.category}
          </Badge>
        </div>
        <div className="absolute top-4 right-4 bg-miv-cyan px-3 py-1 rounded-lg text-sm font-semibold">
          {event.price}
        </div>
      </div>

      {/* Content Section */}
      <CardHeader>
        <h3 className="text-xl font-bold group-hover:text-miv-cyan">{event.title}</h3>
        <p className="text-muted-foreground text-sm">{event.description}</p>
      </CardHeader>

      <CardContent>
        <div className="flex justify-between text-sm mb-2">
          <span className="flex items-center">
            <MapPin className="h-4 w-4 mr-1" /> {event.location}
          </span>
          <span className="flex items-center">
            <Clock className="h-4 w-4 mr-1" /> {event.duration}
          </span>
        </div>

        <div className="flex justify-between text-sm mb-2">
          <span className="flex items-center">
            <Users className="h-4 w-4 mr-1" /> {event.participants}
          </span>
          <span className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 mr-1" /> {event.rating} ({event.reviews})
          </span>
        </div>

        <div className="space-y-2 mb-4">
          {event.highlights.map((h, idx) => (
            <div key={idx} className="text-xs flex items-center text-muted-foreground">
              <div className="w-1 h-1 bg-miv-cyan rounded-full mr-2"></div> {h}
            </div>
          ))}
        </div>

        <Button
          className="w-full bg-miv-cyan hover:bg-miv-sky-blue text-white"
          onClick={() => onBook(event)}
        >
          Book Now <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );
}
