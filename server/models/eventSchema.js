import mongoose from "mongoose"

const eventSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    location: {
      state: { type: String, required: true },
      region: { type: String, required: true },
      nearest_city: { type: String, required: true },
      coordinates: {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true }
      }
    },
    difficulty: {
      type: String,
      enum: ["Easy", "Moderate", "Challenging"],
      required: true
    },
    duration: {
      days: { type: Number, default: 1 },
      hours: { type: Number, default: 0 }
    },
    distance_km: { type: Number },
    altitude_m: { type: Number },
    highlights: [{ type: String }],
    best_season: [
      {
        type: String,
        enum: ["Winter", "Summer", "Monsoon", "Post-Monsoon"]
      }
    ],
    activities: [
      {
        type: String,
        enum: ["Trekking", "Camping", "Photography", "Fort Visit", "Stargazing", "Pilgrimage"]
      }
    ],
    itinerary: [
      {
        day: { type: Number, required: true },
        title: { type: String, required: true },
        description: { type: String }
      }
    ],
    inclusions: [{ type: String }],
    exclusions: [{ type: String }],
    requirements: {
      fitness_level: { type: String },
      gear: [{ type: String }]
    },
    pricing: {
      per_person_inr: { type: Number, required: true },
      group_discount: {
        min_size: { type: Number },
        discount_percent: { type: Number }
      }
    },
    booking: {
      available_slots: { type: Number, default: 0 },
      cutoff_hours_before_start: { type: Number, default: 24 }
    },
    media: {
      images: [{ type: String }],
      videos: [{ type: String }]
    }
  },
  { timestamps: true }
);

const Event = mongoose.model("Events", eventSchema);

export default Event;