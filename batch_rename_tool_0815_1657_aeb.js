// 代码生成时间: 2025-08-15 16:57:37
// Import necessary modules
const fs = require('fs');
const path = require('path');
const { cli } = require('@ember/polyfills');

/*
 * Function to rename files in a directory
 * @param {string} directoryPath - The path to the directory containing files to rename.
 * @param {RegExp} pattern - A regular expression pattern to match files to rename.
 * @param {string} replacement - The replacement string for matched files.
 * @param {boolean} dryRun - If true, simulates the rename without making actual changes.
 */
async function renameFiles(directoryPath, pattern, replacement, dryRun = false) {
  try {
    // Check if the directory exists
    if (!fs.existsSync(directoryPath)) {
      throw new Error('Directory does not exist.');
    }

    // Read all files in the directory
    const files = fs.readdirSync(directoryPath);
    for (const file of files) {
      // Check if the file name matches the pattern
      const filePath = path.join(directoryPath, file);
      if (fs.statSync(filePath).isFile() && pattern.test(file)) {
        const oldPath = filePath;
        const newPath = path.join(directoryPath, file.replace(pattern, replacement));

        // If dryRun is false, rename the file
        if (!dryRun) {
          fs.renameSync(oldPath, newPath);
          console.log(`Renamed ${oldPath} to ${newPath}`);
        } else {
          console.log(`Simulated renaming ${oldPath} to ${newPath}`);
        }
      }
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

/*
 * Main function to handle CLI arguments
 */
async function main() {
  const args = process.argv.slice(2);

  // Parse CLI arguments
  const directoryPath = args[0];
  const patternString = args[1];
  const replacementString = args[2];
  const dryRunString = args[3];

  // Convert CLI arguments to the required types
  const pattern = new RegExp(patternString);
  const dryRun = dryRunString === 'true';

  // Call the renameFiles function
  await renameFiles(directoryPath, pattern, replacementString, dryRun);
}

// Run the program
main();
