import mongoose from "mongoose"

const eventSchema = new mongoose.Schema({
    // Basic Details
    title: {
        type: String,
        required: [true, 'Event title is required'],
        trim: true,
    },
    category: {
        type: String,
        enum: ['trekking', 'sightseeing', 'adventure', 'camping', 'water-sports', 'other'], // Updated enum with new categories
        default: 'trekking',
    },
    location: {
        type: String,
        required: true,
        trim: true,
    },
    duration: {
        type: String, // e.g., "1 Day", "5 Days"
        required: true,
    },
    difficulty: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advance'],
        default: 'Beginner',
    },
    
    // Price (Stored as Number for calculations)
    price: { 
        type: Number, 
        required: true,
        min: 0,
    },
    
    // Statistics
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0,
    },
    reviews: {
        type: Number,
        min: 0,
        default: 0,
    },
    participants: {
        type: Number, // Stores the max number of participants allowed (e.g., 18)
        default: 0,
    },
    
    // Dates & Media
    nextDate: {
        type: Date, // Use Date type
    },
    image: {
        type: String, // URL/Path to the main image
    },
    galleryImages: {
        type: [String], // Array of image URLs/paths (from previous full object)
        default: [],
    },
    
    // Content
    description: {
        type: String,
        required: true,
    },
    highlights: {
        type: [String], // Array of short highlight titles (can include inclusions here too)
        default: [],
    },
    highlightsDescription: {
        type: [String], // Array of corresponding highlight descriptions (from previous full object)
        default: [],
    },
    
    // New Field: Icon for UI display (using a string to store the reference, e.g., 'Mountain')
    icon: {
        type: String, 
        trim: true
    },
    
    // Itinerary Structure (from previous full object)
    itinerary: [{
        day: { type: Number, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
    }],
    
    // Inclusions & Exclusions (from previous full object)
    included: {
        type: [String],
        default: [],
    },
    notIncluded: {
        type: [String],
        default: [],
    },

    // Essential Info (from previous full object)
    essentialInfo: [{
        label: { type: String, required: true },
        value: { type: String, required: true },
        icon: { type: String }, 
    }],
}, {
    timestamps: true 
});

const Event = mongoose.model("Events", eventSchema);

export default Event;