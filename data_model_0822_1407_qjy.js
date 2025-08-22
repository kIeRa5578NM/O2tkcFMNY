// 代码生成时间: 2025-08-22 14:07:17
import Ember from 'ember';
import DS from 'ember-data';

// Define a model for a User
export default DS.Model.extend({
  // Attributes
  username: DS.attr('string'),
  email: DS.attr('string'),
  age: DS.attr('number'),

  // Relationships
  posts: DS.hasMany('post', { async: true }),
  comments: DS.hasMany('comment', { async: true }),

  // Computed properties
  isAdult: Ember.computed('age', function() {
    return this.get('age') >= 18;
  }),

  // Validations
  validations: {
    email: {
      presence: {
        message: 'Email is required'
      },
      email: {
        message: 'Must be a valid email address'
      }
    },
    username: {
      presence: {
        message: 'Username is required'
      },
      length: {
        minimum: 3,
        message: 'Must be at least 3 characters long'
      }
    },
    age: {
      presence: true,
      numericality: {
        onlyInteger: true,
        greaterThanOrEqualTo: 0,
        message: 'Must be a non-negative integer'
      }
    }
  },

  // Methods
  // Example of a method that can be used to reset the model's state
  resetModel: Ember.computed('username', 'email', 'age', function() {
    if (!this.get('isValid')) {
      return;
    }
    this.setProperties({
      username: '',
      email: '',
      age: null
    });
  }),

  // Observers
  // Example of an observer that can be used to update the model's state
  updateModel: Ember.observer('username', 'email', 'age', function() {
    // Logic to update the model based on changes in attributes
  })

  // Error handling
  // Example of error handling when saving a model
}, {
  //reopenClass: {
    //  FIXTURES: [...] // Here you can define fixtures for testing
  //}
});

/*
 * Note: Ember Data models should be defined in separate files for each model.
 * This example combines them into one file for brevity, but in a real application,
 * each model should be defined in its own file.
 */
