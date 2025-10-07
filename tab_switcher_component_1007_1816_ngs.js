// 代码生成时间: 2025-10-07 18:16:46
 * Ensures clear code structure, error handling, and maintainability.
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { assert } from '@ember/debug';

export default class TabSwitcherComponent extends Component {
  // The current active tab index
  activeTabIndex = 0;

  // The list of tabs
  tabs = [];

  constructor() {
    super(...arguments);
    // Initialize tabs with provided arguments or default values
    this.tabs = this.args.tabs || [];

    // Ensure tabs array is not empty
    assert('Tabs list must be provided', this.tabs.length > 0);
  }

  // Action to switch tabs
  @action
  switchTab(index) {
    // Check if the index is within the bounds of the tabs array
    if (index < 0 || index >= this.tabs.length) {
      throw new Error('Invalid tab index');
    }

    // Set the active tab index to the provided index
    this.activeTabIndex = index;
  }

  // Get the content of the active tab
  get activeTabContent() {
    return this.tabs[this.activeTabIndex].content;
  }

  // Get the label of the active tab
  get activeTabLabel() {
    return this.tabs[this.activeTabIndex].label;
  }

  // Render the tab switcher
  renderTabs() {
    return this.tabs.map((tab, index) => {
      return {
        isActive: index === this.activeTabIndex,
        label: tab.label,
        content: tab.content,
        onClick: () => this.switchTab(index),
      };
    });
  }
}
