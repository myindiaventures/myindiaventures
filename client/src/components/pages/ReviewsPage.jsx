import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Progress } from '../ui/progress';
import { Star, ThumbsUp, Calendar, MapPin, Filter } from 'lucide-react';
import { Header } from '../layout/Header';
import { Footer } from '../layout/Footer';

export function ReviewsPage({ navigateToPage, darkMode, toggleDarkMode }) {
  const [selectedRating, setSelectedRating] = useState('all');

  const reviews = [
    {
      id: 1,
      name: "Priya Sharma",
      avatar: "https://images.unsplash.com/photo-1573496267526-8fba73ad0b87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGhpa2luZyUyMHBvcnRyYWl0fGVufDF8fHx8MTc1NjY1MzAzM3ww&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 5,
      date: "2025-01-15",
      adventure: "Himalayan Base Camp Trek",
      location: "Himachal Pradesh",
      review: "Absolutely incredible experience! The guides were knowledgeable, safety was top priority, and the views were beyond words. This trek changed my perspective on what I'm capable of achieving.",
      helpful: 12,
      verified: true
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBoaWtpbmclMjBwb3J0cmFpdHxlbnwxfHx8fDE3NTY2NTMwMzZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 5,
      date: "2025-01-10",
      adventure: "Valley of Flowers Trek",
      location: "Uttarakhand",
      review: "Perfect organization and amazing group dynamics. The valley was even more beautiful than the photos. The trek was challenging but manageable with excellent support from MIV team.",
      helpful: 8,
      verified: true
    },
    {
      id: 3,
      name: "Anita Verma",
      avatar: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMG91dGRvb3IlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NTY2NTMwNDB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4,
      date: "2025-01-05",
      adventure: "River Rafting Adventure",
      location: "Rishikesh",
      review: "Thrilling experience with professional guides. The rapids were exciting and the safety measures were comprehensive. Great for adventure seekers looking for an adrenaline rush!",
      helpful: 15,
      verified: true
    }
  ];

  const ratingBreakdown = {
    5: 65,
    4: 25,
    3: 8,
    2: 2,
    1: 0
  };

  const overallRating = 4.9;
  const totalReviews = 2847;

  return (
    <div className="min-h-screen pt-16">
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      {/* Hero */}
      <section className="py-20 bg-gradient-to-r from-miv-navy to-miv-sky-blue">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Reviews &
              <span className="block text-miv-cyan">TESTIMONIALS</span>
            </h1>
            <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
              Real experiences from real adventurers who trusted us with their dream expeditions
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Reviews List */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-foreground">Customer Reviews</h2>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>

              {reviews.map((review) => (
                <Card key={review.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={review.avatar} alt={review.name} />
                        <AvatarFallback>{review.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <h4 className="font-semibold text-foreground">{review.name}</h4>
                            {review.verified && (
                              <Badge variant="secondary" className="text-xs">Verified Booking</Badge>
                            )}
                          </div>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                              />
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex items-center text-sm text-muted-foreground mb-3 space-x-4">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(review.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {review.location}
                          </div>
                        </div>

                        <p className="font-medium text-foreground mb-2">{review.adventure}</p>
                        <p className="text-muted-foreground mb-4 leading-relaxed">{review.review}</p>
                        
                        <div className="flex items-center justify-between">
                          <Button variant="ghost" size="sm" className="text-muted-foreground">
                            <ThumbsUp className="h-4 w-4 mr-1" />
                            Helpful ({review.helpful})
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Overall Rating */}
              <Card>
                <CardHeader>
                  <CardTitle>Overall Rating</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <div className="text-5xl font-bold text-miv-cyan">{overallRating}</div>
                  <div className="flex justify-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground">Based on {totalReviews.toLocaleString()} reviews</p>
                </CardContent>
              </Card>

              {/* Rating Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle>Rating Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {Object.entries(ratingBreakdown).reverse().map(([rating, percentage]) => (
                    <div key={rating} className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1 w-12">
                        <span className="text-sm">{rating}</span>
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                      </div>
                      <Progress value={percentage} className="flex-1 h-2" />
                      <span className="text-sm text-muted-foreground w-8">{percentage}%</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Write Review CTA */}
              <Card>
                <CardContent className="p-6 text-center space-y-4">
                  <h3 className="font-semibold text-foreground">Share Your Experience</h3>
                  <p className="text-sm text-muted-foreground">
                    Help other adventurers by sharing your MIV experience
                  </p>
                  <Button className="w-full bg-miv-cyan hover:bg-miv-sky-blue text-white">
                    Write a Review
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
