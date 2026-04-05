import * as fs from 'fs';

const mockDataPath = 'e:/bookmatch/src/data/mockData.js';
const generatedStudentsPath = 'e:/bookmatch/generated_students.json';

const generatedStudents = JSON.parse(fs.readFileSync(generatedStudentsPath, 'utf8'));
let mockData = fs.readFileSync(mockDataPath, 'utf8');

const studentsStr = `export const STUDENTS = ${JSON.stringify(generatedStudents, null, 2)};`;

// Replace the export const STUDENTS = [...] with the new string
mockData = mockData.replace(/export const STUDENTS = \[([\s\S]*?)\];/, studentsStr);

fs.writeFileSync(mockDataPath, mockData);
console.log("Updated mockData.js with new students");
