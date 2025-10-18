import Razorpay from "razorpay";
import crypto from "crypto";
import Payment from "../models/paymentSchema.js";
import Booking from "../models/bookingSchema.js";
import Event from "../models/eventSchema.js";

// Validate Razorpay configuration
if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    console.error("❌ Razorpay configuration missing!");
    console.error("Please set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET environment variables");
}

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// -------------------- Create Order --------------------
export const createOrder = async (req, res) => {
    try {
        // Check Razorpay configuration
        if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
            return res.status(500).json({
                success: false,
                message: "Payment service configuration error. Please contact support."
            });
        }

        const { 
            amount, 
            eventId, 
            customer, 
            participants = 1,
            specialRequirements = {}
        } = req.body;

        console.log("Creating order with data:", { amount, eventId, customer, participants });

        // Validate required fields
        if (!amount || !eventId || !customer?.name || !customer?.email || !customer?.phone) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields: amount, eventId, customer details"
            });
        }

        // Verify event exists
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Event not found"
            });
        }

        // Generate booking ID
        const bookingId = Booking.generateBookingId();

        // Create Razorpay order
        const options = {
            amount: amount, // Amount is already in paise from frontend
            currency: "INR",
            receipt: `order_${bookingId}_${Date.now()}`,
            notes: {
                eventId: eventId,
                bookingId: bookingId,
                customerEmail: customer.email,
                participants: participants
            }
        };

        const order = await razorpay.orders.create(options);

        // Create booking record
        const booking = new Booking({
            bookingId: bookingId,
            customer: {
                name: customer.name,
                email: customer.email,
                phone: customer.phone,
                emergencyContact: customer.emergencyContact || {}
            },
            event: {
                eventId: event._id,
                eventTitle: event.title,
                eventDate: event.nextDate,
                eventLocation: event.location,
                eventDuration: event.duration
            },
            participants: participants,
            pricing: {
                basePrice: event.price,
                totalAmount: amount,
                discount: 0,
                tax: 0
            },
            specialRequirements: specialRequirements,
            payment: {
                status: 'pending'
            }
        });

        await booking.save();

        res.json({
            success: true,
            message: "Order created successfully",
            data: {
                order: order,
                bookingId: bookingId,
                event: {
                    title: event.title,
                    date: event.nextDate,
                    location: event.location
                }
            }
        });

    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({
            success: false,
            message: "Error creating Razorpay order",
            error: error.message
        });
    }
};

// -------------------- Verify Payment --------------------
export const verifyPayment = async (req, res) => {
    try {
        // Check Razorpay configuration
        if (!process.env.RAZORPAY_KEY_SECRET) {
            return res.status(500).json({
                success: false,
                message: "Payment service configuration error. Please contact support."
            });
        }

        const { 
            razorpay_order_id, 
            razorpay_payment_id, 
            razorpay_signature,
            bookingId 
        } = req.body;

        console.log("Verifying payment with data:", { razorpay_order_id, razorpay_payment_id, bookingId });

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !bookingId) {
            return res.status(400).json({ 
                success: false, 
                message: "Incomplete payment data" 
            });
        }

        // Find the booking
        const booking = await Booking.findOne({ bookingId: bookingId });
        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found"
            });
        }

        // Generate signature using key_secret
        const generated_signature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(razorpay_order_id + "|" + razorpay_payment_id)
            .digest("hex");

        if (generated_signature === razorpay_signature) {
            // Payment is verified - create payment record
            const payment = new Payment({
                razorpay_order_id: razorpay_order_id,
                razorpay_payment_id: razorpay_payment_id,
                razorpay_signature: razorpay_signature,
                amount: booking.pricing.totalAmount,
                currency: 'INR',
                status: 'completed',
                customer: booking.customer,
                event: {
                    eventId: booking.event.eventId,
                    eventTitle: booking.event.eventTitle,
                    eventDate: booking.event.eventDate,
                    participants: booking.participants
                },
                bookingId: booking.bookingId,
                paymentMethod: 'card', // Default, can be updated based on actual method
                paidAt: new Date()
            });

            await payment.save();

            // Update booking status
            booking.status = 'confirmed';
            booking.payment.paymentId = payment._id;
            booking.payment.status = 'completed';
            booking.payment.transactionId = razorpay_payment_id;
            booking.timeline.confirmedAt = new Date();
            await booking.save();

            // Add communication record
            await booking.addCommunication(
                'email',
                `Your booking ${bookingId} has been confirmed! Payment of ₹${booking.pricing.totalAmount} received successfully.`
            );

            res.json({
                success: true,
                message: "Payment verified successfully",
                data: {
                    bookingId: booking.bookingId,
                    paymentId: payment._id,
                    status: 'confirmed',
                    amount: booking.pricing.totalAmount,
                    event: {
                        title: booking.event.eventTitle,
                        date: booking.event.eventDate,
                        location: booking.event.eventLocation
                    }
                }
            });

        } else {
            // Payment verification failed
            booking.payment.status = 'failed';
            await booking.save();

            res.status(400).json({ 
                success: false, 
                message: "Invalid payment signature" 
            });
        }

    } catch (error) {
        console.error("Payment verification error:", error);
        res.status(500).json({ 
            success: false, 
            message: "Server error during payment verification",
            error: error.message
        });
    }
};

