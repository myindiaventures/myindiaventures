import React from 'react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Calendar, MapPin, Users, Star, Clock, TrendingUp } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWIthFallback';
import koraigad01 from '../../assets/locations/koraigad01.png';

export function FeaturedTreks({ navigateToPage }) {
  const treks = [
    {
      id: 1,
      title: "Koraigad Fort Trek",
      location: "Lonavala, Maharashtra",
      duration: "1 Day",
      difficulty: "Beginner",
      rating: 4.8,
      reviews: 245,
      price: "₹1,250",
      image: koraigad01 || "https://images.unsplash.com/photo-1690842855840-0b56f4b2a208?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMHRyZWtraW5nJTIwYWR2ZW50dXJlJTIwaGltYWxheWF8ZW58MXx8fHwxNzU2NjUxODIwfDA&ixlib=rb-4.1.0&q=80&w=1080",
      nextDate: "November 16, 2025",
      spots: 18,
      featured: true
    },
    // {
    //   id: 2,
    //   title: "Valley of Flowers Trek",
    //   location: "Uttarakhand",
    //   duration: "6 Days",
    //   difficulty: "Moderate",
    //   rating: 4.9,
    //   reviews: 189,
    //   price: "₹15,000",
    //   image: "https://images.unsplash.com/photo-1634248302461-df0f954e7b76?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZHZlbnR1cmUlMjBzcG9ydHMlMjByb2NrJTIwY2xpbWJpbmd8ZW58MXx8fHwxNzU2NjUxODIyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    //   nextDate: "Apr 5, 2025",
    //   spots: 12
    // },
    // {
    //   id: 3,
    //   title: "Wilderness Camping",
    //   location: "Rajasthan",
    //   duration: "3 Days",
    //   difficulty: "Easy",
    //   rating: 4.7,
    //   reviews: 156,
    //   price: "₹8,500",
    //   image: "https://images.unsplash.com/photo-1643840154458-6d2375f7c5a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1waW5nJTIwdGVudCUyMHdpbGRlcm5lc3MlMjBuYXR1cmV8ZW58MXx8fHwxNzU2NjUxODI1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    //   nextDate: "Mar 28, 2025",
    //   spots: 15
    // }
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-500';
      case 'Moderate': return 'bg-yellow-500';
      case 'Challenging': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

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

        {/* Treks Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {treks.map((trek) => (
            <Card
              key={trek.id}
              className={`group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${trek.featured ? 'ring-2 ring-miv-cyan' : ''}`}
            >
              <CardHeader className="p-0 relative">
                {trek.featured && (
                  <Badge className="absolute top-4 left-4 z-10 bg-miv-cyan text-white">
                    Featured
                  </Badge>
                )}
                <div className="relative overflow-hidden">
                  <ImageWithFallback
                    src={trek.image}
                    alt={trek.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className={`${getDifficultyColor(trek.difficulty)} text-white border-0`}>
                        {trek.difficulty}
                      </Badge>
                      <div className="flex items-center text-white text-sm">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                        <span className="font-semibold">{trek.rating}</span>
                        <span className="text-white/80 ml-1">({trek.reviews})</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-miv-cyan transition-colors">
                  {trek.title}
                </h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span className="text-sm">{trek.location}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Clock className="h-4 w-4 mr-2" />
                    <span className="text-sm">{trek.duration}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="text-sm">Next: {trek.nextDate}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Users className="h-4 w-4 mr-2" />
                    <span className="text-sm">{trek.spots} spots left</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-miv-cyan">{trek.price}</span>
                    <span className="text-sm text-muted-foreground ml-1">per person</span>
                  </div>
                  <Button 
                    className="bg-miv-cyan hover:bg-miv-sky-blue text-white rounded-xl"
                    onClick={() => navigateToPage('payment')}
                  >
                    Book Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
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
