// 代码生成时间: 2025-07-30 18:29:07
import EmberObject from '@ember/object';
import { computed } from '@ember/object';
import { isEmpty } from '@ember/utils';

// APIResponseFormatter is a utility class that formats API responses.
// It provides a clean and structured way to handle API responses.
export default EmberObject.extend({
  // The API response data
  response: null,

  // The formatted response data
  formattedResponse: computed('response', function() {
    let { response } = this;
    if (isEmpty(response)) {
      // If the response is empty, return an empty object
      return {};
    }

    // Check if the response contains the expected structure
    if (!response.data || !response.status) {
      throw new Error('Invalid API response structure');
    }

    // Format the response based on the status code
    switch (response.status) {
      case 200:
        // Handle successful responses
        return this.formatSuccess(response);
      case 400:
        // Handle bad requests
        return this.formatError(response, 'Bad Request');
      case 401:
        // Handle unauthorized requests
        return this.formatError(response, 'Unauthorized');
      case 500:
        // Handle server errors
        return this.formatError(response, 'Server Error');
      default:
        // Handle unknown status codes
        return this.formatError(response, 'Unknown Error');
    }
  }),

  // Format a successful response
  formatSuccess(response) {
    // Extract the data from the response
    return {
      success: true,
      data: response.data,
      message: 'Request successful'
    };
  },

  // Format an error response
  formatError(response, errorMessage) {
    // Extract the error details from the response
    return {
      success: false,
      error: response.error || errorMessage,
      message: errorMessage,
      statusCode: response.status
    };
  }
});