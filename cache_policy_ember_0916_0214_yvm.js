// 代码生成时间: 2025-09-16 02:14:51
import Ember from 'ember';
import { computed } from '@ember/object';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';
import { isEmpty } from '@ember/utils';
import { debounce } from '@ember/runloop';
import { hash, or } from 'rsvp';

export default Ember.Service.extend({
  // Inject the store service
  store: service(),

  // Cache storage
  cache: {},

  // Retrieve data from the store with cache
  fetchData: function(storeKey, params) {
    const cache = this.cache;
    let cachedData = cache[storeKey];

    // Check if data is cached and not empty
    if (cachedData && !isEmpty(cachedData)) {
      // Return cached data
      return Ember.RSVP.resolve(cachedData);
    } else {
      // Fetch data from the store
      return this.get('store').query(storeKey, params)
        .then(data => {
          // Cache the data
          cache[storeKey] = data;
          return data;
        }).catch(error => {
          // Handle errors
          console.error('Error fetching data:', error);
          throw error;
        });
    }
  },

  // Invalidate cache for a specific store key
  invalidateCache: function(storeKey) {
    const cache = this.cache;
    if (cache[storeKey]) {
      delete cache[storeKey];
    }
  },

  // Invalidate the entire cache
  clearCache: function() {
    this.set('cache', {});
  }
});
