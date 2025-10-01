import Event from '../models/eventSchema.js'
import redis from '../cacheManager/redisClient.js'

// 🔹 Helper: Clear Redis cache whenever data changes
const resetCache = async () => {
  const cacheKey = "events:all";
  await redis.del(cacheKey);
};

// ✅ Create a single event
export const createEvent = async (req, res) => {
  try {
    let event = await Event.create(req.body);

    // reset cache after insertion
    await resetCache();

    return res.status(200).json({
      success: true,
      message: `Event created successfully`,
      data: event
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: `Failed to create Event`,
      error: err.message
    });
  }
};


// ✅ Create multiple events
export const createEvents = async (req, res) => {
  try {
    let events = await Event.insertMany(req.body);

    // reset cache after insertion
    await resetCache();

    return res.status(200).json({
      success: true,
      message: `Events created successfully`,
      data: events
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: `Failed to create Events`,
      error: err.message
    });
  }
};

// ✅ Get all events (with Redis cache)
export const getAllEvents = async (req, res) => {
  try {
    const cacheKey = "events:all";
    const cached = await redis.get(cacheKey);

    if (cached) {
      return res.status(200).json({
        success: true,
        message: `Events fetched successfully from redis cache manager`,
        data: JSON.parse(cached)
      });
    }

    let allEvents = await Event.find().lean();

    await redis.set(cacheKey, JSON.stringify(allEvents), "EX", 3600);

    return res.status(200).json({
      success: true,
      message: `All Events fetched successfully`,
      data: allEvents
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: `Failed to fetch all Events`,
      error: err.message
    });
  }
};

// ✅ Get single event by username
export const getEventByName = async (req, res) => {
  try {
    const { username } = req.params;

    let event = await Event.findOne({ username });

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: `Event fetched successfully`,
      data: event
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: `Failed to fetch Event`,
      error: err.message
    });
  }
};

// ✅ Update event by username
export const updateEventByName = async (req, res) => {
  try {
    const { username } = req.params;

    let event = await Event.findOneAndUpdate(
      { username },
      { $set: req.body },
      { new: true }
    );

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found"
      });
    }

    // reset cache after update
    await resetCache();

    return res.status(200).json({
      success: true,
      message: `Event updated successfully`,
      data: event
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: `Failed to update Event`,
      error: err.message
    });
  }
};

// ✅ Delete event by username
export const deleteEventByName = async (req, res) => {
  try {
    const { username } = req.params;

    let event = await Event.findOneAndDelete({ username });

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found"
      });
    }

    // reset cache after delete
    await resetCache();

    return res.status(200).json({
      success: true,
      message: `Event deleted successfully`,
      data: event
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: `Failed to delete Event`,
      error: err.message
    });
  }
};

// ✅ Delete all events
export const deleteAllEvents = async (req, res) => {
  try {
    await Event.deleteMany({});

    // reset cache after delete all
    await resetCache();

    return res.status(200).json({
      success: true,
      message: `All events deleted successfully`
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: `Failed to delete all Events`,
      error: err.message
    });
  }
};
