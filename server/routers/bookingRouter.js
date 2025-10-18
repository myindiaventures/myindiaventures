// routes/bookingRoutes.js
import express from "express";
import {
  getAllBookings,
  getBookingById,
  createBooking,
} from "../controllers/bookingController.js";

const bookingRouter = express.Router();

bookingRouter.get("/", getAllBookings);
bookingRouter.get("/getBooking/id/:id", getBookingById);
bookingRouter.post("/create-booking", createBooking);

export default bookingRouter;
