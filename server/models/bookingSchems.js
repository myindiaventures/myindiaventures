// models/Booking.js
import mongoose from "mongoose";

const paymentDetailsSchema = new mongoose.Schema({
  orderId: { type: String, required: true },
  paymentId: { type: String, required: true },
  signature: { type: String },
  amount: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ["success", "failed", "pending"], 
    default: "pending" 
  },
}, { _id: false }); // prevent auto _id for subdocument

const bookingSchema = new mongoose.Schema(
  {
    // Auto-generated Booking ID (like MIV-<timestamp>-<rand>)
    bookingId: {
      type: String,
      required: true,
      unique: true,
    },

    // Customer Details
    name: {
      type: String,
      required: [true, "Customer name is required"],
      trim: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email address"],
    },

    // Event Details
    eventName: {
      type: String,
      required: [true, "Event name is required"],
      trim: true,
    },
    participants: {
      type: Number,
      required: [true, "Number of participants is required"],
      min: [1, "There must be at least 1 participant"],
    },

    // Payment Details (embedded sub-schema)
    paymentDetails: {
      type: paymentDetailsSchema,
      required: true,
    },

    // Optional booking status (in case you want to manage cancellations later)
    status: {
      type: String,
      enum: ["confirmed", "cancelled", "pending"],
      default: "confirmed",
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("BookingS", bookingSchema);

export default Booking;