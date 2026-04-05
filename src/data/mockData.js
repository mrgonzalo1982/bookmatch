// ─── Student Database (from Excel import) ───────────────────────────────────
export { default as STUDENTS } from './students.json';

// ─── Literary Catalog ────────────────────────────────────────────────────────
// minNivel / maxNivel match school grade levels:
//   5 = 5° Básico, 6 = 6°B, 7 = 7°B, 8 = 8°B
//   9 = 1° Medio, 10 = 2°M, 11 = 3°M, 12 = 4°M
export const ITEMS = [
  // ── 5° y 6° Básico ──────────────────────────────────────────────────────────
  {
    id: 1,
    type: 'libro',
    title: 'Matilda',
    author: 'Roald Dahl',
    description: 'Una niña superdotada descubre que tiene poderes telequinéticos y los usa para enfrentar a sus crueles padres y directora escolar.',
    image: 'https://images.unsplash.com/photo-1576872381149-7847515ce5d8?auto=format&fit=crop&q=80&w=400',
    professors: [{ name: 'Tía Coté', dept: 'Psicopedagogía' }, { name: 'Profe Rodrigo', dept: 'Artes' }],
    genre: 'Fantasía', studentsMatched: 72, minNivel: 5, maxNivel: 7
  },
  {
    id: 2,
    type: 'libro',
    title: 'Charlie y la Fábrica de Chocolate',
    author: 'Roald Dahl',
    description: 'Charlie Bucket gana un boleto dorado para visitar la fábrica más misteriosa del mundo, llena de maravillas y peligros.',
    image: 'https://images.unsplash.com/photo-1481391319762-47dff72954d9?auto=format&fit=crop&q=80&w=400',
    professors: [{ name: 'Tía Coté', dept: 'Psicopedagogía' }, { name: 'Miss Elena', dept: 'Biblioteca' }],
    genre: 'Fantasía', studentsMatched: 88, minNivel: 5, maxNivel: 7
  },
  {
    id: 3,
    type: 'libro',
    title: 'El Principito',
    author: 'Antoine de Saint-Exupéry',
    description: 'Un pequeño príncipe que viaja de planeta en planeta descubriendo que "lo esencial es invisible a los ojos".',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400',
    professors: [{ name: 'Tía Coté', dept: 'Psicopedagogía' }, { name: 'Profe Rodrigo', dept: 'Artes' }],
    genre: 'Fábula', studentsMatched: 95, minNivel: 5, maxNivel: 9
  },
  {
    id: 4,
    type: 'personaje',
    title: 'Sherlock Holmes',
    author: 'Arthur Conan Doyle',
    description: 'El detective más famoso del mundo. Frío, calculador y con una capacidad de deducción que desafía toda lógica.',
    image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&q=80&w=400',
    professors: [{ name: 'Profe Juan Pablo', dept: 'Ciencias' }, { name: 'Miss Javiera', dept: 'Inglés' }],
    genre: 'Misterio', studentsMatched: 51, minNivel: 5, maxNivel: 12
  },
  {
    id: 5,
    type: 'libro',
    title: 'El Mago de Oz',
    author: 'L. Frank Baum',
    description: 'Dorothy y su perro Totó son arrastrados por un tornado a la tierra mágica de Oz, donde buscan el camino a casa.',
    image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=400',
    professors: [{ name: 'Miss Javiera', dept: 'Inglés' }, { name: 'Miss Elena', dept: 'Biblioteca' }],
    genre: 'Aventura', studentsMatched: 43, minNivel: 5, maxNivel: 7
  },
  {
    id: 6,
    type: 'libro',
    title: 'Las Crónicas de Narnia',
    author: 'C.S. Lewis',
    description: 'Cuatro hermanos descubren un mundo mágico a través de un armario ropero y deben luchar contra la Bruja Blanca.',
    image: 'https://images.unsplash.com/photo-1535666669445-e8c15cd2e7d9?auto=format&fit=crop&q=80&w=400',
    professors: [{ name: 'Profe Ricardo', dept: 'Lenguaje' }, { name: 'Miss Javiera', dept: 'Inglés' }],
    genre: 'Fantasía', studentsMatched: 67, minNivel: 5, maxNivel: 8
  },

  // ── 6°, 7° y 8° Básico ──────────────────────────────────────────────────────
  {
    id: 7,
    type: 'libro',
    title: 'Harry Potter y la Piedra Filosofal',
    author: 'J.K. Rowling',
    description: 'Un niño huérfano descubre que es un mago y comienza su educación en Hogwarts, la escuela de magia más famosa del mundo.',
    image: 'https://images.unsplash.com/photo-1618519764620-7403abdbdfe9?auto=format&fit=crop&q=80&w=400',
    professors: [{ name: 'Miss Javiera', dept: 'Inglés' }, { name: 'Miss Elena', dept: 'Biblioteca' }],
    genre: 'Fantasía', studentsMatched: 142, minNivel: 6, maxNivel: 10
  },
  {
    id: 8,
    type: 'libro',
    title: 'Percy Jackson y el Ladrón del Rayo',
    author: 'Rick Riordan',
    description: 'Un adolescente con TDAH descubre que es hijo de Poseidón y debe recuperar el rayo de Zeus para evitar una guerra olímpica.',
    image: 'https://images.unsplash.com/photo-1555116505-38ab61800975?auto=format&fit=crop&q=80&w=400',
    professors: [{ name: 'Profe Marcela', dept: 'Historia' }, { name: 'Miss Elena', dept: 'Biblioteca' }],
    genre: 'Aventura', studentsMatched: 118, minNivel: 6, maxNivel: 9
  },
  {
    id: 9,
    type: 'libro',
    title: 'El Hobbit',
    author: 'J.R.R. Tolkien',
    description: 'Bilbo Bolsón, un hobbit tranquilo, es arrastrado a una aventura épica con enanos y un mago para recuperar un tesoro guardado por un dragón.',
    image: 'https://images.unsplash.com/photo-1506466010722-395aa2bef877?auto=format&fit=crop&q=80&w=400',
    professors: [{ name: 'Profe Ricardo', dept: 'Lenguaje' }, { name: 'Miss Javiera', dept: 'Inglés' }],
    genre: 'Fantasía', studentsMatched: 89, minNivel: 7, maxNivel: 12
  },
  {
    id: 10,
    type: 'libro',
    title: 'Momo',
    author: 'Michael Ende',
    description: 'Una niña con poderes especiales para escuchar lucha contra los Hombres Grises que roban el tiempo a los humanos.',
    image: 'https://images.unsplash.com/photo-1470549638415-0a0755be0619?auto=format&fit=crop&q=80&w=400',
    professors: [{ name: 'Profe Ricardo', dept: 'Lenguaje' }, { name: 'Tía Coté', dept: 'Psicopedagogía' }],
    genre: 'Fantasía', studentsMatched: 44, minNivel: 7, maxNivel: 9
  },
  {
    id: 11,
    type: 'libro',
    title: 'La Isla del Tesoro',
    author: 'Robert L. Stevenson',
    description: 'Jim Hawkins encuentra un mapa del tesoro del pirata Flint y zarpa en una aventura llena de peligros y traiciones.',
    image: 'https://images.unsplash.com/photo-1439405326854-014607f694d7?auto=format&fit=crop&q=80&w=400',
    professors: [{ name: 'Profe Ricardo', dept: 'Lenguaje' }, { name: 'Miss Javiera', dept: 'Inglés' }],
    genre: 'Aventura', studentsMatched: 36, minNivel: 7, maxNivel: 9
  },

  // ── 8° Básico y 1° Medio ─────────────────────────────────────────────────────
  {
    id: 12,
    type: 'libro',
    title: 'El Diario de Ana Frank',
    author: 'Ana Frank',
    description: 'El diario real de una niña judía que se escondió con su familia durante el Holocausto. Un testimonio de esperanza en tiempos oscuros.',
    image: 'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&q=80&w=400',
    professors: [{ name: 'Profe Marcela', dept: 'Historia' }, { name: 'Profe Ricardo', dept: 'Lenguaje' }],
    genre: 'Autobiografía', studentsMatched: 78, minNivel: 8, maxNivel: 12
  },
  {
    id: 13,
    type: 'libro',
    title: 'El Alquimista',
    author: 'Paulo Coelho',
    description: 'Un pastor andaluz viaja desde España hasta las pirámides de Egipto en busca de un tesoro y descubre el verdadero significado de su vida.',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=400',
    professors: [{ name: 'Profe Ricardo', dept: 'Lenguaje' }, { name: 'Tía Coté', dept: 'Psicopedagogía' }],
    genre: 'Aventura', studentsMatched: 55, minNivel: 8, maxNivel: 12
  },
  {
    id: 14,
    type: 'libro',
    title: 'Romeo y Julieta',
    author: 'William Shakespeare',
    description: 'La tragedia más famosa del mundo: dos jóvenes de familias rivales se enamoran y su amor los lleva a un desenlace inevitable.',
    image: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&q=80&w=400',
    professors: [{ name: 'Miss Javiera', dept: 'Inglés' }, { name: 'Profe Marcela', dept: 'Historia' }],
    genre: 'Clásico', studentsMatched: 63, minNivel: 8, maxNivel: 12
  },

  // ── 1° a 4° Medio ────────────────────────────────────────────────────────────
  {
    id: 15,
    type: 'libro',
    title: 'El Señor de las Moscas',
    author: 'William Golding',
    description: 'Un grupo de niños náufragos en una isla desierta crean su propia sociedad, que rápidamente degenera en violencia y caos.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=400',
    professors: [{ name: 'Profe Ricardo', dept: 'Lenguaje' }, { name: 'Profe Marcela', dept: 'Historia' }],
    genre: 'Clásico', studentsMatched: 38, minNivel: 9, maxNivel: 12
  },
  {
    id: 16,
    type: 'libro',
    title: 'Crónica de una Muerte Anunciada',
    author: 'Gabriel García Márquez',
    description: 'El relato de un crimen que todo el pueblo sabía que iba a ocurrir pero nadie pudo o quiso evitar.',
    image: 'https://images.unsplash.com/photo-1506466010722-395aa2bef877?auto=format&fit=crop&q=80&w=400',
    professors: [{ name: 'Profe Ricardo', dept: 'Lenguaje' }, { name: 'Miss Elena', dept: 'Biblioteca' }],
    genre: 'Realismo Mágico', studentsMatched: 29, minNivel: 9, maxNivel: 12
  },
  {
    id: 17,
    type: 'libro',
    title: 'La Metamorfosis',
    author: 'Franz Kafka',
    description: 'Gregor Samsa despierta convertido en un insecto gigante. Una poderosa alegoría sobre la alienación, la familia y la identidad.',
    image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&q=80&w=400',
    professors: [{ name: 'Profe Ricardo', dept: 'Lenguaje' }, { name: 'Profe Juan Pablo', dept: 'Ciencias' }],
    genre: 'Clásico', studentsMatched: 22, minNivel: 10, maxNivel: 12
  },
  {
    id: 18,
    type: 'libro',
    title: '1984',
    author: 'George Orwell',
    description: 'En un futuro distópico, el Gran Hermano lo vigila todo. Winston Smith se atreve a pensar en libertad en un mundo donde eso está prohibido.',
    image: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=400',
    professors: [{ name: 'Profe Marcela', dept: 'Historia' }, { name: 'Profe Ricardo', dept: 'Lenguaje' }],
    genre: 'Ciencia Ficción', studentsMatched: 47, minNivel: 10, maxNivel: 12
  },
  {
    id: 19,
    type: 'libro',
    title: 'Cien Años de Soledad',
    author: 'Gabriel García Márquez',
    description: 'La épica historia de la familia Buendía en Macondo, donde lo fantástico ocurre todos los días.',
    image: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=400',
    professors: [{ name: 'Profe Ricardo', dept: 'Lenguaje' }, { name: 'Miss Elena', dept: 'Biblioteca' }],
    genre: 'Realismo Mágico', studentsMatched: 22, minNivel: 10, maxNivel: 12
  },
  {
    id: 20,
    type: 'libro',
    title: 'El Gran Gatsby',
    author: 'F. Scott Fitzgerald',
    description: 'Jay Gatsby, un millonario misterioso, organiza fiestas escandalosas esperando reconquistar a la mujer que ama. Una crítica al sueño americano.',
    image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80&w=400',
    professors: [{ name: 'Miss Javiera', dept: 'Inglés' }, { name: 'Profe Marcela', dept: 'Historia' }],
    genre: 'Clásico', studentsMatched: 31, minNivel: 10, maxNivel: 12
  },
  {
    id: 21,
    type: 'libro',
    title: 'Don Quijote de la Mancha',
    author: 'Miguel de Cervantes',
    description: 'Un hidalgo que pierde la razón leyendo libros de caballería y decide convertirse en caballero andante por las tierras de España.',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400',
    professors: [{ name: 'Profe Ricardo', dept: 'Lenguaje' }, { name: 'Profe Marcela', dept: 'Historia' }],
    genre: 'Clásico', studentsMatched: 34, minNivel: 11, maxNivel: 12
  },
  {
    id: 22,
    type: 'personaje',
    title: 'Elizabeth Bennet',
    author: 'Jane Austen',
    description: 'Una mujer adelantada a su tiempo que valora la independencia y la inteligencia por sobre las normas sociales.',
    image: 'https://images.unsplash.com/photo-1474932430478-3a7fb9065ba0?auto=format&fit=crop&q=80&w=400',
    professors: [{ name: 'Miss Javiera', dept: 'Inglés' }, { name: 'Profe Marcela', dept: 'Historia' }],
    genre: 'Romance', studentsMatched: 28, minNivel: 9, maxNivel: 12
  },
  {
    id: 23,
    type: 'libro',
    title: 'El Túnel',
    author: 'Ernesto Sábato',
    description: 'Un pintor obsesivo relata el asesinato de la única persona que comprendió su arte. Una exploración oscura de la soledad y los celos.',
    image: 'https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?auto=format&fit=crop&q=80&w=400',
    professors: [{ name: 'Profe Ricardo', dept: 'Lenguaje' }],
    genre: 'Misterio', studentsMatched: 18, minNivel: 10, maxNivel: 12
  },
  {
    id: 24,
    type: 'libro',
    title: 'Un Mundo Feliz',
    author: 'Aldous Huxley',
    description: 'Una sociedad futurista aparentemente perfecta donde el condicionamiento y las drogas eliminan el sufrimiento... y la libertad.',
    image: 'https://images.unsplash.com/photo-1464802686167-b939a6910659?auto=format&fit=crop&q=80&w=400',
    professors: [{ name: 'Profe Juan Pablo', dept: 'Ciencias' }, { name: 'Profe Ricardo', dept: 'Lenguaje' }],
    genre: 'Ciencia Ficción', studentsMatched: 25, minNivel: 10, maxNivel: 12
  },
  {
    id: 25,
    type: 'libro',
    title: 'El Principito',
    author: 'Antoine de Saint-Exupéry',
    description: 'Un clásico eterno sobre la amistad, el amor y la pérdida que los adultos leen con otros ojos. "Las personas mayores nunca comprenden nada por sí solas."',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=400',
    professors: [{ name: 'Profe Ricardo', dept: 'Lenguaje' }, { name: 'Tía Coté', dept: 'Psicopedagogía' }],
    genre: 'Fábula', studentsMatched: 110, minNivel: 9, maxNivel: 12
  },
  {"id":101,"type":"libro","title":"Bajo la misma estrella","author":"John Green","description":"Dos adolescentes que padecen cáncer inician un viaje para reafirmar sus vidas.","image":"https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400","professors":[{"name":"Gonzalo Andrés","dept":"Computación"}],"genre":"Romance","studentsMatched":45,"minNivel":8,"maxNivel":12},
  {"id":102,"type":"libro","title":"El diario de Ana Frank","author":"Ana Frank","description":"El testimonio humano más sobrecogedor sobre la persecución nazi.","image":"https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400","professors":[{"name":"Miss Danixa","dept":"Historia"}],"genre":"Autobiografía","studentsMatched":89,"minNivel":7,"maxNivel":12},
  {"id":103,"type":"libro","title":"Fahrenheit 451","author":"Ray Bradbury","description":"Guy Montag es un bombero cuyo trabajo es quemar libros, hasta que conoce a una joven que le hace cuestionar su realidad.","image":"https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&q=80&w=400","professors":[{"name":"Profe Gonzalo","dept":"Computación"}],"genre":"Ciencia Ficción","studentsMatched":62,"minNivel":9,"maxNivel":12},
  {"id":104,"type":"libro","title":"La sombra del viento","author":"Carlos Ruiz Zafón","description":"Un joven es conducido al Cementerio de los Libros Olvidados, donde descubre un libro maldito que cambiará su vida.","image":"https://images.unsplash.com/photo-1506466010722-395aa2bef877?auto=format&fit=crop&q=80&w=400","professors":[{"name":"Profe Ricardo","dept":"Lenguaje"}],"genre":"Misterio","studentsMatched":50,"minNivel":10,"maxNivel":12},
  {"id":105,"type":"libro","title":"El niño con el pijama de rayas","author":"John Boyne","description":"La amistad entre Bruno, el hijo del comandante de un campo de concentración, y Shmuel, un niño judío.","image":"https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80&w=400","professors":[{"name":"Miss Danixa","dept":"Historia"}],"genre":"Realismo Mágico","studentsMatched":110,"minNivel":6,"maxNivel":9},
  {"id":106,"type":"libro","title":"Cuentos de amor de locura y de muerte","author":"Horacio Quiroga","description":"Relatos donde la selva, la locura humana y lo macabro toman el protagonismo de forma cruda.","image":"https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?auto=format&fit=crop&q=80&w=400","professors":[{"name":"Profe Ricardo","dept":"Lenguaje"}],"genre":"Terror","studentsMatched":34,"minNivel":9,"maxNivel":12},
  {"id":107,"type":"libro","title":"Los Juegos del Hambre","author":"Suzanne Collins","description":"Katniss Everdeen debe luchar a muerte en un reality show televisado en la nación de Panem.","image":"https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=400","professors":[{"name":"Tía Coté","dept":"Psicopedagogía"}],"genre":"Ciencia Ficción","studentsMatched":140,"minNivel":7,"maxNivel":10},
  {"id":108,"type":"libro","title":"Mi Planta de Naranja-Lima","author":"José Mauro de Vasconcelos","description":"Zezé, un niño travieso que de pronto descubre el dolor y se hace adulto prematuramente.","image":"https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&q=80&w=400","professors":[{"name":"Tía Coté","dept":"Psicopedagogía"}],"genre":"Clásico","studentsMatched":88,"minNivel":5,"maxNivel":8},
  {"id":109,"type":"libro","title":"Frankenstein","author":"Mary Shelley","description":"El científico Victor Frankenstein crea un monstruo ensamblando partes de cadáveres, desatando la tragedia.","image":"https://images.unsplash.com/photo-1474932430478-3a7fb9065ba0?auto=format&fit=crop&q=80&w=400","professors":[{"name":"Miss Javiera","dept":"Inglés"}],"genre":"Terror","studentsMatched":29,"minNivel":10,"maxNivel":12},
  {"id":110,"type":"libro","title":"Orgullo y Prejuicio","author":"Jane Austen","description":"La compleja relación entre Elizabeth Bennet y el Sr. Darcy navegando por las convenciones sociales de su siglo.","image":"https://images.unsplash.com/photo-1481391319762-47dff72954d9?auto=format&fit=crop&q=80&w=400","professors":[{"name":"Miss Javiera","dept":"Inglés"}],"genre":"Romance","studentsMatched":76,"minNivel":9,"maxNivel":12},
  {"id":111,"type":"libro","title":"El retrato de Dorian Gray","author":"Oscar Wilde","description":"Un joven intercambia su alma y su vejez con un cuadro que pintaron sobre él.","image":"https://images.unsplash.com/photo-1470549638415-0a0755be0619?auto=format&fit=crop&q=80&w=400","professors":[{"name":"Profe Ricardo","dept":"Lenguaje"}],"genre":"Clásico","studentsMatched":62,"minNivel":10,"maxNivel":12},
  {"id":112,"type":"libro","title":" Rebelión en la granja","author":"George Orwell","description":"Los animales de una granja expulsan a los humanos para crear un sistema igualitario que poco a poco se corrompe.","image":"https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=400","professors":[{"name":"Miss Danixa","dept":"Historia"}],"genre":"Fábula","studentsMatched":94,"minNivel":8,"maxNivel":12},
  {"id":113,"type":"libro","title":"Drácula","author":"Bram Stoker","description":"El abogado Jonathan Harker viaja a Transilvania donde descubre la verdadera naturaleza del Conde Drácula.","image":"https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400","professors":[{"name":"Miss Javiera","dept":"Inglés"}],"genre":"Terror","studentsMatched":47,"minNivel":9,"maxNivel":12},
  {"id":114,"type":"libro","title":"La Odisea","author":"Homero","description":"El épico y accidentado viaje de Odiseo tratando de retornar a su patria tras la Guerra de Troya.","image":"https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400","professors":[{"name":"Profe Ricardo","dept":"Lenguaje"}],"genre":"Aventura","studentsMatched":31,"minNivel":9,"maxNivel":12},
  {"id":115,"type":"libro","title":"Sub Terra","author":"Baldomero Lillo","description":"Relatos que describen las inhumanas condiciones de vida y trabajo de los mineros del carbón en Lota.","image":"https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80&w=400","professors":[{"name":"Miss Danixa","dept":"Historia"}],"genre":"Clásico","studentsMatched":55,"minNivel":8,"maxNivel":12},
  {"id":116,"type":"libro","title":"El Hobbit","author":"J.R.R. Tolkien","description":"Bilbo Bolsón es convocado por el mago Gandalf y 13 enanos para recuperar un reino tomado por un dragón.","image":"https://images.unsplash.com/photo-1535666669445-e8c15cd2e7d9?auto=format&fit=crop&q=80&w=400","professors":[{"name":"Miss Elena","dept":"Biblioteca"}],"genre":"Fantasía","studentsMatched":81,"minNivel":6,"maxNivel":10},
  {"id":117,"type":"libro","title":"Percy Jackson y los dioses del Olimpo","author":"Rick Riordan","description":"Percy descubre que es hijo de Poseidón y es enviado al Campamento Mestizo donde enfrenta aventuras mitológicas.","image":"https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=400","professors":[{"name":"Miss Elena","dept":"Biblioteca"}],"genre":"Aventura","studentsMatched":130,"minNivel":5,"maxNivel":8},
  {"id":118,"type":"libro","title":"El visitante","author":"Stephen King","description":"Un horrendo asesinato involucra a un querido profesor local, pero huellas digitales y hechos desafían toda explicación.","image":"https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&q=80&w=400","professors":[{"name":"Profe Gonzalo","dept":"Computación"}],"genre":"Misterio","studentsMatched":22,"minNivel":11,"maxNivel":12},
  {"id":119,"type":"libro","title":"Un mundo feliiz","author":"Aldous Huxley","description":"Una sociedad condicionada genticamente dende todos son felices consumiendo drogas y anulando el arte.","image":"https://images.unsplash.com/photo-1506466010722-395aa2bef877?auto=format&fit=crop&q=80&w=400","professors":[{"name":"Miss Danixa","dept":"Historia"}],"genre":"Ciencia Ficción","studentsMatched":48,"minNivel":10,"maxNivel":12},
  {"id":120,"type":"libro","title":"Papelucho","author":"Marcela Paz","description":"El diario de vida de un ingenioso niño chileno que constantemente inventa soluciones para resolver entuertos de los adultos.","image":"https://images.unsplash.com/photo-1576872381149-7847515ce5d8?auto=format&fit=crop&q=80&w=400","professors":[{"name":"Tía Coté","dept":"Psicopedagogía"}],"genre":"Fábula","studentsMatched":96,"minNivel":5,"maxNivel":7}
];

