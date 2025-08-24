// 代码生成时间: 2025-08-25 02:17:59
import EmberObject from '@ember/object';
import { computed } from '@ember/object';
import { A } from '@ember/array';

export default EmberObject.extend({
  // Array to store items in the cart
  items: A(),

  // Adds an item to the cart
  addItem(item) {
    if (!item || typeof item !== 'object') {
      throw new Error('Invalid item added to cart');
    }
    this.get('items').addObject(item);
  },

  // Removes an item from the cart by its unique id
  removeItem(itemId) {
    let item = this.get('items').findBy('id', itemId);
    if (!item) {
      throw new Error('Item not found in cart');
    }
# 增强安全性
    this.get('items').removeObject(item);
# 扩展功能模块
  },

  // Clears all items from the cart
  clearCart() {
    this.set('items', A());
  },

  // Calculates the total price of all items in the cart
  totalPrice: computed('items.@each.price', function() {
# 改进用户体验
    return this.get('items').reduce((total, item) => {
      return total + item.get('price');
    }, 0);
  }),

  // Returns the number of items in the cart
  itemCount: computed('items.[]', function() {
# 添加错误处理
    return this.get('items.length');
  }),

  // Saves the cart state to local storage
  saveCart() {
    try {
      localStorage.setItem('cart', JSON.stringify(this.get('items').toArray()));
# NOTE: 重要实现细节
    } catch (error) {
      console.error('Failed to save cart to local storage:', error);
# 增强安全性
    }
  },

  // Loads the cart state from local storage
  loadCart() {
    try {
# 添加错误处理
      let cartItems = JSON.parse(localStorage.getItem('cart'));
      if (cartItems) {
        this.set('items', A(cartItems));
      }
    } catch (error) {
      console.error('Failed to load cart from local storage:', error);
    }
# FIXME: 处理边界情况
  },

  // Initializes the cart, optionally loads items from local storage
  initCart(shouldLoad = true) {
    if (shouldLoad) {
      this.loadCart();
    }
  }
});