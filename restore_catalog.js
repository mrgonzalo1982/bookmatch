import fs from 'fs';
import path from 'path';

// Helper to search OpenLibrary
async function searchCover(title, author) {
  const query = encodeURIComponent(`${title} ${author}`);
  const searchUrl = `https://openlibrary.org/search.json?q=${query}&limit=1`;
  try {
    const response = await fetch(searchUrl);
    if (!response.ok) return null;
    const json = await response.json();
    if (json.docs && json.docs.length > 0 && json.docs[0].cover_i) {
      return `https://covers.openlibrary.org/b/id/${json.docs[0].cover_i}-L.jpg`;
    }
  } catch (e) {}
  return `https://placehold.co/400x600/A10D12/D4AF37.png?text=${encodeURIComponent(title.split(' ').join('+'))}`;
}

const ALL_BOOKS = [
  // Básica (5-7)
  { id: 1, type: 'libro', title: 'Matilda', author: 'Roald Dahl', genre: 'Fantasía', minNivel: 5, maxNivel: 7, description: 'Una niña superdotada descubre que tiene con poderes telequinéticos y los usa para enfrentar a sus crueles padres.' },
  { id: 2, type: 'libro', title: 'Charlie y la Fábrica de Chocolate', author: 'Roald Dahl', genre: 'Fantasía', minNivel: 5, maxNivel: 7, description: 'Charlie Bucket gana un boleto dorado para visitar la fábrica más misteriosa del mundo.' },
  { id: 3, type: 'libro', title: 'El Principito', author: 'Antoine de Saint-Exupéry', genre: 'Fábula', minNivel: 5, maxNivel: 12, description: 'Un pequeño príncipe viaja de planeta en planeta descubriendo que lo esencial es invisible a los ojos.' },
  { id: 5, type: 'libro', title: 'El Mago de Oz', author: 'L. Frank Baum', genre: 'Aventura', minNivel: 5, maxNivel: 7, description: 'Dorothy y su perro Totó son arrastrados por un tornado a la tierra mágica de Oz.' },
  { id: 6, type: 'libro', title: 'Las Crónicas de Narnia', author: 'C.S. Lewis', genre: 'Fantasía', minNivel: 5, maxNivel: 8, description: 'Cuatro hermanos descubren un mundo mágico a través de un armario ropero.' },
  { id: 108, type: 'libro', title: 'Mi Planta de Naranja-Lima', author: 'José Mauro de Vasconcelos', genre: 'Clásico', minNivel: 5, maxNivel: 8, description: 'Zezé, un niño travieso que descubre el dolor y se hace adulto prematuramente.' },
  { id: 201, type: 'libro', title: 'El Hombre Perro', author: 'Dav Pilkey', genre: 'Aventura', minNivel: 5, maxNivel: 7, description: '¡Mitad perro, mitad hombre, todo un héroe! Una novela gráfica divertidísima.' },
  { id: 202, type: 'libro', title: 'Gravity Falls: Diario 3', author: 'Rob Renzetti', genre: 'Misterio', minNivel: 5, maxNivel: 8, description: 'El diario misterioso lleno de criaturas y secretos del pueblo de Gravity Falls.' },

  // Básica (7-9)
  { id: 7, type: 'libro', title: 'Harry Potter y la Piedra Filosofal', author: 'J.K. Rowling', genre: 'Fantasía', minNivel: 6, maxNivel: 10, description: 'Un niño huérfano descubre que es un mago y comienza su educación en Hogwarts.' },
  { id: 8, type: 'libro', title: 'Percy Jackson y el Ladrón del Rayo', author: 'Rick Riordan', genre: 'Aventura', minNivel: 6, maxNivel: 9, description: 'Un adolescente descubre que es hijo de Poseidón y debe recuperar el rayo de Zeus.' },
  { id: 10, type: 'libro', title: 'Momo', author: 'Michael Ende', genre: 'Fantasía', minNivel: 7, maxNivel: 9, description: 'Una niña con el don de escuchar lucha contra los Hombres Grises que roban el tiempo.' },
  { id: 11, type: 'libro', title: 'La Isla del Tesoro', author: 'Robert L. Stevenson', genre: 'Aventura', minNivel: 7, maxNivel: 9, description: 'Jim Hawkins encuentra un mapa del tesoro y zarpa en una aventura llena de peligros.' },
  { id: 9, type: 'libro', title: 'El Hobbit', author: 'J.R.R. Tolkien', genre: 'Fantasía', minNivel: 7, maxNivel: 12, description: 'Bilbo Bolsón es arrastrado a una aventura épica para recuperar un tesoro guardado por un dragón.' },
  { id: 102, type: 'libro', title: 'El Niño con el Pijama de Rayas', author: 'John Boyne', genre: 'Clásico', minNivel: 6, maxNivel: 9, description: 'La amistad entre el hijo de un comandante nazi y un niño prisionero judío.' },
  { id: 301, type: 'libro', title: 'Wonder: La Lección de August', author: 'R.J. Palacio', genre: 'Realismo', minNivel: 5, maxNivel: 9, description: 'La historia de August Pullman, un niño con una deformidad facial que asiste por primera vez a la escuela.' },
  { id: 302, type: 'libro', title: 'Invisible', author: 'Eloy Moreno', genre: 'Realismo', minNivel: 7, maxNivel: 12, description: 'Una historia conmovedora sobre el acoso escolar y el poder de la empatía.' },

  // Media (9-12)
  { id: 12, type: 'libro', title: 'El Diario de Ana Frank', author: 'Ana Frank', genre: 'Autobiografía', minNivel: 8, maxNivel: 12, description: 'El testimonio de esperanza de una niña judía durante el Holocausto.' },
  { id: 13, type: 'libro', title: 'El Alquimista', author: 'Paulo Coelho', genre: 'Aventura', minNivel: 8, maxNivel: 12, description: 'Un pastor viaja en busca de un tesoro y descubre el significado de su vida.' },
  { id: 14, type: 'libro', title: 'Romeo y Julieta', author: 'William Shakespeare', genre: 'Clásico', minNivel: 8, maxNivel: 12, description: 'La tragedia de amor más famosa entre dos familias rivales.' },
  { id: 15, type: 'libro', title: 'El Señor de las Moscas', author: 'William Golding', genre: 'Clásico', minNivel: 9, maxNivel: 12, description: 'Niños náufragos crean su propia sociedad, que degenera en violencia y caos.' },
  { id: 16, type: 'libro', title: 'Crónica de una Muerte Anunciada', author: 'Gabriel García Márquez', genre: 'Realismo Mágico', minNivel: 9, maxNivel: 12, description: 'El relato de un crimen que todo el pueblo sabía que iba a ocurrir.' },
  { id: 17, type: 'libro', title: 'La Metamorfosis', author: 'Franz Kafka', genre: 'Clásico', minNivel: 10, maxNivel: 12, description: 'Gregor Samsa despierta convertido en un insecto gigante.' },
  { id: 18, type: 'libro', title: '1984', author: 'George Orwell', genre: 'Ciencia Ficción', minNivel: 10, maxNivel: 12, description: 'En un futuro distópico, el Gran Hermano lo vigila todo.' },
  { id: 19, type: 'libro', title: 'Cien Años de Soledad', author: 'Gabriel García Márquez', genre: 'Realismo Mágico', minNivel: 10, maxNivel: 12, description: 'La mítica historia de la familia Buendía en Macondo.' },
  { id: 20, type: 'libro', title: 'El Gran Gatsby', author: 'F. Scott Fitzgerald', genre: 'Clásico', minNivel: 10, maxNivel: 12, description: 'Jay Gatsby organiza fiestas escandalosas para reconquistar a Daisy.' },
  { id: 21, type: 'libro', title: 'Don Quijote de la Mancha', author: 'Miguel de Cervantes', genre: 'Clásico', minNivel: 11, maxNivel: 12, description: 'Un hidalgo se convierte en caballero andante por las tierras de España.' },
  { id: 23, type: 'libro', title: 'El Túnel', author: 'Ernesto Sábato', genre: 'Misterio', minNivel: 10, maxNivel: 12, description: 'Un pintor obsesivo relata el asesinato de la persona que comprendió su arte.' },
  { id: 24, type: 'libro', title: 'Un Mundo Feliz', author: 'Aldous Huxley', genre: 'Ciencia Ficción', minNivel: 10, maxNivel: 12, description: 'Una sociedad futurista perfecta donde la libertad ha sido eliminada.' },
  { id: 103, type: 'libro', title: 'Fahrenheit 451', author: 'Ray Bradbury', genre: 'Ciencia Ficción', minNivel: 9, maxNivel: 12, description: 'Un bombero que quema libros comienza a cuestionar su realidad.' },
  { id: 104, type: 'libro', title: 'La Sombra del Viento', author: 'Carlos Ruiz Zafón', genre: 'Misterio', minNivel: 10, maxNivel: 12, description: 'Un joven descubre un libro maldito en el Cementerio de los Libros Olvidados.' },
  { id: 106, type: 'libro', title: 'Cuentos de Amor de Locura y de Muerte', author: 'Horacio Quiroga', genre: 'Terror', minNivel: 9, maxNivel: 12, description: 'Relatos donde la selva, la locura humana y lo macabro toman el protagonismo de forma cruda.' },
  { id: 109, type: 'libro', title: 'Frankenstein', author: 'Mary Shelley', genre: 'Terror', minNivel: 10, maxNivel: 12, description: 'El origen del terror moderno: la criatura creada por Víctor Frankenstein.' },
  { id: 110, type: 'libro', title: 'Orgullo y Prejuicio', author: 'Jane Austen', genre: 'Romance', minNivel: 9, maxNivel: 12, description: 'La compleja relación entre Elizabeth Bennet y el Sr. Darcy navegando por las convenciones sociales de su siglo.' },
  { id: 111, type: 'libro', title: 'El Retrato de Dorian Gray', author: 'Oscar Wilde', genre: 'Clásico', minNivel: 10, maxNivel: 12, description: 'Un joven intercambia su alma con un cuadro para permanecer joven.' },
  { id: 112, type: 'libro', title: 'Rebelión en la Granja', author: 'George Orwell', genre: 'Fábula', minNivel: 8, maxNivel: 12, description: 'Un sistema igualitario animal que poco a poco se corrompe.' },
  { id: 113, type: 'libro', title: 'Drácula', author: 'Bram Stoker', genre: 'Terror', minNivel: 9, maxNivel: 12, description: 'El abogado Jonathan Harker descubre la naturaleza del Conde Drácula.' },
  { id: 114, type: 'libro', title: 'La Odisea', author: 'Homero', genre: 'Aventura', minNivel: 9, maxNivel: 12, description: 'El épico y accidentado viaje de Odiseo tratando de retornar a su patria tras la Guerra de Troya.' },
  { id: 116, type: 'libro', title: 'Sub Terra', author: 'Baldomero Lillo', genre: 'Clásico', minNivel: 8, maxNivel: 12, description: 'Las inhumanas condiciones de los mineros del carbón en Chile.' },
  { id: 118, type: 'libro', title: 'El Visitante', author: 'Stephen King', genre: 'Misterio', minNivel: 11, maxNivel: 12, description: 'Un horrendo asesinato involucra a un querido profesor local, pero huellas digitales y hechos desafían toda explicación.' },
  
  // Romantasy (ATP)
  { id: 401, type: 'libro', title: 'La Selección', author: 'Kiera Cass', genre: 'Romantasy', minNivel: 8, maxNivel: 12, description: 'Treinta y cinco chicas compiten por la corona. America Singer debe elegir entre el amor y el deber.' },
  { id: 402, type: 'libro', title: 'Cinder', author: 'Marissa Meyer', genre: 'Romantasy', minNivel: 9, maxNivel: 12, description: 'Una cyborg en la Nueva Pekín futurista debe salvar el mundo de una plaga lunar.' },
  { id: 403, type: 'libro', title: 'Érase una vez un corazón roto', author: 'Stephanie Garber', genre: 'Romantasy', minNivel: 9, maxNivel: 12, description: 'Evangeline Fox viaja al Norte y hace un trato peligroso con el Príncipe de Corazones.' },
  
  // Sagas Populres
  { id: 105, type: 'libro', title: 'Los Juegos del Hambre', author: 'Suzanne Collins', genre: 'Ciencia Ficción', minNivel: 7, maxNivel: 12, description: 'Katniss Everdeen debe luchar por su vida en un reality show televisado.' },
  { id: 120, type: 'libro', title: 'El Señor de los Anillos: La Comunidad del Anillo', author: 'J.R.R. Tolkien', genre: 'Fantasía', minNivel: 8, maxNivel: 12, description: 'Frodo Bolsón emprende la misión de destruir el Anillo Único con la ayuda de la Comunidad.' },
  { id: 121, type: 'libro', title: 'El Señor de los Anillos: Las Dos Torres', author: 'J.R.R. Tolkien', genre: 'Fantasía', minNivel: 8, maxNivel: 12, description: 'La Comunidad se divide mientras Frodo y Sam continúan hacia Mordor y los otros luchan contra Saruman.' },
  { id: 122, type: 'libro', title: 'El Señor de los Anillos: El Retorno del Rey', author: 'J.R.R. Tolkien', genre: 'Fantasía', minNivel: 8, maxNivel: 12, description: 'La batalla final por la Tierra Media comienza mientras Frodo se acerca al Monte del Destino.' },

  // Nuevas Sugerencias (Tendencias Chile)
  { id: 601, type: 'libro', title: 'Papelucho', author: 'Marcela Paz', genre: 'Aventura', minNivel: 5, maxNivel: 7, description: 'Las divertidas e ingeniosas memorias de un niño chileno que ve el mundo de una forma única.' },
  { id: 602, type: 'libro', title: 'Quique Hache, Detective', author: 'Sergio Gómez', genre: 'Misterio', minNivel: 6, maxNivel: 9, description: 'Quique Hache comienza sus vacaciones con un caso intrigante en el Santiago de hoy.' },
  { id: 603, type: 'libro', title: 'El Diario de Greg', author: 'Jeff Kinney', genre: 'Realismo', minNivel: 5, maxNivel: 8, description: 'Un diario ilustrado sobre la vida de un preadolescente tratando de sobrevivir al instituto.' },
  { id: 604, type: 'libro', title: 'Frin', author: 'Luis Pescetti', genre: 'Realismo', minNivel: 5, maxNivel: 7, description: 'Frin descubre la amistad, el primer amor y los viajes en una historia llena de ternura y humor.' },
  { id: 605, type: 'libro', title: 'Cuentos de la Selva', author: 'Horacio Quiroga', genre: 'Fantasía', minNivel: 5, maxNivel: 8, description: 'Relatos maravillosos donde animales y hombres conviven en la selva misionera.' },
  { id: 606, type: 'libro', title: 'Asesinato en el Canadian Express', author: 'Eric Wilson', genre: 'Misterio', minNivel: 7, maxNivel: 10, description: 'Tom Austen se ve envuelto en un misterio a bordo de un tren transcontinental.' },
  { id: 607, type: 'libro', title: 'Ami, el niño de las estrellas', author: 'Enrique Barrios', genre: 'Fábula', minNivel: 6, maxNivel: 9, description: 'Una historia de sabiduría universal y fraternidad entre mundos lejanos.' },
  { id: 608, type: 'libro', title: 'Cuentos de Eva Luna', author: 'Isabel Allende', genre: 'Realismo Mágico', minNivel: 10, maxNivel: 12, description: 'Relatos llenos de pasión y magia que exploran la condición humana.' },
  { id: 609, type: 'libro', title: 'Divergente', author: 'Veronica Roth', genre: 'Ciencia Ficción', minNivel: 8, maxNivel: 11, description: 'En una sociedad dividida en facciones, Beatrice debe elegir quién quiere ser.' },
  { id: 610, type: 'libro', title: 'La Reina Roja', author: 'Victoria Aveyard', genre: 'Romantasy', minNivel: 9, maxNivel: 12, description: 'En un mundo dividido por el color de la sangre, una joven con poderes cambiará el destino.' },
  { id: 611, type: 'libro', title: 'La Tregua', author: 'Mario Benedetti', genre: 'Clásico', minNivel: 10, maxNivel: 12, description: 'La historia de amor y rutina de Martín Santomé a través de su diario personal.' },
  { id: 612, type: 'libro', title: 'El Psicoanalista', author: 'John Katzenbach', genre: 'Misterio', minNivel: 10, maxNivel: 12, description: 'Un thriller psicológico donde un doctor es amenazado de muerte por un desconocido.' },
  { id: 613, type: 'libro', title: 'Bajo la misma estrella', author: 'John Green', genre: 'Romance', minNivel: 9, maxNivel: 12, description: 'Hazel y Gus comparten un viaje inolvidable lleno de humor, valentía y amor.' },
  { id: 614, type: 'libro', title: 'La Casa de los Espíritus', author: 'Isabel Allende', genre: 'Realismo Mágico', minNivel: 11, maxNivel: 12, description: 'La épica historia de la familia Trueba a través de tres generaciones.' },
  { id: 615, type: 'libro', title: 'Sub Sole', author: 'Baldomero Lillo', genre: 'Clásico', minNivel: 9, maxNivel: 12, description: 'Relatos realistas que exploran la vida social y minera del Chile del siglo XX.' }
];

