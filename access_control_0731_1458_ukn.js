// 代码生成时间: 2025-07-31 14:58:10
import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

// Define an AccessControlService
class AccessControlService extends Service {
  @service('session') session;
  @tracked allowedRoutes = [];
  @tracked deniedRoutes = [];

  // Method to check user's access
  @action
  checkAccess(routeName) {
    if (this.session.get('isAuthenticated')) {
      return this.allowedRoutes.includes(routeName);
    } else {
      return false;
    }
  }

  // Method to set allowed routes for authenticated users
  @action
  setAllowedRoutes(routes) {
    this.allowedRoutes = routes;
  }

  // Method to set denied routes for authenticated users
  @action
  setDeniedRoutes(routes) {
    this.deniedRoutes = routes;
  }

  // Method to deny access to a route
  @action
  denyAccess(routeName) {
    if (this.allowedRoutes.includes(routeName)) {
      this.allowedRoutes = this.allowedRoutes.filter((route) => route !== routeName);
    }
  }

  // Method to grant access to a route
  @action
  grantAccess(routeName) {
    if (!this.allowedRoutes.includes(routeName) && !this.deniedRoutes.includes(routeName)) {
      this.allowedRoutes.push(routeName);
    }
  }

  // Method to check if a route is denied
  @action
  isRouteDenied(routeName) {
    return this.deniedRoutes.includes(routeName);
  }
}

export default AccessControlService;

// Usage in a route
import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class ProtectedRoute extends Route {
  @service('access-control') accessControl;

  beforeModel(transition) {
    if (!this.accessControl.checkAccess(transition.to.name)) {
      this.transitionTo('login'); // Redirect to login if access is denied
    }
  }
}

// Example setup of allowed routes
// In an initializer or application route
import { setApplicationTarget } from '@ember ApplicationController';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class Application extends Controller {
  @service('access-control') accessControl;

  constructor() {
    super(...arguments);
    this.initiateAccessControl();
  }

  @action
  initiateAccessControl() {
    this.accessControl.setAllowedRoutes(['dashboard', 'settings']);
    this.accessControl.setDeniedRoutes(['admin']);
  }
}

// This service and setup illustrate a simple access control mechanism with Ember.js.
// It provides a service to manage allowed and denied routes based on user authentication
// and actions to set these routes. The service is then used in routes to control access.
// The example setup demonstrates how to initialize the access control with a list of
// allowed and denied routes.