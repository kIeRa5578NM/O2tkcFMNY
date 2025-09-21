// 代码生成时间: 2025-09-21 20:03:07
import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { isEmpty } from '@ember/utils';

// Define a service to handle user authentication
import UserAuthService from './user-auth-service';

export default class UserLoginController extends Controller {
  @service("userAuth") auth; // Inject the UserAuthService

  @tracked username = ""; // Track the username for two-way binding
  @tracked password = ""; // Track the password for two-way binding
  @tracked errorMessage = ""; // Track error messages

  // Function to handle login action
  @action
  async login() {
    if (isEmpty(this.username) || isEmpty(this.password)) {
      // Set error message when username or password is empty
      this.errorMessage = "Username or password cannot be empty.";
      return;
    }

    try {
      // Attempt to authenticate user with the provided credentials
      const isValid = await this.auth.authenticate(this.username, this.password);
      if (isValid) {
        // Redirect or perform actions on successful login
        console.log("User logged in successfully.");
      } else {
        // Set error message when authentication fails
        this.errorMessage = "Invalid username or password.";
      }
    } catch (error) {
      // Handle any other errors that may occur during authentication
      this.errorMessage = error.message;
    }
  }
}

// The UserAuthService can be implemented separately,
// it should have an authenticate function to handle the actual
// authentication logic, possibly interacting with an API
// or a database.