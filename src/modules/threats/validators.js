import { z } from 'zod';
import { createValidator } from '../core/validators';

// Define location schema
const locationSchema = z.object({
  address: z.string(),
  latitude: z.number(),
  longitude: z.number(),
});

// Define schema for related social posts
const relatedPostSchema = z.object({
  id: z.string(),
  platform: z.string(),
  username: z.string(),
  content: z.string(),
  timestamp: z.string(),
  location: z.string().optional(),
});

// Define schema for threat analysis
export const threatSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  riskLevel: z.enum(['high', 'medium', 'low']),
  timestamp: z.string(),
  location: locationSchema,
  relatedPosts: z.array(relatedPostSchema),
});

// Create validators for threat data
export const validateThreat = createValidator(threatSchema, 'Threat');
export const validateThreats = createValidator(z.array(threatSchema), 'Threats');