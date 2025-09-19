// 代码生成时间: 2025-09-20 04:44:44
import Service from '@ember/service';
import Component from '@ember/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

// NotificationService handles the logic for creating and managing notifications.
export default class NotificationService extends Service {
  @tracked notifications = [];

  // Add a notification to the list.
  addNotification(message, type = 'info') {
    try {
      this.notifications.pushObject({ message, type });
    } catch (error) {
      console.error('Error adding notification:', error);
    }
  }

  // Remove a notification from the list.
  removeNotification(notification) {
    try {
      this.notifications.removeObject(notification);
    } catch (error) {
      console.error('Error removing notification:', error);
    }
  }
}

// NotificationComponent is responsible for displaying notifications.
export default class NotificationComponent extends Component {
  // Reference to the NotificationService.
  @service('notification') notificationService;

  // Lifecycle hook to remove notifications when they are clicked.
  willDestroy() {
    super.willDestroy(...arguments);
    this.args.notifications.forEach((notification) => {
      this.notificationService.removeNotification(notification);
    });
  }

  // Action to handle clicking on a notification.
  @action
  onClickNotification(notification) {
    this.notificationService.removeNotification(notification);
  }
}