// -------------------- Get Booking Details --------------------
export const getBookingDetails = async (req, res) => {
    try {
        const { bookingId } = req.params;

        const booking = await Booking.findOne({ bookingId: bookingId })
            .populate('event.eventId')
            .populate('payment.paymentId');

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found"
            });
        }

        res.json({
            success: true,
            message: "Booking details retrieved successfully",
            data: booking
        });

    } catch (error) {
        console.error("Error fetching booking details:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching booking details",
            error: error.message
        });
    }
};

// -------------------- Get User Bookings --------------------
export const getUserBookings = async (req, res) => {
    try {
        const { email } = req.params;

        const bookings = await Booking.find({ 'customer.email': email })
            .populate('event.eventId')
            .populate('payment.paymentId')
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            message: "User bookings retrieved successfully",
            data: bookings
        });

    } catch (error) {
        console.error("Error fetching user bookings:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching user bookings",
            error: error.message
        });
    }
};

// -------------------- Cancel Booking --------------------
export const cancelBooking = async (req, res) => {
    try {
        const { bookingId } = req.params;
        const { reason } = req.body;

        const booking = await Booking.findOne({ bookingId: bookingId });
        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found"
            });
        }

        if (!booking.canBeCancelled()) {
            return res.status(400).json({
                success: false,
                message: "Booking cannot be cancelled. Less than 3 days until event."
            });
        }

        // Calculate refund amount
        const refundAmount = booking.calculateRefundAmount();

        // Update booking status
        booking.status = 'cancelled';
        booking.cancellation.reason = reason;
        booking.cancellation.refundAmount = refundAmount;
        booking.cancellation.refundStatus = refundAmount > 0 ? 'pending' : 'completed';
        booking.timeline.cancelledAt = new Date();
        await booking.save();

        // Update payment status if exists
        if (booking.payment.paymentId) {
            const payment = await Payment.findById(booking.payment.paymentId);
            if (payment) {
                payment.status = refundAmount > 0 ? 'refunded' : 'completed';
                payment.refund.amount = refundAmount;
                payment.refund.reason = reason;
                payment.refund.refundedAt = new Date();
                await payment.save();
            }
        }

        // Add communication record
        await booking.addCommunication(
            'email',
            `Your booking ${bookingId} has been cancelled. ${refundAmount > 0 ? `Refund of ₹${refundAmount} will be processed within 5-7 business days.` : 'No refund applicable as per cancellation policy.'}`
        );

        res.json({
            success: true,
            message: "Booking cancelled successfully",
            data: {
                bookingId: booking.bookingId,
                status: 'cancelled',
                refundAmount: refundAmount,
                refundStatus: booking.cancellation.refundStatus
            }
        });

    } catch (error) {
        console.error("Error cancelling booking:", error);
        res.status(500).json({
            success: false,
            message: "Error cancelling booking",
            error: error.message
        });
    }
};

// -------------------- Get Payment Details --------------------
export const getPaymentDetails = async (req, res) => {
    try {
        const { paymentId } = req.params;

        const payment = await Payment.findById(paymentId)
            .populate('event.eventId');

        if (!payment) {
            return res.status(404).json({
                success: false,
                message: "Payment not found"
            });
        }

        res.json({
            success: true,
            message: "Payment details retrieved successfully",
            data: payment
        });

    } catch (error) {
        console.error("Error fetching payment details:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching payment details",
            error: error.message
        });
    }
};