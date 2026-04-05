import * as fs from 'fs';
import * as xlsx from 'xlsx';

const file = fs.readFileSync('e:/bookmatch/Estudiantes/Listado de estudiantes.xlsx');
const workbook = xlsx.read(file, { type: 'buffer' });
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];
const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });

console.log("Headers:", data[0]);
console.log("First 3 rows:", data.slice(1, 4));

console.log("First 3 rows:", data.slice(1, 4));
