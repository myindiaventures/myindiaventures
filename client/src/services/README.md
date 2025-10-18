# API Integration Documentation

This directory contains the API service layer for the My India Ventures client application.

## Files

### `api.js`
Main API service file that handles all HTTP requests to the backend.

**Features:**
- Axios instance with base configuration
- Request/response interceptors for logging and error handling
- Event service functions for different API endpoints
- Timeout and error handling

**Available Functions:**
- `eventService.getAllEvents()` - Fetch all events
- `eventService.getEventById(eventId)` - Fetch single event by ID
- `eventService.getEventsByCategory(category)` - Fetch events by category
- `eventService.getEventsByLocation(location)` - Fetch events by location

### `../utils/imageUtils.js`
Utility functions for handling images and data formatting from the backend.

**Features:**
- Image source resolution (backend URLs vs local fallbacks)
- Price formatting for Indian currency
- Date formatting for display
- Gallery image handling

## Backend API Endpoints

The application connects to: `https://myindiaventuresserver.vercel.app/miv`

### Events Endpoints
- `GET /events/getAllEvents` - Get all events
- `GET /events/getEventById/:id` - Get event by ID
- `GET /events/getEventsByCategory/:category` - Get events by category
- `GET /events/getEventsByLocation/:location` - Get events by location

## Usage Examples

### Fetching All Events
```javascript
import { eventService } from '../services/api';

const fetchEvents = async () => {
  try {
    const response = await eventService.getAllEvents();
    if (response.success) {
      console.log('Events:', response.data);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
};
```

### Fetching Single Event
```javascript
const fetchEvent = async (eventId) => {
  try {
    const response = await eventService.getEventById(eventId);
    if (response.success) {
      console.log('Event:', response.data);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
};
```

## Error Handling

The API service includes comprehensive error handling:
- Network timeouts (10 seconds)
- HTTP error responses
- Invalid response format handling
- Fallback to default data when API fails

## Data Transformation

Backend data is automatically transformed to match frontend component expectations:
- MongoDB `_id` → `id`
- Price numbers → Formatted currency strings
- ISO dates → Display-friendly date strings
- Image filenames → Resolved image sources

## Loading States

Both EventsPage and ProductPage include loading states and error handling:
- Loading spinners during API calls
- Error messages with retry options
- Graceful fallbacks to default data