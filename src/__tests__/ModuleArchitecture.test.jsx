import { describe, it, expect, vi } from 'vitest';
import { api as socialApi } from '@/modules/social/api';
import { api as threatsApi } from '@/modules/threats/api';
import { validateSocialPost, validateSocialPosts } from '@/modules/social/validators';
import { validateThreat, validateThreats } from '@/modules/threats/validators';
import { eventBus } from '@/modules/core/events';
import { events as socialEvents } from '@/modules/social/events';
import { events as threatEvents } from '@/modules/threats/events';
import { initializeModules } from '@/modules';

// Sample valid social post data
const validSocialPost = {
  id: '1',
  platform: 'twitter',
  username: '@test_user',
  content: 'Test content',
  timestamp: '2023-11-10T14:30:00Z',
  location: 'Test Location',
  riskLevel: 'medium',
};

// Sample valid threat data
const validThreat = {
  id: '1',
  title: 'Test Threat',
  description: 'Test description',
  riskLevel: 'medium',
  timestamp: '2023-11-10T14:30:00Z',
  location: {
    address: 'Test Location',
    latitude: 37.7749,
    longitude: -122.4194,
  },
  relatedPosts: [
    {
      id: '1',
      platform: 'twitter',
      username: '@test_user',
      content: 'Test content',
      timestamp: '2023-11-10T14:30:00Z',
      location: 'Test Location',
    },
  ],
};

describe('Contract-Based Module Architecture', () => {
  // Test the validator functionality
  describe('Validators', () => {
    it('validates correct social post data', () => {
      expect(() => validateSocialPost(validSocialPost)).not.toThrow();
    });
    
    it('rejects invalid social post data', () => {
      const invalidPost = { ...validSocialPost, riskLevel: 'invalid-level' };
      expect(() => validateSocialPost(invalidPost)).toThrow();
    });
    
    it('validates correct threat data', () => {
      expect(() => validateThreat(validThreat)).not.toThrow();
    });
    
    it('rejects invalid threat data', () => {
      const invalidThreat = { ...validThreat, location: { address: 'Test' } };
      expect(() => validateThreat(invalidThreat)).toThrow();
    });
  });

  // Test the event bus functionality
  describe('Event Bus', () => {
    it('publishes and receives events', () => {
      const mockCallback = vi.fn();
      const testEvent = 'test-event';
      const testData = { foo: 'bar' };
      
      // Subscribe to event
      const unsubscribe = eventBus.subscribe(testEvent, mockCallback);
      
      // Publish event
      eventBus.publish(testEvent, testData);
      
      // Check callback was called with correct data
      expect(mockCallback).toHaveBeenCalledWith(testData);
      
      // Unsubscribe
      unsubscribe();
      
      // Publish again
      eventBus.publish(testEvent, testData);
      
      // Callback should not be called again
      expect(mockCallback).toHaveBeenCalledTimes(1);
    });
  });

  // Test that modules expose the expected API
  describe('Module API Contracts', () => {
    it('social module exposes expected API', () => {
      expect(socialApi).toHaveProperty('fetchRecentSocialData');
      expect(socialApi).toHaveProperty('fetchGeotaggedPosts');
      expect(socialApi).toHaveProperty('fetchSocialMediaByPlatform');
      expect(typeof socialApi.fetchRecentSocialData).toBe('function');
      expect(typeof socialApi.fetchGeotaggedPosts).toBe('function');
      expect(typeof socialApi.fetchSocialMediaByPlatform).toBe('function');
    });
    
    it('threats module exposes expected API', () => {
      expect(threatsApi).toHaveProperty('fetchThreatAnalysis');
      expect(threatsApi).toHaveProperty('analyzeThreatLevel');
      expect(threatsApi).toHaveProperty('getThreatDetails');
      expect(typeof threatsApi.fetchThreatAnalysis).toBe('function');
      expect(typeof threatsApi.analyzeThreatLevel).toBe('function');
      expect(typeof threatsApi.getThreatDetails).toBe('function');
    });
  });

  // Test that events are properly defined
  describe('Module Events', () => {
    it('social module defines expected events', () => {
      expect(socialEvents).toHaveProperty('SOCIAL_DATA_LOADED');
      expect(socialEvents).toHaveProperty('SOCIAL_DATA_ERROR');
      expect(socialEvents).toHaveProperty('NEW_HIGH_RISK_POST');
    });
    
    it('threats module defines expected events', () => {
      expect(threatEvents).toHaveProperty('THREAT_ANALYSIS_LOADED');
      expect(threatEvents).toHaveProperty('THREAT_ANALYSIS_ERROR');
      expect(threatEvents).toHaveProperty('NEW_HIGH_RISK_THREAT');
    });
  });

  // Test module initialization
  describe('Module Initialization', () => {
    it('initializes all modules successfully', async () => {
      const result = await initializeModules();
      expect(result).toBe(true);
    });
  });
});