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
    "description": "Una niña superdotada descubre que tiene con poderes telequinéticos y los usa para enfrentar a sus crueles padres.",
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
    "description": "Charlie Bucket gana un boleto dorado para visitar la fábrica más misteriosa del mundo.",
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
    "description": "Un pequeño príncipe viaja de planeta en planeta descubriendo que lo esencial es invisible a los ojos.",
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
    "description": "Dorothy y su perro Totó son arrastrados por un tornado a la tierra mágica de Oz.",
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
    "description": "Cuatro hermanos descubren un mundo mágico a través de un armario ropero.",
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
    "description": "Zezé, un niño travieso que descubre el dolor y se hace adulto prematuramente.",
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
    "description": "¡Mitad perro, mitad hombre, todo un héroe! Una novela gráfica divertidísima.",
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
    "description": "El diario misterioso lleno de criaturas y secretos del pueblo de Gravity Falls.",
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
    "description": "Un niño huérfano descubre que es un mago y comienza su educación en Hogwarts.",
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
    "description": "Un adolescente descubre que es hijo de Poseidón y debe recuperar el rayo de Zeus.",
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
    "description": "Una niña con el don de escuchar lucha contra los Hombres Grises que roban el tiempo.",
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
    "description": "Jim Hawkins encuentra un mapa del tesoro y zarpa en una aventura llena de peligros.",
    "image": "https://covers.openlibrary.org/b/id/13859660-L.jpg"
  },
  {
    "id": 140,
    "type": "libro",
    "title": "El Hobbit",
    "author": "J.R.R. Tolkien",
    "genre": "Fantasía",
    "minNivel": 7,
    "maxNivel": 12,
    "description": "Bilbo Bolsón es arrastrado a una aventura épica para recuperar un tesoro guardado por un dragón.",
    "image": "https://covers.openlibrary.org/b/id/8406766-L.jpg"
  },
  {
    "id": 151,
    "type": "libro",
    "title": "El Niño con el Pijama de Rayas",
    "author": "John Boyne",
    "genre": "Clásico",
    "minNivel": 6,
    "maxNivel": 9,
    "description": "La amistad entre el hijo de un comandante nazi y un niño prisionero judío.",
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
    "description": "La historia de August Pullman, un niño con una deformidad facial que asiste por primera vez a la escuela.",
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
    "description": "Una historia conmovedora sobre el acoso escolar y el poder de la empatía.",
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
    "description": "El testimonio de esperanza de una niña judía durante el Holocausto.",
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
    "description": "Un pastor viaja en busca de un tesoro y descubre el significado de su vida.",
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
    "description": "La tragedia de amor más famosa entre dos familias rivales.",
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
    "description": "Niños náufragos crean su propia sociedad, que degenera en violencia y caos.",
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
    "description": "El relato de un crimen que todo el pueblo sabía que iba a ocurrir.",
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
    "description": "Gregor Samsa despierta convertido en un insecto gigante.",
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
    "description": "En un futuro distópico, el Gran Hermano lo vigila todo.",
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
    "description": "La mítica historia de la familia Buendía en Macondo.",
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
    "description": "Jay Gatsby organiza fiestas escandalosas para reconquistar a Daisy.",
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
    "description": "Un hidalgo se convierte en caballero andante por las tierras de España.",
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
    "description": "Un pintor obsesivo relata el asesinato de la persona que comprendió su arte.",
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
    "description": "Una sociedad futurista perfecta donde la libertad ha sido eliminada.",
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
    "description": "Un bombero que quema libros comienza a cuestionar su realidad.",
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
    "description": "Un joven descubre un libro maldito en el Cementerio de los Libros Olvidados.",
    "image": "https://covers.openlibrary.org/b/id/10107644-L.jpg"
  },
  {
    "id": 106,
    "type": "libro",
    "title": "Cuentos de Amor de Locura y de Muerte",
    "author": "Horacio Quiroga",
    "genre": "Terror",
    "minNivel": 9,
    "maxNivel": 12,
    "description": "Relatos donde la selva, la locura humana y lo macabro toman el protagonismo de forma cruda.",
    "image": "https://covers.openlibrary.org/b/id/99816-L.jpg"
  },
  {
    "id": 109,
    "type": "libro",
    "title": "Frankenstein",
    "author": "Mary Shelley",
    "genre": "Terror",
    "minNivel": 10,
    "maxNivel": 12,
    "description": "El origen del terror moderno: la criatura creada por Víctor Frankenstein.",
    "image": "https://covers.openlibrary.org/b/id/12356249-L.jpg"
  },
  {
    "id": 110,
    "type": "libro",
    "title": "Orgullo y Prejuicio",
    "author": "Jane Austen",
    "genre": "Romance",
    "minNivel": 9,
    "maxNivel": 12,
    "description": "La compleja relación entre Elizabeth Bennet y el Sr. Darcy navegando por las convenciones sociales de su siglo.",
    "image": "https://covers.openlibrary.org/b/id/13574150-L.jpg"
  },
  {
    "id": 111,
    "type": "libro",
    "title": "El Retrato de Dorian Gray",
    "author": "Oscar Wilde",
    "genre": "Clásico",
    "minNivel": 10,
    "maxNivel": 12,
    "description": "Un joven intercambia su alma con un cuadro para permanecer joven.",
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
    "description": "Un sistema igualitario animal que poco a poco se corrompe.",
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
    "description": "El abogado Jonathan Harker descubre la naturaleza del Conde Drácula.",
    "image": "https://placehold.co/400x600/A10D12/D4AF37.png?text=Dr%C3%A1cula"
  },
  {
    "id": 114,
    "type": "libro",
    "title": "La Odisea",
    "author": "Homero",
    "genre": "Aventura",
    "minNivel": 9,
    "maxNivel": 12,
    "description": "El épico y accidentado viaje de Odiseo tratando de retornar a su patria tras la Guerra de Troya.",
    "image": "https://covers.openlibrary.org/b/id/5081963-L.jpg"
  },
  {
    "id": 116,
    "type": "libro",
    "title": "Sub Terra",
    "author": "Baldomero Lillo",
    "genre": "Clásico",
    "minNivel": 8,
    "maxNivel": 12,
    "description": "Las inhumanas condiciones de los mineros del carbón en Chile.",
    "image": "https://placehold.co/400x600/A10D12/D4AF37.png?text=Sub%2BTerra"
  },
  {
    "id": 118,
    "type": "libro",
    "title": "El Visitante",
    "author": "Stephen King",
    "genre": "Misterio",
    "minNivel": 11,
    "maxNivel": 12,
    "description": "Un horrendo asesinato involucra a un querido profesor local, pero huellas digitales y hechos desafían toda explicación.",
    "image": "https://covers.openlibrary.org/b/id/11412999-L.jpg"
  },
  {
    "id": 401,
    "type": "libro",
    "title": "La Selección",
    "author": "Kiera Cass",
    "genre": "Romantasy",
    "minNivel": 8,
    "maxNivel": 12,
    "description": "Treinta y cinco chicas compiten por la corona. America Singer debe elegir entre el amor y el deber.",
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
    "description": "Una cyborg en la Nueva Pekín futurista debe salvar el mundo de una plaga lunar.",
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
    "description": "Evangeline Fox viaja al Norte y hace un trato peligroso con el Príncipe de Corazones.",
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
    "description": "Katniss Everdeen debe luchar por su vida en un reality show televisado.",
    "image": "https://covers.openlibrary.org/b/id/12646537-L.jpg"
  },
  {
    "id": 120,
    "type": "libro",
    "title": "El Señor de los Anillos: La Comunidad del Anillo",
    "author": "J.R.R. Tolkien",
    "genre": "Fantasía",
    "minNivel": 8,
    "maxNivel": 12,
    "description": "Frodo Bolsón emprende la misión de destruir el Anillo Único con la ayuda de la Comunidad.",
    "image": "https://covers.openlibrary.org/b/id/14625765-L.jpg"
  },
  {
    "id": 121,
    "type": "libro",
    "title": "El Señor de los Anillos: Las Dos Torres",
    "author": "J.R.R. Tolkien",
    "genre": "Fantasía",
    "minNivel": 8,
    "maxNivel": 12,
    "description": "La Comunidad se divide mientras Frodo y Sam continúan hacia Mordor y los otros luchan contra Saruman.",
    "image": "https://covers.openlibrary.org/b/id/14627564-L.jpg"
  },
  {
    "id": 122,
    "type": "libro",
    "title": "El Señor de los Anillos: El Retorno del Rey",
    "author": "J.R.R. Tolkien",
    "genre": "Fantasía",
    "minNivel": 8,
    "maxNivel": 12,
    "description": "La batalla final por la Tierra Media comienza mientras Frodo se acerca al Monte del Destino.",
    "image": "https://covers.openlibrary.org/b/id/14627062-L.jpg"
  },
  {
    "id": 601,
    "type": "libro",
    "title": "Papelucho",
    "author": "Marcela Paz",
    "genre": "Aventura",
    "minNivel": 5,
    "maxNivel": 7,
    "description": "Las divertidas e ingeniosas memorias de un niño chileno que ve el mundo de una forma única.",
    "image": "https://covers.openlibrary.org/b/id/12679281-L.jpg"
  },
  {
    "id": 602,
    "type": "libro",
    "title": "Quique Hache, Detective",
    "author": "Sergio Gómez",
    "genre": "Misterio",
    "minNivel": 6,
    "maxNivel": 9,
    "description": "Quique Hache comienza sus vacaciones con un caso intrigante en el Santiago de hoy.",
    "image": "https://placehold.co/400x600/A10D12/D4AF37.png?text=Quique%2BHache%2C%2BDetective"
  },
  {
    "id": 603,
    "type": "libro",
    "title": "El Diario de Greg",
    "author": "Jeff Kinney",
    "genre": "Realismo",
    "minNivel": 5,
    "maxNivel": 8,
    "description": "Un diario ilustrado sobre la vida de un preadolescente tratando de sobrevivir al instituto.",
    "image": "https://covers.openlibrary.org/b/id/8542270-L.jpg"
  },
  {
    "id": 604,
    "type": "libro",
    "title": "Frin",
    "author": "Luis Pescetti",
    "genre": "Realismo",
    "minNivel": 5,
    "maxNivel": 7,
    "description": "Frin descubre la amistad, el primer amor y los viajes en una historia llena de ternura y humor.",
    "image": "https://covers.openlibrary.org/b/id/12515613-L.jpg"
  },
  {
    "id": 605,
    "type": "libro",
    "title": "Cuentos de la Selva",
    "author": "Horacio Quiroga",
    "genre": "Fantasía",
    "minNivel": 5,
    "maxNivel": 8,
    "description": "Relatos maravillosos donde animales y hombres conviven en la selva misionera.",
    "image": "https://covers.openlibrary.org/b/id/4902905-L.jpg"
  },
  {
    "id": 606,
    "type": "libro",
    "title": "Asesinato en el Canadian Express",
    "author": "Eric Wilson",
    "genre": "Misterio",
    "minNivel": 7,
    "maxNivel": 10,
    "description": "Tom Austen se ve envuelto en un misterio a bordo de un tren transcontinental.",
    "image": "https://covers.openlibrary.org/b/id/5264925-L.jpg"
  },
  {
    "id": 607,
    "type": "libro",
    "title": "Ami, el niño de las estrellas",
    "author": "Enrique Barrios",
    "genre": "Fábula",
    "minNivel": 6,
    "maxNivel": 9,
    "description": "Una historia de sabiduría universal y fraternidad entre mundos lejanos.",
    "image": "https://covers.openlibrary.org/b/id/12337759-L.jpg"
  },
  {
    "id": 608,
    "type": "libro",
    "title": "Cuentos de Eva Luna",
    "author": "Isabel Allende",
    "genre": "Realismo Mágico",
    "minNivel": 10,
    "maxNivel": 12,
    "description": "Relatos llenos de pasión y magia que exploran la condición humana.",
    "image": "https://covers.openlibrary.org/b/id/3205240-L.jpg"
  },
  {
    "id": 609,
    "type": "libro",
    "title": "Divergente",
    "author": "Veronica Roth",
    "genre": "Ciencia Ficción",
    "minNivel": 8,
    "maxNivel": 11,
    "description": "En una sociedad dividida en facciones, Beatrice debe elegir quién quiere ser.",
    "image": "https://covers.openlibrary.org/b/id/13274634-L.jpg"
  },
  {
    "id": 610,
    "type": "libro",
    "title": "La Reina Roja",
    "author": "Victoria Aveyard",
    "genre": "Romantasy",
    "minNivel": 9,
    "maxNivel": 12,
    "description": "En un mundo dividido por el color de la sangre, una joven con poderes cambiará el destino.",
    "image": "https://covers.openlibrary.org/b/id/12342305-L.jpg"
  },
  {
    "id": 611,
    "type": "libro",
    "title": "La Tregua",
    "author": "Mario Benedetti",
    "genre": "Clásico",
    "minNivel": 10,
    "maxNivel": 12,
    "description": "La historia de amor y rutina de Martín Santomé a través de su diario personal.",
    "image": "https://covers.openlibrary.org/b/id/4909999-L.jpg"
  },
  {
    "id": 612,
    "type": "libro",
    "title": "El Psicoanalista",
    "author": "John Katzenbach",
    "genre": "Misterio",
    "minNivel": 10,
    "maxNivel": 12,
    "description": "Un thriller psicológico donde un doctor es amenazado de muerte por un desconocido.",
    "image": "https://covers.openlibrary.org/b/id/12325169-L.jpg"
  },
  {
    "id": 613,
    "type": "libro",
    "title": "Bajo la misma estrella",
    "author": "John Green",
    "genre": "Romance",
    "minNivel": 9,
    "maxNivel": 12,
    "description": "Hazel y Gus comparten un viaje inolvidable lleno de humor, valentía y amor.",
    "image": "https://covers.openlibrary.org/b/id/14853661-L.jpg"
  },
  {
    "id": 614,
    "type": "libro",
    "title": "La Casa de los Espíritus",
    "author": "Isabel Allende",
    "genre": "Realismo Mágico",
    "minNivel": 11,
    "maxNivel": 12,
    "description": "La épica historia de la familia Trueba a través de tres generaciones.",
    "image": "https://covers.openlibrary.org/b/id/3205226-L.jpg"
  },
  {
    "id": 615,
    "type": "libro",
    "title": "Sub Sole",
    "author": "Baldomero Lillo",
    "genre": "Clásico",
    "minNivel": 9,
    "maxNivel": 12,
    "description": "Relatos realistas que exploran la vida social y minera del Chile del siglo XX.",
    "image": "https://placehold.co/400x600/A10D12/D4AF37.png?text=Sub%2BSole"
  },
  {
    "id": 701,
    "type": "libro",
    "title": "La Ilíada",
    "author": "Homero",
    "genre": "Clásico",
    "minNivel": 9,
    "maxNivel": 12,
    "description": "El relato de la furia de Aquiles y los eventos del décimo año de la Guerra de Troya.",
    "image": "https://covers.openlibrary.org/b/id/12889078-L.jpg"
  },
  {
    "id": 702,
    "type": "libro",
    "title": "Edipo Rey",
    "author": "Sófocles",
    "genre": "Clásico",
    "minNivel": 10,
    "maxNivel": 12,
    "description": "La tragedia griega definitiva sobre el destino inevitable y la búsqueda de la verdad.",
    "image": "https://covers.openlibrary.org/b/id/11149457-L.jpg"
  },
  {
    "id": 703,
    "type": "libro",
    "title": "Antígona",
    "author": "Sófocles",
    "genre": "Clásico",
    "minNivel": 10,
    "maxNivel": 12,
    "description": "El dilema moral entre las leyes divinas y las leyes de los hombres en una Tebas dividida.",
    "image": "https://covers.openlibrary.org/b/id/12711762-L.jpg"
  },
  {
    "id": 704,
    "type": "libro",
    "title": "Cantar de Mio Cid",
    "author": "Anónimo",
    "genre": "Clásico",
    "minNivel": 9,
    "maxNivel": 12,
    "description": "La mayor gesta de la épica castellana que narra el honor y las hazañas de Rodrigo Díaz de Vivar.",
    "image": "https://covers.openlibrary.org/b/id/9643444-L.jpg"
  },
  {
    "id": 705,
    "type": "libro",
    "title": "La Celestina",
    "author": "Fernando de Rojas",
    "genre": "Clásico",
    "minNivel": 10,
    "maxNivel": 12,
    "description": "La tragicomedia de Calisto y Melibea, mediada por la astuta y codiciosa alcahueta Celestina.",
    "image": "https://covers.openlibrary.org/b/id/12866956-L.jpg"
  },
  {
    "id": 706,
    "type": "libro",
    "title": "El Príncipe",
    "author": "Nicolás Maquiavelo",
    "genre": "Clásico",
    "minNivel": 11,
    "maxNivel": 12,
    "description": "El tratado político fundamental sobre el poder, la estrategia y la naturaleza humana.",
    "image": "https://covers.openlibrary.org/b/id/13251212-L.jpg"
  },
  {
    "id": 707,
    "type": "libro",
    "title": "Hamlet",
    "author": "William Shakespeare",
    "genre": "Clásico",
    "minNivel": 10,
    "maxNivel": 12,
    "description": "La tragedia del príncipe de Dinamarca sobre la duda, la venganza y la corrupción del alma.",
    "image": "https://covers.openlibrary.org/b/id/12443026-L.jpg"
  },
  {
    "id": 708,
    "type": "libro",
    "title": "Macbeth",
    "author": "William Shakespeare",
    "genre": "Clásico",
    "minNivel": 10,
    "maxNivel": 12,
    "description": "La ambición desmedida arrastra a un valiente guerrero hacia la traición y la locura.",
    "image": "https://covers.openlibrary.org/b/id/11202862-L.jpg"
  },
  {
    "id": 709,
    "type": "libro",
    "title": "Lazarillo de Tormes",
    "author": "Anónimo",
    "genre": "Clásico",
    "minNivel": 8,
    "maxNivel": 11,
    "description": "El inicio de la novela picaresca española: las desventuras de un niño que sirve a varios amos.",
    "image": "https://covers.openlibrary.org/b/id/9091873-L.jpg"
  },
  {
    "id": 710,
    "type": "libro",
    "title": "La Amortajada",
    "author": "María Luisa Bombal",
    "genre": "Clásico",
    "minNivel": 11,
    "maxNivel": 12,
    "description": "Una mujer muerta repasa su vida y sus amores mientras es velada por sus seres cercanos.",
    "image": "https://placehold.co/400x600/A10D12/D4AF37.png?text=La%2BAmortajada"
  },
  {
    "id": 711,
    "type": "libro",
    "title": "Altazor",
    "author": "Vicente Huidobro",
    "genre": "Clásico",
    "minNivel": 10,
    "maxNivel": 12,
    "description": "Un viaje en paracaídas literario que rompe el lenguaje para crear una nueva realidad poética.",
    "image": "https://placehold.co/400x600/A10D12/D4AF37.png?text=Altazor"
  },
  {
    "id": 712,
    "type": "libro",
    "title": "Poemas y Antipoemas",
    "author": "Nicanor Parra",
    "genre": "Clásico",
    "minNivel": 9,
    "maxNivel": 12,
    "description": "La obra que revolucionó la poesía hispana con humor cotidiano y crítica social.",
    "image": "https://placehold.co/400x600/A10D12/D4AF37.png?text=Poemas%2By%2BAntipoemas"
  },
  {
    "id": 713,
    "type": "libro",
    "title": "Martín Rivas",
    "author": "Alberto Blest Gana",
    "genre": "Clásico",
    "minNivel": 10,
    "maxNivel": 12,
    "description": "La gran novela social chilena sobre el amor y las barreras de clase en el Santiago del siglo XIX.",
    "image": "https://covers.openlibrary.org/b/id/10534246-L.jpg"
  },
  {
    "id": 714,
    "type": "libro",
    "title": "Gracia y el Forastero",
    "author": "Guillermo Blanco",
    "genre": "Romance",
    "minNivel": 9,
    "maxNivel": 11,
    "description": "Una historia de amor juvenil marcada por la tragedia y las diferencias sociales en Chile.",
    "image": "https://placehold.co/400x600/A10D12/D4AF37.png?text=Gracia%2By%2BEl%2BForastero"
  },
  {
    "id": 715,
    "type": "libro",
    "title": "La Ciudad y los Perros",
    "author": "Mario Vargas Llosa",
    "genre": "Clásico",
    "minNivel": 10,
    "maxNivel": 12,
    "description": "La violencia y la camaradería en un colegio militar de Lima vista por un grupo de cadetes.",
    "image": "https://covers.openlibrary.org/b/id/12836262-L.jpg"
  },
  {
    "id": 716,
    "type": "libro",
    "title": "Bodas de Sangre",
    "author": "Federico García Lorca",
    "genre": "Clásico",
    "minNivel": 10,
    "maxNivel": 12,
    "description": "La pasión desatada y la tragedia rural en una de las cumbres del teatro español.",
    "image": "https://covers.openlibrary.org/b/id/11139403-L.jpg"
  },
  {
    "id": 717,
    "type": "libro",
    "title": "La Casa de Bernarda Alba",
    "author": "Federico García Lorca",
    "genre": "Clásico",
    "minNivel": 10,
    "maxNivel": 12,
    "description": "El drama de una madre autoritaria que impone un luto riguroso a sus cinco hijas.",
    "image": "https://covers.openlibrary.org/b/id/12889218-L.jpg"
  },
  {
    "id": 718,
    "type": "libro",
    "title": "El Juego de Ender",
    "author": "Orson Scott Card",
    "genre": "Ciencia Ficción",
    "minNivel": 8,
    "maxNivel": 12,
    "description": "Un niño prodigio es entrenado en una academia militar espacial para salvar la Tierra.",
    "image": "https://covers.openlibrary.org/b/id/10292857-L.jpg"
  },
  {
    "id": 719,
    "type": "libro",
    "title": "Crónicas Marcianas",
    "author": "Ray Bradbury",
    "genre": "Ciencia Ficción",
    "minNivel": 8,
    "maxNivel": 12,
    "description": "Relatos poéticos sobre la colonización de Marte y el destino de la humanidad.",
    "image": "https://covers.openlibrary.org/b/id/12716301-L.jpg"
  },
  {
    "id": 720,
    "type": "libro",
    "title": "El Nombre de la Rosa",
    "author": "Umberto Eco",
    "genre": "Misterio",
    "minNivel": 11,
    "maxNivel": 12,
    "description": "Un fraile franciscano investiga una serie de crímenes misteriosos en una abadía medieval.",
    "image": "https://covers.openlibrary.org/b/id/13838279-L.jpg"
  },
  {
    "id": 721,
    "type": "libro",
    "title": "El Perfume",
    "author": "Patrick Süskind",
    "genre": "Terror",
    "minNivel": 11,
    "maxNivel": 12,
    "description": "La obsesión de Jean-Baptiste Grenouille por crear el aroma definitivo a través del crimen.",
    "image": "https://covers.openlibrary.org/b/id/13175865-L.jpg"
  },
  {
    "id": 722,
    "type": "libro",
    "title": "Ensayo sobre la Ceguera",
    "author": "José Saramago",
    "genre": "Clásico",
    "minNivel": 11,
    "maxNivel": 12,
    "description": "Una epidemia de 'ceguera blanca' pone a prueba los límites de la civilización.",
    "image": "https://covers.openlibrary.org/b/id/8617887-L.jpg"
  },
  {
    "id": 723,
    "type": "libro",
    "title": "Siddhartha",
    "author": "Hermann Hesse",
    "genre": "Clásico",
    "minNivel": 10,
    "maxNivel": 12,
    "description": "La búsqueda espiritual de un joven indio hacia la iluminación y la paz interior.",
    "image": "https://covers.openlibrary.org/b/id/12836371-L.jpg"
  },
  {
    "id": 724,
    "type": "libro",
    "title": "El Extranjero",
    "author": "Albert Camus",
    "genre": "Clásico",
    "minNivel": 11,
    "maxNivel": 12,
    "description": "La indiferencia y el absurdo existencial de un hombre ante la vida y la muerte.",
    "image": "https://covers.openlibrary.org/b/id/13241517-L.jpg"
  },
  {
    "id": 725,
    "type": "libro",
    "title": "Moby Dick",
    "author": "Herman Melville",
    "genre": "Aventura",
    "minNivel": 9,
    "maxNivel": 12,
    "description": "La obsesiva persecución del capitán Ahab contra la gran ballena blanca.",
    "image": "https://covers.openlibrary.org/b/id/12834164-L.jpg"
  },
  {
    "id": 726,
    "type": "libro",
    "title": "Los Miserables",
    "author": "Victor Hugo",
    "genre": "Clásico",
    "minNivel": 11,
    "maxNivel": 12,
    "description": "La lucha de Jean Valjean por la redención en una Francia convulsionada.",
    "image": "https://covers.openlibrary.org/b/id/12628464-L.jpg"
  },
  {
    "id": 727,
    "type": "libro",
    "title": "El Jardín Secreto",
    "author": "Frances Hodgson Burnett",
    "genre": "Fantasía",
    "minNivel": 5,
    "maxNivel": 8,
    "description": "Mary Lennox descubre un jardín abandonado que cambiará su vida y la de sus primos.",
    "image": "https://covers.openlibrary.org/b/id/10708269-L.jpg"
  },
  {
    "id": 728,
    "type": "libro",
    "title": "Alicia en el País de las Maravillas",
    "author": "Lewis Carroll",
    "genre": "Fantasía",
    "minNivel": 5,
    "maxNivel": 9,
    "description": "Alicia cae por una madriguera hacia un mundo lleno de lógica absurda y maravillas.",
    "image": "https://covers.openlibrary.org/b/id/12918805-L.jpg"
  },
  {
    "id": 729,
    "type": "libro",
    "title": "La Historia Interminable",
    "author": "Michael Ende",
    "genre": "Fantasía",
    "minNivel": 6,
    "maxNivel": 10,
    "description": "Bastian se convierte en parte de la historia de Fantasía mientras la Nada avanza.",
    "image": "https://covers.openlibrary.org/b/id/8230232-L.jpg"
  },
  {
    "id": 730,
    "type": "libro",
    "title": "Casa de Muñecas",
    "author": "Henrik Ibsen",
    "genre": "Clásico",
    "minNivel": 10,
    "maxNivel": 12,
    "description": "Nora Helmer lucha por su independencia y dignidad en una sociedad restrictiva.",
    "image": "https://covers.openlibrary.org/b/id/8381591-L.jpg"
  }
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
