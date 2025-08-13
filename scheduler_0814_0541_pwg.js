// 代码生成时间: 2025-08-14 05:41:16
 * Features:
 * - Ability to schedule tasks with a given interval
 * - Error handling for task execution
 * - Maintainability and extensibility
 */

import Ember from 'ember';

export default Ember.Service.extend({
  // Array to hold scheduled tasks
  tasks: Ember.computed(() => []),

  // Method to schedule a task
  scheduleTask(task, interval) {
    // Validate the input
    if (!task || typeof task !== 'function') {
      throw new Error('Invalid task function');
    }
    if (typeof interval !== 'number' || interval <= 0) {
      throw new Error('Invalid interval value');
    }

    // Store the task in the tasks array with its interval
    this.get('tasks').push({ task, interval });

    // Set up the interval using Ember.run.later
    Ember.run.later(() => {
      try {
        // Execute the task
        task();
      } catch (error) {
        // Handle any errors that occur during task execution
        console.error('Error executing scheduled task:', error);
      }
    }, interval);
  },

  // Method to cancel a scheduled task
  cancelTask(task) {
    // Find the task in the tasks array and cancel it
    const tasks = this.get('tasks');
    const index = tasks.findIndex(t => t.task === task);
    if (index === -1) {
      console.warn('Task not found');
      return;
    }

    // Cancel the Ember.run.later for the task
    Ember.run.cancel(tasks[index].timer);
    tasks.splice(index, 1);
  },

  // Destroy the scheduler and cancel all tasks on service destruction
  willDestroy() {
    this._super(...arguments);
    this.get('tasks').forEach(task => {
      Ember.run.cancel(task.timer);
    });
  }
});