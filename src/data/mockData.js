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
    genre: 'Fantasía', minNivel: 5, maxNivel: 7
  },
  {
    id: 2,
    type: 'libro',
    title: 'Charlie y la Fábrica de Chocolate',
    author: 'Roald Dahl',
    description: 'Charlie Bucket gana un boleto dorado para visitar la fábrica más misteriosa del mundo, llena de maravillas y peligros.',
    image: 'https://images.unsplash.com/photo-1481391319762-47dff72954d9?auto=format&fit=crop&q=80&w=400',
    
    genre: 'Fantasía',  minNivel: 5, maxNivel: 7
  },
  {
    id: 3,
    type: 'libro',
    title: 'El Principito',
    author: 'Antoine de Saint-Exupéry',
    description: 'Un pequeño príncipe que viaja de planeta en planeta descubriendo que "lo esencial es invisible a los ojos".',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400',
    
    genre: 'Fábula',  minNivel: 5, maxNivel: 9
  },
  {
    id: 4,
    type: 'personaje',
    title: 'Sherlock Holmes',
    author: 'Arthur Conan Doyle',
    description: 'El detective más famoso del mundo. Frío, calculador y con una capacidad de deducción que desafía toda lógica.',
    image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&q=80&w=400',
    
    genre: 'Misterio',  minNivel: 5, maxNivel: 12
  },
  {
    id: 5,
    type: 'libro',
    title: 'El Mago de Oz',
    author: 'L. Frank Baum',
    description: 'Dorothy y su perro Totó son arrastrados por un tornado a la tierra mágica de Oz, donde buscan el camino a casa.',
    image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=400',
    
    genre: 'Aventura',  minNivel: 5, maxNivel: 7
  },
  {
    id: 6,
    type: 'libro',
    title: 'Las Crónicas de Narnia',
    author: 'C.S. Lewis',
    description: 'Cuatro hermanos descubren un mundo mágico a través de un armario ropero y deben luchar contra la Bruja Blanca.',
    image: 'https://images.unsplash.com/photo-1535666669445-e8c15cd2e7d9?auto=format&fit=crop&q=80&w=400',
    
    genre: 'Fantasía',  minNivel: 5, maxNivel: 8
  },

  // ── 6°, 7° y 8° Básico ──────────────────────────────────────────────────────
  {
    id: 7,
    type: 'libro',
    title: 'Harry Potter y la Piedra Filosofal',
    author: 'J.K. Rowling',
    description: 'Un niño huérfano descubre que es un mago y comienza su educación en Hogwarts, la escuela de magia más famosa del mundo.',
    image: 'https://images.unsplash.com/photo-1618519764620-7403abdbdfe9?auto=format&fit=crop&q=80&w=400',
    
    genre: 'Fantasía',  minNivel: 6, maxNivel: 10
  },
  {
    id: 8,
    type: 'libro',
    title: 'Percy Jackson y el Ladrón del Rayo',
    author: 'Rick Riordan',
    description: 'Un adolescente con TDAH descubre que es hijo de Poseidón y debe recuperar el rayo de Zeus para evitar una guerra olímpica.',
    image: 'https://images.unsplash.com/photo-1555116505-38ab61800975?auto=format&fit=crop&q=80&w=400',
    
    genre: 'Aventura',  minNivel: 6, maxNivel: 9
  },
  {
    id: 9,
    type: 'libro',
    title: 'El Hobbit',
    author: 'J.R.R. Tolkien',
    description: 'Bilbo Bolsón, un hobbit tranquilo, es arrastrado a una aventura épica con enanos y un mago para recuperar un tesoro guardado por un dragón.',
    image: 'https://images.unsplash.com/photo-1506466010722-395aa2bef877?auto=format&fit=crop&q=80&w=400',
    
    genre: 'Fantasía',  minNivel: 7, maxNivel: 12
  },
  {
    id: 10,
    type: 'libro',
    title: 'Momo',
    author: 'Michael Ende',
    description: 'Una niña con poderes especiales para escuchar lucha contra los Hombres Grises que roban el tiempo a los humanos.',
    image: 'https://images.unsplash.com/photo-1470549638415-0a0755be0619?auto=format&fit=crop&q=80&w=400',
    
    genre: 'Fantasía',  minNivel: 7, maxNivel: 9
  },
  {
    id: 11,
    type: 'libro',
    title: 'La Isla del Tesoro',
    author: 'Robert L. Stevenson',
    description: 'Jim Hawkins encuentra un mapa del tesoro del pirata Flint y zarpa en una aventura llena de peligros y traiciones.',
    image: 'https://images.unsplash.com/photo-1439405326854-014607f694d7?auto=format&fit=crop&q=80&w=400',
    
    genre: 'Aventura',  minNivel: 7, maxNivel: 9
  },

  // ── 8° Básico y 1° Medio ─────────────────────────────────────────────────────
  {
    id: 12,
    type: 'libro',
    title: 'El Diario de Ana Frank',
    author: 'Ana Frank',
    description: 'El diario real de una niña judía que se escondió con su familia durante el Holocausto. Un testimonio de esperanza en tiempos oscuros.',
    image: 'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&q=80&w=400',
    
    genre: 'Autobiografía',  minNivel: 8, maxNivel: 12
  },
  {
    id: 13,
    type: 'libro',
    title: 'El Alquimista',
    author: 'Paulo Coelho',
    description: 'Un pastor andaluz viaja desde España hasta las pirámides de Egipto en busca de un tesoro y descubre el verdadero significado de su vida.',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=400',
    
    genre: 'Aventura',  minNivel: 8, maxNivel: 12
  },
  {
    id: 14,
    type: 'libro',
    title: 'Romeo y Julieta',
    author: 'William Shakespeare',
    description: 'La tragedia más famosa del mundo: dos jóvenes de familias rivales se enamoran y su amor los lleva a un desenlace inevitable.',
    image: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&q=80&w=400',
    
    genre: 'Clásico',  minNivel: 8, maxNivel: 12
  },

  // ── 1° a 4° Medio ────────────────────────────────────────────────────────────
  {
    id: 15,
    type: 'libro',
    title: 'El Señor de las Moscas',
    author: 'William Golding',
    description: 'Un grupo de niños náufragos en una isla desierta crean su propia sociedad, que rápidamente degenera en violencia y caos.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=400',
    
    genre: 'Clásico',  minNivel: 9, maxNivel: 12
  },
  {
    id: 16,
    type: 'libro',
    title: 'Crónica de una Muerte Anunciada',
    author: 'Gabriel García Márquez',
    description: 'El relato de un crimen que todo el pueblo sabía que iba a ocurrir pero nadie pudo o quiso evitar.',
    image: 'https://images.unsplash.com/photo-1506466010722-395aa2bef877?auto=format&fit=crop&q=80&w=400',
    
    genre: 'Realismo Mágico',  minNivel: 9, maxNivel: 12
  },
  {
    id: 17,
    type: 'libro',
    title: 'La Metamorfosis',
    author: 'Franz Kafka',
    description: 'Gregor Samsa despierta convertido en un insecto gigante. Una poderosa alegoría sobre la alienación, la familia y la identidad.',
    image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&q=80&w=400',
    
    genre: 'Clásico',  minNivel: 10, maxNivel: 12
  },
  {
    id: 18,
    type: 'libro',
    title: '1984',
    author: 'George Orwell',
    description: 'En un futuro distópico, el Gran Hermano lo vigila todo. Winston Smith se atreve a pensar en libertad en un mundo donde eso está prohibido.',
    image: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=400',
    
    genre: 'Ciencia Ficción',  minNivel: 10, maxNivel: 12
  },
  {
    id: 19,
    type: 'libro',
    title: 'Cien Años de Soledad',
    author: 'Gabriel García Márquez',
    description: 'La épica historia de la familia Buendía en Macondo, donde lo fantástico ocurre todos los días.',
    image: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=400',
    
    genre: 'Realismo Mágico',  minNivel: 10, maxNivel: 12
  },
  {
    id: 20,
    type: 'libro',
    title: 'El Gran Gatsby',
    author: 'F. Scott Fitzgerald',
    description: 'Jay Gatsby, un millonario misterioso, organiza fiestas escandalosas esperando reconquistar a la mujer que ama. Una crítica al sueño americano.',
    image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80&w=400',
    
    genre: 'Clásico',  minNivel: 10, maxNivel: 12
  },
  {
    id: 21,
    type: 'libro',
    title: 'Don Quijote de la Mancha',
    author: 'Miguel de Cervantes',
    description: 'Un hidalgo que pierde la razón leyendo libros de caballería y decide convertirse en caballero andante por las tierras de España.',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400',
    
    genre: 'Clásico',  minNivel: 11, maxNivel: 12
  },
  {
    id: 22,
    type: 'personaje',
    title: 'Elizabeth Bennet',
    author: 'Jane Austen',
    description: 'Una mujer adelantada a su tiempo que valora la independencia y la inteligencia por sobre las normas sociales.',
    image: 'https://images.unsplash.com/photo-1474932430478-3a7fb9065ba0?auto=format&fit=crop&q=80&w=400',
    
    genre: 'Romance',  minNivel: 9, maxNivel: 12
  },
  {
    id: 23,
    type: 'libro',
    title: 'El Túnel',
    author: 'Ernesto Sábato',
    description: 'Un pintor obsesivo relata el asesinato de la única persona que comprendió su arte. Una exploración oscura de la soledad y los celos.',
    image: 'https://images.unsplash.com/photo-1512314889357-e157c22f938d?auto=format&fit=crop&q=80&w=400',
    
    genre: 'Misterio',  minNivel: 10, maxNivel: 12
  },
  {
    id: 24,
    type: 'libro',
    title: 'Un Mundo Feliz',
    author: 'Aldous Huxley',
    description: 'Una sociedad futurista aparentemente perfecta donde el condicionamiento y las drogas eliminan el sufrimiento... y la libertad.',
    image: 'https://images.unsplash.com/photo-1464802686167-b939a6910659?auto=format&fit=crop&q=80&w=400',
    
    genre: 'Ciencia Ficción',  minNivel: 10, maxNivel: 12
  },
  {
    id: 25,
    type: 'libro',
    title: 'El Principito',
    author: 'Antoine de Saint-Exupéry',
    description: 'Un clásico eterno sobre la amistad, el amor y la pérdida que los adultos leen con otros ojos. "Las personas mayores nunca comprenden nada por sí solas."',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=400',
    
    genre: 'Fábula',  minNivel: 9, maxNivel: 12
  },
  // Libros limpios (sagas completas, sin datos falsos)
  { id: 101, type: 'libro', title: 'Bajo la Misma Estrella', author: 'John Green', description: 'Dos adolescentes con cancer se enamoran. Una historia desgarradora sobre la vida, la muerte y el amor.', image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400', genre: 'Romance', minNivel: 8, maxNivel: 12 },
  { id: 102, type: 'libro', title: 'El Nino con el Pijama de Rayas', author: 'John Boyne', description: 'La amistad entre Bruno, hijo de un comandante nazi, y Shmuel, un nino prisionero del otro lado de la valla.', image: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80&w=400', genre: 'Clasico', minNivel: 6, maxNivel: 9 },
  { id: 103, type: 'libro', title: 'Fahrenheit 451', author: 'Ray Bradbury', description: 'Guy Montag es un bombero que quema libros, hasta que una joven le hace cuestionar su realidad.', image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&q=80&w=400', genre: 'Ciencia Ficcion', minNivel: 9, maxNivel: 12 },
  { id: 104, type: 'libro', title: 'La Sombra del Viento', author: 'Carlos Ruiz Zafon', description: 'Un joven descubre un libro maldito en el Cementerio de los Libros Olvidados.', image: 'https://images.unsplash.com/photo-1506466010722-395aa2bef877?auto=format&fit=crop&q=80&w=400', genre: 'Misterio', minNivel: 10, maxNivel: 12 },
  { id: 105, type: 'libro', title: 'Los Juegos del Hambre', author: 'Suzanne Collins', description: 'Katniss Everdeen debe luchar a muerte en un reality show televisado en la nacion de Panem.', image: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=400', genre: 'Ciencia Ficcion', minNivel: 7, maxNivel: 11 },
  { id: 106, type: 'libro', title: 'Los Juegos del Hambre: En Llamas', author: 'Suzanne Collins', description: 'Katniss y Peeta regresan a los Juegos. La llama de la revolucion no puede apagarse.', image: 'https://images.unsplash.com/photo-1539581090159-168fa5ba0ebe?auto=format&fit=crop&q=80&w=400', genre: 'Ciencia Ficcion', minNivel: 7, maxNivel: 11 },
  { id: 107, type: 'libro', title: 'Los Juegos del Hambre: Sinsajo', author: 'Suzanne Collins', description: 'El asalto final al Capitolio. Katniss se convierte en el simbolo de la rebelion.', image: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=400', genre: 'Ciencia Ficcion', minNivel: 9, maxNivel: 12 },
  { id: 108, type: 'libro', title: 'Mi Planta de Naranja-Lima', author: 'Jose Mauro de Vasconcelos', description: 'Zeze, un nino travieso que descubre el dolor y se hace adulto prematuramente.', image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&q=80&w=400', genre: 'Clasico', minNivel: 5, maxNivel: 8 },
  { id: 109, type: 'libro', title: 'Frankenstein', author: 'Mary Shelley', description: 'El cientifico Victor Frankenstein crea una criatura a partir de cadaveres, desatando consecuencias tragicas.', image: 'https://images.unsplash.com/photo-1474932430478-3a7fb9065ba0?auto=format&fit=crop&q=80&w=400', genre: 'Terror', minNivel: 10, maxNivel: 12 },
  { id: 110, type: 'libro', title: 'Orgullo y Prejuicio', author: 'Jane Austen', description: 'La compleja relacion entre Elizabeth Bennet y el Sr. Darcy en las convenciones sociales del siglo XIX.', image: 'https://images.unsplash.com/photo-1481391319762-47dff72954d9?auto=format&fit=crop&q=80&w=400', genre: 'Romance', minNivel: 9, maxNivel: 12 },
  { id: 111, type: 'libro', title: 'El Retrato de Dorian Gray', author: 'Oscar Wilde', description: 'Un joven intercambia su alma con un cuadro y permanece eternamente joven mientras su retrato envejece.', image: 'https://images.unsplash.com/photo-1470549638415-0a0755be0619?auto=format&fit=crop&q=80&w=400', genre: 'Clasico', minNivel: 10, maxNivel: 12 },
  { id: 112, type: 'libro', title: 'Rebelion en la Granja', author: 'George Orwell', description: 'Los animales expulsan a los humanos para crear un sistema igualitario que poco a poco se corrompe.', image: 'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=400', genre: 'Fabula', minNivel: 8, maxNivel: 12 },
  { id: 113, type: 'libro', title: 'Dracula', author: 'Bram Stoker', description: 'El abogado Jonathan Harker viaja a Transilvania y descubre la verdadera naturaleza del Conde Dracula.', image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400', genre: 'Terror', minNivel: 9, maxNivel: 12 },
  { id: 114, type: 'libro', title: 'La Odisea', author: 'Homero', description: 'El epico viaje de Odiseo regresando a Itaca, enfrentando dioses, monstruos y la tentacion del olvido.', image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400', genre: 'Aventura', minNivel: 9, maxNivel: 12 },
  { id: 115, type: 'libro', title: 'La Iliada', author: 'Homero', description: 'La epica guerra de Troya desde la colera de Aquiles. El poema fundacional de la literatura occidental.', image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=400', genre: 'Aventura', minNivel: 9, maxNivel: 12 },
  { id: 116, type: 'libro', title: 'Sub Terra', author: 'Baldomero Lillo', description: 'Las inhumanas condiciones de los mineros del carbon en Lota. Imprescindible de la literatura chilena.', image: 'https://images.unsplash.com/photo-1464802686167-b939a6910659?auto=format&fit=crop&q=80&w=400', genre: 'Clasico', minNivel: 8, maxNivel: 12 },
  { id: 117, type: 'libro', title: 'Cuentos de Amor de Locura y de Muerte', author: 'Horacio Quiroga', description: 'Relatos donde la selva, la locura y lo macabro toman el protagonismo de forma cruda y poetica.', image: 'https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?auto=format&fit=crop&q=80&w=400', genre: 'Terror', minNivel: 9, maxNivel: 12 },
  { id: 120, type: 'libro', title: 'El Senor de los Anillos: La Comunidad del Anillo', author: 'J.R.R. Tolkien', description: 'Frodo hereda el Anillo Unico y debe destruirlo con la ayuda de sus companeros en la Tierra Media.', image: 'https://images.unsplash.com/photo-1535666669445-e8c15cd2e7d9?auto=format&fit=crop&q=80&w=400', genre: 'Fantasia', minNivel: 8, maxNivel: 12 },
  { id: 121, type: 'libro', title: 'El Senor de los Anillos: Las Dos Torres', author: 'J.R.R. Tolkien', description: 'La Comunidad se fragmenta. Frodo y Sam avanzan hacia Mordor guiados por Gollum mientras la guerra estalla.', image: 'https://images.unsplash.com/photo-1474932430478-3a7fb9065ba0?auto=format&fit=crop&q=80&w=400', genre: 'Fantasia', minNivel: 8, maxNivel: 12 },
  { id: 122, type: 'libro', title: 'El Senor de los Anillos: El Retorno del Rey', author: 'J.R.R. Tolkien', description: 'La batalla final por la Tierra Media. Frodo llega al Monte del Destino para destruir el Anillo.', image: 'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&q=80&w=400', genre: 'Fantasia', minNivel: 8, maxNivel: 12 },
  { id: 130, type: 'libro', title: 'Harry Potter y la Camara Secreta', author: 'J.K. Rowling', description: 'Harry regresa a Hogwarts y descubre que algo convierte a los estudiantes en piedra.', image: 'https://images.unsplash.com/photo-1618519764620-7403abdbdfe9?auto=format&fit=crop&q=80&w=400', genre: 'Fantasia', minNivel: 6, maxNivel: 10 },
  { id: 131, type: 'libro', title: 'Harry Potter y el Prisionero de Azkaban', author: 'J.K. Rowling', description: 'Un peligroso asesino escapo de Azkaban y busca a Harry. La saga oscurece.', image: 'https://images.unsplash.com/photo-1618519764620-7403abdbdfe9?auto=format&fit=crop&q=80&w=400', genre: 'Fantasia', minNivel: 7, maxNivel: 11 },
  { id: 132, type: 'libro', title: 'Harry Potter y el Caliz de Fuego', author: 'J.K. Rowling', description: 'Harry compite en el Torneo de los Tres Magos. El regreso de Voldemort comienza de verdad.', image: 'https://images.unsplash.com/photo-1618519764620-7403abdbdfe9?auto=format&fit=crop&q=80&w=400', genre: 'Fantasia', minNivel: 8, maxNivel: 12 },
  { id: 133, type: 'libro', title: 'Harry Potter y la Orden del Fenix', author: 'J.K. Rowling', description: 'Nadie cree a Harry. La Orden del Fenix actua en secreto mientras el Ministerio niega el regreso de Voldemort.', image: 'https://images.unsplash.com/photo-1618519764620-7403abdbdfe9?auto=format&fit=crop&q=80&w=400', genre: 'Fantasia', minNivel: 9, maxNivel: 12 },
  { id: 134, type: 'libro', title: 'Harry Potter y el Misterio del Principe', author: 'J.K. Rowling', description: 'Dumbledore guia a Harry en los secretos del pasado de Voldemort mientras la guerra se desata.', image: 'https://images.unsplash.com/photo-1618519764620-7403abdbdfe9?auto=format&fit=crop&q=80&w=400', genre: 'Fantasia', minNivel: 9, maxNivel: 12 },
  { id: 135, type: 'libro', title: 'Harry Potter y las Reliquias de la Muerte', author: 'J.K. Rowling', description: 'Harry, Ron y Hermione emprenden la mision final: destruir todos los Horrocruxes y enfrentar a Voldemort.', image: 'https://images.unsplash.com/photo-1618519764620-7403abdbdfe9?auto=format&fit=crop&q=80&w=400', genre: 'Fantasia', minNivel: 10, maxNivel: 12 },
  { id: 140, type: 'libro', title: 'Percy Jackson: El Mar de los Monstruos', author: 'Rick Riordan', description: 'Percy debe recuperar el Vellocino de Oro para salvar el Campamento Mestizo.', image: 'https://images.unsplash.com/photo-1555116505-38ab61800975?auto=format&fit=crop&q=80&w=400', genre: 'Aventura', minNivel: 6, maxNivel: 9 },
  { id: 141, type: 'libro', title: 'Percy Jackson: La Maldicion del Titan', author: 'Rick Riordan', description: 'Artemisa y Annabeth han desaparecido. Percy debe rescatarlas antes del solsticio de invierno.', image: 'https://images.unsplash.com/photo-1555116505-38ab61800975?auto=format&fit=crop&q=80&w=400', genre: 'Aventura', minNivel: 6, maxNivel: 9 },
  { id: 142, type: 'libro', title: 'Percy Jackson: La Batalla del Laberinto', author: 'Rick Riordan', description: 'El ejercito de Cronos usa el laberinto de Dedalo para infiltrarse en el Campamento Mestizo.', image: 'https://images.unsplash.com/photo-1555116505-38ab61800975?auto=format&fit=crop&q=80&w=400', genre: 'Aventura', minNivel: 7, maxNivel: 10 },
  { id: 143, type: 'libro', title: 'Percy Jackson: El Ultimo Heroe del Olimpo', author: 'Rick Riordan', description: 'La batalla final en el Olimpo. Percy debe elegir entre su poder o la salvacion de todos.', image: 'https://images.unsplash.com/photo-1555116505-38ab61800975?auto=format&fit=crop&q=80&w=400', genre: 'Aventura', minNivel: 7, maxNivel: 10 },
];

// ─── Teacher Profiles ────────────────────────────────────────────────────────
export const TEACHERS = [
  {
    id: 'prof-1',
    rut: '150685478',
    name: 'Gonzalo Andrés',
    shortName: 'Profe Gonzalo',
    dept: 'Inglés',
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
    dept: 'Lenguaje',
    bio: 'Apasionada por la historia universal y la narrativa histórica, incentivando a sus alumnos a entender el pasado mediante buenas lecturas.',
    emoji: '🌍',
    email: 'dpaola@colegioumbral.cl',
    recommendedIds: [8, 12, 16, 21, 14, 20, 22, 115, 112, 119],
    genre: 'Autobiografía',
    nivelMin: 5, nivelMax: 12,
  }
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
