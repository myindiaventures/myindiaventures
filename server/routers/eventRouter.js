import express from "express";
import { 
    createEvent, 
    createEvents, 
    getAllEvents, 
    updateEventByName, 
    getEventByName, 
    getEventById, // <-- New Import
    deleteEventByName, 
    deleteAllEvents 
} from "../controllers/eventController.js";

const router = express.Router();

router.post("/createEvent", createEvent);
router.post("/createEvents", createEvents);

// READ Routes
router.get("/getAllEvents", getAllEvents);
router.get("/getEvent/id/:id", getEventById); // <-- New Route: Fetch by MongoDB ID
router.get("/getEvent/name/:username", getEventByName); // <-- Renamed for clarity to avoid conflict with /:id if both were /getEvent/:param

// UPDATE Route
router.put("/updateEvent/:username", updateEventByName);

// DELETE Routes
router.delete("/deleteEvent/:username", deleteEventByName);
router.delete("/deleteAllEvents", deleteAllEvents);

export default router;