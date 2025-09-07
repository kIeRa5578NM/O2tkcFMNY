// 代码生成时间: 2025-09-07 12:28:06
 * interactive-chart-generator.js
 * This Ember application provides an interactive chart generator.
 * Users can select different chart types and customize the data accordingly.
 */

import Ember from 'ember';
import Chart from 'chart.js';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';

export default Ember.Component.extend({
  // Service to manage chart data
  chartData: service('chart-data'),

  // Properties to hold user selections
  selectedChartType: null,
  chartOptions: null,
  chartData: null,

  // Computed properties to handle chart updates
  chartContext: computed('chartData', function() {
    return this.element.querySelector('#chartCanvas').getContext('2d');
  }),

  // Lifecycle hooks to initialize and destroy the chart
  init() {
    this._super(...arguments);
    this.set('chartData', A([]));
  },

  didInsertElement() {
    this._super(...arguments);
    this.setupChart();
  },

  willDestroyElement() {
    this._super(...arguments);
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }
  },

  // Actions
  actions: {
    // Handle chart type selection
    selectChartType(chartType) {
      this.set('selectedChartType', chartType);
      this.updateChart();
    },
    // Handle chart data input
    updateChartData(chartData) {
      this.set('chartData', chartData);
      this.updateChart();
    },
    // Handle chart options update
    updateChartOptions(options) {
      this.set('chartOptions', options);
      this.updateChart();
    },
  },

  // Methods
  setupChart() {
    const { chartContext } = this;
    if (!chartContext) { return; }
    this.chartInstance = new Chart(chartContext, this.getChartConfig());
  },

  getChartConfig() {
    let config = {
      type: this.selectedChartType,
      data: {
        datasets: this.chartData,
      },
      options: this.chartOptions,
    };
    return config;
  },

  updateChart() {
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }
    this.setupChart();
  },

  // Error handling
  error(message) {
    console.error(message);
  },

  // Documentation and comments
  // The chartData service is used to manage the data of the chart.
  // It should provide methods to add, remove, or update data points.
  // The selectedChartType property holds the currently selected chart type.
  // The chartOptions property holds the options for the chart.
  // The chartContext computed property is used to get the 2D context of the canvas.
  // The setupChart method initializes the chart with the given configuration.
  // The getChartConfig method returns the configuration for the chart.
  // The updateChart method updates the chart with new data or options.
  // The error method is used to handle and log errors.
});