import React, { useState, useMemo, useEffect } from 'react';
import { STUDENTS, ITEMS, GENRES } from '../data/mockData';
import { Search, Trash2, RotateCcw, Users, BookOpen, ChevronLeft, ShieldCheck, Plus, X, Download, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '../lib/firebase';
import { doc, setDoc, collection, getDocs } from 'firebase/firestore';

function AdminView({ onBack }) {
  const [search, setSearch] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showAddBook, setShowAddBook] = useState(false);
  const [newBook, setNewBook] = useState({ title: '', author: '', description: '', genre: '', minNivel: 5, maxNivel: 12, image: '' });
  const [googleSearch, setGoogleSearch] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [activeProfiles, setActiveProfiles] = useState(0);
  const [topLikes, setTopLikes] = useState([]);
  
  // Fetch real metrics from Firestore
  useEffect(() => {
    const fetchMetrics = async () => {
      const snap = await getDocs(collection(db, 'users'));
      let active = 0;
      const likesMap = {};
      
      snap.forEach(docSnap => {
        const data = docSnap.data();
        if (data.profile?.genres?.length > 0) active++;
        if (data.likes) {
          data.likes.forEach(item => {
            likesMap[item.title] = (likesMap[item.title] || 0) + 1;
          });
        }
      });
      
      setActiveProfiles(active);
      const topArr = Object.entries(likesMap)
        .sort((a,b) => b[1] - a[1])
        .slice(0, 5);
      setTopLikes(topArr);
    };
    fetchMetrics();
  }, []);
  
  const handleGoogleSearch = async () => {
    if (!googleSearch.trim()) return;
    setIsSearching(true);
    try {
      const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(googleSearch)}`);
      const data = await res.json();
      if (data.items && data.items.length > 0) {
        const book = data.items[0].volumeInfo;
        setNewBook({
          title: book.title || '',
          author: book.authors ? book.authors.join(', ') : '',
          description: book.description ? book.description.substring(0, 300) + '...' : '',
          genre: GENRES[0], // Default
          minNivel: 5,
          maxNivel: 12,
          image: book.imageLinks?.thumbnail || 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=400'
        });
      } else {
        alert("No se encontraron libros con ese título.");
      }
    } catch (e) {
      console.error(e);
      alert("Error buscando en Google Books.");
    } finally {
      setIsSearching(false);
    }
  };
  
  // Unique courses sorted (Basic mapping sort logic)
  const courses = useMemo(() => {
    const raw = Array.from(new Set(STUDENTS.map(s => s.curso)));
    // Simple custom sort based on standard Chilean schooling (5 Básico -> 4 Medio)
    const orderScore = (c) => {
      let score = parseInt(c.charAt(0)) || 0;
      if (c.includes('Básico')) score += 0;
      else if (c.includes('Medio')) score += 10;
      return score;
    };
    return raw.sort((a, b) => orderScore(a) - orderScore(b));
  }, []);

  const filteredStudents = useMemo(() => {
    let source = STUDENTS;
    if (selectedCourse) {
      source = STUDENTS.filter(s => s.curso === selectedCourse);
    }
    
    if (search.trim()) {
      return STUDENTS.filter(s => 
        (s.nombre.toLowerCase().includes(search.toLowerCase()) || s.rut.includes(search))
      ).slice(0, 50);
    }
    
    return source.slice(0, 70); // Performance cap
  }, [search, selectedCourse]);

  const handleResetProfile = (rut) => {
    if (window.confirm(`¿Estás seguro de resetear el perfil de RUT ${rut}? Se borrarán sus gustos y libros favoritos.`)) {
      alert(`Perfil ${rut} reseteado con éxito.`);
    }
  };

  const handleSaveBook = async (e) => {
    e.preventDefault();
    const newId = 'custom-' + Date.now();
    const bookToSave = {
      id: newId,
      type: 'libro',
      title: newBook.title,
      author: newBook.author,
      description: newBook.description,
      genre: newBook.genre || GENRES[0],
      minNivel: Number(newBook.minNivel),
      maxNivel: Number(newBook.maxNivel),
      studentsMatched: 0,
      image: newBook.image || 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=400',
      professors: [{ name: 'Profe Gonzalo', dept: 'Inglés' }]
    };

    // Save to Cloud Firestore
    try {
      await setDoc(doc(db, 'catalog', newId), bookToSave);
      // Live update memory for current session
      ITEMS.push(bookToSave);
      
      setShowAddBook(false);
      setNewBook({ title: '', author: '', description: '', genre: '', minNivel: 5, maxNivel: 12, image: '' });
      setGoogleSearch('');
      alert('¡Libro subido a la base de datos de BookMatch exitosamente!');
    } catch(err) {
      alert('Error en la conexión a la nube.');
    }
  };

  const exportToExcel = async () => {
    try {
      const snap = await getDocs(collection(db, 'users'));
      let csvContent = "RUT Alumno\tNombre\tCurso\tID Libro\tTitulo Libro\tAutor\n";
      let totalMatches = 0;

      snap.forEach(docSnap => {
        const u = docSnap.data();
        if (u.role === 'student' && u.likes && u.likes.length > 0) {
          // Find student name from global STUDENTS array based on rut
          const cleanRut = docSnap.id;
          const studentInfo = STUDENTS.find(s => s.rut.replace(/[^0-9kK]/gi, '').toLowerCase() === cleanRut);
          const studentName = studentInfo ? studentInfo.nombre : 'Desconocido';
          const studentCourse = studentInfo ? studentInfo.curso : 'Desconocido';

          u.likes.forEach(book => {
            csvContent += `${cleanRut}\t${studentName}\t${studentCourse}\t${book.id}\t${book.title}\t${book.author}\n`;
            totalMatches++;
          });
        }
      });

      if (totalMatches === 0) {
        alert("Aún no hay matches registrados por los alumnos en la base de datos.");
        return;
      }

      // Add UTF-8 BOM for Excel to read accents correctly
      const blob = new Blob(["\uFEFF" + csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `BookMatch_Curauma_Matches.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    } catch (e) {
      alert("Error exportando datos: " + e.message);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden">
      {/* Header */}
      <header className="px-6 py-5 shrink-0 shadow-lg relative overflow-hidden" 
        style={{ background: `linear-gradient(135deg, #A80A0A 0%, #3a0000 100%)` }}>
        
        {/* Decorative elements */}
        <div className="absolute top-[-20px] right-[-20px] w-24 h-24 bg-white/5 rounded-full blur-2xl" />
        
        <div className="flex items-center gap-4 mb-4 relative z-10">
          <button onClick={onBack} className="p-2.5 bg-white/10 hover:bg-white/20 rounded-2xl transition-all active:scale-90">
            <ChevronLeft size={20} className="text-white" />
          </button>
          <div>
            <h1 className="text-xl font-black tracking-tighter text-white">Panel de Control</h1>
            <p className="text-[10px] font-black text-blue-200/50 uppercase tracking-[0.2em]">Gestión Institucional</p>
          </div>
          <div className="ml-auto bg-[#FFD700] p-2 rounded-xl shadow-lg shadow-yellow-900/20">
            <ShieldCheck className="text-[#A80A0A]" size={20} />
          </div>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-2 gap-3 mt-4 relative z-10">
          <div className="bg-white/10 backdrop-blur-md rounded-[20px] p-4 border border-white/10 shadow-inner">
            <p className="text-2xl font-black text-white leading-none">{STUDENTS.length}</p>
            <p className="text-[9px] font-black text-white/40 uppercase tracking-widest mt-1.5">Total Alumnos</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-[20px] p-4 border border-white/10 shadow-inner">
            <p className="text-2xl font-black text-white leading-none">{activeProfiles}</p>
            <p className="text-[9px] font-black text-white/40 uppercase tracking-widest mt-1.5">Perfiles Activos</p>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 flex flex-col p-6 overflow-hidden bg-[#F7F7F9]">
        <div className="flex gap-2 mb-6 shrink-0">
          <div className="relative flex-1 group">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#A80A0A] transition-colors" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar por nombre o RUT..."
              className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-100 focus:border-[#A80A0A] rounded-[22px] outline-none text-sm font-bold shadow-sm transition-all text-gray-800"
            />
          </div>
          <button 
            onClick={exportToExcel}
            className="w-14 h-14 bg-emerald-600 text-white flex flex-col justify-center items-center rounded-[22px] shadow-lg flex-shrink-0 hover:bg-emerald-700 transition-all"
            title="Exportar a Excel">
            <Download size={22} className="mb-0.5" />
            <span className="text-[8px] font-black uppercase tracking-widest leading-none">Datos</span>
          </button>
          <button 
            onClick={() => setShowAddBook(true)}
            className="w-14 h-14 bg-[#A80A0A] text-white flex justify-center items-center rounded-[22px] shadow-lg flex-shrink-0 hover:bg-[#8B0707] transition-all"
            title="Añadir Libro">
            <Plus size={24} />
          </button>
        </div>

        {/* Conditional Breadcrumb inside Content */}
        {selectedCourse && !search.trim() && (
          <div className="flex items-center gap-2 mb-4 shrink-0">
             <button onClick={() => setSelectedCourse(null)} className="px-3 py-1.5 bg-gray-200 text-gray-700 font-bold text-xs rounded-full hover:bg-gray-300">
               ← Volver a Cursos
             </button>
             <h3 className="font-black text-gray-900 tracking-tighter text-lg">{selectedCourse}</h3>
          </div>
        )}

        <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3 pb-10 pr-2">
          
          {/* View: Course Grid */}
          {!selectedCourse && !search.trim() && (
            <>
              {topLikes.length > 0 && (
                <div className="mb-6 bg-[#A80A0A] p-5 rounded-[22px] text-white shadow-xl relative overflow-hidden">
                   <div className="relative z-10">
                     <h3 className="font-black text-sm uppercase tracking-tighter mb-4 flex items-center gap-2">
                       <Star size={16} fill="#FFD700" color="#FFD700" /> Top Tendencias del Colegio
                     </h3>
                     <div className="space-y-2.5">
                       {topLikes.map(([title, count], i) => (
                         <div key={i} className="flex items-center gap-3">
                            <span className="text-[10px] font-black bg-white/20 px-2 py-0.5 rounded-full">{count} likes</span>
                            <p className="text-xs font-bold truncate flex-1 opacity-90">{title}</p>
                            <div className="h-1.5 bg-white/10 flex-1 rounded-full overflow-hidden">
                              <div className="h-full bg-emerald-400" style={{ width: `${Math.min(100, (count/topLikes[0][1])*100)}%` }} />
                            </div>
                         </div>
                       ))}
                     </div>
                   </div>
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-3">
                {courses.map(curso => {
                  const count = STUDENTS.filter(s => s.curso === curso).length;
                  return (
                    <button key={curso} onClick={() => setSelectedCourse(curso)}
                      className="bg-white border border-gray-100 rounded-[22px] p-5 shadow-sm hover:shadow-md hover:border-[#A80A0A]/30 transition-all text-left flex flex-col items-start active:scale-95 group">
                      <div className="w-10 h-10 bg-blue-50/50 rounded-2xl flex items-center justify-center text-[#A80A0A] mb-3 group-hover:bg-[#A80A0A] group-hover:text-white transition-all">
                        <Users size={20} />
                      </div>
                      <p className="font-black text-gray-900 text-sm">{curso}</p>
                      <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-widest">{count} estudiantes</p>
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {/* View: Student List (Search or Selected Course) */}
          {(selectedCourse || search.trim()) && filteredStudents.map(s => (
            <motion.div 
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              key={s.rut} 
              className="bg-white border border-gray-100 rounded-[22px] p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex-1 min-w-0">
                <p className="font-black text-gray-900 text-sm truncate leading-tight">
                  {s.nombre.split(' ').slice(-2).join(' ')}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[9px] font-black text-gray-400 bg-gray-50 border border-gray-100 px-2 py-1 rounded-full leading-none tracking-widest uppercase">
                    {s.rut}
                  </span>
                  <span className="text-[9px] font-black text-[#A80A0A] bg-blue-50/50 border border-blue-100 px-2 py-1 rounded-full leading-none uppercase tracking-widest">
                    {s.curso}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-2 shrink-0 ml-4">
                <button 
                  onClick={() => handleResetProfile(s.rut)}
                  className="w-10 h-10 flex items-center justify-center text-orange-500 bg-orange-50 hover:bg-orange-100 rounded-2xl transition-all border border-orange-100 active:scale-90"
                  title="Resetear Perfil"
                >
                  <RotateCcw size={16} strokeWidth={2.5} />
                </button>
                <button 
                  onClick={() => alert('Función de borrado total solo disponible en versión producción.')}
                  className="w-10 h-10 flex items-center justify-center text-[#A80A0A] bg-red-50 hover:bg-red-100 rounded-2xl transition-all border border-red-100 active:scale-90"
                  title="Eliminar Registro"
                >
                  <Trash2 size={16} strokeWidth={2.5} />
                </button>
              </div>
            </motion.div>
          ))}
          
          {(selectedCourse || search.trim()) && filteredStudents.length === 0 && (
            <div className="py-20 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users size={24} className="text-gray-300" />
              </div>
              <p className="text-sm font-black text-gray-400 tracking-tighter">No se encontraron resultados</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Bottom hint */}
      <div className="px-6 py-4 bg-white border-t border-gray-100 shrink-0">
        <div className="flex items-start gap-2">
          <ShieldCheck size={12} className="text-[#A80A0A] mt-0.5" />
          <p className="text-[9px] text-gray-400 font-bold leading-relaxed uppercase tracking-widest">
            Acceso administrativo restringido • Datos locales simulados
          </p>
        </div>
      </div>

      {/* Add Book Modal */}
      <AnimatePresence>
        {showAddBook && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex flex-col justify-end bg-black/60 p-4">
            <motion.div initial={{ y: 300, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 300, opacity: 0 }} className="bg-white p-6 rounded-3xl shadow-2xl relative">
              <button onClick={() => setShowAddBook(false)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 bg-gray-100 p-2 rounded-full">
                <X size={18} />
              </button>
              <h2 className="text-lg font-black tracking-tighter text-gray-900 flex items-center gap-2 mb-4">
                <BookOpen size={20} className="text-[#A80A0A]" /> Añadir Libro al Catálogo
              </h2>
              
              <div className="mb-4 space-y-2">
                <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Autollenado Inteligente</p>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Escribe título para prellenar..." 
                    value={googleSearch}
                    onChange={e => setGoogleSearch(e.target.value)}
                    className="flex-1 p-3 bg-blue-50 border border-blue-100 rounded-xl font-bold text-sm outline-none focus:border-blue-400"
                  />
                  <button 
                    type="button"
                    onClick={handleGoogleSearch}
                    disabled={isSearching}
                    className="bg-blue-600 text-white px-4 rounded-xl font-black text-[10px] uppercase tracking-widest active:scale-95 transition-all disabled:opacity-50"
                  >
                    {isSearching ? '...' : 'Buscar'}
                  </button>
                </div>
              </div>

              <form onSubmit={handleSaveBook} className="space-y-3">
                <input required type="text" placeholder="Título del libro" value={newBook.title} onChange={e => setNewBook({...newBook, title: e.target.value})} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl font-bold text-sm outline-none focus:border-[#A80A0A]" />
                <input required type="text" placeholder="Autor" value={newBook.author} onChange={e => setNewBook({...newBook, author: e.target.value})} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl font-bold text-sm outline-none focus:border-[#A80A0A]" />
                <textarea required placeholder="Resumen o sinopsis breve" value={newBook.description} onChange={e => setNewBook({...newBook, description: e.target.value})} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium outline-none focus:border-[#A80A0A]" rows={3} />
                
                <select required value={newBook.genre} onChange={e => setNewBook({...newBook, genre: e.target.value})} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl font-bold text-sm outline-none focus:border-[#A80A0A]">
                  <option value="" disabled>Seleccionar Género</option>
                  {GENRES.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
                
                <div className="flex gap-3">
                  <div className="flex-1">
                    <span className="text-[10px] uppercase font-bold text-gray-400 ml-2">Nivel Mínimo</span>
                    <input type="number" min={5} max={12} value={newBook.minNivel} onChange={e => setNewBook({...newBook, minNivel: e.target.value})} className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-xl font-bold text-sm outline-none focus:border-[#A80A0A]" />
                  </div>
                  <div className="flex-1">
                    <span className="text-[10px] uppercase font-bold text-gray-400 ml-2">Nivel Máximo</span>
                    <input type="number" min={5} max={12} value={newBook.maxNivel} onChange={e => setNewBook({...newBook, maxNivel: e.target.value})} className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-xl font-bold text-sm outline-none focus:border-[#A80A0A]" />
                  </div>
                </div>

                <div className="pt-2">
                  <button type="submit" className="w-full bg-[#A80A0A] hover:bg-[#8B0707] text-white p-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-lg active:scale-95">
                    Guardar Libro
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default AdminView;
