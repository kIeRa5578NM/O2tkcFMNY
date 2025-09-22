// 代码生成时间: 2025-09-22 22:49:27
 * It sorts the files and folders in a readable and maintainable format.
 */

import Ember from 'ember';
import fse from 'fs-extra';
import path from 'path';

export default Ember.Service.extend({
  
  // Method to organize a folder structure
  organizeFolderStructure(directoryPath) {
    try {
      // Read the directory contents
      const filesAndFolders = fse.readdirSync(directoryPath);
      
      // Filter directories and files
      const directories = filesAndFolders.filter(item => {
        return fse.statSync(path.join(directoryPath, item)).isDirectory();
      });
      const files = filesAndFolders.filter(item => {
        return fse.statSync(path.join(directoryPath, item)).isFile();
      });
      
      // Sort directories and files
      directories.sort();
      files.sort();
      
      // Log the organized structure
      console.log('Directories:', directories);
      console.log('Files:', files);
      
      // Return the organized structure
      return {
        directories,
        files
      };
    } catch (error) {
      // Handle errors
      console.error('Error organizing folder structure:', error);
      throw error;
    }
  },
  
  // Method to move files into their respective folders
  moveFilesIntoFolders(directoryPath) {
    try {
      // Read the directory contents
      const filesAndFolders = fse.readdirSync(directoryPath);
      
      // Group files by extension
      const filesByExtension = filesAndFolders.reduce((acc, item) => {
        const fileExtension = path.extname(item);
        if (!acc[fileExtension]) {
          acc[fileExtension] = [];
        }
        acc[fileExtension].push(item);
        return acc;
      }, {});
      
      // Create directories for each file type
      for (let extension in filesByExtension) {
        const folderPath = path.join(directoryPath, extension);
        fse.ensureDirSync(folderPath);
      }
      
      // Move files into their respective folders
      for (let extension in filesByExtension) {
        filesByExtension[extension].forEach(file => {
          fse.moveSync(
            path.join(directoryPath, file),
            path.join(directoryPath, extension, file)
          );
        });
      }
      
      // Log the final structure
      console.log('Files have been moved into their respective folders.');
    } catch (error) {
      // Handle errors
      console.error('Error moving files into folders:', error);
      throw error;
    }
  }
});