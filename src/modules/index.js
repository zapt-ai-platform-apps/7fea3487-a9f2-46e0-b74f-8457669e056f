import { initializeSocial } from './social/internal/initialize';
import { initializeThreats } from './threats/internal/initialize';

/**
 * Initialize all application modules
 * This should be called when the application starts
 */
export async function initializeModules() {
  console.log('Initializing all modules');
  
  try {
    await Promise.all([
      initializeSocial(),
      initializeThreats(),
      // Add new modules here as they are created
    ]);
    
    console.log('All modules initialized successfully');
    return true;
  } catch (error) {
    console.error('Failed to initialize modules:', error);
    throw error;
  }
}