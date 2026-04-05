import * as fs from 'fs';
import * as xlsx from 'xlsx';

const file = fs.readFileSync('e:/bookmatch/Estudiantes/Listado de estudiantes.xlsx');
const workbook = xlsx.read(file, { type: 'buffer' });
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];
const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });

const students = [];
for (let i = 1; i < data.length; i++) {
  const row = data[i];
  if (!row || row.length < 3) continue;
  
  const rut = row[0]?.toString().trim();
  const rawName = row[1]?.toString().trim();
  const curso = row[2]?.toString().trim();
  
  if (!rut || !rawName) continue;

  // Format name from "Perez Caro Juan" to "Juan Perez" or similar approximation (just title case)
  const nameParts = rawName.split(' ');
  const formattedName = nameParts.map(p => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase()).join(' ');

  // Determine nivel based on curso (approximate)
  let nivel = 5;
  if (curso.toLowerCase().includes('quinto')) nivel = 5;
  else if (curso.toLowerCase().includes('sexto')) nivel = 6;
  else if (curso.toLowerCase().includes('séptimo') || curso.toLowerCase().includes('septimo')) nivel = 7;
  else if (curso.toLowerCase().includes('octavo')) nivel = 8;
  else if (curso.toLowerCase().includes('primero')) nivel = 9;
  else if (curso.toLowerCase().includes('segundo')) nivel = 10;
  else if (curso.toLowerCase().includes('tercero')) nivel = 11;
  else if (curso.toLowerCase().includes('cuarto')) nivel = 12;

  const firstName = formattedName.split(' ')[0] || 'Lector';

  students.push({
    rut: rut,
    nombre: formattedName,
    curso: curso,
    nivel: nivel,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${firstName}`
  });
}

// Write to a temporary JSON file to be injected into mockData.js
fs.writeFileSync('e:/bookmatch/generated_students.json', JSON.stringify(students, null, 2));
console.log(`Generated ${students.length} students`);
