// 代码生成时间: 2025-09-16 13:11:21
import { service } from '@ember/service';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { v4 as uuidv4 } from 'uuid';

// CacheService is a service that handles caching logic
export default class CacheService extends Object {
  @service()
  store; // Injecting the store service for data persistence

  // The cache object to store the cached data
  cache = {};

  // The cache configuration
  cacheConfig = {
    ttl: 60 * 60 * 1000, // Time to live in milliseconds (1 hour by default)
    maxEntries: 100 // Maximum number of cache entries
  };

  // Function to get data from the cache or fetch it from the store if not available
  @action
  async fetchData(key, fetchFunction) {
    if (this.cache[key] && this.isCacheValid(this.cache[key].timestamp)) {
      // Cache hit, return the cached data
      return this.cache[key].data;
    } else {
      try {
        // Fetch data from the store
        const data = await fetchFunction();
        // Cache miss, store the new data in the cache
        this.cacheSet(key, data);
        return data;
      } catch (error) {
        // Handle errors when fetching data
        console.error('Error fetching data:', error);
        throw error;
      }
    }
  }

  // Function to set data in the cache
  cacheSet(key, data) {
    // Check if the cache is full and remove the oldest data if necessary
    if (Object.keys(this.cache).length >= this.cacheConfig.maxEntries) {
      this.removeOldestEntry();
    }
    // Add or update the cache entry
    this.cache[key] = {
      data,
      timestamp: Date.now()
    };
  }

  // Function to check if the cache entry is still valid based on TTL
  isCacheValid(timestamp) {
    return Date.now() - timestamp < this.cacheConfig.ttl;
  }

  // Function to remove the oldest cache entry
  removeOldestEntry() {
    let oldestKey = null;
    let oldestTimestamp = Number.MAX_SAFE_INTEGER;

    for (let key in this.cache) {
      if (this.cache[key].timestamp < oldestTimestamp) {
        oldestTimestamp = this.cache[key].timestamp;
        oldestKey = key;
      }
    }

    if (oldestKey !== null) {
      delete this.cache[oldestKey];
    }
  }

  // Function to clear the entire cache
  clearCache() {
    this.cache = {};
  }
}

// Usage in a component or route:
// let cacheService = this.cacheService;
// let cachedData = await cacheService.fetchData('myKey', async () => {
//   return store.findAll('myModel');
// });