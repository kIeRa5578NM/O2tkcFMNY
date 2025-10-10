// 代码生成时间: 2025-10-11 02:13:29
import Ember from 'ember';
import { computed } from '@ember/object';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';
import { get, set, getProperties } from '@ember/object';
import { Promise } from 'rsvp';
import { isEmpty } from '@ember/utils';

export default Ember.Controller.extend({
  // Injecting the store service from Ember Data
  store: service('store'),

  // Injecting the flash messages service for notifications
  flashMessages: service('flash-messages'),

  // Sample initial inventory data
  inventoryItems: A([]),

  // Actions
  actions: {
    // Action to add a new inventory item
    addInventoryItem() {
      let newInventoryItem = this.store.createRecord('inventory-item', {
        name: this.get('newItemName'),
        quantity: this.get('newItemQuantity'),
        // Add other properties as needed
      });

      // Save the new inventory item to the server
      newInventoryItem.save().then((item) => {
        // Add the new item to the inventory array
        this.get('inventoryItems').pushObject(item);
        this.reset();
        // Show a success message
        this.get('flashMessages').success('Item added to inventory successfully.');
      }).catch((error) => {
        // Handle any errors that occur during save
        this.get('flashMessages').danger('Error adding item to inventory: ' + error.message);
      });
    },

    // Action to update an existing inventory item
    updateInventoryItem(item) {
      // Save the changes to the server
      item.save().then(() => {
        // Show a success message
        this.get('flashMessages').success('Inventory item updated successfully.');
      }).catch((error) => {
        // Handle any errors that occur during save
        this.get('flashMessages').danger('Error updating inventory item: ' + error.message);
      });
    },

    // Action to delete an existing inventory item
    deleteInventoryItem(item) {
      // Confirm the deletion before proceeding
      if (confirm('Are you sure you want to delete this inventory item?')) {
        // Delete the item from the server and remove it from the inventory array
        item.destroyRecord().then(() => {
          this.get('inventoryItems').removeObject(item);
          // Show a success message
          this.get('flashMessages').success('Inventory item deleted successfully.');
        }).catch((error) => {
          // Handle any errors that occur during deletion
          this.get('flashMessages').danger('Error deleting inventory item: ' + error.message);
        });
      }
    },
  },

  // Reset the form fields after adding or updating an item
  reset() {
    set(this, 'newItemName', '');
    set(this, 'newItemQuantity', null);
  },

  // Computed properties for form validation
  canAddItem: computed('newItemName', 'newItemQuantity', function() {
    let { newItemName, newItemQuantity } = getProperties(this, 'newItemName', 'newItemQuantity');
    return !isEmpty(newItemName) && !isEmpty(newItemQuantity);
  }),

  // Lifecycle hook to load initial inventory data
  init() {
    this._super(...arguments);
    this.loadInventoryItems();
  },

  // Method to load inventory items from the server
  loadInventoryItems() {
    this.store.findAll('inventory-item').then((items) => {
      this.set('inventoryItems', items);
    }).catch((error) => {
      this.get('flashMessages').danger('Error loading inventory items: ' + error.message);
    });
  },
});