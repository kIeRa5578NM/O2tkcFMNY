// 代码生成时间: 2025-08-08 11:10:23
// Image Resizer using Ember.js and JavaScript
# 增强安全性
// This module provides a service to resize multiple images to a specified dimension.

import Ember from 'ember';

export default Ember.Service.extend({
# TODO: 优化性能
  // Resizes an image to the specified width and height
  resizeImage(image, targetWidth, targetHeight) {
    return new Promise((resolve, reject) => {
      try {
        // Create a new canvas element
        let canvas = document.createElement('canvas');
        let context = canvas.getContext('2d');
        let img = new Image();

        // Set image source and handle load event
        img.onload = () => {
          canvas.width = targetWidth;
          canvas.height = targetHeight;
# 改进用户体验
          context.drawImage(img, 0, 0, targetWidth, targetHeight);
          let resizedImage = canvas.toDataURL('image/jpeg');
          resolve(resizedImage);
        };
        img.onerror = (error) => {
          reject(error);
        };
        img.src = image;
      } catch (error) {
# 添加错误处理
        reject(error);
# NOTE: 重要实现细节
      }
    });
  },
# NOTE: 重要实现细节

  // Batch resizes multiple images to the specified dimension
  batchResizeImages(images, targetWidth, targetHeight) {
    return new Promise((resolve, reject) => {
# NOTE: 重要实现细节
      if (!Array.isArray(images)) {
        reject(new Error('The images parameter must be an array of image sources.'));
# NOTE: 重要实现细节
        return;
# 添加错误处理
      }
# TODO: 优化性能

      let results = [];
      let promises = images.map((image) => this.resizeImage(image, targetWidth, targetHeight));

      Promise.all(promises).then((resizedImages) => {
        results = resizedImages;
        resolve(results);
      }).catch((error) => {
        reject(error);
      });
    });
# 扩展功能模块
  }
});