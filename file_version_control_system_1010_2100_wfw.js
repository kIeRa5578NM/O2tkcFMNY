// 代码生成时间: 2025-10-10 21:00:48
const fs = require('fs');
const path = require('path');

// Configuration
const VERSION_CONTROL_DIR = './versions';
const MAX_VERSIONS = 10;

// Helper function to create a version directory if it doesn't exist
const ensureVersionDirectoryExists = () => {
  if (!fs.existsSync(VERSION_CONTROL_DIR)) {
    fs.mkdirSync(VERSION_CONTROL_DIR, { recursive: true });
  }
};

// Helper function to generate a unique version path
const generateVersionPath = (filename) => {
  return path.join(VERSION_CONTROL_DIR, `${filename}_v${Date.now()}`);
};

class FileVersionControl {
  /**
   * Add a new version of a file to the version control system.
   *
   * @param {string} originalPath - The path to the original file.
   * @returns {string} - The path to the new version of the file.
   */
  addVersion(originalPath) {
    try {
      ensureVersionDirectoryExists();
      const filename = path.basename(originalPath);
      const versionPath = generateVersionPath(filename);
      fs.copyFileSync(originalPath, versionPath);
      return versionPath;
    } catch (error) {
      console.error('Error adding file version:', error);
      throw error;
    }
  }

  /**
   * Retrieve a specific version of a file.
   *
   * @param {string} filename - The name of the file.
   * @param {number} version - The version number.
   * @returns {string} - The path to the file at the specified version.
   */
  retrieveVersion(filename, version) {
    try {
      const versionPath = path.join(VERSION_CONTROL_DIR, `${filename}_v${version}`);
      if (!fs.existsSync(versionPath)) {
        throw new Error(`Version ${version} of file ${filename} not found.`);
      }
      return versionPath;
    } catch (error) {
      console.error('Error retrieving file version:', error);
      throw error;
    }
  }

  /**
   * List all versions of a file.
   *
   * @param {string} filename - The name of the file.
   * @returns {Array<string>} - An array of paths to all versions of the file.
   */
  listVersions(filename) {
    try {
      const versionFiles = fs.readdirSync(VERSION_CONTROL_DIR)
        .filter(file => file.startsWith(filename) && file.includes('_v'));
      return versionFiles.map(file => path.join(VERSION_CONTROL_DIR, file));
    } catch (error) {
      console.error('Error listing file versions:', error);
      throw error;
    }
  }
}

// Export the FileVersionControl class
module.exports = FileVersionControl;