// ─── Teacher Profiles ────────────────────────────────────────────────────────
export const TEACHERS = [
  {
    id: 'prof-1',
    rut: '150685478',
    name: 'Gonzalo Andrés',
    shortName: 'Profe Gonzalo',
    dept: 'Computación',
    bio: 'Profesor de especialidades. Le apasionan los clásicos universales y busca siempre innovar en el aula.',
    emoji: '🤖',
    email: 'gonzalo@colegioumbral.cl',
    recommendedIds: [1, 5, 8, 14, 18],
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
    recommendedIds: [8, 12, 16, 21],
    genre: 'Autobiografía',
    nivelMin: 5, nivelMax: 12,
  },
  {
    id: 'prof-3',
    name: 'Ricardo Mella',
    shortName: 'Profe Ricardo',
    dept: 'Lenguaje & Comunicación',
    bio: 'Apasionado por la literatura latinoamericana y los clásicos españoles. Convencido de que leer cambia vidas.',
    emoji: '📖',
    email: 'rjara@colegioumbral.cl',
    recommendedIds: [1, 3, 9, 15, 16, 19, 21, 23, 25],
    genre: 'Clásico',
    nivelMin: 5, nivelMax: 12,
  },
  {
    id: 'prof-2',
    name: 'Marcela Fuentes',
    shortName: 'Profe Marcela',
    dept: 'Historia & Geografía',
    bio: 'Cree que la historia se entiende mejor a través de las historias. Le encanta conectar literatura con los contextos históricos.',
    emoji: '🏛️',
    email: 'mfuentes@colegioumbral.cl',
    recommendedIds: [12, 14, 18, 20, 21, 22],
    genre: 'Clásico',
    nivelMin: 8, nivelMax: 12,
  },
  {
    id: 'prof-3',
    name: 'Juan Pablo Ramos',
    shortName: 'Profe Juan Pablo',
    dept: 'Ciencias Naturales',
    bio: 'Usa la ciencia ficción para explorar conceptos científicos con sus estudiantes. Su lema: "La ciencia también es imaginación."',
    emoji: '🔬',
    email: 'jpramos@colegioumbral.cl',
    recommendedIds: [4, 17, 18, 24],
    genre: 'Ciencia Ficción',
    nivelMin: 7, nivelMax: 12,
  },
  {
    id: 'prof-4',
    name: 'Javiera Morales',
    shortName: 'Miss Javiera',
    dept: 'Inglés',
    bio: 'Profesora de inglés con amor por la literatura anglosajona. Sus estudiantes leen en inglés desde 7° básico.',
    emoji: '🌍',
    email: 'jmorales@colegioumbral.cl',
    recommendedIds: [4, 6, 7, 9, 14, 20, 22],
    genre: 'Clásico',
    nivelMin: 5, nivelMax: 12,
  },
  {
    id: 'prof-5',
    name: 'Constanza Pérez',
    shortName: 'Tía Coté',
    dept: 'Psicopedagogía',
    bio: 'Trabaja con estudiantes con necesidades educativas especiales. La lectura es su herramienta terapéutica favorita.',
    emoji: '💙',
    email: 'cperez@colegioumbral.cl',
    recommendedIds: [1, 2, 3, 10, 13, 25],
    genre: 'Fábula',
    nivelMin: 5, nivelMax: 9,
  },
  {
    id: 'prof-6',
    name: 'Rodrigo Salinas',
    shortName: 'Profe Rodrigo',
    dept: 'Artes Visuales',
    bio: 'Conecta la literatura con el arte visual. Sus clases terminan siempre con un proyecto creativo inspirado en alguna obra literaria.',
    emoji: '🎨',
    email: 'rsalinas@colegioumbral.cl',
    recommendedIds: [1, 2, 3, 5, 6, 10],
    genre: 'Fantasía',
    nivelMin: 5, nivelMax: 8,
  },
  {
    id: 'prof-7',
    name: 'Elena Castillo',
    shortName: 'Miss Elena',
    dept: 'Biblioteca',
    bio: 'Encargada de la biblioteca del colegio. Tiene una recomendación para cada estudiante. Su biblioteca siempre tiene la puerta abierta.',
    emoji: '📚',
    email: 'ecastillo@colegioumbral.cl',
    recommendedIds: [2, 3, 5, 7, 8, 12, 16, 19, 25],
    genre: 'Aventura',
    nivelMin: 5, nivelMax: 12,
  },
];

