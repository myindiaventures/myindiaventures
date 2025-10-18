import express from "express";
import { createEvent, createEvents, getAllEvents, getEventById, updateEventByName, getEventByName, deleteEventByName, deleteAllEvents } from "../controllers/eventController.js";

const router = express.Router();

router.post("/createEvent", createEvent);
router.post("/createEvents", createEvents);
router.get("/getAllEvents", getAllEvents);
router.get("/getEventById/:id", getEventById);
router.put("/updateEvent/:username", updateEventByName);
router.get("/getEvent/:username", getEventByName);
router.delete("/deleteEvent/:username", deleteEventByName);
router.delete("/deleteAllEvents", deleteAllEvents);

export default router;
