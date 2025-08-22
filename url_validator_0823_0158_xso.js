// 代码生成时间: 2025-08-23 01:58:20
 * maintainability and extensibility.
 */

import Component from '@ember/component';
import { action } from '@ember/object';
import { isEmpty } from '@ember/utils';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/template';

export default class UrlValidatorComponent extends Component {
  @service router; // Injecting the router service for navigation

  // The URL to be validated
  url = '';

  // The state of the URL validation (valid or invalid)
  isUrlValid = false;

  // The error message to be displayed
  errorMessage = '';

  // Computed property to check if the URL is empty
  @computed('url')
  get isUrlEmpty() {
    return isEmpty(this.url);
  }

  // Action to handle URL input changes
  @action
  validateUrl() {
    try {
      // Reset the error message
      this.set('errorMessage', '');

      // Check if the URL is empty
      if (this.isUrlEmpty) {
        throw new Error('URL cannot be empty.');
      }

      // Use URL API to validate the URL format
      const url = new URL(this.url);
      // Check if the URL is actually a valid URL
      if (!url.protocol.startsWith('http')) {
        throw new Error('URL must start with http or https.');
      }

      // If no errors, set the URL as valid
      this.set('isUrlValid', true);
    } catch (error) {
      // If there's an error, set the error message and mark URL as invalid
      this.set('errorMessage', error.message);
      this.set('isUrlValid', false);
    }
  }

  // Action to navigate to the URL if valid
  @action
  redirectToUrl() {
    if (this.isUrlValid) {
      window.open(this.url, '_blank');
    } else {
      this.set('errorMessage', 'Please validate the URL before redirection.');
    }
  }
}
