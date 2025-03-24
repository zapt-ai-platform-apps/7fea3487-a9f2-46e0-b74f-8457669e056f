import { fetchThreatAnalysis, analyzeThreatLevel, getThreatDetails } from './internal/services';
import { validateThreats, validateThreat } from './validators';

/**
 * Public API for the threats module
 */
export const api = {
  /**
   * Fetches threat analysis data
   * @returns {Promise<Array>} List of validated threat data
   */
  async fetchThreatAnalysis() {
    const data = await fetchThreatAnalysis();
    return validateThreats(data, {
      actionName: 'fetchThreatAnalysis',
      location: 'threats/api.js',
      direction: 'outgoing',
      moduleFrom: 'threats',
      moduleTo: 'client',
    });
  },
  
  /**
   * Analyzes content to determine threat level
   * @param {string} postContent Content to analyze
   * @returns {Promise<string>} Risk level (high, medium, low)
   */
  async analyzeThreatLevel(postContent) {
    if (!postContent || typeof postContent !== 'string') {
      throw new Error('Post content must be a non-empty string');
    }
    
    return await analyzeThreatLevel(postContent);
  },
  
  /**
   * Gets detailed information about a specific threat
   * @param {string} threatId ID of the threat
   * @returns {Promise<Object>} Validated threat details
   */
  async getThreatDetails(threatId) {
    if (!threatId || typeof threatId !== 'string') {
      throw new Error('Threat ID must be a non-empty string');
    }
    
    const data = await getThreatDetails(threatId);
    return validateThreat(data, {
      actionName: 'getThreatDetails',
      location: 'threats/api.js',
      direction: 'outgoing',
      moduleFrom: 'threats',
      moduleTo: 'client',
    });
  },
};

// For backward compatibility
export const fetchThreatAnalysis = api.fetchThreatAnalysis;
export const analyzeThreatLevel = api.analyzeThreatLevel;
export const getThreatDetails = api.getThreatDetails;