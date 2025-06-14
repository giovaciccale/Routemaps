const { contextBridge } = require('electron');
const XLSX = require('xlsx');
const fs = require('fs');

contextBridge.exposeInMainWorld('excelAPI', {
  parseExcel: (filePath) => {
    const data = fs.readFileSync(filePath);
    const workbook = XLSX.read(data, { type: 'buffer' });
    const hoja = workbook.Sheets[workbook.SheetNames[0]];
    return XLSX.utils.sheet_to_json(hoja, { defval: "" });
  }
});
