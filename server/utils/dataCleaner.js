// Utility function to clean data before database operations
// Removes conflicting fields that might cause duplicate key errors

export const cleanEventData = (eventData) => {
  // Create a deep copy to avoid mutating the original
  const cleaned = JSON.parse(JSON.stringify(eventData));
  
  // Remove top-level conflicting fields
  delete cleaned.id;
  delete cleaned._id;
  delete cleaned.createdAt;
  delete cleaned.updatedAt;
  delete cleaned.__v;
  
  // Clean nested arrays that might have _id fields
  if (cleaned.itinerary && Array.isArray(cleaned.itinerary)) {
    cleaned.itinerary = cleaned.itinerary.map(item => {
      const cleanItem = { ...item };
      delete cleanItem._id;
      delete cleanItem.id;
      return cleanItem;
    });
  }
  
  if (cleaned.essentialInfo && Array.isArray(cleaned.essentialInfo)) {
    cleaned.essentialInfo = cleaned.essentialInfo.map(item => {
      const cleanItem = { ...item };
      delete cleanItem._id;
      delete cleanItem.id;
      return cleanItem;
    });
  }
  
  return cleaned;
};

export const cleanMultipleEventData = (eventsData) => {
  return eventsData.map(event => cleanEventData(event));
};