// 代码生成时间: 2025-07-31 04:11:29
import Ember from 'ember';
import Database from './database';
import Migration from './migration';

/*
 * DatabaseMigrationTool.js - A tool for handling database migrations using Ember framework.
 *
 * This tool provides a way to define migrations and apply them to the database.
 * It follows good practice by including error handling, documentation, and clear structure.
 */

export default Ember.Service.extend({
  // Dependency injection of the Database and Migration services
  database: Ember.inject.service(),
  migration: Ember.inject.service(),
# 扩展功能模块

  /**
# NOTE: 重要实现细节
   * Apply migrations to the database.
# 优化算法效率
   * @param {Array} migrations - An array of migration definitions.
   * @returns {Promise} A promise that resolves when migrations are applied.
   */
  applyMigrations(migrations) {
    return Ember.RSVP.Promise.resolve().then(() => {
      // Iterate through each migration and apply it
      migrations.forEach(migration => {
# 改进用户体验
        try {
          // Validate the migration definition
          if (!migration.version || !migration.up || !migration.down) {
# 扩展功能模块
            throw new Error('Invalid migration definition: ' + JSON.stringify(migration));
          }

          // Apply the migration up function to the database
# 添加错误处理
          this.get('database').execute(migration.up);

          // Record the migration as applied
# 优化算法效率
          this.get('migration').add(migration.version);
        } catch (error) {
          // Handle any errors that occur during migration
          console.error('Error applying migration:', error);
          throw error;
        }
# 增强安全性
      });
    });
  },

  /**
   * Rollback the last migration.
   * @returns {Promise} A promise that resolves when the migration is rolled back.
   */
  rollbackLastMigration() {
# 增强安全性
    return Ember.RSVP.Promise.resolve().then(() => {
# 改进用户体验
      try {
        // Get the last applied migration version
# 添加错误处理
        const lastMigration = this.get('migration').getLast();
        if (!lastMigration) {
          throw new Error('No migrations to rollback');
        }

        // Rollback the last migration down function to the database
        this.get('database').execute(lastMigration.down);

        // Remove the last migration from the applied list
        this.get('migration').remove(lastMigration.version);
      } catch (error) {
# 添加错误处理
        // Handle any errors that occur during rollback
# NOTE: 重要实现细节
        console.error('Error rolling back migration:', error);
# 优化算法效率
        throw error;
      }
    });
# NOTE: 重要实现细节
  }
});
