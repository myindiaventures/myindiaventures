import express from "express";
import { createEvent, getAllEvents, updateEventByName, getEventByName, deleteAllEvents } from "../controllers/eventController.js";

const router = express.Router();

router.post("/createEvent", createEvent);
router.get("/getAllEvents", getAllEvents);
router.put("/updateEvent/:username", updateEventByName);
router.get("/getEvent/:username", getEventByName);
router.delete("/deleteAllEvents", deleteAllEvents);

export default router;
