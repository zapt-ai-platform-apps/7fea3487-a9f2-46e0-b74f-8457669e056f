/**
 * Event bus implementation for inter-module communication
 */
export class EventBus {
  subscribers = {};

  /**
   * Subscribe to an event
   * @param {string} event - Event name to subscribe to
   * @param {function} callback - Function to call when event is published
   * @returns {function} - Unsubscribe function
   */
  subscribe(event, callback) {
    if (!this.subscribers[event]) this.subscribers[event] = [];
    this.subscribers[event].push(callback);
    return () => this.unsubscribe(event, callback);
  }

  /**
   * Publish an event
   * @param {string} event - Event name to publish
   * @param {any} data - Data to pass to subscribers
   */
  publish(event, data) {
    if (!this.subscribers[event]) return;
    this.subscribers[event].forEach(callback => callback(data));
  }

  /**
   * Unsubscribe from an event
   * @param {string} event - Event name to unsubscribe from
   * @param {function} callback - Function to remove from subscribers
   */
  unsubscribe(event, callback) {
    if (!this.subscribers[event]) return;
    this.subscribers[event] = this.subscribers[event]
      .filter(cb => cb !== callback);
  }
}

export const eventBus = new EventBus();