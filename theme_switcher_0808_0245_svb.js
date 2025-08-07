// 代码生成时间: 2025-08-08 02:45:56
// theme_switcher.js
// A simple theme switcher using Ember framework.

import Ember from 'ember';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ThemeSwitcher extends Ember.Component {
  // Track the current theme to toggle between light and dark
  @tracked theme = 'light';

  // Define the themes available
  themes = ['light', 'dark'];

  // Action handler to toggle the theme
  @action
  toggleTheme() {
    try {
      // Check if the current theme is in the list of available themes
      if (!this.themes.includes(this.theme)) {
        throw new Error('Theme not found');
      }
      // Toggle the theme
      this.theme = this.theme === 'light' ? 'dark' : 'light';
      // Set the document body class to match the current theme
      document.body.className = this.theme;
    } catch (error) {
      // Handle any errors that occur during theme toggling
      console.error('Error toggling theme:', error);
    }
  }

  // Lifecycle hook to set the initial theme class on component insertion
  didInsertElement() {
    super.didInsertElement(...arguments);
    // Set the document body class to match the initial theme
    document.body.className = this.theme;
  }
}
