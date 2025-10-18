// models/Booking.js
import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    bookingId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    eventName: {
      type: String,
      required: true,
      trim: true,
    },
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event", // optional, if you have an Event model
    },
    participants: {
      type: Number,
      required: true,
      min: 1,
    },
    paymentDetails: {
      amount: { type: Number, required: true },
      currency: { type: String, default: "INR" },
      status: { type: String, enum: ["pending", "success", "failed"], default: "pending" },
      transactionId: { type: String },
      method: { type: String }, // e.g., "Razorpay", "Stripe", etc.
    },
  },
  { timestamps: true } // adds createdAt and updatedAt automatically
);

const Booking = mongoose.model("BookingS", bookingSchema);

export default Booking;