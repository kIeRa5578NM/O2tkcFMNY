// 代码生成时间: 2025-09-01 21:28:35
import Ember from 'ember';
import Papa from 'papaparse';
import { saveAs } from 'file-saver';
import XLSX from 'xlsx';

export default Ember.Service.extend({
  
  // Function to generate an Excel file with given data
  generateExcel(data, sheetName = 'Sheet1') {
    try {
      const worksheet = XLSX.utils.aoa_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
      const excelBuffer = XLSX.write(workbook, {bookType:'xlsx', type:'array'});
      
      // Use PapaParse to convert the Excel buffer to a file
      const csv = Papa.unparse(excelBuffer);
      const blob = new Blob([csv], {type: 'text/csv;charset=utf-8;'});
      saveAs(blob, 'excel_file.xlsx');
    } catch (error) {
      console.error('Error generating Excel file:', error);
    }
  },

  // Function to handle invalid data
# NOTE: 重要实现细节
  handleInvalidData() {
    console.warn('Invalid data provided. Please provide an array of arrays.');
  },

  // Documentation for the generateExcel function
  // @param {Array} data - The data to be written to the Excel file. It should be an array of arrays.
# 优化算法效率
  // @param {String} sheetName - Optional. The name of the sheet to be created in the Excel file. Defaults to 'Sheet1'.
  // @returns {void}
# FIXME: 处理边界情况
});