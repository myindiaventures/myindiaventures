// src/components/pages/EventsPage.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import { Search, CheckCircle, Compass, Mountain, Waves, Tent, Loader2, AlertCircle, TrendingUp } from 'lucide-react';
import { Header } from '../layout/Header';
import { Footer } from '../layout/Footer';
import { EventCard } from '../ui/EventCard';
// IMPORTANT: Import the static image. This import resolves to the final public URL string.
import koraigad01 from '../../assets/locations/koraigad01.jpg';
import Lohagad01 from '../../assets/locations/Lohagad01.jpg';
import Kalsubai01 from '../../assets/locations/Kalsubai01.jpeg';
import devkund01 from '../../assets/locations/devkund01.png';
import { Helmet } from 'react-helmet';


// API Configuration
const API_URL = "https://myindiaventuresserver.vercel.app/miv/events/getAllEvents";

// Helper function to map icon string to Lucide component
const getIconComponent = (category) => {
    switch (category) {
        case 'trekking': return Mountain;
        case 'water-sports': return Waves;
        case 'camping': return Tent;
        default: return Compass;
    }
};

export function EventsPage({ navigateToPage, darkMode, toggleDarkMode }) {
    // State for Filter Controls
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('all');
    const [selectedDifficulty, setSelectedDifficulty] = useState('all');
    const [selectedCategory, setSelectedCategory] = useState('all'); // This controls both the Select and Tabs

    // State for Dynamic Data
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // --- Data Fetching Logic ---
    useEffect(() => {
        async function fetchEvents() {
            try {
                const response = await fetch(API_URL);

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const result = await response.json();

                if (result.success !== true) {
                    throw new Error(result.message || 'API fetch reported a failure.');
                }

                // Transform data for consistency
                const transformedEvents = result.data.map((event, index) => ({
                    ...event,
                    id: event._id,
                    // Format price for display consistency
                    price: new Intl.NumberFormat('en-IN', {
                        style: 'currency',
                        currency: 'INR',
                        maximumFractionDigits: 0
                    }).format(event.price),
                    // Set the 'featured' flag for the first event
                    featured: index === 0, 
                    // Map icon string to Lucide component
                    icon: getIconComponent(event.category),
                    // Use the imported image variable (koraigad01) as the 'image' property
                    image: event.image === 'koraigad01' ? koraigad01 : event.image === 'Lohagad01' ? Lohagad01 : event.image === 'Kalsubai01' ? Kalsubai01 : event.image === 'devkund01' ? devkund01 : null,
                    // Ensure a rating is available for the card
                    rating: event.rating || 4.5,
                    reviews: event.reviews || 0,
                }));

                setEvents(transformedEvents);
            } catch (err) {
                console.error("Error fetching event data:", err);
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        }

        fetchEvents();
    }, []);

    // ... (rest of the component logic remains the same)
    // --- Static Data for Filters (Based on common values) ---
    const categories = [
        { value: 'all', label: 'All Categories', icon: Compass },
        { value: 'trekking', label: 'Trekking', icon: Mountain },
        { value: 'water-sports', label: 'Water Sports', icon: Waves },
        { value: 'camping', label: 'Camping', icon: Tent }
    ];

    // Dynamically extract unique locations and difficulties for filter options
    const allLocations = useMemo(() => ['all', ...new Set(events.map(e => e.location))].filter(Boolean), [events]);
    const allDifficulties = useMemo(() => ['all', ...new Set(events.map(e => e.difficulty))].filter(Boolean), [events]);


    // --- Filtering Logic (now using the dynamic 'events' array) ---
    const filteredEvents = useMemo(() => {
        return events.filter(event => {
            const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                event.location.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesLocation = selectedLocation === 'all' || event.location === selectedLocation;
            const matchesDifficulty = selectedDifficulty === 'all' || event.difficulty === selectedDifficulty;
            const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;

            return matchesSearch && matchesLocation && matchesDifficulty && matchesCategory;
        });
    }, [events, searchTerm, selectedLocation, selectedDifficulty, selectedCategory]);

    // --- Conditional Content Rendering ---

    let eventContent;

    if (isLoading) {
        eventContent = (
            <div className="text-center py-20">
                <Loader2 className="h-10 w-10 animate-spin text-miv-cyan mx-auto mb-4" />
                <p className="text-xl text-muted-foreground">Loading amazing adventures...</p>
            </div>
        );
    } else if (error) {
        eventContent = (
            <div className="text-center py-20 bg-red-50 border border-red-200 rounded-xl">
                <AlertCircle className="h-10 w-10 text-red-600 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-red-700">Oops! Failed to Load Events</h3>
                <p className="text-md text-red-600">We couldn't reach the adventure list. Error: {error}</p>
            </div>
        );
    } else if (filteredEvents.length === 0) {
        eventContent = (
            <div className="text-center py-16">
                <p className="text-lg text-muted-foreground">
                    No adventures found matching your selected filters. Try adjusting your search!
                </p>
            </div>
        );
    } else {
        eventContent = (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredEvents.map(event => (
                    // The onBook prop navigates using the fetched MongoDB _id
                    <EventCard
                        key={event.id}
                        event={event}
                        onBook={() => navigateToPage(`product/${event.id}`)}
                    />
                ))}
            </div>
        );
    }

    // --- Reverting Hero Section to Gradient Only ---
    // If you need the image here, you must use the previous inline style approach.
    // For now, let's assume this section is purely decorative again.

    return (
        <>
             <Helmet>
                <title>Best Trekking Company in India | My India Ventures</title>
                <meta
                name="description"
                content="Join the best trekking company in India — My India Ventures — for unforgettable treks and adventures across Maharashtra, Himachal, and beyond."
                />
                <meta
                name="keywords"
                content="trekking in India, adventure treks, best trekking company, My India Ventures, Maharashtra treks, Lonavala treks"
                />
            </Helmet>
            <div className="min-h-screen pt-16">
                <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} navigateToPage={navigateToPage} />

                {/* Hero Section - Reverted to gradient (or image via inline style if needed here) */}
                <section
                    className="py-20 text-white bg-gradient-to-r from-miv-blue-dark to-miv-cyan" 
                    // Style removed here to focus on event data transformation
                >
                    <div className="container mx-auto text-center px-4">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            Discover Your Next <span className="block text-miv-cyan">ADVENTURE</span>
                        </h1>
                        <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
                            Find your perfect outdoor experience with My India Ventures
                        </p>
                        <Badge className="bg-green-500/10 text-green-300 border-green-500/20 px-4 py-2">
                            <CheckCircle className="h-4 w-4 mr-2" /> Live Demo: Filters apply to dynamic data!
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

                                {/* Location Select (Dynamic Options) */}
                                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                                    <SelectTrigger><SelectValue placeholder="Location" /></SelectTrigger>
                                    <SelectContent>
                                        {allLocations.map(loc => (
                                            <SelectItem key={loc} value={loc}>
                                                {loc === 'all' ? 'All Locations' : loc}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                {/* Difficulty Select (Dynamic Options) */}
                                <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                                    <SelectTrigger><SelectValue placeholder="Difficulty" /></SelectTrigger>
                                    <SelectContent>
                                        {allDifficulties.map(diff => (
                                            <SelectItem key={diff} value={diff}>
                                                {diff === 'all' ? 'All Levels' : diff}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                {/* Category Select (Static Options) */}
                                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                                    <SelectTrigger><SelectValue placeholder="Category" /></SelectTrigger>
                                    <SelectContent>
                                        {categories.map(c => (
                                            <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Tabs (Synced with Category Select) */}
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
                            {isLoading ? 'Searching...' : `${filteredEvents.length} Adventures Found`}
                        </h2>
                        {eventContent}
                    </div>
                </section>

                <Footer navigateToPage={navigateToPage} />
            </div>
        </>
    );
}