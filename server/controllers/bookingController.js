// controllers/bookingController.js
import Booking from "../models/bookingSchems.js";
import { sendEmail } from "../services/mailer.js";

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

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2 style="color:#007bff;">Booking Confirmed 🎉</h2>
        <p>Dear <b>${booking.name}</b>,</p>
        <p>Your booking for <b>${booking.eventName}</b> has been confirmed.</p>
        <p><b>Booking ID:</b> ${booking.bookingId}</p>
        <p><b>Participants:</b> ${booking.participants}</p>
        <p><b>Amount Paid:</b> ₹${booking.paymentDetails.amount.toLocaleString()}</p>
        <br/>
        <p>We look forward to having you join us!</p>
        <p>Warm regards,</p>
        <p><b>My India Ventures Team</b></p>
        <hr style="margin-top:20px;"/>
        <small>This is an automated confirmation. Please do not reply to this email.</small>
        <small>If you have any questions, feel free to contact our support team.</small>
        <small>email: support@myindiaventures.com</small>
        <small>phone: +91-7021014315</small>
      </div>
    `;

    await sendEmail(
      booking.email,
      `Your Booking Confirmation - ${booking.eventName}`,
      emailHtml
    );

    await booking.save()
    .then(() => {

    })

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
