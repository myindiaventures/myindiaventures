// Test script for event creation
// This script tests creating an event to verify the fix works

import mongoose from 'mongoose';
import Event from '../models/eventSchema.js';
import { cleanEventData } from '../utils/dataCleaner.js';

const testEventCreation = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI_01);
    console.log('Connected to MongoDB');

    // Test event data with problematic _id fields (like your Postman request)
    const testEventData = {
      title: "Kundalika River Rafting",
      category: "camping",
      location: "Kolad, Maharashtra",
      duration: "1 Day",
      difficulty: "Intermediate",
      price: 2899,
      rating: 4.8,
      reviews: 95,
      participants: 25,
      nextDate: new Date("2025-11-23T00:00:00.000Z"),
      image: "kolad01.png",
      galleryImages: [
        "kolad01",
        "kolad02",
        "kolad03",
        "kolad04",
        "kolad05"
      ],
      description: "Experience the adrenaline rush of White Water Rafting on the Kundalika River! Located in Kolad, this is a thrilling monsoon activity featuring Grade II and III rapids, perfect for both beginners and experienced rafters. Enjoy a day full of splash and excitement amidst the lush green Western Ghats.",
      highlights: [
        "White Water Rafting on Kundalika",
        "12 Kilometers of Rafting",
        "Swimming in calm sections",
        "Local Maharashtrian Lunch"
      ],
      highlightsDescription: [
        "Navigate exhilarating Grade II and III rapids with professional guidance.",
        "A full run of the controlled river section with dam water release.",
        "Take a refreshing dip in the safer, non-rapid zones.",
        "Enjoy authentic and delicious vegetarian and non-vegetarian cuisine."
      ],
      icon: "Water",
      itinerary: [
        {
          day: 1,
          title: "Travel, Raft & Return",
          description: "Meet in Pune/Mumbai, travel to Kolad. Safety briefing and gear up. Start the 3-hour rafting session. Lunch and return journey to the city.",
          "_id": "68f26fb112206365cef1b01e" // This _id field was causing the error
        }
      ],
      included: [
        "AC Traveller",
        "Rafting Equipment (Life Jackets, Helmets)",
        "Certified River Guides",
        "Toll & Parking Charges",
        "Changing Room Facilities"
      ],
      notIncluded: [
        "Breakfast & Dinner",
        "Personal river shoes or sandals",
        "Insurance or personal emergency costs",
        "Underwater photography/videography"
      ],
      essentialInfo: [
        {
          label: "Fitness Level",
          value: "Basic physical fitness required (must know swimming is a plus)",
          icon: "Award",
          "_id": "68f26fb112206365cef1b01f" // This _id field was causing the error
        },
        {
          label: "Group Size",
          value: "25 people (5 per raft)",
          icon: "Users",
          "_id": "68f26fb112206365cef1b02a" // This _id field was causing the error
        },
        {
          label: "Best Season",
          value: "June to October (Monsoon season for water flow)",
          icon: "Calendar",
          "_id": "68f26fb112206365cef1b02b" // This _id field was causing the error
        },
        {
          label: "River Grade",
          value: "II to III",
          icon: "Zap",
          "_id": "68f26fb112206365cef1b02c" // This _id field was causing the error
        }
      ],
      createdAt: "2025-10-18T05:30:15.120Z", // These fields were also causing issues
      updatedAt: "2025-10-18T05:30:15.120Z",
      __v: 0
    };

    console.log('Creating test event with problematic data...');
    console.log('Original data has _id fields in nested objects that should cause errors');
    
    // Clean the data using our utility function
    const cleanedData = cleanEventData(testEventData);
    console.log('Data cleaned - removed all _id fields from nested objects');
    
    // Create the event
    const event = await Event.create(cleanedData);
    
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