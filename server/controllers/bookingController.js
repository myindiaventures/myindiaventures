// controllers/bookingController.js
import Booking from "../models/bookingSchems.js";

/**
 * @desc Get all bookings
 * @route GET /miv/bookings
 */
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: bookings.length, bookings });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

/**
 * @desc Get booking by MongoDB ID
 * @route GET /miv/bookings/id/:id
 */
export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }
    res.status(200).json({ success: true, booking });
  } catch (error) {
    console.error("Error fetching booking:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

/**
 * @desc Create a new booking
 * @route POST /miv/bookings/create
 */
export const createBooking = async (req, res) => {
  try {
    // Auto-generate bookingId if not provided

    const booking = new Booking({
      bookingId: req.body.bookingId,
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      eventName: req.body.eventName,
      eventId: req.body.eventId,
      participants: req.body.participants,
      paymentDetails: req.body.paymentDetails,
    });

    await booking.save();

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
