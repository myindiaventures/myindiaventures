import axios from 'axios';

// Base URL for the API
const API_BASE_URL = 'https://myindiaventuresserver.vercel.app/miv';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging (optional)
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to: ${config.url}`);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// API service functions
export const eventService = {
  // Get all events
  getAllEvents: async () => {
    try {
      const response = await api.get('/events/getAllEvents');
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch events: ${error.message}`);
    }
  },

  // Get single event by ID
  getEventById: async (eventId) => {
    try {
      const response = await api.get(`/events/getEventById/${eventId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch event: ${error.message}`);
    }
  },

  // Get events by category
  getEventsByCategory: async (category) => {
    try {
      const response = await api.get(`/events/getEventsByCategory/${category}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch events by category: ${error.message}`);
    }
  },

  // Get events by location
  getEventsByLocation: async (location) => {
    try {
      const response = await api.get(`/events/getEventsByLocation/${location}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch events by location: ${error.message}`);
    }
  }
};

// Payment service functions
export const paymentService = {
  // Create payment order
  createOrder: async (orderData) => {
    try {
      const response = await api.post('/payments/create-order', orderData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create order: ${error.message}`);
    }
  },

  // Verify payment
  verifyPayment: async (paymentData) => {
    try {
      const response = await api.post('/payments/verify', paymentData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to verify payment: ${error.message}`);
    }
  },

  // Get booking details
  getBookingDetails: async (bookingId) => {
    try {
      const response = await api.get(`/payments/booking/${bookingId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch booking details: ${error.message}`);
    }
  },

  // Get user bookings
  getUserBookings: async (email) => {
    try {
      const response = await api.get(`/payments/user-bookings/${email}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch user bookings: ${error.message}`);
    }
  },

  // Cancel booking
  cancelBooking: async (bookingId, reason) => {
    try {
      const response = await api.post(`/payments/cancel/${bookingId}`, { reason });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to cancel booking: ${error.message}`);
    }
  },

  // Get payment details
  getPaymentDetails: async (paymentId) => {
    try {
      const response = await api.get(`/payments/payment/${paymentId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch payment details: ${error.message}`);
    }
  }
};

// Export the api instance for custom requests
export default api;