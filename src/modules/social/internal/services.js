import * as Sentry from '@sentry/browser';
import { eventBus } from '../../core/events';
import { events } from '../events';

// Mock data for demo purposes
// In a real app, this would fetch from a backend API
const mockSocialData = [
  {
    id: '1',
    platform: 'twitter',
    username: '@emergency_alert',
    content: 'Large fire reported at downtown warehouse. Multiple fire engines responding. #emergency',
    timestamp: '2023-11-10T14:30:00Z',
    location: 'Downtown District',
    latitude: 37.7849,
    longitude: -122.4294,
    riskLevel: 'high',
  },
  {
    id: '2',
    platform: 'instagram',
    username: 'city_watch',
    content: 'Protest gathering at City Hall. Approximately 200 people present. Peaceful so far.',
    timestamp: '2023-11-10T13:15:00Z',
    location: 'City Hall Plaza',
    latitude: 37.7793,
    longitude: -122.4193,
    riskLevel: 'medium',
  },
  {
    id: '3',
    platform: 'tiktok',
    username: 'weather_watcher',
    content: 'Flash flooding on Main Street after heavy rain. Cars stuck, needs immediate attention! #flooding',
    timestamp: '2023-11-10T12:45:00Z',
    location: 'Main Street',
    latitude: 37.7830,
    longitude: -122.4104,
    riskLevel: 'high',
  },
  {
    id: '4',
    platform: 'twitter',
    username: '@traffic_alert',
    content: 'Multi-vehicle accident on Highway 101 Northbound. Traffic backed up for miles. #traffic',
    timestamp: '2023-11-10T11:20:00Z',
    location: 'Highway 101 Northbound',
    latitude: 37.7650,
    longitude: -122.4350,
    riskLevel: 'medium',
  },
  {
    id: '5',
    platform: 'instagram',
    username: 'neighborhood_watch',
    content: 'Suspicious activity reported near Central Park. Group of individuals loitering near the playground.',
    timestamp: '2023-11-10T10:05:00Z',
    location: 'Central Park',
    latitude: 37.7695,
    longitude: -122.4810,
    riskLevel: 'low',
  },
];

/**
 * Fetches recent social media posts
 * @returns {Promise<Array>} List of social media posts
 */
export async function fetchRecentSocialData() {
  try {
    console.log('Fetching recent social media data');
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Publish event
    eventBus.publish(events.SOCIAL_DATA_LOADED, mockSocialData);
    
    return mockSocialData;
  } catch (error) {
    console.error('Error fetching social data:', error);
    Sentry.captureException(error);
    
    // Publish error event
    eventBus.publish(events.SOCIAL_DATA_ERROR, { error });
    
    throw error;
  }
}

/**
 * Fetches social media posts with geolocation data
 * @returns {Promise<Array>} List of geotagged social media posts
 */
export async function fetchGeotaggedPosts() {
  try {
    console.log('Fetching geotagged social media posts');
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return mockSocialData;
  } catch (error) {
    console.error('Error fetching geotagged posts:', error);
    Sentry.captureException(error);
    throw error;
  }
}

/**
 * Fetches social media posts from a specific platform
 * @param {string} platform Platform name (twitter, instagram, tiktok)
 * @returns {Promise<Array>} List of social media posts from the platform
 */
export async function fetchSocialMediaByPlatform(platform) {
  try {
    console.log(`Fetching ${platform} data`);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return mockSocialData.filter(item => 
      item.platform.toLowerCase() === platform.toLowerCase()
    );
  } catch (error) {
    console.error(`Error fetching ${platform} data:`, error);
    Sentry.captureException(error);
    throw error;
  }
}