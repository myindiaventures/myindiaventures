// Utility functions for handling images from the backend

// Base URL for backend images (you may need to adjust this based on your backend setup)
const BACKEND_IMAGE_BASE_URL = 'https://myindiaventuresserver.vercel.app/images';

// Local image imports
import koraigad01 from '../assets/locations/koraigad01.png';
import koraigad02 from '../assets/locations/koraigad02.jpg';
import koraigad03 from '../assets/locations/koraigad03.jpg';
import koraigad04 from '../assets/locations/koraigad04.jpg';
import koraigad05 from '../assets/locations/koraigad05.png';

// Local image mapping for fallback
const localImages = {
  'koraigad01': koraigad01,
  'koraigad02': koraigad02,
  'koraigad03': koraigad03,
  'koraigad04': koraigad04,
  'koraigad05': koraigad05,
};

/**
 * Get image source from backend image filename
 * @param {string} imageName - Image filename from backend
 * @param {string} fallback - Fallback image if backend image is not available
 * @returns {string} - Image source URL or local image
 */
export const getImageSource = (imageName, fallback = koraigad01) => {
  if (!imageName) return fallback;
  
  // If it's a local image key, return the local image
  if (localImages[imageName]) {
    return localImages[imageName];
  }
  
  // If it's a backend image filename, construct the URL
  if (imageName.includes('.')) {
    return `${BACKEND_IMAGE_BASE_URL}/${imageName}`;
  }
  
  // Default fallback
  return fallback;
};

/**
 * Get gallery images from backend gallery array
 * @param {Array} galleryImages - Array of image names from backend
 * @param {Array} fallbackImages - Array of fallback images
 * @returns {Array} - Array of image sources
 */
export const getGalleryImages = (galleryImages = [], fallbackImages = [koraigad01, koraigad02, koraigad03, koraigad04, koraigad05]) => {
  if (!galleryImages || galleryImages.length === 0) {
    return fallbackImages;
  }
  
  return galleryImages.map(imageName => getImageSource(imageName, koraigad01));
};

/**
 * Format price from backend (number) to display format
 * @param {number} price - Price from backend
 * @returns {string} - Formatted price string
 */
export const formatPrice = (price) => {
  if (typeof price !== 'number') return '₹0';
  return `₹${price.toLocaleString('en-IN')}`;
};

/**
 * Format date from backend ISO string to display format
 * @param {string} dateString - ISO date string from backend
 * @returns {string} - Formatted date string
 */
export const formatDate = (dateString) => {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
};