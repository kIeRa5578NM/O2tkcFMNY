// 代码生成时间: 2025-09-17 20:58:44
import Ember from 'ember';
import { action, computed } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { debounce } from '@ember/runloop';
import fetch from 'fetch';

// Define the InventoryItem model
class InventoryItem {
  @tracked id;
  @tracked name;
  @tracked quantity;
  @tracked price;

  constructor(id, name, quantity, price) {
    this.id = id;
    this.name = name;
    this.quantity = quantity;
    this.price = price;
  }
}

// Define the InventoryService service
class InventoryService {
  constructor() {
    this.items = [];
  }

  async fetchItems() {
    try {
      const response = await fetch('/api/inventory');
      if (!response.ok) {
        throw new Error('Failed to fetch inventory items');
      }
      const items = await response.json();
      this.items = items.map(item => new InventoryItem(item.id, item.name, item.quantity, item.price));
    } catch (error) {
      console.error('Error fetching inventory items:', error);
    }
  }

  @computed('items.[]')
  get totalInventoryValue() {
    return this.items.reduce((total, item) => total + (item.quantity * item.price), 0);
  }
}

// Define the InventoryController
export default class InventoryController extends Ember.Controller {
  @tracked newItemName = '';
  @tracked newItemQuantity = 0;
  @tracked newItemPrice = 0;
  @tracked error = null;
  @tracked inventoryService = new InventoryService();

  @action
  async addNewItem() {
    try {
      const newItem = new InventoryItem(Date.now(), this.newItemName, this.newItemQuantity, this.newItemPrice);
      await fetch('/api/inventory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem)
      });
      this.inventoryService.fetchItems();
      this.newItemName = '';
      this.newItemQuantity = 0;
      this.newItemPrice = 0;
    } catch (error) {
      this.error = 'Failed to add new item: ' + error.message;
    }
  }

  @action
  async updateQuantity(item, newQuantity) {
    try {
      await fetch(`/api/inventory/${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity: newQuantity })
      });
      this.inventoryService.fetchItems();
    } catch (error) {
      this.error = 'Failed to update quantity: ' + error.message;
    }
  }
}

// Define the InventoryRoute
export class InventoryRoute extends Ember.Route {
  beforeModel() {
    this.controllerFor('inventory').inventoryService.fetchItems();
  }
}
