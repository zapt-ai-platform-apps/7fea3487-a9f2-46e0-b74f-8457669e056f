import { z } from 'zod';
import { createValidator } from '../core/validators';

// Define schema for social media posts
export const socialPostSchema = z.object({
  id: z.string(),
  platform: z.string(),
  username: z.string(),
  content: z.string(),
  timestamp: z.string(),
  location: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  riskLevel: z.enum(['high', 'medium', 'low']),
});

// Create validators for social data
export const validateSocialPost = createValidator(socialPostSchema, 'SocialPost');
export const validateSocialPosts = createValidator(z.array(socialPostSchema), 'SocialPosts');