// src/components/pages/EventsPage.jsx
import React, { useState, useEffect } from 'react';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import { Search, CheckCircle, Compass, Mountain, Waves, Tent, Loader2, AlertCircle } from 'lucide-react';
import { Header } from '../layout/Header';
import { Footer } from '../layout/Footer';
import { EventCard } from '../ui/EventCard';
import { eventService } from '../../services/api';
import { getImageSource, formatPrice, formatDate } from '../../utils/imageUtils';
import koraigad01 from '../../assets/locations/koraigad01.png';

export function EventsPage({ navigateToPage, darkMode, toggleDarkMode }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch events from backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await eventService.getAllEvents();
        
        if (response.success && response.data) {
          // Transform backend data to match frontend format
          const transformedEvents = response.data.map(event => ({
            id: event._id,
            title: event.title,
            category: event.category,
            location: event.location,
            duration: event.duration,
            difficulty: event.difficulty,
            price: formatPrice(event.price),
            rating: event.rating,
            reviews: event.reviews,
            participants: event.participants.toString(),
            nextDate: formatDate(event.nextDate),
            image: getImageSource(event.image, koraigad01),
            description: event.description,
            highlights: event.highlights || [],
            icon: Mountain
          }));
          setEvents(transformedEvents);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (err) {
        console.error('Error fetching events:', err);
        setError(err.message);
        // Fallback to default event if API fails
        setEvents([{
          id: 1,
          title: "Koraigad Fort Trek",
          category: "trekking",
          location: "Maharashtra",
          duration: "1 Day",
          difficulty: "Beginner",
          price: "₹1,199",
          rating: 4.9,
          reviews: 156,
          participants: "18",
          nextDate: "2025-11-16",
          image: koraigad01,
          description: "Experience the beauty of Koraigad Fort with stunning views and safe guidance.",
          highlights: ["AC Traveller", "Breakfast Included", "Male & Female Guides", "Medical Kit", "Momentos"],
          icon: Mountain
        }]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const categories = [
    { value: 'all', label: 'All Categories', icon: Compass },
    { value: 'trekking', label: 'Trekking', icon: Mountain },
    { value: 'water-sports', label: 'Water Sports', icon: Waves },
    { value: 'camping', label: 'Camping', icon: Tent }
  ];

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = selectedLocation === 'all' || event.location === selectedLocation;
    const matchesDifficulty = selectedDifficulty === 'all' || event.difficulty === selectedDifficulty;
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    return matchesSearch && matchesLocation && matchesDifficulty && matchesCategory;
  });

  return (
    <div className="min-h-screen pt-16">
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-miv-navy to-miv-sky-blue">
        <div className="container mx-auto text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Discover Your Next <span className="block text-miv-cyan">ADVENTURE</span>
          </h1>
          <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Find your perfect outdoor experience with My India Ventures
          </p>
          <Badge className="bg-green-500/10 text-green-600 border-green-500/20 px-4 py-2">
            <CheckCircle className="h-4 w-4 mr-2" /> Live Demo: Try filters below!
          </Badge>
        </div>
      </section>

      {/* Filters */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card rounded-2xl p-8 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search adventures..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger><SelectValue placeholder="Location" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="Maharashtra">Maharashtra</SelectItem>
                  <SelectItem value="Rishikesh">Rishikesh</SelectItem>
                  <SelectItem value="Himachal Pradesh">Himachal Pradesh</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger><SelectValue placeholder="Difficulty" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger><SelectValue placeholder="Category" /></SelectTrigger>
                <SelectContent>
                  {categories.map(c => (
                    <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Tabs */}
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8">
                {categories.map(c => {
                  const Icon = c.icon;
                  return (
                    <TabsTrigger key={c.value} value={c.value} className="flex items-center gap-2">
                      <Icon className="h-4 w-4" /> {c.label}
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8">
            {loading ? 'Loading Adventures...' : `${filteredEvents.length} Adventures Found`}
          </h2>
          
          {error && (
            <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
              <AlertCircle className="h-5 w-5" />
              <span>Failed to load events: {error}</span>
            </div>
          )}
          
          {loading ? (
            <div className="flex justify-center items-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-miv-cyan" />
              <span className="ml-2 text-lg">Loading adventures...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map(event => (
                <EventCard key={event.id} event={event} onBook={() => navigateToPage(`product/${event.id}`)} />
              ))}
            </div>
          )}
          
          {!loading && filteredEvents.length === 0 && (
            <p className="text-center py-16 text-muted-foreground">
              No adventures found matching your criteria
            </p>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
