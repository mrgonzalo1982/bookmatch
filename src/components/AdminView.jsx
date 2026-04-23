import React, { useState, useMemo, useEffect } from 'react';
import { STUDENTS, ITEMS, GENRES } from '../data/mockData';
import { Search, Plus, Download, Trash2, ChevronLeft, ShieldCheck, Star, Database, Users, BookOpen, User, Edit2, X, RotateCcw, Save, GraduationCap, Loader2, BarChart3, Activity, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '../lib/firebase';
import { doc, setDoc, collection, getDocs, updateDoc, deleteField, deleteDoc, getDoc } from 'firebase/firestore';

function AdminView({ onBack }) {
  const [activeTab, setActiveTab] = useState('books'); // 'books', 'teachers', 'students'
  const [search, setSearch] = useState('');
  const [books, setBooks] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [googleSearch, setGoogleSearch] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  
  const [showBookModal, setShowBookModal] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [bookForm, setBookForm] = useState({ title: '', author: '', description: '', genre: '', minNivel: 5, maxNivel: 12, image: '' });
  
  const [showTeacherModal, setShowTeacherModal] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [teacherForm, setTeacherForm] = useState({ rut: '', name: '', dept: '' });

  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({ totalMatches: 0, activeStudents: 0, topTwins: [] });

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      if (activeTab === 'books') {
        const snap = await getDocs(collection(db, 'catalog'));
        const list = snap.docs.map(d => ({ ...d.data(), id: d.id }));
        setBooks(list);
      } else if (activeTab === 'teachers') {
        const snap = await getDocs(collection(db, 'users'));
        const list = snap.docs
          .map(d => ({ ...d.data(), id: d.id }))
          .filter(u => u.role === 'teacher' || u.role === 'admin');
        setTeachers(list);
      } else if (activeTab === 'students' || activeTab === 'stats') {
        const snap = await getDocs(collection(db, 'users'));
        const studentDocs = snap.docs.filter(d => d.data().role === 'student' || !d.data().role);
        
                if (activeTab === 'stats') {
          let total = 0;
          const studentsWithLikes = studentDocs.map(d => ({ 
            id: d.id, 
            likes: d.data().likes || [], 
            profile: d.data().profile 
          })).filter(s => s.likes.length > 0);
          
          studentsWithLikes.forEach(s => total += s.likes.length);

          // Calculate average compatibility and top matches
          const twins = [];
          studentsWithLikes.forEach((s1, i) => {
            studentsWithLikes.slice(i + 1).forEach(s2 => {
              const score = compatibilityScore(
                { likedIds: s1.likes.map(l => l.id), genres: s1.profile?.genres || [], favoriteBook: s1.profile?.favoriteBook },
                s2.likes.map(l => l.id),
                s2.profile || { genres: [] }
              );
              
              if (score > 10) { // Only count meaningful connections
                const name1 = STUDENTS.find(st => st.rut.replace(/[^0-9kK]/gi, '').toLowerCase() === s1.id)?.nombre || s1.id;
                const name2 = STUDENTS.find(st => st.rut.replace(/[^0-9kK]/gi, '').toLowerCase() === s2.id)?.nombre || s2.id;
                twins.push({ s1: name1.split(' ')[0] + ' ' + (name1.split(' ')[1] || ''), s2: name2.split(' ')[0] + ' ' + (name2.split(' ')[1] || ''), score, common: s1.likes.filter(l => s2.likes.some(l2 => l2.id === l.id)).length });
              }
            });
          });

          // Most popular books
          const bookCounts = {};
          studentsWithLikes.forEach(s => s.likes.forEach(l => bookCounts[l.title] = (bookCounts[l.title] || 0) + 1));
          const sortedBooks = Object.entries(bookCounts).sort((a,b) => b[1] - a[1]).slice(0, 5).map(e => ({ title: e[0], count: e[1] }));

          twins.sort((a,b) => b.score - a.score);
          setStats({ 
            totalMatches: total, 
            activeStudents: studentsWithLikes.length, 
            topTwins: twins.slice(0, 15),
            popularBooks: sortedBooks
          });
        }
        setStudents(STUDENTS);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSearch = async () => {
    if (!googleSearch.trim()) return;
    setIsSearching(true);
    try {
      // 1. Try Google Books first
      const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(googleSearch)}`);
      const data = await res.json();
      
      if (data.items && data.items.length > 0) {
        const book = data.items[0].volumeInfo;
        setBookForm({
          title: book.title || '',
          author: book.authors ? book.authors.join(', ') : '',
          description: book.description ? book.description.substring(0, 300) + '...' : '',
          genre: GENRES[0],
          minNivel: 5,
          maxNivel: 12,
          image: book.imageLinks?.thumbnail || 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=400'
        });
      } else {
        // 2. Fallback to OpenLibrary
        const olRes = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(googleSearch)}&limit=1`);
        const olData = await olRes.json();
        
        if (olData.docs && olData.docs.length > 0) {
          const doc = olData.docs[0];
          let olDescription = '';
          
          // Try to fetch description from the "Work" key
          try {
            const workRes = await fetch(`https://openlibrary.org${doc.key}.json`);
            const workData = await workRes.json();
            if (workData.description) {
              olDescription = typeof workData.description === 'string' 
                ? workData.description 
                : workData.description.value;
            }
          } catch (e) { console.warn("OL Work fetch failed", e); }

          setBookForm({
            title: doc.title || '',
            author: doc.author_name ? doc.author_name.join(', ') : '',
            description: olDescription ? olDescription.substring(0, 300) + '...' : 'DescripciÃ³n no disponible en OpenLibrary.',
            genre: GENRES[0],
            minNivel: 5,
            maxNivel: 12,
            image: doc.cover_i ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg` : 'https://placehold.co/400x600/A10D12/D4AF37.png?text=Sin%2BCarÃ¡tula'
          });
        } else {
          alert("No se encontraron libros en ninguna fuente.");
        }
      }
    } catch (e) {
      console.error(e);
      alert("Error en la bÃºsqueda web.");
    } finally {
      setIsSearching(false);
    }
  };

  const handleSaveBook = async (e) => {
    e.preventDefault();
    const id = editingBook || 'custom-' + Date.now();
    const data = { ...bookForm, id, type: 'libro', genre: bookForm.genre || GENRES[0] };
    
    try {
      await setDoc(doc(db, 'catalog', id.toString()), data);
      setShowBookModal(false);
      setEditingBook(null);
      setBookForm({ title: '', author: '', description: '', genre: '', minNivel: 5, maxNivel: 12, image: '' });
      fetchData();
      alert('Libro guardado exitosamente');
    } catch (err) { alert('Error al guardar libro'); }
  };

  const deleteBook = async (id) => {
    if (!window.confirm("Â¿Eliminar este libro definitivamente?")) return;
    try {
      await deleteDoc(doc(db, 'catalog', id));
      fetchData();
    } catch (e) { alert("Error al borrar"); }
  };

  const handleSaveTeacher = async (e) => {
    e.preventDefault();
    const rut = teacherForm.rut.replace(/[^0-9kK]/gi, '').toLowerCase();
    const data = { 
      role: 'teacher', 
      profile: { name: teacherForm.name, dept: teacherForm.dept, emoji: 'ðŸ“š', genres: [] },
      likes: []
    };
    
    try {
      await setDoc(doc(db, 'users', rut), data, { merge: true });
      setShowTeacherModal(false);
      setEditingTeacher(null);
      setTeacherForm({ rut: '', name: '', dept: '' });
      fetchData();
      alert('Profesor guardado exitosamente');
    } catch (err) { alert('Error al guardar profesor'); }
  };

  const deleteTeacher = async (rut) => {
    if (!window.confirm("Â¿Eliminar acceso de este profesor?")) return;
    try {
      await deleteDoc(doc(db, 'users', rut));
      fetchData();
    } catch (e) { alert("Error al borrar"); }
  };

  const deleteStudentData = async (rut) => {
    if (!window.confirm("Â¿Borrar definitivamente los datos de este alumno?")) return;
    const cleanRut = rut.replace(/[^0-9kK]/gi, '').toLowerCase();
    try {
      await deleteDoc(doc(db, 'users', cleanRut));
      alert("Datos eliminados de Firestore");
    } catch (e) { alert("Error al borrar"); }
  };

  const resetStudentProfile = async (rut) => {
    if (!window.confirm("Â¿Resetear gustos de este alumno?")) return;
    const cleanRut = rut.replace(/[^0-9kK]/gi, '').toLowerCase();
    try {
      await updateDoc(doc(db, 'users', cleanRut), { 
        likes: [], 
        'profile.genres': [], 
        'profile.favoriteBook': deleteField() 
      });
      alert("Perfil reseteado");
    } catch (e) { alert("Error al resetear"); }
  };

  const exportToExcel = async () => {
    try {
      const snap = await getDocs(collection(db, 'users'));
      let csvContent = "RUT Alumno\tNombre\tCurso\tID Libro\tTitulo Libro\tAutor\n";
      snap.forEach(docSnap => {
        const u = docSnap.data();
        if (u.role === 'student' && u.likes?.length > 0) {
          const cleanRut = docSnap.id;
          const studentInfo = STUDENTS.find(s => s.rut.replace(/[^0-9kK]/gi, '').toLowerCase() === cleanRut);
          u.likes.forEach(book => {
            csvContent += `${cleanRut}\t${studentInfo?.nombre || 'Desconocido'}\t${studentInfo?.curso || 'Desconocido'}\t${book.id}\t${book.title}\t${book.author}\n`;
          });
        }
      });
      const blob = new Blob(["\uFEFF" + csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `BookMatch_Data.csv`);
      link.click();
    } catch (e) { alert("Error exportando"); }
  };

  const handlePurgeFirestore = async () => {
    if (!window.confirm("Â¿Limpiar datos falsos (profesores ficticios y contadores) de todos los libros en la nube?")) return;
    try {
      const catSnap = await getDocs(collection(db, 'catalog'));
      if (catSnap.empty) {
        alert("El catÃ¡logo en la nube ya estÃ¡ vacÃ­o. No hay nada que limpiar.");
        return;
      }
      await Promise.all(catSnap.docs.map(d => 
        updateDoc(doc(db, 'catalog', d.id), { 
          professors: [],
          studentsMatched: deleteField()
        })
      ));
      alert(`âœ… Â¡Listo! Se limpiaron ${catSnap.size} libros. Profesores falsos eliminados.`);
      fetchData();
    } catch (e) { alert("Error al limpiar: " + e.message); }
  };

  const filteredBooks = books.filter(b => 
    b.title.toLowerCase().includes(search.toLowerCase()) || 
    b.author.toLowerCase().includes(search.toLowerCase())
  );

  const courses = useMemo(() => Array.from(new Set(STUDENTS.map(s => s.curso))).sort(), []);

  const filteredStudents = useMemo(() => {
    let source = selectedCourse ? STUDENTS.filter(s => s.curso === selectedCourse) : STUDENTS;
    if (search.trim()) {
      return STUDENTS.filter(s => s.nombre.toLowerCase().includes(search.toLowerCase()) || s.rut.includes(search)).slice(0, 50);
    }
    return source.slice(0, 50);
  }, [search, selectedCourse]);

  return (
    <div className="flex-1 flex flex-col bg-[#F7F7F9] overflow-hidden">
      <header className="px-6 py-4 bg-[#A80A0A] text-white shrink-0 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full transition-all">
            <ChevronLeft size={20} />
          </button>
          <div>
            <h1 className="text-lg font-black tracking-tighter">EDITOR MAESTRO</h1>
            <p className="text-[9px] font-bold text-white/50 uppercase tracking-widest">GestiÃ³n Institucional</p>
          </div>
        </div>
        <div className="flex gap-2">
           <button onClick={exportToExcel} className="p-2.5 bg-white/10 hover:bg-white/20 rounded-xl transition-all" title="Exportar"><Download size={18} /></button>
           <button onClick={handlePurgeFirestore} className="p-2.5 bg-white/10 hover:bg-white/20 rounded-xl transition-all text-yellow-300" title="Limpiar"><Database size={18} /></button>
        </div>
      </header>

      <div className="flex px-4 pt-4 bg-white border-b border-gray-200 gap-1 overflow-x-auto no-scrollbar">
        {[
          { id: 'stats', label: 'ESTADISTICAS', icon: BarChart3 },
          { id: 'books', label: 'LIBROS', icon: BookOpen },
          { id: 'teachers', label: 'PROFESORES', icon: User },
          { id: 'students', label: 'ALUMNOS', icon: GraduationCap }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => { setActiveTab(tab.id); setSearch(''); setSelectedCourse(null); }}
            className={`flex items-center gap-2 px-5 py-3 rounded-t-2xl font-black text-[10px] tracking-widest transition-all ${
              activeTab === tab.id ? 'bg-[#F7F7F9] text-[#A80A0A] border-t border-x border-gray-200' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <tab.icon size={14} />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="p-4 bg-[#F7F7F9] flex gap-2">
        <div className="relative flex-1 group">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder={`Buscar por ${activeTab === 'books' ? 'tÃ­tulo o autor' : 'nombre o RUT'}...`}
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl outline-none text-sm font-bold shadow-sm focus:border-[#A80A0A]"
          />
        </div>
        {activeTab === 'books' && (
          <button onClick={() => { setEditingBook(null); setBookForm({ title: '', author: '', description: '', genre: '', minNivel: 5, maxNivel: 12, image: '' }); setShowBookModal(true); }} className="bg-[#A80A0A] text-white px-4 rounded-xl shadow-lg hover:scale-105 active:scale-95 transition-all text-[10px] font-black uppercase tracking-widest">AÃ±adir</button>
        )}
        {activeTab === 'teachers' && (
          <button onClick={() => { setEditingTeacher(null); setTeacherForm({ rut: '', name: '', dept: '' }); setShowTeacherModal(true); }} className="bg-blue-600 text-white px-4 rounded-xl shadow-lg hover:scale-105 active:scale-95 transition-all text-[10px] font-black uppercase tracking-widest">Nuevo Profe</button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-10 space-y-3 custom-scrollbar">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 opacity-30">
            <Loader2 size={32} className="animate-spin text-[#A80A0A] mb-2" />
            <p className="font-black text-[10px] tracking-widest">CARGANDO DATOS...</p>
          </div>
        ) : (
          <>
            {activeTab === 'books' && filteredBooks.map(book => (
              <div key={book.id} className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
                <img src={book.image} className="w-16 h-20 object-cover rounded-lg shadow-sm" alt="" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-black text-sm text-gray-900 truncate leading-tight uppercase tracking-tight">{book.title}</h3>
                  <p className="text-[10px] font-bold text-gray-400 mt-0.5">{book.author}</p>
                  <p className="text-[9px] font-black text-[#A80A0A] bg-red-50 inline-block px-2 py-0.5 rounded mt-2 uppercase tracking-widest">{book.genre}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <button onClick={() => { setEditingBook(book.id); setBookForm(book); setShowBookModal(true); }} className="p-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-all"><Edit2 size={16} /></button>
                  <button onClick={() => deleteBook(book.id)} className="p-2 bg-red-50 text-[#A80A0A] rounded-xl hover:bg-red-100 transition-all"><Trash2 size={16} /></button>
                </div>
              </div>
            ))}

            {activeTab === 'teachers' && teachers.map(teacher => (
              <div key={teacher.id} className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-xl">{teacher.profile?.name?.charAt(0) || 'P'}</div>
                  <div>
                    <h3 className="font-black text-sm text-gray-900 leading-tight uppercase tracking-tight">{teacher.profile?.name || 'Profesor'}</h3>
                    <p className="text-[9px] font-bold text-gray-400 mt-1 uppercase tracking-widest">{teacher.id}</p>
                    <span className="text-[8px] font-black bg-blue-50 text-blue-600 px-2 py-0.5 rounded uppercase tracking-widest mt-1 inline-block">{teacher.profile?.dept || 'Sin Departamento'}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => { setEditingTeacher(teacher.id); setTeacherForm({ rut: teacher.id, name: teacher.profile?.name || '', dept: teacher.profile?.dept || '' }); setShowTeacherModal(true); }} className="p-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-all"><Edit2 size={16} /></button>
                  <button onClick={() => deleteTeacher(teacher.id)} className="p-2 bg-red-50 text-[#A80A0A] rounded-xl hover:bg-red-100 transition-all"><Trash2 size={16} /></button>
                </div>
              </div>
            ))}

            {activeTab === 'students' && (
              <>
                {!selectedCourse && !search.trim() && (
                  <div className="grid grid-cols-2 gap-3">
                    {courses.map(curso => (
                      <button key={curso} onClick={() => setSelectedCourse(curso)} className="bg-white p-5 rounded-2xl border border-gray-100 text-left hover:border-blue-200 transition-all">
                        <Users size={18} className="text-blue-600 mb-2" />
                        <p className="font-black text-sm text-gray-900 uppercase tracking-tighter">{curso}</p>
                      </button>
                    ))}
                  </div>
                )}
                {(selectedCourse || search.trim()) && (
                  <div className="space-y-2">
                    {selectedCourse && (
                      <button onClick={() => setSelectedCourse(null)} className="mb-2 text-[10px] font-black text-blue-600 uppercase tracking-widest flex items-center gap-1">
                        <ChevronLeft size={12} /> Volver a cursos
                      </button>
                    )}
                    {filteredStudents.map(s => (
                      <div key={s.rut} className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center justify-between shadow-sm">
                        <div className="min-w-0">
                          <p className="font-black text-sm text-gray-900 truncate leading-tight uppercase tracking-tight">{s.nombre}</p>
                          <p className="text-[9px] font-bold text-gray-400 mt-1 uppercase tracking-widest">{s.rut} â€¢ {s.curso}</p>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => resetStudentProfile(s.rut)} className="p-2 bg-orange-50 text-orange-600 rounded-xl" title="Resetear"><RotateCcw size={16} /></button>
                          <button onClick={() => deleteStudentData(s.rut)} className="p-2 bg-red-50 text-[#A80A0A] rounded-xl" title="Borrar"><Trash2 size={16} /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

                        {activeTab === 'stats' && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                    <Activity size={20} className="text-red-500 mb-2" />
                    <p className="text-2xl font-black text-gray-900">{stats.totalMatches}</p>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Interacciones</p>
                  </div>
                  <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                    <Users size={20} className="text-blue-500 mb-2" />
                    <p className="text-2xl font-black text-gray-900">{stats.activeStudents}</p>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Usuarios Participando</p>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                  <h3 className="font-black text-sm text-gray-900 uppercase tracking-tighter mb-4 flex items-center gap-2">
                    <BookOpen size={16} className="text-emerald-500" /> Libros más deseados
                  </h3>
                  <div className="space-y-3">
                    {stats.popularBooks?.map((book, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <span className="text-xs font-bold text-gray-700 truncate max-w-[70%]">{book.title}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-400" style={{ width: (stats.activeStudents > 0 ? (book.count / stats.activeStudents) * 100 : 0) + '%' }}></div>
                          </div>
                          <span className="text-[10px] font-black text-emerald-600">{book.count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                  <h3 className="font-black text-sm text-gray-900 uppercase tracking-tighter mb-4 flex items-center gap-2">
                    <Heart size={16} className="text-red-500 fill-red-500" /> TOP Conexiones Estudiantiles
                  </h3>
                  {stats.topTwins?.length === 0 ? (
                    <p className="text-xs text-gray-400 italic">No hay matches compartidos todavía.</p>
                  ) : (
                    <div className="space-y-4">
                      {stats.topTwins?.map((twin, i) => (
                        <div key={i} className="flex flex-col gap-2 p-3 bg-gray-50 rounded-2xl border border-gray-100">
                           <div className="flex justify-between items-center">
                              <span className="text-[10px] font-black text-gray-900 uppercase truncate max-w-[35%]">{twin.s1}</span>
                              <div className="flex-1 flex flex-col items-center gap-0.5">
                                <span className="text-[8px] font-black text-gray-400 text-center">{twin.score}% Compat.</span>
                                <div className="w-full flex items-center justify-center gap-1">
                                  <div className="h-px bg-gray-200 flex-1"></div>
                                  <div className="bg-white px-2 py-0.5 rounded-full border border-gray-100 text-[9px] font-black text-red-500 shadow-sm">
                                    {twin.common} ??
                                  </div>
                                  <div className="h-px bg-gray-200 flex-1"></div>
                                </div>
                              </div>
                              <span className="text-[10px] font-black text-gray-900 uppercase truncate max-w-[35%] text-right">{twin.s2}</span>
                           </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <AnimatePresence>
        {showBookModal && (
          <div className="fixed inset-0 z-[100] flex flex-col justify-end bg-black/60 p-4">
            <motion.div initial={{ y: 300 }} animate={{ y: 0 }} exit={{ y: 300 }} className="bg-white p-6 rounded-3xl shadow-2xl relative max-h-[90vh] overflow-y-auto custom-scrollbar">
              <button onClick={() => setShowBookModal(false)} className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full"><X size={18} /></button>
              <h2 className="text-xl font-black tracking-tighter mb-6 uppercase italic leading-none text-gray-900">{editingBook ? 'EDITAR LIBRO' : 'AÃ‘ADIR LIBRO'}</h2>
              {!editingBook && (
                <div className="mb-6 flex gap-2">
                  <input type="text" placeholder="Autollenar con Google Books..." value={googleSearch} onChange={e=>setGoogleSearch(e.target.value)} className="flex-1 p-3 bg-blue-50 border border-blue-100 rounded-xl text-sm font-bold outline-none" />
                  <button onClick={handleGoogleSearch} disabled={isSearching} className="bg-blue-600 text-white px-4 rounded-xl font-black text-[10px] uppercase tracking-widest">{isSearching ? '...' : 'BUSCAR'}</button>
                </div>
              )}
              <form onSubmit={handleSaveBook} className="space-y-4">
                <div><label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-2 mb-1 block">TÃ­tulo</label><input required value={bookForm.title} onChange={e=>setBookForm({...bookForm, title: e.target.value})} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl font-bold text-sm outline-none focus:border-[#A80A0A]" /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-2 mb-1 block">Autor</label><input required value={bookForm.author} onChange={e=>setBookForm({...bookForm, author: e.target.value})} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl font-bold text-sm outline-none focus:border-[#A80A0A]" /></div>
                  <div><label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-2 mb-1 block">GÃ©nero</label><select required value={bookForm.genre} onChange={e=>setBookForm({...bookForm, genre: e.target.value})} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl font-bold text-sm outline-none focus:border-[#A80A0A]">{GENRES.map(g => <option key={g} value={g}>{g}</option>)}</select></div>
                </div>
                <div><label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-2 mb-1 block">DescripciÃ³n</label><textarea required value={bookForm.description} onChange={e=>setBookForm({...bookForm, description: e.target.value})} rows={3} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium outline-none focus:border-[#A80A0A]" /></div>
                <div className="grid grid-cols-2 gap-4">
                   <div><label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-2 mb-1 block">Nivel MÃ­n</label><input type="number" value={bookForm.minNivel} onChange={e=>setBookForm({...bookForm, minNivel: Number(e.target.value)})} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl font-bold text-sm" /></div>
                   <div><label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-2 mb-1 block">Nivel MÃ¡x</label><input type="number" value={bookForm.maxNivel} onChange={e=>setBookForm({...bookForm, maxNivel: Number(e.target.value)})} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl font-bold text-sm" /></div>
                </div>
                <button type="submit" className="w-full bg-[#A80A0A] text-white p-5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg active:scale-95 transition-all mt-4">GUARDAR CAMBIOS</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showTeacherModal && (
          <div className="fixed inset-0 z-[100] flex flex-col justify-end bg-black/60 p-4">
            <motion.div initial={{ y: 300 }} animate={{ y: 0 }} exit={{ y: 300 }} className="bg-white p-6 rounded-3xl shadow-2xl relative">
              <button onClick={() => setShowTeacherModal(false)} className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full"><X size={18} /></button>
              <h2 className="text-xl font-black tracking-tighter mb-6 uppercase italic leading-none text-gray-900">{editingTeacher ? 'EDITAR PROFESOR' : 'AÃ‘ADIR PROFESOR'}</h2>
              <form onSubmit={handleSaveTeacher} className="space-y-4">
                <div><label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-2 mb-1 block">RUT del Profesor</label><input required disabled={!!editingTeacher} value={teacherForm.rut} onChange={e=>setTeacherForm({...teacherForm, rut: e.target.value})} placeholder="Ej: 12345678-9" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl font-bold text-sm outline-none focus:border-blue-600 disabled:opacity-50" /></div>
                <div><label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-2 mb-1 block">Nombre Completo</label><input required value={teacherForm.name} onChange={e=>setTeacherForm({...teacherForm, name: e.target.value})} placeholder="Ej: Miss Danixa Paola" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl font-bold text-sm outline-none focus:border-blue-600" /></div>
                <div><label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-2 mb-1 block">Departamento</label><input required value={teacherForm.dept} onChange={e=>setTeacherForm({...teacherForm, dept: e.target.value})} placeholder="Ej: Lenguaje / InglÃ©s / MatemÃ¡ticas" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl font-bold text-sm outline-none focus:border-blue-600" /></div>
                <button type="submit" className="w-full bg-blue-600 text-white p-5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg active:scale-95 transition-all mt-4">AUTORIZAR DOCENTE</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default AdminView;







