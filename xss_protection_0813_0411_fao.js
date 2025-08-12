// 代码生成时间: 2025-08-13 04:11:28
import Ember from 'ember';

// 引入DOMPurify用于XSS防护
import DOMPurify from 'dompurify';

export default Ember.Service.extend({

  /**
   * Sanitizes the input string to prevent XSS attacks
   * @param {string} input The string to sanitize

   * @returns {string} The sanitized string

   */

  sanitizeString(input) {
    // Check if the input is a string
    if (typeof input !== 'string') {
      throw new Error('Input must be a string');
    }

    // Use DOMPurify to sanitize the input
    const sanitizedInput = DOMPurify.sanitize(input);

    // Return the sanitized string
    return sanitizedInput;
  },

  // Additional methods for XSS protection can be added here
  // ...

});
