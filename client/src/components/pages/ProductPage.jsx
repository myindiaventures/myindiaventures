import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Header } from '../layout/Header'; // Integrated Header
import { Footer } from '../layout/Footer'; // Integrated Footer
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
  Sunrise, // Added for Itinerary clarity
  Sunset, // Added for Itinerary clarity
  Bus,
  Loader2
} from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWIthFallback';
import { eventService } from '../../services/api';
import { getImageSource, getGalleryImages, formatPrice, formatDate } from '../../utils/imageUtils';
// Removed explicit imports for types (PageType, EventData)
import koraigad01 from '../../assets/locations/koraigad01.png';
import koraigad02 from '../../assets/locations/koraigad02.jpg';
import koraigad03 from '../../assets/locations/koraigad03.jpg';
import koraigad04 from '../../assets/locations/koraigad04.jpg';
import koraigad05 from '../../assets/locations/koraigad05.png';

// ProductPage component in pure JavaScript/JSX
export function ProductPage({ navigateToPage, event, darkMode, toggleDarkMode, eventId }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
  const [eventData, setEventData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_BASE_URL = "https://myindiaventuresserver.vercel.app/miv";

  // Fetch event data from backend
  useEffect(() => {
    const fetchEventData = async () => {
      if (eventId) {
        try {
          setIsLoading(true);
          setError(null);
          const response = await eventService.getEventById(eventId);
          
          if (response.success && response.data) {
            setEventData(response.data);
          } else {
            throw new Error('Invalid response format');
          }
        } catch (err) {
          console.error('Error fetching event:', err);
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchEventData();
  }, [eventId]);

  // Transform backend event data to frontend format
  const transformEventData = (backendEvent) => {
    return {
      id: backendEvent._id,
      title: backendEvent.title,
      category: backendEvent.category,
      location: backendEvent.location,
      duration: backendEvent.duration,
      difficulty: backendEvent.difficulty,
      price: formatPrice(backendEvent.price),
      rating: backendEvent.rating,
      reviews: backendEvent.reviews,
      participants: backendEvent.participants.toString(),
      nextDate: formatDate(backendEvent.nextDate),
      image: getImageSource(backendEvent.image, koraigad01),
      description: backendEvent.description,
      highlights: backendEvent.highlights || [],
      highlightsDescription: backendEvent.highlightsDescription || [],
      itinerary: backendEvent.itinerary || [],
      included: backendEvent.included || [],
      notIncluded: backendEvent.notIncluded || [],
      essentialInfo: backendEvent.essentialInfo || [],
      galleryImages: backendEvent.galleryImages || []
    };
  };

  // Default/fallback event (UPDATED ITINERARY AND ESSENTIAL INFO)
  const defaultEvent = {
    id: 1,
    title: "Koraigad Fort Trek & Lonavala Explorer", // Adjusted title
    category: "trekking",
    location: "Lonavala, Maharashtra",
    duration: "1 Day",
    difficulty: "Beginner",
    price: "₹1,199",
    rating: 4.9,
    reviews: 156,
    participants: "18",
    nextDate: "2025-11-16",
    image: koraigad01,
    description: "Embark on an exhilarating monsoon adventure that blends history, breathtaking vistas, and serene nature escapes! Join us as we explore the majestic Koraigad Fort, a historic sentinel offering panoramic views of the surrounding Western Ghats. Trek through lush green trails, discover ancient ruins, and immerse yourself in the rich legacy of the Maratha empire. But the adventure doesn't stop there! We'll also dive into the picturesque charm of Lonavala. Witness the dramatic landscape from the iconic Tiger Point, where clouds often float below, creating an ethereal spectacle. Marvel at the unique rock formation of Shivling Point, a natural wonder that inspires awe. Finally, we'll unwind and capture stunning photographs at the famous Bhushi Dam, enjoying its cascading waters and lively atmosphere. This trip is a perfect blend of trekking, sightseeing, and monsoon magic, designed for adventurers and nature lovers alike!",
    highlights: ["Koraigad Fort Trek", "Tiger Point (Vaghjai Plateau)", "Shivling Point View", "Bhushi Dam Water Fun"],
    highlightsDescription: ["Explore ancient fortifications, temples, and enjoy 360-degree views from the plateau.", "Witness incredible valley views, often shrouded in mystic fog.", "Observe the distinctive natural rock formation near the peak.", "Enjoy the gushing waters and vibrant atmosphere (seasonal)."],
  };

  // Use fetched event data, passed event, or default event
  const currentEvent = eventData ? transformEventData(eventData) : (event || defaultEvent);

  // Use backend gallery images if available, otherwise use default
  const galleryImages = currentEvent.galleryImages && currentEvent.galleryImages.length > 0
    ? getGalleryImages(currentEvent.galleryImages, [currentEvent.image, koraigad02, koraigad03, koraigad04, koraigad05])
    : [currentEvent.image, koraigad02, koraigad03, koraigad04, koraigad05];

  // --- ITINERARY: Use backend data if available, otherwise use default ---
  const getItinerary = () => {
    if (currentEvent.itinerary && currentEvent.itinerary.length > 0) {
      return currentEvent.itinerary.map((item, index) => ({
        day: item.day || index + 1,
        title: item.title,
        description: item.description,
        icon: [Bus, Mountain, Camera, Sunset, Bus][index % 5] // Cycle through icons
      }));
    }
    
    // Default itinerary
    return [
      { day: 1, title: "Meeting & Journey to Base", icon: Bus, description: "Meet at the designated spot (e.g., Dadar/Thane) early morning. Depart for Koraigad base village via AC Traveller. Breakfast en route." },
      { day: 2, title: "Koraigad Fort Ascent & Explore", icon: Mountain, description: "Reach the base village and start the trek to Koraigad Fort (approx. 1.5 hours one way). Explore the Koraidevi Temple, fortifications, and enjoy the panoramic plateau view." },
      { day: 3, title: "Lonavala Sightseeing: Tiger Point & Shivling Point", icon: Camera, description: "Descend the fort and head towards Lonavala. Visit Tiger Point for dramatic valley views and a brief stop at Shivling Point to admire the unique rock formation." },
      { day: 4, title: "Bhushi Dam & Lunch", icon: Sunset, description: "Enjoy the lively atmosphere and cascading waters at Bhushi Dam. Have lunch (not included) at a local restaurant. Some free time for local snacks." },
      { day: 5, title: "Departure to City", icon: Bus, description: "Start the return journey to Mumbai/Pune in the late afternoon. Arrive back at the starting point by late evening, carrying memories of the Sahyadri adventure!" },
    ];
  };

  const itinerary = getItinerary();

  // --- ESSENTIAL INFO: Use backend data if available, otherwise use default ---
  const getEssentialInfo = () => {
    if (currentEvent.essentialInfo && currentEvent.essentialInfo.length > 0) {
      return currentEvent.essentialInfo.map(item => ({
        label: item.label,
        value: item.value,
        icon: [Award, Users, Calendar, Mountain][Math.floor(Math.random() * 4)] // Random icon assignment
      }));
    }
    
    // Default essential info
    return [
      { label: "Fitness Level", value: "Moderate Stamina Required", icon: Award },
      { label: "Group Size", value: currentEvent.participants + " people", icon: Users },
      { label: "Best Season", value: "Monsoon (June - Sep) for waterfalls & greenery", icon: Calendar },
      { label: "Altitude", value: "Koraigad is ~920m (3,028ft)", icon: Mountain },
    ];
  };

  const essentialInfo = getEssentialInfo();
  
  // NOTE: The inclusion and exclusion lists were already somewhat suitable for a day trip,
  // but a typical day trip usually excludes 'Lunch' (as seen in your list)

  // Use backend data for included/notIncluded if available
  const included = currentEvent.included && currentEvent.included.length > 0 
    ? currentEvent.included 
    : [
        "AC Traveller Transportation (City to City)",
        "Breakfast included",
        "Male & Female Guide (Expert Trek Leaders)",
        "Medical Kit & First Aid",
        "Momentos/Certificates",
        "Forest Entry Permits"
      ];

  const notIncluded = currentEvent.notIncluded && currentEvent.notIncluded.length > 0 
    ? currentEvent.notIncluded 
    : [
        "Lunch and Dinner",
        "Personal expenses & snacks",
        "Travel insurance",
        "Tips for guides & staff",
        "Any items not mentioned in inclusions"
      ];
// --- END OF UPDATED DATA ---

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'Intermediate': return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      case 'Advance': return 'bg-red-500/10 text-red-600 border-red-500/20';
      default: return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    }
  };

  return (
    <React.Fragment>
      <Header navigateToPage={navigateToPage} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <div className="min-h-screen pt-16 bg-background">
        
        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <Loader2 className="h-12 w-12 animate-spin text-miv-cyan mx-auto mb-4" />
              <h2 className="text-2xl font-semibold mb-2">Loading Event Details...</h2>
              <p className="text-muted-foreground">Please wait while we fetch the latest information</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="max-w-2xl mx-auto text-center">
              <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold mb-2">Failed to Load Event</h2>
              <p className="text-muted-foreground mb-6">{error}</p>
              <Button 
                onClick={() => window.location.reload()} 
                className="bg-miv-cyan hover:bg-miv-cyan/90"
              >
                Try Again
              </Button>
            </div>
          </div>
        )}

        {/* Main Content - Only show when not loading and no error */}
        {!isLoading && !error && (
          <>
            {/* Hero Section with Image Gallery */}
        <section className="py-8 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Image Gallery */}
              <div className="space-y-4">
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
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
                <div className="grid grid-cols-4 gap-3">
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

                {/* Quick Info Cards */}
                <div className="grid grid-cols-2 gap-4">
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
                        <p className="text-4xl font-bold text-miv-cyan">{currentEvent.price}</p>
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
                      onClick={() => navigateToPage('payment')}
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {currentEvent.highlights.map((highlight, idx) => (
                <Card key={idx} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 mx-auto mb-3 bg-miv-cyan/10 rounded-full flex items-center justify-center">
                      <Check className="h-6 w-6 text-miv-cyan" />
                    </div>
                    <p className="font-semibold text-sm">{highlight}</p>
                    <p className="text-xs text-muted-foreground">{currentEvent.highlightsDescription[idx]}</p>
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
                    <h2 className="text-2xl font-bold">About This Adventure</h2>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      This adventure is a perfect blend of **history, trekking, and classic Lonavala sightseeing**. The Koraigad Fort trek offers a rewarding climb with panoramic views, making it an ideal choice for **beginners** and those looking for a quick nature escape from the city.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      We've paired the historic trek with visits to the region's famous viewpoints—**Tiger Point** and **Shivling Point**—before concluding the day with the lively atmosphere of **Bhushi Dam**. Our expert guides ensure safety and share local knowledge, making your single day getaway both thrilling and enriching.
                    </p>
                    <div className="grid md:grid-cols-3 gap-6 pt-6 border-t">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-miv-cyan/10 rounded-lg">
                          <Shield className="h-5 w-5 text-miv-cyan" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Beginner Friendly</h4>
                          <p className="text-sm text-muted-foreground">The Koraigad trail is well-defined and suitable for first-time trekkers.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-miv-cyan/10 rounded-lg">
                          <Award className="h-5 w-5 text-miv-cyan" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Historical Immersion</h4>
                          <p className="text-sm text-muted-foreground">Explore the ruins and temples of a 17th-century Maratha fort.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-miv-cyan/10 rounded-lg">
                          <Camera className="h-5 w-5 text-miv-cyan" />
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Monsoon Magic</h4>
                          <p className="text-sm text-muted-foreground">Experience the Sahyadris at their greenest and the waterfalls at their peak.</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="itinerary" className="space-y-4">
                {itinerary.map((day, idx) => {
                    const IconComponent = day.icon;
                    return (
                        <Card key={idx} className="hover:shadow-lg transition-shadow">
                          <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                              <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-miv-cyan rounded-full flex items-center justify-center">
                                  <IconComponent className="h-6 w-6 text-white" />
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
                      );
                    }
                )}
                <Card className="bg-miv-cyan/5 border-miv-cyan/30">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <Info className="h-5 w-5 text-miv-cyan flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold mb-2">Important Note on Timing</h4>
                        <p className="text-sm text-muted-foreground">
                          As this is a 1-day trip, all timings are subject to change based on traffic conditions, group speed during the trek, and crowds at the sightseeing points, especially during the peak monsoon weekend.
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
                          'Trekking shoes (mandatory, with good grip)',
                          'Rainwear/Windcheater (especially for monsoon)',
                          'At least 2 litres of water',
                          'Personal medication & a small First Aid Kit',
                          'Energy bars/snacks for the trek',
                          'ID Proof (Aadhaar/Driving License)',
                          'Camera & Power Bank (optional but recommended)',
                          'Extra pair of clothes (for changing after the dam visit)'
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
                Don't miss out on this incredible experience. Limited spots available for {currentEvent.nextDate}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  size="lg"
                  className="bg-white text-miv-navy hover:bg-white/90 px-8 py-6 text-lg group"
                  onClick={() => navigateToPage('payment')}
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

        {/* Similar Adventures */}
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8">You Might Also Like</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Valley of Flowers Trek",
                  location: "Uttarakhand",
                  price: "₹25,000",
                  image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMHN1bnNldCUyMGFkdmVudHVyZXxlbnwxfHx8fDE3NTY2NTMwNTF8MA&lib=rb-4.1.0&q=80&w=1080",
                  rating: 4.9
                },
                {
                  title: "Ganges River Rafting",
                  location: "Rishikesh",
                  price: "₹8,500",
                  image: "https://images.unsplash.com/photo-1718383536473-72371285f250?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaXZlciUyMHJhZnRpbmclMjBhZHZlbnR1cmUlMjBzcG9ydHMlMjBvdXRkb29yfGVufDF8fHx8MTc1NjY1MjMzOHww&lib=rb-4.1.0&q=80&w=1080",
                  rating: 4.7
                },
                {
                  title: "Desert Safari",
                  location: "Rajasthan",
                  price: "₹15,000",
                  image: "https://images.unsplash.com/photo-1539650116574-75c0c6d73719?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNlcnQlMjBjYW1waW5nJTIwcmFqYXN0aGFufGVufDF8fHx8MTc1NjY1MjM0NXww&lib=rb-4.1.0&q=80&w=1080",
                  rating: 4.6
                }
              ].map((adventure, idx) => (
                <Card key={idx} className="group hover:shadow-xl transition-all cursor-pointer">
                  <div className="relative overflow-hidden">
                    <ImageWithFallback
                      src={adventure.image}
                      alt={adventure.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 rounded-lg px-3 py-1 text-sm font-semibold">
                      {adventure.price}
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold mb-2 group-hover:text-miv-cyan transition-colors">
                      {adventure.title}
                    </h3>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-muted-foreground">
                        <MapPin className="h-3 w-3 mr-1" />
                        {adventure.location}
                      </div>
                      <div className="flex items-center">
                        <Star className="h-3 w-3 text-yellow-400 fill-yellow-400 mr-1" />
                        {adventure.rating}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
          </>
        )}
      </div>
      <Footer navigateToPage={navigateToPage} />
    </React.Fragment>
  );
}