// src/components/sections/FeaturedTreks.jsx
import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { TrendingUp, Mountain, AlertCircle } from 'lucide-react'; // Added AlertCircle for error state
import { EventCard } from '../ui/EventCard';
// NOTE: Since image paths are dynamic now, you likely won't use a static import like this.
// We'll assume your image paths are relative to a public folder or an external URL.
// import koraigad01 from '../../assets/locations/koraigad01.png';

const API_URL = "https://myindiaventuresserver.vercel.app/miv/events/getAllEvents";
// NOTE: You'll need a mechanism to load images based on the 'image' string field from the API.
// For this example, we'll use a placeholder/generic image for simplicity if the full path isn't known.
const IMAGE_BASE_PATH = '../../assets/locations/'; 
import koraigad01 from '../../assets/locations/koraigad01.jpg';
import Lohagad01 from '../../assets/locations/Lohagad01.jpg';
import Kalsubai01 from '../../assets/locations/Kalsubai01.jpeg';
import devkund01 from '../../assets/locations/devkund01.png';
import raigad01 from '../../assets/locations/raigad01.png';


export function FeaturedTreks({ navigateToPage }) {
    // 1. State for data fetching
    const [treks, setTreks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // 2. Fetch data from backend on component mount
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

                // 3. Transform data for consistency (if needed) and set state
                // Assign a 'featured' flag manually for this example
                const transformedEvents = result.data.map((event, index) => ({
                    // Use MongoDB _id as the unique ID for React key and navigation
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
                    // Map icon string to Lucide component if necessary (e.g., if 'Mountain' is a string)
                    icon: event.icon === 'Mountain' ? Mountain : TrendingUp, 
                    image: event.image === 'koraigad01' ? koraigad01 : event.image === 'Lohagad01' ? Lohagad01 : event.image === 'Kalsubai01' ? Kalsubai01 : event.image === 'devkund01' ? devkund01 : event.image === 'raigad01' ? raigad01 : null
                }));

                setTreks(transformedEvents);
            } catch (err) {
                console.error("Error fetching event data:", err);
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        }

        fetchEvents();
    }, []); // Empty dependency array means this runs only once on mount


    // 4. Conditional Rendering for Loading/Error states

    let content;

    if (isLoading) {
        content = (
            <div className="text-center p-10 col-span-full">
                <TrendingUp className="h-8 w-8 animate-spin text-miv-cyan mx-auto mb-4" />
                <p className="text-lg text-muted-foreground">Loading adventures...</p>
            </div>
        );
    } else if (error) {
        content = (
            <div className="text-center p-10 col-span-full bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="h-8 w-8 text-red-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-red-700">Failed to Load Events</h3>
                <p className="text-sm text-red-600">Please try refreshing the page. Error: {error}</p>
            </div>
        );
    } else if (treks.length === 0) {
        content = (
            <div className="text-center p-10 col-span-full">
                <p className="text-lg text-muted-foreground">No featured adventures available at this time.</p>
            </div>
        );
    } else {
        // 5. Render the dynamically fetched cards
        content = treks.map((trek) => (
            <div 
                key={trek.id} 
                className={`relative ${trek.featured ? 'ring-2 ring-miv-cyan rounded-2xl' : ''}`}
            >
                {/* {trek.featured && (
                    <Badge className="absolute top-4 left-4 z-10 bg-miv-cyan text-white">Featured</Badge>
                )} */}
                {/* The onBook prop now navigates using the fetched MongoDB _id 
                  This is the event ID you'll use to fetch details on the product page.
                */}
                <EventCard 
                    event={trek} 
                    onBook={() => navigateToPage(`product/${trek.id}`)} 
                />
            </div>
        ));
    }


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
                    {content}
                </div>

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