import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Progress } from '../ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  TrendingUp, 
  Award, 
  Heart, 
  Activity,
  Footprints,
  Mountain,
  User,
  Settings,
  Bell,
  Download,
  Eye,
  CheckCircle,
  AlertCircle,
  BarChart3
} from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWIthFallback';
import { Header } from '../layout/Header';
import { Footer } from '../layout/Footer';

export function UserDashboard({ navigateToPage, darkMode, toggleDarkMode }) {
  const [activeTab, setActiveTab] = useState('overview');

  const userProfile = {
    name: "Priya Sharma",
    email: "priya.sharma@email.com",
    phone: "+91 98765 43210",
    avatar: "https://images.unsplash.com/photo-1573496267526-8fba73ad0b87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGhpa2luZyUyMHBvcnRyYWl0fGVufDF8fHx8MTc1NjY1MzAzM3ww&ixlib=rb-4.1.0&q=80&w=1080",
    memberSince: "2023",
    level: "Adventure Enthusiast",
    totalTreks: 12,
    totalDistance: 245
  };

  const bookings = [
    {
      id: 1,
      title: "Himalayan Base Camp Trek",
      status: "upcoming",
      date: "2025-03-15",
      duration: "12 Days",
      location: "Himachal Pradesh",
      price: "₹45,000",
      image: "https://images.unsplash.com/photo-1690842855840-0b56f4b2a208?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMHRyZWtraW5nJTIwaGltYWxheWElMjBhZHZlbnR1cmV8ZW58MXx8fHwxNzU2NjUyMzM1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      guide: "Rajesh Kumar",
      participants: 12
    },
    {
      id: 2,
      title: "Valley of Flowers Trek",
      status: "completed",
      date: "2024-08-10",
      duration: "7 Days",
      location: "Uttarakhand",
      price: "₹25,000",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMHN1bnNldCUyMGFkdmVudHVyZXxlbnwxfHx8fDE3NTY2NTMwNTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
      guide: "Anita Verma",
      participants: 15,
      rating: 5
    },
    {
      id: 3,
      title: "Kerala Backwater Adventure",
      status: "completed",
      date: "2024-12-05",
      duration: "5 Days",
      location: "Kerala",
      price: "₹18,000",
      image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrZXJhbGElMjBiYWNrd2F0ZXIlMjBib2F0fGVufDF8fHx8MTc1NjY1MjM0N3ww&ixlib=rb-4.1.0&q=80&w=1080",
      guide: "Mohit Shah",
      participants: 8,
      rating: 4
    }
  ];

  const healthStats = {
    totalSteps: 145670,
    totalCalories: 8954,
    totalDistance: 124.5,
    avgHeartRate: 142,
    improvements: {
      fitness: 85,
      endurance: 78,
      strength: 72
    }
  };

  const achievements = [
    { id: 1, title: "First Trek", description: "Completed your first adventure", icon: Mountain, earned: true },
    { id: 2, title: "High Altitude", description: "Reached above 4000m", icon: TrendingUp, earned: true },
    { id: 3, title: "Distance Walker", description: "Walked 100+ km total", icon: Footprints, earned: true },
    { id: 4, title: "Marathon", description: "Walked 200+ km total", icon: Award, earned: false },
    { id: 5, title: "Peak Conqueror", description: "Summited 5 peaks", icon: Mountain, earned: false },
    { id: 6, title: "Team Player", description: "Completed 10 group treks", icon: User, earned: true }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      case 'completed': return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'cancelled': return 'bg-red-500/10 text-red-600 border-red-500/20';
      default: return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    }
  };

  return (
    <div className="min-h-screen pt-16 bg-muted/30">
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
              <AvatarFallback>{userProfile.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Welcome back, {userProfile.name}!</h1>
              <p className="text-muted-foreground">{userProfile.level} • Member since {userProfile.memberSince}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 mt-4 md:mt-0">
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="bookings">My Bookings</TabsTrigger>
            <TabsTrigger value="health">Health & Progress</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Treks</p>
                      <p className="text-3xl font-bold text-foreground">{userProfile.totalTreks}</p>
                    </div>
                    <Mountain className="h-8 w-8 text-miv-cyan" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Distance Covered</p>
                      <p className="text-3xl font-bold text-foreground">{userProfile.totalDistance}km</p>
                    </div>
                    <Footprints className="h-8 w-8 text-miv-cyan" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Calories Burned</p>
                      <p className="text-3xl font-bold text-foreground">{healthStats.totalCalories.toLocaleString()}</p>
                    </div>
                    <Activity className="h-8 w-8 text-miv-cyan" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Avg Heart Rate</p>
                      <p className="text-3xl font-bold text-foreground">{healthStats.avgHeartRate}</p>
                    </div>
                    <Heart className="h-8 w-8 text-miv-cyan" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Bookings & Quick Actions */}
            <div className="grid lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Bookings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {bookings.slice(0, 3).map(booking => (
                    <div key={booking.id} className="flex items-center space-x-4 p-3 rounded-lg bg-muted/50">
                      <ImageWithFallback
                        src={booking.image}
                        alt={booking.title}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground">{booking.title}</h4>
                        <p className="text-sm text-muted-foreground">{booking.date} • {booking.location}</p>
                      </div>
                      <Badge className={`${getStatusColor(booking.status)} border`}>
                        {booking.status}
                      </Badge>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full" onClick={() => setActiveTab('bookings')}>
                    View All Bookings
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full justify-start bg-miv-cyan hover:bg-miv-sky-blue text-white" onClick={() => navigateToPage('events')}>
                    <Calendar className="h-4 w-4 mr-2" />
                    Book New Adventure
                  </Button>
                  {/* <Button variant="outline" className="w-full justify-start" onClick={() => navigateToPage('live-tracking')}>
                    <MapPin className="h-4 w-4 mr-2" />
                    Live Tracking
                  </Button> */}
                  <Button variant="outline" className="w-full justify-start" onClick={() => setActiveTab('health')}>
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View Health Reports
                  </Button>
                  <Button variant="outline" className="w-full justify-start" onClick={() => navigateToPage('contact')}>
                    <User className="h-4 w-4 mr-2" />
                    Contact Support
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-foreground">My Bookings</h2>
              <Button className="bg-miv-cyan hover:bg-miv-sky-blue text-white" onClick={() => navigateToPage('events')}>
                Book New Adventure
              </Button>
            </div>

            <div className="grid gap-6">
              {bookings.map(booking => (
                <Card key={booking.id} className="overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3">
                      <ImageWithFallback
                        src={booking.image}
                        alt={booking.title}
                        className="w-full h-48 md:h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-foreground mb-2">{booking.title}</h3>
                          <div className="flex items-center text-muted-foreground text-sm space-x-4">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {booking.date}
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {booking.duration}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              {booking.location}
                            </div>
                          </div>
                        </div>
                        <Badge className={`${getStatusColor(booking.status)} border`}>
                          {booking.status}
                        </Badge>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Guide:</span>
                          <span className="font-medium text-foreground ml-2">{booking.guide}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Participants:</span>
                          <span className="font-medium text-foreground ml-2">{booking.participants} people</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Price:</span>
                          <span className="font-medium text-foreground ml-2">{booking.price}</span>
                        </div>
                        {booking.rating && (
                          <div>
                            <span className="text-muted-foreground">Your Rating:</span>
                            <span className="font-medium text-foreground ml-2">{'⭐'.repeat(booking.rating)}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex space-x-2 mt-4">
                        {booking.status === 'upcoming' ? (
                          <>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-2" />
                              Download Itinerary
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-2" />
                              Certificate
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => navigateToPage('gallery')}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Photos
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Health Tab */}
          <TabsContent value="health" className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-foreground">Health & Progress Tracking</h2>
              <Button variant="outline" onClick={() => navigateToPage('reports')}>
                <BarChart3 className="h-4 w-4 mr-2" />
                Detailed Reports
              </Button>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Fitness Improvements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Overall Fitness</span>
                      <span className="text-sm font-medium text-foreground">{healthStats.improvements.fitness}%</span>
                    </div>
                    <Progress value={healthStats.improvements.fitness} className="h-3" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Endurance</span>
                      <span className="text-sm font-medium text-foreground">{healthStats.improvements.endurance}%</span>
                    </div>
                    <Progress value={healthStats.improvements.endurance} className="h-3" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Strength</span>
                      <span className="text-sm font-medium text-foreground">{healthStats.improvements.strength}%</span>
                    </div>
                    <Progress value={healthStats.improvements.strength} className="h-3" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Activity Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center">
                      <Footprints className="h-5 w-5 text-miv-cyan mr-3" />
                      <span className="text-sm text-muted-foreground">Total Steps</span>
                    </div>
                    <span className="font-semibold text-foreground">{healthStats.totalSteps.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center">
                      <Activity className="h-5 w-5 text-miv-cyan mr-3" />
                      <span className="text-sm text-muted-foreground">Calories Burned</span>
                    </div>
                    <span className="font-semibold text-foreground">{healthStats.totalCalories.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 text-miv-cyan mr-3" />
                      <span className="text-sm text-muted-foreground">Distance</span>
                    </div>
                    <span className="font-semibold text-foreground">{healthStats.totalDistance} km</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center">
                      <Heart className="h-5 w-5 text-miv-cyan mr-3" />
                      <span className="text-sm text-muted-foreground">Avg Heart Rate</span>
                    </div>
                    <span className="font-semibold text-foreground">{healthStats.avgHeartRate} bpm</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-foreground">Achievements & Badges</h2>
              <div className="text-sm text-muted-foreground">
                {achievements.filter(a => a.earned).length} of {achievements.length} earned
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map(achievement => {
                const IconComponent = achievement.icon;
                return (
                  <Card key={achievement.id} className={`${achievement.earned ? 'border-miv-cyan shadow-lg' : 'opacity-60'}`}>
                    <CardContent className="p-6 text-center">
                      <div className={`${achievement.earned ? 'bg-miv-cyan' : 'bg-gray-400'} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">{achievement.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{achievement.description}</p>
                      {achievement.earned ? (
                        <div className="flex items-center justify-center text-green-600">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          <span className="text-sm font-medium">Earned</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center text-yellow-600">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          <span className="text-sm font-medium">In Progress</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
