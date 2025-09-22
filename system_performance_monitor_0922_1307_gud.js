// 代码生成时间: 2025-09-22 13:07:01
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

// 模拟的性能数据服务，实际应用中可能通过API获取系统性能数据
import PerformanceDataService from './services/performance-data-service';

// 系统性能监控组件
export default class SystemPerformanceMonitorComponent extends Component {
  // 注入性能数据服务
  @service('performance-data') performanceDataService;

  // 跟踪性能数据变化
  @tracked systemLoad = 0;
  @tracked cpuUsage = 0;
  @tracked memoryUsage = 0;

  // 组件初始化后获取性能数据
  constructor() {
    super(...arguments);
    this.fetchPerformanceData();
  }

  // 获取性能数据的方法
  @action
  async fetchPerformanceData() {
    try {
      // 调用性能数据服务获取数据
      const performanceData = await this.performanceDataService.getPerformanceData();
      this.systemLoad = performanceData.systemLoad;
      this.cpuUsage = performanceData.cpuUsage;
      this.memoryUsage = performanceData.memoryUsage;
    } catch (error) {
      // 错误处理
      console.error('Failed to fetch performance data:', error);
    }
  }

  // 获取性能数据的方法，每隔一段时间自动更新
  @action
  async updatePerformanceData() {
    try {
      setInterval(async () => {
        const performanceData = await this.performanceDataService.getPerformanceData();
        this.systemLoad = performanceData.systemLoad;
        this.cpuUsage = performanceData.cpuUsage;
        this.memoryUsage = performanceData.memoryUsage;
      }, 1000); // 每秒更新一次
    } catch (error) {
      console.error('Failed to update performance data:', error);
    }
  }
}