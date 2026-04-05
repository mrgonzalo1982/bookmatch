// ─── Student Database (from Excel import) ───────────────────────────────────
export { default as STUDENTS } from './students.json';

// ─── Literary Catalog ────────────────────────────────────────────────────────
// Levels: 5-8 = Básica (5° to 8°), 9-12 = Media (1° to 4° Medio)
export const ITEMS = [
  // ── Básica (5° y 6°) ───────────────────────────────────────────────────────
  {
    id: 1,
    type: 'libro',
    title: 'Matilda',
    author: 'Roald Dahl',
    description: 'Una niña superdotada descubre que tiene poderes telequinéticos y los usa para enfrentar a sus crueles padres y directora escolar.',
    image: 'https://covers.openlibrary.org/b/id/12889769-L.jpg',
    genre: 'Fantasía', minNivel: 5, maxNivel: 7
  },
  {
    id: 2,
    type: 'libro',
    title: 'Gravity Falls: Diario 3',
    author: 'Rob Renzetti',
    description: 'El diario misterioso que Dipper encuentra en el bosque. Lleno de criaturas, secretos y anomalías del pueblo.',
    image: 'https://placehold.co/400x600/A10D12/D4AF37.png?text=Gravity%2BFalls%3A%2BDiario%2B3',
    genre: 'Misterio', minNivel: 5, maxNivel: 8
  },
  {
    id: 3,
    type: 'libro',
    title: 'El Principito',
    author: 'Antoine de Saint-Exupéry',
    description: 'Un pequeño príncipe viaja de planeta en planeta descubriendo que "lo esencial es invisible a los ojos".',
    image: 'https://covers.openlibrary.org/b/id/10708272-L.jpg',
    genre: 'Fábula', minNivel: 5, maxNivel: 12
  },
  {
    id: 4,
    type: 'libro',
    title: 'El Hombre Perro (Dog Man)',
    author: 'Dav Pilkey',
    description: '¡Mitad perro, mitad hombre, todo un héroe! Una novela gráfica divertidísima sobre un policía canino.',
    image: 'https://covers.openlibrary.org/b/id/8315371-L.jpg',
    genre: 'Aventura', minNivel: 5, maxNivel: 7
  },
  {
    id: 5,
    type: 'libro',
    title: 'Wonder: La Lección de August',
    author: 'R.J. Palacio',
    description: 'August Pullman nació con una deformidad facial que le impidió ir a la escuela normal... hasta ahora. Una historia sobre empatía.',
    image: 'https://covers.openlibrary.org/b/id/8223160-L.jpg',
    genre: 'Realismo', minNivel: 5, maxNivel: 9
  },

  // ── Básica (7° y 8°) ───────────────────────────────────────────────────────
  {
    id: 7,
    type: 'libro',
    title: 'Harry Potter y la Piedra Filosofal',
    author: 'J.K. Rowling',
    description: 'Un niño huérfano descubre que es un mago y comienza su educación en Hogwarts.',
    image: 'https://covers.openlibrary.org/b/id/15155833-L.jpg',
    genre: 'Fantasía', minNivel: 6, maxNivel: 10
  },
  {
    id: 8,
    type: 'libro',
    title: 'Percy Jackson y el Ladrón del Rayo',
    author: 'Rick Riordan',
    description: 'Un adolescente descubre que es hijo de un dios griego y debe evitar una guerra en el Olimpo.',
    image: 'https://covers.openlibrary.org/b/id/7239831-L.jpg',
    genre: 'Aventura', minNivel: 6, maxNivel: 9
  },
  {
    id: 9,
    type: 'libro',
    title: 'Invisible',
    author: 'Eloy Moreno',
    description: '¿Quién no ha deseado alguna vez ser invisible? Una historia conmovedora sobre el acoso escolar y la valentía de mirar.',
    image: 'https://covers.openlibrary.org/b/id/11171586-L.jpg',
    genre: 'Realismo', minNivel: 7, maxNivel: 12
  },
  {
    id: 10,
    type: 'libro',
    title: 'La Selección',
    author: 'Kiera Cass',
    description: 'Para treinta y cinco chicas, la Selección es la oportunidad de su vida; el camino a la corona. Pero para America Singer, es una pesadilla.',
    image: 'https://covers.openlibrary.org/b/id/7101900-L.jpg',
    genre: 'Romantasy', minNivel: 8, maxNivel: 12
  },

  // ── Media (1° a 4°) ────────────────────────────────────────────────────────
  {
    id: 11,
    type: 'libro',
    title: 'Heartstopper: Dos Chicos Juntos',
    author: 'Alice Oseman',
    description: 'Charlie y Nick van al mismo instituto, pero no se conocen hasta que les hacen sentarse juntos. La ternura hecha novela gráfica.',
    image: 'https://covers.openlibrary.org/b/id/9020805-L.jpg',
    genre: 'Romance', minNivel: 8, maxNivel: 12
  },
  {
    id: 12,
    type: 'libro',
    title: 'Cinder (Crónicas Lunares)',
    author: 'Marissa Meyer',
    description: 'Cenicienta es una cyborg en la Nueva Pekín futurista. Una mezcla épica de Sci-Fi y fantasía con toques de romance.',
    image: 'https://covers.openlibrary.org/b/id/8947137-L.jpg',
    genre: 'Romantasy', minNivel: 9, maxNivel: 12
  },
  {
    id: 13,
    type: 'libro',
    title: 'Frankenstein',
    author: 'Mary Shelley',
    description: 'El científico Victor Frankenstein crea una criatura a partir de cadáveres, desatando consecuencias trágicas. El origen del terror moderno.',
    image: 'https://covers.openlibrary.org/b/id/12356249-L.jpg',
    genre: 'Terror', minNivel: 10, maxNivel: 12
  },
  {
    id: 14,
    type: 'libro',
    title: '1984',
    author: 'George Orwell',
    description: 'En un futuro distópico, el Gran Hermano lo vigila todo. Una crítica mordaz a la vigilancia y al autoritarismo.',
    image: 'https://covers.openlibrary.org/b/id/9267242-L.jpg',
    genre: 'Ciencia Ficción', minNivel: 10, maxNivel: 12
  },
  {
    id: 15,
    type: 'libro',
    title: 'Érase una vez un corazón roto',
    author: 'Stephanie Garber',
    description: 'Evangeline Fox viaja al Norte en busca de venganza y termina haciendo un trato peligroso con el Príncipe de Corazones.',
    image: 'https://covers.openlibrary.org/b/id/11427092-L.jpg',
    genre: 'Romantasy', minNivel: 9, maxNivel: 12
  },
  {
    id: 16,
    type: 'libro',
    title: 'Cien Años de Soledad',
    author: 'Gabriel García Márquez',
    description: 'La épica historia de la familia Buendía en el pueblo ficticio de Macondo. La obra maestra del realismo mágico.',
    image: 'https://placehold.co/400x600/A10D12/D4AF37.png?text=Cien%2BA%C3%B1os%2Bde%2BSoledad',
    genre: 'Realismo Mágico', minNivel: 10, maxNivel: 12
  },
  {
    id: 17,
    type: 'libro',
    title: 'Los Juegos del Hambre',
    author: 'Suzanne Collins',
    description: 'Un futuro donde los jóvenes deben luchar a muerte en un reality show por orden del Capitolio.',
    image: 'https://covers.openlibrary.org/b/id/12646537-L.jpg',
    genre: 'Ciencia Ficción', minNivel: 8, maxNivel: 11
  },
];

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
    recommendedIds: [1, 2, 3, 13, 14, 16], // Matilda, Gravity Falls, Principito, Frankenstein, 1984...
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
    recommendedIds: [9, 10, 11, 12, 15, 17], // Invisible, La Selección, Heartstopper, Cinder, Romantasy...
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
  return allIds.filter((_, i) => (seed + i * 13) % 4 !== 0); // ~75% likes
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
