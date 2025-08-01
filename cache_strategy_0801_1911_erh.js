// 代码生成时间: 2025-08-01 19:11:02
export default Ember.Service.extend({
  // This hash will serve as the in-memory cache store.
  cacheStore: {},

  /**
   * Retrieves data from the cache or fetches it if not present.
   *
   * @method fetchData
   * @param {String} key The unique key for the data.
   * @param {Function} fetchDataFunction The function to call if data is not cached.
   * @return {Promise} A promise that resolves with the data.
   */
  fetchData(key, fetchDataFunction) {
    // Check if the data is already cached.
    const cachedData = this.get('cacheStore')[key];
    if (cachedData) {
      // Return a resolved promise with the cached data.
      return Ember.RSVP.resolve(cachedData);
    } else {
      // Fetch the data using the provided function and cache it.
      return fetchDataFunction().then(data => {
        this.set('cacheStore', Ember.$.extend({}, this.get('cacheStore'), { [key]: data }));
        return data;
      }).catch(error => {
        // Handle errors here, possibly with retry logic or fallback.
        console.error('Error fetching data:', error);
        throw error;
      });
    }
  },

  /**
   * Clears the cache for a specific key.
   *
   * @method clearCache
   * @param {String} key The unique key for the data to clear.
   */
  clearCache(key) {
    this.set('cacheStore', Ember.$.extend({}, this.get('cacheStore'), { [key]: undefined }));
  },

  /**
   * Clears the entire cache.
   *
   * @method clearAllCache
   */
  clearAllCache() {
    this.set('cacheStore', {});
  }
});