import fs from 'fs';
const file = 'e:/bookmatch/src/data/mockData.js';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/Tía Coté/g, 'Miss Danixa');
content = content.replace(/Miss Javiera/g, 'Miss Danixa');
content = content.replace(/Miss Elena/g, 'Miss Danixa');
content = content.replace(/Profe Marcela/g, 'Miss Danixa');
content = content.replace(/Profe Ricardo/g, 'Profe Gonzalo');
content = content.replace(/María José Ramírez/g, 'Danixa Paola');
content = content.replace(/Ricardo Mella/g, 'Gonzalo Andrés');

const teachersStart = content.indexOf('export const TEACHERS = [');
const preTeachers = content.substring(0, teachersStart);

const textAfterTeachersRegex = /\];\n\n\/\/ ─── Genre list/;
const afterMatch = content.match(textAfterTeachersRegex);
const afterTeachers = content.substring(afterMatch.index + 2); // gets '\n\n// ─── Genre list'

const newTeachers = `export const TEACHERS = [
  {
    id: 'prof-1',
    rut: '150685478',
    name: 'Gonzalo Andrés',
    shortName: 'Profe Gonzalo',
    dept: 'Computación',
    bio: 'Profesor de especialidades. Le apasionan los clásicos universales y busca siempre innovar en el aula.',
    emoji: '🤖',
    email: 'gonzalo@colegioumbral.cl',
    recommendedIds: [1, 5, 8, 14, 18, 3, 9, 15, 16, 19, 21, 23, 25, 118, 103],
    genre: 'Ciencia Ficción',
    nivelMin: 5, nivelMax: 12,
  },
  {
    id: 'prof-2',
    rut: '186188225',
    name: 'Danixa Paola',
    shortName: 'Miss Danixa',
    dept: 'Historia',
    bio: 'Apasionada por la historia universal y la narrativa histórica, incentivando a sus alumnos a entender el pasado mediante buenas lecturas.',
    emoji: '🌍',
    email: 'dpaola@colegioumbral.cl',
    recommendedIds: [8, 12, 16, 21, 14, 20, 22, 115, 112, 119],
    genre: 'Autobiografía',
    nivelMin: 5, nivelMax: 12,
  }
];`;

const finalContent = preTeachers + newTeachers + afterTeachers;
fs.writeFileSync(file, finalContent, 'utf8');
console.log('mockData updated!');