async function generate() {
  const finalItems = [];
  console.log(`Processing ${ALL_BOOKS.length} books...`);
  
  for (const book of ALL_BOOKS) {
    const cover = await searchCover(book.title, book.author);
    finalItems.push({
      ...book,
      image: cover
    });
  }

  const content = `// ─── Student Database (from Excel import) ───────────────────────────────────
export { default as STUDENTS } from './students.json';

// ─── Literary Catalog ────────────────────────────────────────────────────────
// Levels: 5-8 = Básica (5° to 8°), 9-12 = Media (1° to 4° Medio)
export const ITEMS = ${JSON.stringify(finalItems, null, 2)};

// ─── Teacher Profiles ────────────────────────────────────────────────────────
export const TEACHERS = [
  {
    id: 'prof-1',
    rut: '150685478',
    name: 'Gonzalo Andrés',
    dept: 'Inglés / Staff',
    bio: 'Apasionado por la ciencia ficción y los clásicos. Busco conectar la literatura con la modernidad.',
    emoji: '🤖',
    email: 'gonzalo@colegioumbral.cl',
    recommendedIds: [1, 3, 9, 18, 612, 602, 615],
    genre: 'Ciencia Ficción',
    nivelMin: 5, nivelMax: 12,
  },
  {
    id: 'prof-2',
    rut: '186188225',
    name: 'Danixa Paola',
    dept: 'Lenguaje / Staff',
    bio: 'Especialista en narrativa contemporánea y juvenil. ¡Amo ayudar a los alumnos a encontrar su próxima aventura!',
    emoji: '🌍',
    email: 'dpaola@colegioumbral.cl',
    recommendedIds: [302, 401, 105, 402, 610, 608, 613],
    genre: 'Romantasy',
    nivelMin: 5, nivelMax: 12,
  }
];

// ─── Genre list ───────────────────────────────────────────────────────────────
export const GENRES = [
  "Clásico", "Misterio", "Fábula", "Realismo Mágico", "Romance",
  "Fantasía", "Ciencia Ficción", "Terror", "Aventura", "Romantasy", "Realismo"
];

// ─── Matching Rules ───────────────────────────────────────────────────────────
export const canMatch = (userNivel, peerNivel) => {
  if (userNivel <= 9) return peerNivel === userNivel;
  return peerNivel >= 10 && peerNivel <= 12;
};

// ─── Deterministic Peer Logic (for student souls) ──────────────────────────────
export const getPeerLikes = (rut) => {
  const allIds = ITEMS.map(i => i.id);
  const seed = rut.replace(/[^0-9]/g, '').split('').reduce((acc, c) => acc + parseInt(c), 0);
  return allIds.filter((_, i) => (seed + i * 13) % 4 !== 0); 
};

export const getPeerProfile = (rut) => {
  const seed = rut.replace(/[^0-9]/g, '').split('').reduce((acc, c) => acc + parseInt(c), 0);
  const peerGenres = GENRES.filter((_, i) => (seed + i * 7) % 3 === 0);
  const favBook = ITEMS[seed % ITEMS.length];
  return { genres: peerGenres, favoriteBook: favBook?.title || null };
};

export const compatibilityScore = (myProfile, peerLikedIds, peerProfile) => {
  const { likedIds: myLikedIds = [], genres: myGenres = [], favoriteBook: myFavBook = null } = myProfile;
  const commonBooks = myLikedIds.filter(id => peerLikedIds.includes(id));
  const bookPoints = peerLikedIds.length > 0 ? (commonBooks.length / peerLikedIds.length) * 50 : 0;
  const commonGenres = myGenres.filter(g => peerProfile.genres.includes(g));
  const genrePoints = myGenres.length > 0 ? (commonGenres.length / Math.max(myGenres.length, peerProfile.genres.length)) * 35 : 0;
  const favBookPoints = (myFavBook && peerProfile.favoriteBook && myFavBook.toLowerCase() === peerProfile.favoriteBook.toLowerCase()) ? 15 : 0;
  return Math.round(bookPoints + genrePoints + favBookPoints);
};
`;

  fs.writeFileSync(path.join(process.cwd(), 'src/data/mockData.js'), content, 'utf-8');
  console.log('Catalog restored and cleaned!');
}

generate();
