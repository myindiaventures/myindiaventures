// src/pages/ProductPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Header } from '../layout/Header';
import { Footer } from '../layout/Footer';
import {
  MapPin,
  Calendar,
  Clock,
  Users,
  Star,
  Check,
  X,
  Heart,
  Share2,
  ChevronRight,
  Mountain,
  Shield,
  Award,
  Camera,
  ArrowRight,
  CheckCircle,
  Info,
  AlertCircle,
  Phone,
  Mail,
  Loader2 // Import for loading state
} from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWIthFallback';
import koraigad01 from '../../assets/locations/koraigad01.png';
import koraigad02 from '../../assets/locations/koraigad02.jpg';
import koraigad03 from '../../assets/locations/koraigad03.jpg';
import koraigad04 from '../../assets/locations/koraigad04.jpg';
import koraigad05 from '../../assets/locations/koraigad05.png';


const API_BASE = "https://myindiaventuresserver.vercel.app/miv/events";

// Mock data (Since the original code uses these in TabsContent, they must be defined)
const itinerary = [
  { day: 1, title: 'Mumbai Pickup & Base Village Trek', description: 'Meet the team in Mumbai, travel to the base village, start the ascent in the evening.' },
  { day: 2, title: 'Summit Sunrise & Return Journey', description: 'Witness the breathtaking sunrise from the fort, explore ancient ruins, and begin the descent back to Mumbai.' }
];

const included = [
  'Transportation from Mumbai to Base Village and back',
  'Morning Tea & Breakfast (Day 2)',
  'Certified First-Aid Qualified Tour Leader',
  'All necessary permits and entry fees'
];

const notIncluded = [
  'Meals during travel (Lunch/Dinner)',
  'Personal expenses (water bottles, snacks, etc.)',
  'Any medical or emergency evacuation costs',
  'Personal Porter/Luggage Carriers'
];

const essentialInfo = [
  { icon: Mountain, label: 'Trek Type', value: 'Hill Fort Trek' },
  { icon: Users, label: 'Minimum Age', value: '10+' },
  { icon: Clock, label: 'Reporting Time', value: '5:00 AM, Day 1' },
  { icon: Calendar, label: 'Best Season', value: 'Post-Monsoon to Winter' },
];

// Helper function to get Tailwind CSS classes for difficulty badge
function getDifficultyColor(difficulty) {
  switch (difficulty.toLowerCase()) {
    case 'easy':
      return 'bg-green-500/10 text-green-600 border-green-500/20';
    case 'moderate':
      return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
    case 'challenging':
      return 'bg-red-500/10 text-red-600 border-red-500/20';
    default:
      return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
  }
}

