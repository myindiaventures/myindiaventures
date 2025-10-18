// Test script for event creation
// This script tests creating an event to verify the fix works

import mongoose from 'mongoose';
import Event from '../models/eventSchema.js';

const testEventCreation = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI_01);
    console.log('Connected to MongoDB');

    // Test event data (without id field)
    const testEventData = {
      title: "Test Koraigad Fort Trek",
      category: "trekking",
      location: "Lonavala, Maharashtra",
      duration: "1 Day",
      difficulty: "Beginner",
      price: 1199,
      rating: 4.9,
      reviews: 156,
      participants: 18,
      nextDate: new Date("2025-11-16T00:00:00.000Z"),
      image: "koraigad01.png",
      galleryImages: ["koraigad01", "koraigad02", "koraigad03", "koraigad04", "koraigad05"],
      description: "Embark on an exhilarating monsoon adventure that blends history, breathtaking vistas, and serene nature escapes! Join us as we explore the majestic Koraigad Fort, a historic sentinel offering panoramic views of the surrounding Western Ghats.",
      highlights: ["Koraigad Fort Trek", "Tiger Point (Vaghjai Plateau)", "Shivling Point", "Bhushi Dam"],
      highlightsDescription: [
        "Explore ancient fortifications, temples, and enjoy 360-degree views from the plateau.",
        "Witness incredible valley views, often shrouded in mystic fog.",
        "Observe the distinctive natural rock formation.",
        "Enjoy the gushing waters and vibrant atmosphere (seasonal)."
      ],
      icon: "Mountain",
      itinerary: [
        {
          day: 1,
          title: "Departure, Trek & Return",
          description: "Meet at Dadar, gear check, drive to base. Begin scenic trek to Koraigad Fort. Explore ruins, descend, and return journey to the city."
        }
      ],
      included: [
        "AC Traveller",
        "Breakfast included",
        "Male & Female Guide",
        "Medical Kit & First Aid",
        "Momentos"
      ],
      notIncluded: [
        "Personal trekking gear (boots, backpack)",
        "Travel insurance",
        "Lunch",
        "Tips for guides & staff",
        "Any items not mentioned in inclusions"
      ],
      essentialInfo: [
        {
          label: "Fitness Level",
          value: "Good physical fitness required",
          icon: "Award"
        },
        {
          label: "Group Size",
          value: "18 people",
          icon: "Users"
        },
        {
          label: "Best Season",
          value: "March to June, Sept to Nov",
          icon: "Calendar"
        },
        {
          label: "Altitude",
          value: "Up to 920m (Koraigad)",
          icon: "Mountain"
        }
      ]
    };

    console.log('Creating test event...');
    
    // Create the event
    const event = await Event.create(testEventData);
    
    console.log('✅ Event created successfully!');
    console.log('Event ID:', event._id);
    console.log('Event Title:', event.title);
    
    // Clean up - delete the test event
    await Event.findByIdAndDelete(event._id);
    console.log('✅ Test event cleaned up');
    
  } catch (error) {
    console.error('❌ Error creating test event:', error);
    
    if (error.code === 11000) {
      console.log('\n🔧 This is a duplicate key error. The issue might be:');
      console.log('1. There\'s an existing index on an "id" field');
      console.log('2. You\'re sending an "id" field in your request body');
      console.log('3. There\'s a conflicting unique index');
      console.log('\n💡 Solutions:');
      console.log('1. Make sure your request body doesn\'t include "id" or "_id" fields');
      console.log('2. Run the fixDatabaseIndexes.js script to clean up indexes');
      console.log('3. Check your MongoDB collection for existing problematic indexes');
    }
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

// Run the test
testEventCreation();