// ─── Genre list ───────────────────────────────────────────────────────────────
export const GENRES = [
  "Clásico", "Misterio", "Fábula", "Realismo Mágico", "Romance",
  "Fantasía", "Ciencia Ficción", "Terror", "Aventura", "Autobiografía"
];

// ─── Matching Rules ───────────────────────────────────────────────────────────
export const canMatch = (userNivel, peerNivel) => {
  if (userNivel <= 9) return peerNivel === userNivel;
  return peerNivel >= 10 && peerNivel <= 12;
};

// ─── Deterministic Peer Likes ─────────────────────────────────────────────────
export const getPeerLikes = (rut) => {
  const allIds = ITEMS.map(i => i.id);
  const seed = rut.replace(/[^0-9]/g, '').split('').reduce((acc, c) => acc + parseInt(c), 0);
  return allIds.filter((_, i) => (seed + i * 13) % 3 !== 0);
};

// ─── Deterministic Peer Profile ───────────────────────────────────────────────
export const getPeerProfile = (rut) => {
  const seed = rut.replace(/[^0-9]/g, '').split('').reduce((acc, c) => acc + parseInt(c), 0);
  const peerGenres = GENRES.filter((_, i) => (seed + i * 7) % 2 === 0);
  const favBook = ITEMS[seed % ITEMS.length];
  return { genres: peerGenres, favoriteBook: favBook?.title || null };
};