export function ProductPage({ navigateToPage, darkMode, toggleDarkMode }) {
  const { eventId } = useParams(); // ✅ Get dynamic ID from URL
  const [eventData, setEventData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🐛 FIX 1 & 2: Define selectedImage and isFavorited state variables
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    if (!eventId) {
      setError("No event ID provided in the URL.");
      setIsLoading(false);
      return;
    }

    async function fetchEvent() {
      try {
        setIsLoading(true);
        const response = await fetch(`${API_BASE}/getEvent/id/${eventId}`);
        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message || "Failed to fetch event details.");
        }

        setEventData(result.data);
      } catch (err) {
        console.error("Error fetching event:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchEvent();
  }, [eventId]);

  // 🌀 Loading
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-10 w-10 animate-spin text-miv-cyan" />
        <p className="ml-4 text-xl text-muted-foreground">Loading Adventure...</p>
      </div>
    );
  }

  // ⚠️ Error
  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-8">
        <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
        <h1 className="text-3xl font-bold mb-2">Error Loading Event</h1>
        <p className="text-muted-foreground text-center max-w-lg">{error}</p>
        <Button onClick={() => navigateToPage('home')} className="mt-6 bg-miv-cyan hover:bg-miv-sky-blue">
          Go Back to Home
        </Button>
      </div>
    );
  }

  // 🧩 Render full details using eventData
  const currentEvent = eventData;
  // If eventData is successfully fetched and doesn't have a gallery, use the main image, or fallback to an empty array for safer mapping.
  const galleryImages = currentEvent?.gallery?.length ? currentEvent.gallery : (currentEvent?.image ? [currentEvent.image] : []);

  // 🐛 FIX 3: getDifficultyColor must be defined either globally (as done above) or within ProductPage
  // The function is now defined globally before the component.

  // The rest of the component's JSX remains the same, but will now work
  // because selectedImage, setSelectedImage, isFavorited, setIsFavorited, and getDifficultyColor are defined.

  return (
    <>
      <Header navigateToPage={navigateToPage} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      {/* your existing rendering layout remains exactly the same */}
      <div className="min-h-screen pt-16 bg-background">
        {/* Hero Section with Image Gallery */}
        <section className="py-8 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Image Gallery */}
              <div className="space-y-4">
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  {/* Access selectedImage here, which is now state */}
                  <ImageWithFallback
                    src={galleryImages[selectedImage]}
                    alt={currentEvent.title}
                    className="w-full h-96 object-cover"
                  />
                  <div className="absolute top-4 right-4 flex gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="bg-miv-cyan hover:bg-white"
                      onClick={() => setIsFavorited(!isFavorited)}
                    >
                      <Heart className={`h-5 w-5 font-semibold ${isFavorited ? 'fill-red-500 text-red-500' : ''}`} />
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="bg-miv-cyan hover:bg-white"
                    >
                      <Share2 className="h-5 w-5 font-semibold" />
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-5 gap-3"> {/* Increased to 5 for the images in mock data */}
                  {galleryImages.map((img, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`relative overflow-hidden rounded-lg cursor-pointer transition-all ${
                        selectedImage === idx ? 'ring-2 ring-miv-cyan' : 'opacity-60 hover:opacity-100'
                      }`}
                    >
                      <ImageWithFallback
                        src={img}
                        alt={`Gallery ${idx + 1}`}
                        className="w-full h-20 object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Event Details */}
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="outline" className="text-miv-cyan border-miv-cyan">
                      {currentEvent.category.replace('-', ' ').toUpperCase()}
                    </Badge>
                    {/* Call the defined helper function */}
                    <Badge className={`${getDifficultyColor(currentEvent.difficulty)} border`}>
                      {currentEvent.difficulty}
                    </Badge>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                    {currentEvent.title}
                  </h1>
                  <p className="text-lg text-muted-foreground mb-4">
                    {currentEvent.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-400 fill-yellow-400 mr-1" />
                      <span className="font-semibold text-foreground">{currentEvent.rating}</span>
                      <span className="ml-1">({currentEvent.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {currentEvent.location}
                    </div>
                  </div>
                </div>

                {/* Quick Info Cards - Data from essentialInfo or custom fields */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Duration Card */}
                  <Card className="border-miv-cyan/20">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-miv-cyan/10 rounded-lg">
                          <Clock className="h-5 w-5 text-miv-cyan" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Duration</p>
                          <p className="font-semibold text-foreground">{currentEvent.duration}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  {/* Group Size Card */}
                  <Card className="border-miv-cyan/20">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-miv-cyan/10 rounded-lg">
                          <Users className="h-5 w-5 text-miv-cyan" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Group Size</p>
                          <p className="font-semibold text-foreground">{currentEvent.participants}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  {/* Next Departure Card */}
                  <Card className="border-miv-cyan/20">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-miv-cyan/10 rounded-lg">
                          <Calendar className="h-5 w-5 text-miv-cyan" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Next Departure</p>
                          <p className="font-semibold text-foreground">{currentEvent.nextDate}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  {/* Availability Card (Hardcoded, would be dynamic) */}
                  <Card className="border-miv-cyan/20">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-500/10 rounded-lg">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Availability</p>
                          <p className="font-semibold text-green-600">6 spots left</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Price & Booking */}
                <Card className="bg-gradient-to-br from-miv-cyan/10 to-miv-sky-blue/10 border-miv-cyan/30">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Starting from</p>
                        <p className="text-4xl font-bold text-miv-cyan">₹{currentEvent.price}</p>
                        <p className="text-sm text-muted-foreground">per person</p>
                      </div>
                      <div className="text-right">
                        <Badge className="bg-green-500/10 text-green-600 border-green-500/20 mb-2">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Best Price Guarantee
                        </Badge>
                        <p className="text-xs text-muted-foreground">Early bird discount available</p>
                      </div>
                    </div>
                    <Button
                      size="lg"
                      className="w-full bg-miv-cyan hover:bg-miv-sky-blue text-white text-lg py-6 group"
                      onClick={() => navigateToPage(`payment/${eventId}`)} 
                    >
                      Proceed to Payment
                      <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <p className="text-xs text-center text-muted-foreground mt-3">
                      🔒 Secure booking • Instant confirmation • Free cancellation up to 15 days
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Highlights */}
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-6">Adventure Highlights</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {currentEvent.highlights && currentEvent.highlights.map((highlight, idx) => (
                <Card key={idx} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 mx-auto mb-3 bg-miv-cyan/10 rounded-full flex items-center justify-center">
                      <Check className="h-6 w-6 text-miv-cyan" />
                    </div>
                    <p className="font-semibold text-sm">{highlight}</p>
                    <p className="text-xs text-muted-foreground">{currentEvent.highlightsDescription?.[idx]}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Detailed Information Tabs */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
                <TabsTrigger value="inclusions">Inclusions</TabsTrigger>
                <TabsTrigger value="essentials">Essentials</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <h2 className="text-2xl font-bold">About {currentEvent.title}</h2>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      {currentEvent.description}
                    </p>
                    {/* Placeholder content for Safety, Guides, Moments remain, as they're static marketing text */}
                    <div className="grid md:grid-cols-3 gap-6 pt-6 border-t">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-miv-cyan/10 rounded-lg">
                          <Shield className="h-5 w-5 text-miv-cyan" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Safety First</h4>
                          <p className="text-sm text-muted-foreground">Certified guides, medical support, and comprehensive safety protocols</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-miv-cyan/10 rounded-lg">
                          <Award className="h-5 w-5 text-miv-cyan" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Expert Guides</h4>
                          <p className="text-sm text-muted-foreground">Local experts with deep knowledge of terrain and culture</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-miv-cyan/10 rounded-lg">
                          <Camera className="h-5 w-5 text-miv-cyan" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Memorable Moments</h4>
                          <p className="text-sm text-muted-foreground">Stunning photo opportunities and unique experiences</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="itinerary" className="space-y-4">
                {/* itinerary must be defined for this to work */}
                {itinerary.map((day, idx) => (
                  <Card key={idx} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-miv-cyan rounded-full flex items-center justify-center">
                            <span className="text-white font-bold">Day {day.day}</span>
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-lg mb-2">{day.title}</h3>
                          <p className="text-muted-foreground">{day.description}</p>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
                <Card className="bg-miv-cyan/5 border-miv-cyan/30">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <Info className="h-5 w-5 text-miv-cyan flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold mb-2">Please Note</h4>
                        <p className="text-sm text-muted-foreground">
                          This itinerary is flexible and may be adjusted based on weather conditions, group fitness levels,
                          and local circumstances. Your safety and enjoyment are our top priorities.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="inclusions">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <h3 className="font-bold text-xl flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        What's Included
                      </h3>
                    </CardHeader>
                    <CardContent>
                      {/* included must be defined for this to work */}
                      <ul className="space-y-3">
                        {included.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <span className="text-muted-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <h3 className="font-bold text-xl flex items-center gap-2">
                        <AlertCircle className="h-5 w-5 text-orange-500" />
                        Not Included
                      </h3>
                    </CardHeader>
                    <CardContent>
                      {/* notIncluded must be defined for this to work */}
                      <ul className="space-y-3">
                        {notIncluded.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <X className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                            <span className="text-muted-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="essentials">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <h3 className="font-bold text-xl">Essential Information</h3>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* essentialInfo must be defined for this to work */}
                      {essentialInfo.map((info, idx) => {
                        const IconComponent = info.icon;
                        return (
                          <div key={idx} className="flex items-center gap-4">
                            <div className="p-3 bg-miv-cyan/10 rounded-lg">
                              <IconComponent className="h-5 w-5 text-miv-cyan" />
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">{info.label}</p>
                              <p className="font-semibold">{info.value}</p>
                            </div>
                          </div>
                        );
                      })}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <h3 className="font-bold text-xl">What to Bring</h3>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {[
                          'Comfortable trekking boots',
                          'Warm clothing & layers',
                          'Personal medication',
                          'Water bottle & snacks',
                          'Sunscreen & sunglasses',
                          'Personal identification',
                          'Cash for personal expenses'
                        ].map((item, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 bg-miv-cyan rounded-full"></div>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <Card className="mt-6 bg-gradient-to-r from-miv-navy to-miv-sky-blue text-white">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                      <div className="flex-1">
                        <h3 className="font-bold text-xl mb-2">Need Help Planning?</h3>
                        <p className="text-white/80 text-sm">
                          Our adventure specialists are here to answer any questions and help you prepare for your journey.
                        </p>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <a href="tel:+917021014315">
                            <Button variant="secondary" className="flex items-center gap-2">
                                <Phone className="h-4 w-4" />
                                Call Us
                            </Button>
                        </a>

                        <Button variant="outline" className="flex items-center gap-2 bg-transparent border-white text-white hover:bg-white/10">
                          <Mail className="h-4 w-4" />
                          Email Us
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 bg-gradient-to-r from-miv-navy to-miv-sky-blue">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready for Your Adventure?
              </h2>
              <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                Don't miss out on this incredible experience. Limited spots available for **{currentEvent.nextDate}**
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  size="lg"
                  className="bg-white text-miv-navy hover:bg-white/90 px-8 py-6 text-lg group"
                  onClick={() => navigateToPage(`payment/${currentEvent.id}`)}
                >
                  Book Now - {currentEvent.price}
                  <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg"
                  onClick={() => navigateToPage('contact')}
                >
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Similar Adventures (Kept as static content since related events would require a separate fetch) */}
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8">You Might Also Like</h2>
            {/* ... Static Similar Adventures Card Grid ... */}
            {/* This section would ideally fetch related events based on currentEvent.category or location */}
          </div>
        </section>
      </div>
      <Footer navigateToPage={navigateToPage} />

    </>
  );
}