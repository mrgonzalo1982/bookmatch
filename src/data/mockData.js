// ─── Student Database (from Excel import) ───────────────────────────────────
export { default as STUDENTS } from './students.json';

// ─── Literary Catalog ────────────────────────────────────────────────────────
// Levels: 5-8 = Básica (5° to 8°), 9-12 = Media (1° to 4° Medio)
export const ITEMS = [
  {
    "id": 1,
    "type": "libro",
    "title": "Matilda",
    "author": "Roald Dahl",
    "genre": "Fantasía",
    "minNivel": 5,
    "maxNivel": 7,
    "desc": "Una niña superdotada descubre que tiene poderes telequinéticos y los usa para enfrentar a sus crueles padres.",
    "image": "https://covers.openlibrary.org/b/id/12889769-L.jpg"
  },
  {
    "id": 2,
    "type": "libro",
    "title": "Charlie y la Fábrica de Chocolate",
    "author": "Roald Dahl",
    "genre": "Fantasía",
    "minNivel": 5,
    "maxNivel": 7,
    "desc": "Charlie Bucket gana un boleto dorado para visitar la fábrica más misteriosa del mundo.",
    "image": "https://covers.openlibrary.org/b/id/12459564-L.jpg"
  },
  {
    "id": 3,
    "type": "libro",
    "title": "El Principito",
    "author": "Antoine de Saint-Exupéry",
    "genre": "Fábula",
    "minNivel": 5,
    "maxNivel": 12,
    "desc": "Un pequeño príncipe viaja de planeta en planeta descubriendo que lo esencial es invisible a los ojos.",
    "image": "https://covers.openlibrary.org/b/id/10708272-L.jpg"
  },
  {
    "id": 5,
    "type": "libro",
    "title": "El Mago de Oz",
    "author": "L. Frank Baum",
    "genre": "Aventura",
    "minNivel": 5,
    "maxNivel": 7,
    "desc": "Dorothy y su perro Totó son arrastrados por un tornado a la tierra mágica de Oz.",
    "image": "https://covers.openlibrary.org/b/id/552443-L.jpg"
  },
  {
    "id": 6,
    "type": "libro",
    "title": "Las Crónicas de Narnia",
    "author": "C.S. Lewis",
    "genre": "Fantasía",
    "minNivel": 5,
    "maxNivel": 8,
    "desc": "Cuatro hermanos descubren un mundo mágico a través de un armario ropero.",
    "image": "https://covers.openlibrary.org/b/id/13963972-L.jpg"
  },
  {
    "id": 108,
    "type": "libro",
    "title": "Mi Planta de Naranja-Lima",
    "author": "José Mauro de Vasconcelos",
    "genre": "Clásico",
    "minNivel": 5,
    "maxNivel": 8,
    "desc": "Zezé, un niño travieso que descubre el dolor y se hace adulto prematuramente.",
    "image": "https://covers.openlibrary.org/b/id/1051713-L.jpg"
  },
  {
    "id": 201,
    "type": "libro",
    "title": "El Hombre Perro",
    "author": "Dav Pilkey",
    "genre": "Aventura",
    "minNivel": 5,
    "maxNivel": 7,
    "desc": "¡Mitad perro, mitad hombre, todo un héroe! Una novela gráfica divertidísima.",
    "image": "https://placehold.co/400x600/A10D12/D4AF37.png?text=El%2BHombre%2BPerro"
  },
  {
    "id": 202,
    "type": "libro",
    "title": "Gravity Falls: Diario 3",
    "author": "Rob Renzetti",
    "genre": "Misterio",
    "minNivel": 5,
    "maxNivel": 8,
    "desc": "El diario misterioso lleno de criaturas y secretos del pueblo de Gravity Falls.",
    "image": "https://placehold.co/400x600/A10D12/D4AF37.png?text=Gravity%2BFalls%3A%2BDiario%2B3"
  },
  {
    "id": 7,
    "type": "libro",
    "title": "Harry Potter y la Piedra Filosofal",
    "author": "J.K. Rowling",
    "genre": "Fantasía",
    "minNivel": 6,
    "maxNivel": 10,
    "desc": "Un niño huérfano descubre que es un mago y comienza su educación en Hogwarts.",
    "image": "https://covers.openlibrary.org/b/id/15155833-L.jpg"
  },
  {
    "id": 8,
    "type": "libro",
    "title": "Percy Jackson y el Ladrón del Rayo",
    "author": "Rick Riordan",
    "genre": "Aventura",
    "minNivel": 6,
    "maxNivel": 9,
    "desc": "Un adolescente descubre que es hijo de Poseidón y debe recuperar el rayo de Zeus.",
    "image": "https://covers.openlibrary.org/b/id/7239831-L.jpg"
  },
  {
    "id": 10,
    "type": "libro",
    "title": "Momo",
    "author": "Michael Ende",
    "genre": "Fantasía",
    "minNivel": 7,
    "maxNivel": 9,
    "desc": "Una niña con el don de escuchar lucha contra los Hombres Grises que roban el tiempo.",
    "image": "https://covers.openlibrary.org/b/id/8574580-L.jpg"
  },
  {
    "id": 11,
    "type": "libro",
    "title": "La Isla del Tesoro",
    "author": "Robert L. Stevenson",
    "genre": "Aventura",
    "minNivel": 7,
    "maxNivel": 9,
    "desc": "Jim Hawkins encuentra un mapa del tesoro y zarpa en una aventura llena de peligros.",
    "image": "https://covers.openlibrary.org/b/id/13859660-L.jpg"
  },
  {
    "id": 9,
    "type": "libro",
    "title": "El Hobbit",
    "author": "J.R.R. Tolkien",
    "genre": "Fantasía",
    "minNivel": 7,
    "maxNivel": 12,
    "desc": "Bilbo Bolsón es arrastrado a una aventura épica para recuperar un tesoro guardado por un dragón.",
    "image": "https://covers.openlibrary.org/b/id/8406766-L.jpg"
  },
  {
    "id": 102,
    "type": "libro",
    "title": "El Niño con el Pijama de Rayas",
    "author": "John Boyne",
    "genre": "Clásico",
    "minNivel": 6,
    "maxNivel": 9,
    "desc": "La amistad entre el hijo de un comandante nazi y un niño prisionero judío.",
    "image": "https://covers.openlibrary.org/b/id/12720687-L.jpg"
  },
  {
    "id": 301,
    "type": "libro",
    "title": "Wonder: La Lección de August",
    "author": "R.J. Palacio",
    "genre": "Realismo",
    "minNivel": 5,
    "maxNivel": 9,
    "desc": "La historia de August Pullman, un niño con una deformidad facial que asiste por primera vez a la escuela.",
    "image": "https://covers.openlibrary.org/b/id/8223160-L.jpg"
  },
  {
    "id": 302,
    "type": "libro",
    "title": "Invisible",
    "author": "Eloy Moreno",
    "genre": "Realismo",
    "minNivel": 7,
    "maxNivel": 12,
    "desc": "Una historia conmovedora sobre el acoso escolar y el poder de la empatía.",
    "image": "https://covers.openlibrary.org/b/id/11171586-L.jpg"
  },
  {
    "id": 12,
    "type": "libro",
    "title": "El Diario de Ana Frank",
    "author": "Ana Frank",
    "genre": "Autobiografía",
    "minNivel": 8,
    "maxNivel": 12,
    "desc": "El testimonio de esperanza de una niña judía durante el Holocausto.",
    "image": "https://placehold.co/400x600/A10D12/D4AF37.png?text=El%2BDiario%2Bde%2BAna%2BFrank"
  },
  {
    "id": 13,
    "type": "libro",
    "title": "El Alquimista",
    "author": "Paulo Coelho",
    "genre": "Aventura",
    "minNivel": 8,
    "maxNivel": 12,
    "desc": "Un pastor viaja en busca de un tesoro y descubre el significado de su vida.",
    "image": "https://covers.openlibrary.org/b/id/7414780-L.jpg"
  },
  {
    "id": 14,
    "type": "libro",
    "title": "Romeo y Julieta",
    "author": "William Shakespeare",
    "genre": "Clásico",
    "minNivel": 8,
    "maxNivel": 12,
    "desc": "La tragedia de amor más famosa entre dos familias rivales.",
    "image": "https://placehold.co/400x600/A10D12/D4AF37.png?text=Romeo%2By%2BJulieta"
  },
  {
    "id": 15,
    "type": "libro",
    "title": "El Señor de las Moscas",
    "author": "William Golding",
    "genre": "Clásico",
    "minNivel": 9,
    "maxNivel": 12,
    "desc": "Niños náufragos crean su propia sociedad, que degenera en violencia y caos.",
    "image": "https://covers.openlibrary.org/b/id/8684447-L.jpg"
  },
  {
    "id": 16,
    "type": "libro",
    "title": "Crónica de una Muerte Anunciada",
    "author": "Gabriel García Márquez",
    "genre": "Realismo Mágico",
    "minNivel": 9,
    "maxNivel": 12,
    "desc": "El relato de un crimen que todo el pueblo sabía que iba a ocurrir.",
    "image": "https://placehold.co/400x600/A10D12/D4AF37.png?text=Cr%C3%B3nica%2Bde%2Buna%2BMuerte%2BAnunciada"
  },
  {
    "id": 17,
    "type": "libro",
    "title": "La Metamorfosis",
    "author": "Franz Kafka",
    "genre": "Clásico",
    "minNivel": 10,
    "maxNivel": 12,
    "desc": "Gregor Samsa despierta convertido en un insecto gigante.",
    "image": "https://covers.openlibrary.org/b/id/12820198-L.jpg"
  },
  {
    "id": 18,
    "type": "libro",
    "title": "1984",
    "author": "George Orwell",
    "genre": "Ciencia Ficción",
    "minNivel": 10,
    "maxNivel": 12,
    "desc": "En un futuro distópico, el Gran Hermano lo vigila todo.",
    "image": "https://covers.openlibrary.org/b/id/9267242-L.jpg"
  },
  {
    "id": 19,
    "type": "libro",
    "title": "Cien Años de Soledad",
    "author": "Gabriel García Márquez",
    "genre": "Realismo Mágico",
    "minNivel": 10,
    "maxNivel": 12,
    "desc": "La mítica historia de la familia Buendía en Macondo.",
    "image": "https://placehold.co/400x600/A10D12/D4AF37.png?text=Cien%2BA%C3%B1os%2Bde%2BSoledad"
  },
  {
    "id": 20,
    "type": "libro",
    "title": "El Gran Gatsby",
    "author": "F. Scott Fitzgerald",
    "genre": "Clásico",
    "minNivel": 10,
    "maxNivel": 12,
    "desc": "Jay Gatsby organiza fiestas escandalosas para reconquistar a Daisy.",
    "image": "https://covers.openlibrary.org/b/id/10590366-L.jpg"
  },
  {
    "id": 21,
    "type": "libro",
    "title": "Don Quijote de la Mancha",
    "author": "Miguel de Cervantes",
    "genre": "Clásico",
    "minNivel": 11,
    "maxNivel": 12,
    "desc": "Un hidalgo se convierte en caballero andante por las tierras de España.",
    "image": "https://covers.openlibrary.org/b/id/13172970-L.jpg"
  },
  {
    "id": 23,
    "type": "libro",
    "title": "El Túnel",
    "author": "Ernesto Sábato",
    "genre": "Misterio",
    "minNivel": 10,
    "maxNivel": 12,
    "desc": "Un pintor obsesivo relata el asesinato de la persona que comprendió su arte.",
    "image": "https://placehold.co/400x600/A10D12/D4AF37.png?text=El%2BT%C3%BAnel"
  },
  {
    "id": 24,
    "type": "libro",
    "title": "Un Mundo Feliz",
    "author": "Aldous Huxley",
    "genre": "Ciencia Ficción",
    "minNivel": 10,
    "maxNivel": 12,
    "desc": "Una sociedad futurista perfecta donde la libertad ha sido eliminada.",
    "image": "https://covers.openlibrary.org/b/id/8231823-L.jpg"
  },
  {
    "id": 103,
    "type": "libro",
    "title": "Fahrenheit 451",
    "author": "Ray Bradbury",
    "genre": "Ciencia Ficción",
    "minNivel": 9,
    "maxNivel": 12,
    "desc": "Un bombero que quema libros comienza a cuestionar su realidad.",
    "image": "https://placehold.co/400x600/A10D12/D4AF37.png?text=Fahrenheit%2B451"
  },
  {
    "id": 104,
    "type": "libro",
    "title": "La Sombra del Viento",
    "author": "Carlos Ruiz Zafón",
    "genre": "Misterio",
    "minNivel": 10,
    "maxNivel": 12,
    "desc": "Un joven descubre un libro maldito en el Cementerio de los Libros Olvidados.",
    "image": "https://covers.openlibrary.org/b/id/10107644-L.jpg"
  },
  {
    "id": 109,
    "type": "libro",
    "title": "Frankenstein",
    "author": "Mary Shelley",
    "genre": "Terror",
    "minNivel": 10,
    "maxNivel": 12,
    "desc": "El origen del terror moderno: la criatura creada por Víctor Frankenstein.",
    "image": "https://covers.openlibrary.org/b/id/12356249-L.jpg"
  },
  {
    "id": 111,
    "type": "libro",
    "title": "El Retrato de Dorian Gray",
    "author": "Oscar Wilde",
    "genre": "Clásico",
    "minNivel": 10,
    "maxNivel": 12,
    "desc": "Un joven intercambia su alma con un cuadro para permanecer joven.",
    "image": "https://covers.openlibrary.org/b/id/14314858-L.jpg"
  },
  {
    "id": 112,
    "type": "libro",
    "title": "Rebelión en la Granja",
    "author": "George Orwell",
    "genre": "Fábula",
    "minNivel": 8,
    "maxNivel": 12,
    "desc": "Un sistema igualitario animal que poco a poco se corrompe.",
    "image": "https://covers.openlibrary.org/b/id/13712713-L.jpg"
  },
  {
    "id": 113,
    "type": "libro",
    "title": "Drácula",
    "author": "Bram Stoker",
    "genre": "Terror",
    "minNivel": 9,
    "maxNivel": 12,
    "desc": "El abogado Jonathan Harker descubre la naturaleza del Conde Drácula.",
    "image": "https://placehold.co/400x600/A10D12/D4AF37.png?text=Dr%C3%A1cula"
  },
  {
    "id": 116,
    "type": "libro",
    "title": "Sub Terra",
    "author": "Baldomero Lillo",
    "genre": "Clásico",
    "minNivel": 8,
    "maxNivel": 12,
    "desc": "Las inhumanas condiciones de los mineros del carbón en Chile.",
    "image": "https://placehold.co/400x600/A10D12/D4AF37.png?text=Sub%2BTerra"
  },
  {
    "id": 401,
    "type": "libro",
    "title": "La Selección",
    "author": "Kiera Cass",
    "genre": "Romantasy",
    "minNivel": 8,
    "maxNivel": 12,
    "desc": "Treinta y cinco chicas compiten por la corona. America Singer debe elegir entre el amor y el deber.",
    "image": "https://covers.openlibrary.org/b/id/7101900-L.jpg"
  },
  {
    "id": 402,
    "type": "libro",
    "title": "Cinder",
    "author": "Marissa Meyer",
    "genre": "Romantasy",
    "minNivel": 9,
    "maxNivel": 12,
    "desc": "Una cyborg en la Nueva Pekín futurista debe salvar el mundo de una plaga lunar.",
    "image": "https://covers.openlibrary.org/b/id/6998634-L.jpg"
  },
  {
    "id": 403,
    "type": "libro",
    "title": "Érase una vez un corazón roto",
    "author": "Stephanie Garber",
    "genre": "Romantasy",
    "minNivel": 9,
    "maxNivel": 12,
    "desc": "Evangeline Fox viaja al Norte y hace un trato peligroso con el Príncipe de Corazones.",
    "image": "https://covers.openlibrary.org/b/id/11427092-L.jpg"
  },
  {
    "id": 105,
    "type": "libro",
    "title": "Los Juegos del Hambre",
    "author": "Suzanne Collins",
    "genre": "Ciencia Ficción",
    "minNivel": 7,
    "maxNivel": 12,
    "desc": "Katniss Everdeen debe luchar por su vida en un reality show televisado.",
    "image": "https://covers.openlibrary.org/b/id/12646537-L.jpg"
  },
  {
    "id": 501,
    "type": "libro",
    "title": "Heartstopper",
    "author": "Alice Oseman",
    "genre": "Romance",
    "minNivel": 8,
    "maxNivel": 12,
    "desc": "Charlie y Nick descubren que su amistad se está convirtiendo en algo más. Una historia dulce y moderna.",
    "image": "https://covers.openlibrary.org/b/id/9020805-L.jpg"
  },
  {
    "id": 120,
    "type": "libro",
    "title": "La Comunidad del Anillo",
    "author": "J.R.R. Tolkien",
    "genre": "Fantasía",
    "minNivel": 8,
    "maxNivel": 12,
    "desc": "Frodo Bolsón emprende la misión de destruir el Anillo Único.",
    "image": "https://covers.openlibrary.org/b/id/14625765-L.jpg"
  }
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
    recommendedIds: [1, 3, 9, 18, 113, 103],
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
    recommendedIds: [302, 401, 501, 402, 9, 7],
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
