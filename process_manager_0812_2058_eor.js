// 代码生成时间: 2025-08-12 20:58:04
import Ember from 'ember';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { task } from 'ember-concurrency';
import { assert } from '@ember/debug';

// Define a ProcessManager component
export default class ProcessManagerComponent extends Ember.Component {
  @service('process') processService; // Dependency injection for process management

  @tracked processes = []; // Tracked array to store process data
  @tracked selectedProcess = null; // Selected process data
  @tracked isProcessRunning = false; // Flag to check if a process is running

  // Lifecycle hook to fetch processes on component initialization
  didInsertElement() {
    super.didInsertElement(...arguments);
    this.fetchProcesses.perform();
  }

  // Task to fetch processes from the process service
  *fetchProcesses() {
    try {
      this.processes = yield this.processService.list();
    } catch (error) {
      console.error('Error fetching processes:', error);
      // Handle error appropriately
    }
  }

  // Action to handle process start
  @action
  async startProcess(processId) {
    try {
      const result = yield this.processService.start(processId);
      this.updateProcessState(result);
    } catch (error) {
      console.error('Error starting process:', error);
      // Handle error appropriately
    }
  }

  // Action to handle process stop
  @action
  async stopProcess(processId) {
    try {
      const result = yield this.processService.stop(processId);
      this.updateProcessState(result);
    } catch (error) {
      console.error('Error stopping process:', error);
      // Handle error appropriately
    }
  }

  // Update the process state after starting or stopping a process
  updateProcessState(process) {
    this.selectedProcess = process;
    this.isProcessRunning = process.isRunning;
  }
}
