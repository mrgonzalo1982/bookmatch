import * as fs from 'fs';
import * as xlsx from 'xlsx';

const file = fs.readFileSync('e:/bookmatch/Profesores/nombre_rut_formateado.xlsx');
const workbook = xlsx.read(file, { type: 'buffer' });
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];
const data = xlsx.utils.sheet_to_json(sheet);

const cleanedData = data.filter(row => row.Nombre && row.RUT).map(row => ({
    nombre: row.Nombre,
    rut: row.RUT,
    role: 'teacher',
    curso: 'Docente'
}));

fs.writeFileSync('e:/bookmatch/src/data/teachers.json', JSON.stringify(cleanedData, null, 2));
console.log(`Saved ${cleanedData.length} teachers to src/data/teachers.json`);