// ─── Compatibility Score ─────────────────────────────────────────────────────
// Weights: 50% liked books, 35% genres, 15% favorite book
export const compatibilityScore = (myProfile, peerLikedIds, peerProfile) => {
  const { likedIds: myLikedIds = [], genres: myGenres = [], favoriteBook: myFavBook = null } = myProfile;
  const commonBooks = myLikedIds.filter(id => peerLikedIds.includes(id));
  const bookScore = peerLikedIds.length > 0
    ? (commonBooks.length / peerLikedIds.length) * 50 : 0;
  const commonGenres = myGenres.filter(g => peerProfile.genres.includes(g));
  const genreScore = myGenres.length > 0
    ? (commonGenres.length / Math.max(myGenres.length, peerProfile.genres.length)) * 35 : 0;
  const favBookScore = (myFavBook && peerProfile.favoriteBook &&
    myFavBook.toLowerCase() === peerProfile.favoriteBook.toLowerCase()) ? 15 : 0;
  return Math.round(bookScore + genreScore + favBookScore);
};

// ─── Initialize Extra Books ──────────────────────────────────────────────────
try {
  if (typeof window !== 'undefined') {
    const extraBooks = JSON.parse(localStorage.getItem('bm-extra-books') || '[]');
    if (extraBooks.length > 0) {
      ITEMS.push(...extraBooks);
    }
  }
} catch (e) {
  console.log('Could not load extra books', e);
}
