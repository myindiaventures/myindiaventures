import React, { useState } from 'react';
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
  Mail
} from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWIthFallback';
// Removed explicit imports for types (PageType, EventData)
import koraigad01 from '../../assets/locations/koraigad01.png';
import koraigad02 from '../../assets/locations/koraigad02.jpg';
import koraigad03 from '../../assets/locations/koraigad03.jpg';
import koraigad04 from '../../assets/locations/koraigad04.jpg';
import koraigad05 from '../../assets/locations/koraigad05.png';

// ProductPage component in pure JavaScript/JSX
export function ProductPage({ navigateToPage, event, darkMode, toggleDarkMode }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);

  // If no event data, show a default/fallback event
  const defaultEvent = {
    id: 1,
    title: "Koraigad Fort Trek",
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
    highlights: ["Koraigad Fort Trek", "Tiger Point (Vaghjai Plateau)", "Shivling Point", "Bhushi Dam"],
    highlightsDescription: ["Explore ancient fortifications, temples, and enjoy 360-degree views from the plateau.", "Witness incredible valley views, often shrouded in mystic fog", "Observe the distinctive natural rock formation", "Enjoy the gushing waters and vibrant atmosphere (seasonal)."],
  };

  const currentEvent = event || defaultEvent;

  const galleryImages = [
    currentEvent.image,
    koraigad02,
    koraigad03,
    koraigad04,
    koraigad05
  ];

  const itinerary = [
    { day: 1, title: "Arrival & Orientation", description: "Meet at Dadar, gear check, and welcome briefing. Get to know your fellow adventurers and guides." },
    { day: 2, title: "Trek to First Camp", description: "Begin your journey with a scenic 8km trek through alpine meadows and forest trails." },
    { day: 3, title: "Acclimatization Day", description: "Short hikes to help your body adjust to the altitude. Photography and nature walks." },
    { day: 4, title: "Summit Push Begins", description: "Early morning start for the challenging ascent. Breathtaking views await." },
    { day: 5, title: "Base Camp & Return", description: "Reach the base camp, celebrate, and begin descent to lower altitude." },
  ];

  const included = [
    "AC Traveller",
    "Breakfast included",
    "Male & Female Guide",
    "Medical Kit & First Aid",
    "Momentos",
  ];

  const notIncluded = [
    "Personal trekking gear (boots, backpack)",
    "Travel insurance",
    "Lunch",
    "Tips for guides & staff",
    "Any items not mentioned in inclusions"
  ];

  const essentialInfo = [
    { label: "Fitness Level", value: "Good physical fitness required", icon: Award },
    { label: "Group Size", value: currentEvent.participants + " people", icon: Users },
    { label: "Best Season", value: "March to June, Sept to Nov", icon: Calendar },
    { label: "Altitude", value: "Up to 4,500m", icon: Mountain },
  ];

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
                      onClick={() => navigateToPage(`/payment`)}
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
                      Embark on an unforgettable journey through some of India's most spectacular landscapes.
                      This carefully crafted adventure combines physical challenge with breathtaking natural beauty,
                      offering you the chance to push your limits while experiencing the raw majesty of the wilderness.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      Our expert guides bring years of experience in mountain safety and local knowledge, ensuring
                      your adventure is both thrilling and secure. From sunrise vistas that paint the peaks in gold
                      to starlit nights around the campfire, every moment is designed to create lasting memories.
                    </p>
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
      </div>
      <Footer navigateToPage={navigateToPage} />
    </React.Fragment>
  );
}