import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  MapPin, 
  Users, 
  Clock, 
  Star, 
  Filter,
  Search,
  Mountain,
  Waves,
  Compass,
  Camera,
  Tent,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWIthFallback';

export function EventsPage({ navigateToPage }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const events = [
    {
      id: 1,
      title: "Himalayan Base Camp Trek",
      category: "trekking",
      location: "Himachal Pradesh",
      duration: "12 Days",
      difficulty: "Hard",
      price: "₹45,000",
      rating: 4.9,
      reviews: 156,
      participants: "8-15",
      nextDate: "2025-03-15",
      image: "https://images.unsplash.com/photo-1690842855840-0b56f4b2a208?ixlib=rb-4.1.0&q=80&w=1080",
      description: "Experience the ultimate Himalayan adventure with breathtaking views and expert guides.",
      highlights: ["Base Camp Views", "Professional Guides", "All Equipment Included"],
      icon: Mountain
    },
    {
      id: 2,
      title: "Ganges River Rafting",
      category: "water-sports",
      location: "Rishikesh",
      duration: "3 Days",
      difficulty: "Medium",
      price: "₹8,500",
      rating: 4.7,
      reviews: 89,
      participants: "6-12",
      nextDate: "2025-02-20",
      image: "https://images.unsplash.com/photo-1718383536473-72371285f250?ixlib=rb-4.1.0&q=80&w=1080",
      description: "Navigate the sacred Ganges with thrilling rapids and serene moments.",
      highlights: ["Grade III Rapids", "Sacred River", "Safety Equipment"],
      icon: Waves
    },
    // ... other events
  ];

  const categories = [
    { value: 'all', label: 'All Categories', icon: Compass },
    { value: 'trekking', label: 'Trekking', icon: Mountain },
    { value: 'water-sports', label: 'Water Sports', icon: Waves },
    { value: 'climbing', label: 'Climbing', icon: Compass },
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

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'Medium': return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      case 'Hard': return 'bg-red-500/10 text-red-600 border-red-500/20';
      default: return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    }
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-miv-navy to-miv-sky-blue">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Discover Your Next
            <span className="block text-miv-cyan">ADVENTURE</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
            From Himalayan peaks to tropical backwaters, find your perfect adventure experience
          </p>
          <div className="flex flex-col items-center space-y-4">
            <Badge className="bg-green-500/10 text-green-600 border-green-500/20 px-4 py-2">
              <CheckCircle className="h-4 w-4 mr-2" />
              🔴 Live Demo: Try the filters below to see real-time search results!
            </Badge>
            {(searchTerm || selectedLocation !== 'all' || selectedDifficulty !== 'all' || selectedCategory !== 'all') && (
              <div className="bg-miv-cyan/20 backdrop-blur-sm border border-miv-cyan/30 rounded-full px-6 py-2 animate-fade-in-up">
                <span className="text-sm font-medium text-white">
                  ✨ Filters Active - Showing {filteredEvents.length} matching adventures
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Search + Filters */}
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
                <SelectTrigger>
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="Himachal Pradesh">Himachal Pradesh</SelectItem>
                  <SelectItem value="Rishikesh">Rishikesh</SelectItem>
                  <SelectItem value="Maharashtra">Maharashtra</SelectItem>
                  <SelectItem value="Uttarakhand">Uttarakhand</SelectItem>
                  <SelectItem value="Rajasthan">Rajasthan</SelectItem>
                  <SelectItem value="Kerala">Kerala</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger>
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="Easy">Easy</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Hard">Hard</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(c => (
                    <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Category Tabs */}
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
              <TabsList className="grid w-full grid-cols-5 mb-8">
                {categories.map(c => {
                  const Icon = c.icon;
                  return (
                    <TabsTrigger key={c.value} value={c.value} className="flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      <span className="hidden sm:inline">{c.label}</span>
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
          <h2 className="text-3xl font-bold mb-8">{filteredEvents.length} Adventures Found</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event, i) => {
              const Icon = event.icon;
              return (
                <Card key={event.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="relative">
                    <ImageWithFallback src={event.image} alt={event.title} className="w-full h-48 object-cover group-hover:scale-110 transition-transform" />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <Badge className={`${getDifficultyColor(event.difficulty)} border`}>{event.difficulty}</Badge>
                      <Badge variant="secondary" className="bg-white/90 text-foreground">
                        <Icon className="h-3 w-3 mr-1" /> {event.category}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-lg text-sm font-semibold">{event.price}</div>
                  </div>
                  <CardHeader>
                    <h3 className="text-xl font-bold group-hover:text-miv-cyan">{event.title}</h3>
                    <p className="text-muted-foreground text-sm">{event.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="flex items-center"><MapPin className="h-4 w-4 mr-1" /> {event.location}</span>
                      <span className="flex items-center"><Clock className="h-4 w-4 mr-1" /> {event.duration}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="flex items-center"><Users className="h-4 w-4 mr-1" /> {event.participants}</span>
                      <span className="flex items-center"><Star className="h-4 w-4 text-yellow-400 mr-1" /> {event.rating} ({event.reviews})</span>
                    </div>
                    <div className="space-y-2 mb-4">
                      {event.highlights.map((h, idx) => (
                        <div key={idx} className="text-xs flex items-center text-muted-foreground">
                          <div className="w-1 h-1 bg-miv-cyan rounded-full mr-2"></div> {h}
                        </div>
                      ))}
                    </div>
                    <Button className="w-full bg-miv-cyan hover:bg-miv-sky-blue text-white" onClick={() => navigateToPage('payment')}>
                      Book Now <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          {filteredEvents.length === 0 && <p className="text-center py-16">No adventures found</p>}
        </div>
      </section>
    </div>
  );
}
