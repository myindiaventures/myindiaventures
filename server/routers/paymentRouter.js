import express from "express";
import {
    createOrder,
    verifyPayment,
    getBookingDetails,
    getUserBookings,
    cancelBooking,
    getPaymentDetails
} from "../controllers/paymentController.js";

const paymentRouter = express.Router();

// -------------------- Payment Routes --------------------
paymentRouter.post("/create-order", createOrder);
paymentRouter.post("/verify", verifyPayment);
paymentRouter.get("/booking/:bookingId", getBookingDetails);
paymentRouter.get("/user-bookings/:email", getUserBookings);
paymentRouter.post("/cancel/:bookingId", cancelBooking);
paymentRouter.get("/payment/:paymentId", getPaymentDetails);

export default paymentRouter;