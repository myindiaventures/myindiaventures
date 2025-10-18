// src/components/sections/FeaturedTreks.jsx
import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { TrendingUp, Mountain, Loader2, AlertCircle } from 'lucide-react';
import { EventCard } from '../ui/EventCard';
import { eventService } from '../../services/api';
import { getImageSource, formatPrice, formatDate } from '../../utils/imageUtils';
import koraigad01 from '../../assets/locations/koraigad01.png';

export function FeaturedTreks({ navigateToPage }) {
  const [treks, setTreks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch featured treks from backend
  useEffect(() => {
    const fetchFeaturedTreks = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await eventService.getAllEvents();
        
        if (response.success && response.data) {
          // Transform backend data and mark first few as featured
          const transformedTreks = response.data.slice(0, 3).map((event, index) => ({
            id: event._id,
            title: event.title,
            category: event.category,
            location: event.location,
            duration: event.duration,
            difficulty: event.difficulty,
            rating: event.rating,
            reviews: event.reviews,
            participants: event.participants.toString(),
            price: formatPrice(event.price),
            image: getImageSource(event.image, koraigad01),
            description: event.description,
            highlights: event.highlights || [],
            icon: Mountain,
            featured: index === 0 // Mark first one as featured
          }));
          setTreks(transformedTreks);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (err) {
        console.error('Error fetching featured treks:', err);
        setError(err.message);
        // Fallback to default trek if API fails
        setTreks([{
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
        }]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedTreks();
  }, []);

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

        {/* Error State */}
        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
            <AlertCircle className="h-5 w-5" />
            <span>Failed to load featured treks: {error}</span>
          </div>
        )}

        {/* Treks Grid — using EventCard */}
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-miv-cyan" />
            <span className="ml-2 text-lg">Loading featured adventures...</span>
          </div>
        ) : (
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
        )}

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
