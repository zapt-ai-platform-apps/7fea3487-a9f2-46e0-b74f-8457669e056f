import * as Sentry from '@sentry/browser';
import { eventBus } from '../../core/events';
import { events } from '../events';

// Mock data for demo purposes
// In a real app, this would analyze social media data and identify threats
const mockThreatData = [
  {
    id: '1',
    title: 'Major Fire in Downtown District',
    description: 'Multiple reports of a large fire at a warehouse in the downtown area. Fire department has been dispatched.',
    riskLevel: 'high',
    timestamp: '2023-11-10T14:30:00Z',
    location: {
      address: 'Downtown District',
      latitude: 37.7849,
      longitude: -122.4294,
    },
    relatedPosts: [
      {
        id: '1',
        platform: 'twitter',
        username: '@emergency_alert',
        content: 'Large fire reported at downtown warehouse. Multiple fire engines responding. #emergency',
        timestamp: '2023-11-10T14:30:00Z',
        location: 'Downtown District',
      },
      {
        id: '6',
        platform: 'instagram',
        username: 'downtown_resident',
        content: 'Huge flames visible from my apartment window. Hearing sirens everywhere. Stay safe!',
        timestamp: '2023-11-10T14:32:00Z',
        location: 'Downtown District',
      },
    ],
  },
  {
    id: '2',
    title: 'Protest Activity at City Hall',
    description: 'Gathering of approximately 200 protesters at City Hall Plaza. Currently peaceful but monitoring for potential escalation.',
    riskLevel: 'medium',
    timestamp: '2023-11-10T13:15:00Z',
    location: {
      address: 'City Hall Plaza',
      latitude: 37.7793,
      longitude: -122.4193,
    },
    relatedPosts: [
      {
        id: '2',
        platform: 'instagram',
        username: 'city_watch',
        content: 'Protest gathering at City Hall. Approximately 200 people present. Peaceful so far.',
        timestamp: '2023-11-10T13:15:00Z',
        location: 'City Hall Plaza',
      },
      {
        id: '7',
        platform: 'twitter',
        username: '@protest_organizer',
        content: 'Join us at City Hall to make our voices heard! Peaceful protest for justice. #CityHallProtest',
        timestamp: '2023-11-10T12:45:00Z',
        location: 'City Hall Plaza',
      },
    ],
  },
  {
    id: '3',
    title: 'Flash Flooding on Main Street',
    description: 'Heavy rainfall has caused flash flooding on Main Street. Multiple vehicles stranded and road partially blocked.',
    riskLevel: 'high',
    timestamp: '2023-11-10T12:45:00Z',
    location: {
      address: 'Main Street',
      latitude: 37.7830,
      longitude: -122.4104,
    },
    relatedPosts: [
      {
        id: '3',
        platform: 'tiktok',
        username: 'weather_watcher',
        content: 'Flash flooding on Main Street after heavy rain. Cars stuck, needs immediate attention! #flooding',
        timestamp: '2023-11-10T12:45:00Z',
        location: 'Main Street',
      },
      {
        id: '8',
        platform: 'twitter',
        username: '@stranded_driver',
        content: 'My car is stuck in water on Main St. Water level rising quickly. Need help! @CityRescue',
        timestamp: '2023-11-10T12:50:00Z',
        location: 'Main Street',
      },
    ],
  },
];

/**
 * Fetches threat analysis data
 * @returns {Promise<Array>} List of threat data
 */
export async function fetchThreatAnalysis() {
  try {
    console.log('Fetching threat analysis');
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Publish event
    eventBus.publish(events.THREAT_ANALYSIS_LOADED, mockThreatData);
    
    return mockThreatData;
  } catch (error) {
    console.error('Error fetching threat analysis:', error);
    Sentry.captureException(error);
    
    // Publish error event
    eventBus.publish(events.THREAT_ANALYSIS_ERROR, { error });
    
    throw error;
  }
}

/**
 * Analyzes content to determine threat level
 * @param {string} postContent Content to analyze
 * @returns {Promise<string>} Risk level (high, medium, low)
 */
export async function analyzeThreatLevel(postContent) {
  try {
    console.log('Analyzing threat level for content:', postContent);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Simple keyword-based analysis for demo
    const keywords = {
      high: ['fire', 'shooting', 'explosion', 'attack', 'danger', 'emergency', 'flood', 'flooding'],
      medium: ['protest', 'accident', 'crash', 'blocked', 'crowd', 'traffic', 'police'],
      low: ['suspicious', 'strange', 'unusual', 'caution', 'watch', 'warning'],
    };
    
    const content = postContent.toLowerCase();
    
    if (keywords.high.some(keyword => content.includes(keyword))) {
      return 'high';
    } else if (keywords.medium.some(keyword => content.includes(keyword))) {
      return 'medium';
    } else if (keywords.low.some(keyword => content.includes(keyword))) {
      return 'low';
    }
    
    return 'low'; // Default if no keywords match
  } catch (error) {
    console.error('Error analyzing threat level:', error);
    Sentry.captureException(error);
    throw error;
  }
}

/**
 * Gets detailed information about a specific threat
 * @param {string} threatId ID of the threat
 * @returns {Promise<Object>} Threat details
 */
export async function getThreatDetails(threatId) {
  try {
    console.log(`Fetching details for threat ${threatId}`);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const threat = mockThreatData.find(t => t.id === threatId);
    
    if (!threat) {
      throw new Error(`Threat with ID ${threatId} not found`);
    }
    
    return threat;
  } catch (error) {
    console.error('Error fetching threat details:', error);
    Sentry.captureException(error);
    throw error;
  }
}