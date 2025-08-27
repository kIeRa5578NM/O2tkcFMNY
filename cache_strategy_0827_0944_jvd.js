// 代码生成时间: 2025-08-27 09:44:26
import EmberObject from '@ember/object';
import { computed } from '@ember/object';
import { later } from '@ember/runloop';
import { isEmpty } from '@ember/utils';

// CacheManager class to handle caching logic
export default EmberObject.extend({
  // Cache storage
  cacheStorage: null,

  // Initialize cache storage
  init() {
    this.set('cacheStorage', {});
  },

  // Get a value from cache, if it doesn't exist, fetch it and store
  async get(key, fetchFunction, expiration = 60000) {
    try {
      // Check if the cached value exists and is not expired
      const cached = this.cacheStorage[key];
      const now = Date.now();

      if (!isEmpty(cached) && cached.timestamp + expiration > now) {
        return cached.value;
      } else {
        // Fetch the value if it's not cached or expired
        const value = await fetchFunction();

        // Store the fetched value in cache with a timestamp
        this.cacheStorage[key] = {
          value,
          timestamp: now
        };

        return value;
      }
    } catch (error) {
      // Handle errors, e.g., log them or re-throw
      console.error('Cache fetch error:', error);
      throw error;
    }
  },

  // Invalidate a cached value
  invalidate(key) {
    this.cacheStorage[key] = null;
  },

  // Clear all cached values
  clearCache() {
    this.set('cacheStorage', {});
  }
});
