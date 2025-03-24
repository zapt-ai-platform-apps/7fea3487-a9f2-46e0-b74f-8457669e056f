import { fetchRecentSocialData, fetchGeotaggedPosts, fetchSocialMediaByPlatform } from './internal/services';
import { validateSocialPosts } from './validators';

/**
 * Public API for the social module
 */
export const api = {
  /**
   * Fetches recent social media posts
   * @returns {Promise<Array>} List of validated social media posts
   */
  async fetchRecentSocialData() {
    const data = await fetchRecentSocialData();
    return validateSocialPosts(data, {
      actionName: 'fetchRecentSocialData',
      location: 'social/api.js',
      direction: 'outgoing',
      moduleFrom: 'social',
      moduleTo: 'client',
    });
  },
  
  /**
   * Fetches social media posts with geolocation data
   * @returns {Promise<Array>} List of validated geotagged social media posts
   */
  async fetchGeotaggedPosts() {
    const data = await fetchGeotaggedPosts();
    return validateSocialPosts(data, {
      actionName: 'fetchGeotaggedPosts',
      location: 'social/api.js',
      direction: 'outgoing',
      moduleFrom: 'social',
      moduleTo: 'client',
    });
  },
  
  /**
   * Fetches social media posts from a specific platform
   * @param {string} platform Platform name (twitter, instagram, tiktok)
   * @returns {Promise<Array>} List of validated social media posts from the platform
   */
  async fetchSocialMediaByPlatform(platform) {
    if (typeof platform !== 'string' || !platform) {
      throw new Error('Platform must be a non-empty string');
    }
    
    const data = await fetchSocialMediaByPlatform(platform);
    return validateSocialPosts(data, {
      actionName: 'fetchSocialMediaByPlatform',
      location: 'social/api.js',
      direction: 'outgoing',
      moduleFrom: 'social',
      moduleTo: 'client',
    });
  },
};

// For backward compatibility
export const fetchRecentSocialData = api.fetchRecentSocialData;
export const fetchGeotaggedPosts = api.fetchGeotaggedPosts;
export const fetchSocialMediaByPlatform = api.fetchSocialMediaByPlatform;