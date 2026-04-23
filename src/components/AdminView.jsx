import React, { useState, useMemo, useEffect } from 'react';
import { STUDENTS, ITEMS, GENRES, compatibilityScore } from '../data/mockData';
import { 
  Search, Plus, Download, Trash2, ChevronLeft, ShieldCheck, Star, 
  Database, Users, BookOpen, User, Edit2, X, RotateCcw, Save, 
  GraduationCap, Loader2, BarChart3, Activity, Heart 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '../lib/firebase';
import { 
  doc, setDoc, collection, getDocs, updateDoc, 
  deleteField, deleteDoc, getDoc 
} from 'firebase/firestore';

function AdminView({ onBack }) {
  const [activeTab, setActiveTab] = useState('stats'); 
  const [search, setSearch] = useState('');
  const [books, setBooks] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [stats, setStats] = useState({ totalMatches: 0, activeStudents: 0, topTwins: [], popularBooks: [], rawCount: 0 });
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [googleSearch, setGoogleSearch] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const [showBookModal, setShowBookModal] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [bookForm, setBookForm] = useState({ title: '', author: '', description: '', genre: '', minNivel: 5, maxNivel: 12, image: '' });

  const [showTeacherModal, setShowTeacherModal] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [teacherForm, setTeacherForm] = useState({ rut: '', name: '', dept: '' });

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
        // Include users with role student or no role (default)
        const studentDocs = snap.docs.filter(d => d.data().role === 'student' || (!d.data().role && d.data().profile));
        
        if (activeTab === 'stats') {
          let total = 0;
          const studentsWithLikes = studentDocs.map(d => ({ 
            id: d.id, 
            likes: d.data().likes || [], 
            profile: d.data().profile 
          })).filter(s => s.likes.length > 0);
          
          studentsWithLikes.forEach(s => total += s.likes.length);

          const twins = [];
          studentsWithLikes.forEach((s1, i) => {
            studentsWithLikes.slice(i + 1).forEach(s2 => {
              const score = compatibilityScore(
                { 
                  likedIds: (s1.likes || []).map(l => l.id), 
                  genres: s1.profile?.genres || [], 
                  favoriteBook: s1.profile?.favoriteBook 
                },
                (s2.likes || []).map(l => l.id),
                s2.profile || { genres: [] }
              );
              
              if (score > 10) {
                const name1 = STUDENTS.find(st => st.rut.replace(/[^0-9kK]/gi, '').toLowerCase() === s1.id)?.nombre || s1.id;
                const name2 = STUDENTS.find(st => st.rut.replace(/[^0-9kK]/gi, '').toLowerCase() === s2.id)?.nombre || s2.id;
                twins.push({ 
                  s1: name1.split(' ')[0] + ' ' + (name1.split(' ')[1] || ''), 
                  s2: name2.split(' ')[0] + ' ' + (name2.split(' ')[1] || ''), 
                  score, 
                  common: s1.likes.filter(l => s2.likes.some(l2 => l2.id === l.id)).length 
                });
              }
            });
          });

          const bookCounts = {};
          studentsWithLikes.forEach(s => s.likes.forEach(l => bookCounts[l.title] = (bookCounts[l.title] || 0) + 1));
          const sortedBooks = Object.entries(bookCounts)
            .sort((a,b) => b[1] - a[1])
            .slice(0, 5)
            .map(e => ({ title: e[0], count: e[1] }));

          twins.sort((a,b) => b.score - a.score);
          setStats({ 
            rawCount: studentDocs.length,
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

  useEffect(() => { fetchData(); }, [activeTab]);

  const handleGoogleSearch = async () => {
    if (!googleSearch.trim()) return;
    setIsSearching(true);
    try {
      const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(googleSearch)}&maxResults=1`);
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
        const olRes = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(googleSearch)}&limit=1`);
        const olData = await olRes.json();
        if (olData.docs?.[0]) {
          const doc = olData.docs[0];
          setBookForm({
            title: doc.title || '',
            author: doc.author_name?.[0] || '',
            description: doc.first_sentence?.[0] || 'Sin descripción disponible.',
            genre: GENRES[0],
            minNivel: 5, maxNivel: 12,
            image: doc.cover_i ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg` : 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=400'
          });
        }
      }
    } catch (e) { alert("Error buscando libro."); }
    finally { setIsSearching(false); }
  };

  const handleSaveBook = async (e) => {
    e.preventDefault();
    try {
      const id = editingBook ? editingBook.id : Date.now().toString();
      await setDoc(doc(db, 'catalog', id), bookForm);
      setShowBookModal(false);
      setEditingBook(null);
      setBookForm({ title: '', author: '', description: '', genre: '', minNivel: 5, maxNivel: 12, image: '' });
      fetchData();
    } catch (e) { alert("Error al guardar."); }
  };

  const deleteBook = async (id) => {
    if (!window.confirm("¿Eliminar libro?")) return;
    try { await deleteDoc(doc(db, 'catalog', id)); fetchData(); } catch (e) { alert("Error."); }
  };

  const deleteTeacher = async (id) => {
    if (!window.confirm("¿Quitar acceso a este profesor?")) return;
    try { await deleteDoc(doc(db, 'users', id)); fetchData(); } catch (e) { alert("Error."); }
  };

  const handleSaveTeacher = async (e) => {
    e.preventDefault();
    try {
      const cleanRut = teacherForm.rut.replace(/[^0-9kK]/gi, '').toLowerCase();
      await setDoc(doc(db, 'users', cleanRut), { ...teacherForm, role: 'teacher' });
      setShowTeacherModal(false);
      setEditingTeacher(null);
      setTeacherForm({ rut: '', name: '', dept: '' });
      fetchData();
    } catch (e) { alert("Error."); }
  };

  const cleanCatalog = async () => {
    if (!window.confirm("¿Limpiar datos falsos de todos los libros?")) return;
    try {
      const catSnap = await getDocs(collection(db, 'catalog'));
      await Promise.all(catSnap.docs.map(d => updateDoc(doc(db, 'catalog', d.id), { professors: [], studentsMatched: deleteField() })));
      alert("¡Listo!");
      fetchData();
    } catch (e) { alert("Error."); }
  };

  const resetStudentProfile = async (rut) => {
    if (!window.confirm("¿Resetear gustos de este alumno?")) return;
    try {
      const cleanRut = rut.replace(/[^0-9kK]/gi, '').toLowerCase();
      await updateDoc(doc(db, 'users', cleanRut), { likes: [], profile: deleteField() });
      alert("Reset completado");
      fetchData();
    } catch (e) { alert("Error."); }
  };

  const deleteStudentData = async (rut) => {
    if (!window.confirm("¿Borrar definitivamente los datos de este alumno?")) return;
    try {
      const cleanRut = rut.replace(/[^0-9kK]/gi, '').toLowerCase();
      await deleteDoc(doc(db, 'users', cleanRut));
      alert("Alumno eliminado de la base de datos");
      fetchData();
    } catch (e) { alert("Error."); }
  };

  const filteredBooks = books.filter(b => b.title.toLowerCase().includes(search.toLowerCase()) || b.author.toLowerCase().includes(search.toLowerCase()));
  const courses = useMemo(() => Array.from(new Set(STUDENTS.map(s => s.curso))).sort(), []);
  const filteredStudents = useMemo(() => {
    let source = selectedCourse ? STUDENTS.filter(s => s.curso === selectedCourse) : STUDENTS;
    if (search.trim()) return STUDENTS.filter(s => s.nombre.toLowerCase().includes(search.toLowerCase()) || s.rut.includes(search)).slice(0, 50);
    return source;
  }, [selectedCourse, search]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="bg-red-600 p-2 rounded-xl shadow-lg shadow-red-100"><ShieldCheck className="text-white" size={24} /></div>
          <div><h1 className="text-lg font-black tracking-tighter leading-none italic uppercase">EDITOR MAESTRO</h1><p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">Admin Panel v2.0</p></div>
        </div>
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400"><X size={24} /></button>
      </header>

      <div className="flex px-4 pt-4 bg-white border-b border-gray-200 gap-1 overflow-x-auto no-scrollbar">
        {[
          { id: 'stats', label: 'ESTADISTICAS', icon: BarChart3 },
          { id: 'books', label: 'LIBROS', icon: BookOpen },
          { id: 'teachers', label: 'PROFESORES', icon: User },
          { id: 'students', label: 'ALUMNOS', icon: GraduationCap }
        ].map(tab => (
          <button key={tab.id} onClick={() => { setActiveTab(tab.id); setSearch(''); setSelectedCourse(null); }} className={`flex items-center gap-2 px-5 py-3 rounded-t-2xl text-[11px] font-black tracking-widest transition-all ${activeTab === tab.id ? 'bg-gray-50 text-red-600 border-b-2 border-red-600' : 'text-gray-400 hover:text-gray-600'}`}>
            <tab.icon size={16} /> {tab.label}
          </button>
        ))}
      </div>

      <div className="flex-1 p-6 overflow-y-auto">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-64 gap-4"><Loader2 className="animate-spin text-red-600" size={40} /><p className="text-xs font-black text-gray-400 uppercase tracking-widest">Cargando datos...</p></div>
        ) : (
          <>
            {activeTab === 'stats' && (
              <div className="space-y-6">
                <div className="bg-gray-100 p-4 rounded-2xl border border-gray-200 mb-4">
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Debug Info</p>
                  <p className="text-xs font-bold text-gray-700">Audit: {stats.rawCount || 0} docs en DB | {stats.activeStudents || 0} con likes</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm"><Activity size={20} className="text-red-500 mb-2" /><p className="text-2xl font-black text-gray-900">{stats.totalMatches}</p><p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Interacciones</p></div>
                  <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm"><Users size={20} className="text-blue-500 mb-2" /><p className="text-2xl font-black text-gray-900">{stats.activeStudents}</p><p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Usuarios Participando</p></div>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                  <h3 className="font-black text-sm text-gray-900 uppercase tracking-tighter mb-4 flex items-center gap-2"><BookOpen size={16} className="text-emerald-500" /> Libros más deseados</h3>
                  <div className="space-y-3">
                    {stats.popularBooks?.map((book, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <span className="text-xs font-bold text-gray-700 truncate max-w-[70%]">{book.title}</span>
                        <div className="flex items-center gap-2"><div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden"><div className="h-full bg-emerald-400" style={{ width: (stats.activeStudents > 0 ? (book.count / stats.activeStudents) * 100 : 0) + '%' }}></div></div><span className="text-[10px] font-black text-emerald-600">{book.count}</span></div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                  <h3 className="font-black text-sm text-gray-900 uppercase tracking-tighter mb-4 flex items-center gap-2"><Heart size={16} className="text-red-500 fill-red-500" /> TOP Conexiones Estudiantiles</h3>
                  <div className="space-y-4">
                    {stats.topTwins?.map((twin, i) => (
                      <div key={i} className="flex flex-col gap-2 p-3 bg-gray-50 rounded-2xl border border-gray-100">
                        <div className="flex justify-between items-center"><span className="text-[10px] font-black text-gray-900 uppercase truncate max-w-[35%]">{twin.s1}</span><div className="flex-1 flex flex-col items-center gap-0.5"><span className="text-[8px] font-black text-gray-400 text-center">{twin.score}% Compat.</span><div className="w-full flex items-center justify-center gap-1"><div className="h-px bg-gray-200 flex-1"></div><div className="bg-white px-2 py-0.5 rounded-full border border-gray-100 text-[9px] font-black text-red-500 shadow-sm">{twin.common} 📚</div><div className="h-px bg-gray-200 flex-1"></div></div></div><span className="text-[10px] font-black text-gray-900 uppercase truncate max-w-[35%] text-right">{twin.s2}</span></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'books' && (
              <div className="space-y-6">
                <div className="flex gap-2">
                  <div className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} /><input type="text" placeholder="Buscar libros..." value={search} onChange={e=>setSearch(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-sm font-bold outline-none focus:border-red-600 transition-all shadow-sm" /></div>
                  <button onClick={() => { setEditingBook(null); setBookForm({ title: '', author: '', description: '', genre: GENRES[0], minNivel: 5, maxNivel: 12, image: '' }); setShowBookModal(true); }} className="bg-red-600 text-white px-6 rounded-2xl flex items-center gap-2 font-black text-[10px] uppercase tracking-widest shadow-lg shadow-red-100"><Plus size={18} /> AÑADIR</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredBooks.map(book => (
                    <div key={book.id} className="bg-white p-4 rounded-2xl border border-gray-100 flex gap-4 shadow-sm relative group">
                      <img src={book.image} className="w-16 h-24 object-cover rounded-lg shadow-md" alt="" />
                      <div className="flex-1 min-w-0">
                        <p className="font-black text-sm text-gray-900 truncate leading-tight uppercase tracking-tight">{book.title}</p>
                        <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-widest">{book.author}</p>
                        <div className="mt-2 flex gap-2"><button onClick={() => { setEditingBook(book); setBookForm(book); setShowBookModal(true); }} className="p-2 bg-gray-50 text-gray-400 rounded-xl hover:text-blue-600 hover:bg-blue-50 transition-all"><Edit2 size={16} /></button><button onClick={() => deleteBook(book.id)} className="p-2 bg-gray-50 text-gray-400 rounded-xl hover:text-red-600 hover:bg-red-50 transition-all"><Trash2 size={16} /></button></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'teachers' && (
              <div className="space-y-6">
                <button onClick={() => { setEditingTeacher(null); setTeacherForm({ rut: '', name: '', dept: '' }); setShowTeacherModal(true); }} className="w-full bg-blue-600 text-white p-5 rounded-2xl flex items-center justify-center gap-3 font-black text-xs uppercase tracking-widest shadow-lg shadow-blue-100"><Plus size={20} /> AUTORIZAR NUEVO DOCENTE</button>
                <div className="space-y-3">
                  {teachers.map(teacher => (
                    <div key={teacher.id} className="bg-white p-5 rounded-2xl border border-gray-100 flex items-center justify-between shadow-sm">
                      <div><p className="font-black text-sm text-gray-900 uppercase tracking-tight">{teacher.name}</p><p className="text-[9px] font-bold text-gray-400 mt-1 uppercase tracking-widest">{teacher.dept} • {teacher.rut}</p></div>
                      <div className="flex gap-2">
                        <button onClick={() => deleteTeacher(teacher.id)} className="p-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-all"><Trash2 size={16} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'students' && (
              <>
                {!selectedCourse && !search.trim() && (
                  <div className="grid grid-cols-2 gap-3">
                    {courses.map(curso => (
                      <button key={curso} onClick={() => setSelectedCourse(curso)} className="bg-white p-5 rounded-2xl border border-gray-100 text-left hover:border-blue-200 transition-all">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{curso}</p>
                        <p className="text-xl font-black text-gray-900">VER CLASE</p>
                      </button>
                    ))}
                  </div>
                )}
                {(selectedCourse || search.trim()) && (
                  <div className="space-y-2">
                    {selectedCourse && (
                      <button onClick={() => setSelectedCourse(null)} className="mb-2 text-[10px] font-black text-blue-600 uppercase tracking-widest flex items-center gap-1"><ChevronLeft size={12} /> Volver a cursos</button>
                    )}
                    {filteredStudents.map(s => (
                      <div key={s.rut} className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center justify-between shadow-sm">
                        <div className="min-w-0"><p className="font-black text-sm text-gray-900 truncate uppercase">{s.nombre}</p><p className="text-[9px] font-bold text-gray-400 mt-1 uppercase">{s.rut} • {s.curso}</p></div>
                        <div className="flex gap-2"><button onClick={() => resetStudentProfile(s.rut)} className="p-2 bg-orange-50 text-orange-600 rounded-xl"><RotateCcw size={16} /></button><button onClick={() => deleteStudentData(s.rut)} className="p-2 bg-red-50 text-red-600 rounded-xl"><Trash2 size={16} /></button></div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>

      <AnimatePresence>
        {showBookModal && (
          <div className="fixed inset-0 z-[100] flex flex-col justify-end bg-black/60 p-4">
            <motion.div initial={{ y: 300 }} animate={{ y: 0 }} exit={{ y: 300 }} className="bg-white p-6 rounded-3xl shadow-2xl relative max-h-[90vh] overflow-y-auto">
              <button onClick={() => setShowBookModal(false)} className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full"><X size={18} /></button>
              <h2 className="text-xl font-black tracking-tighter mb-6 uppercase italic text-gray-900">{editingBook ? 'EDITAR LIBRO' : 'AÑADIR LIBRO'}</h2>
              <form onSubmit={handleSaveBook} className="space-y-4">
                <div><label className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1 block">Título</label><input required value={bookForm.title} onChange={e=>setBookForm({...bookForm, title: e.target.value})} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl font-bold text-sm" /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1 block">Autor</label><input required value={bookForm.author} onChange={e=>setBookForm({...bookForm, author: e.target.value})} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl font-bold text-sm" /></div>
                  <div><label className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1 block">Género</label><select required value={bookForm.genre} onChange={e=>setBookForm({...bookForm, genre: e.target.value})} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl font-bold text-sm">{GENRES.map(g => <option key={g} value={g}>{g}</option>)}</select></div>
                </div>
                <div><label className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1 block">Descripción</label><textarea required value={bookForm.description} onChange={e=>setBookForm({...bookForm, description: e.target.value})} rows={3} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium" /></div>
                <div className="grid grid-cols-2 gap-4">
                   <div><label className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1 block">Nivel Mín</label><input type="number" value={bookForm.minNivel} onChange={e=>setBookForm({...bookForm, minNivel: Number(e.target.value)})} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl font-bold text-sm" /></div>
                   <div><label className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1 block">Nivel Máx</label><input type="number" value={bookForm.maxNivel} onChange={e=>setBookForm({...bookForm, maxNivel: Number(e.target.value)})} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl font-bold text-sm" /></div>
                </div>
                <button type="submit" className="w-full bg-red-600 text-white p-5 rounded-2xl font-black uppercase tracking-widest text-xs">GUARDAR CAMBIOS</button>
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
              <h2 className="text-xl font-black mb-6 uppercase italic text-gray-900">{editingTeacher ? 'EDITAR PROFESOR' : 'AÑADIR PROFESOR'}</h2>
              <form onSubmit={handleSaveTeacher} className="space-y-4">
                <div><label className="text-[9px] font-black text-gray-400 uppercase mb-1 block">Nombre Completo</label><input required value={teacherForm.name} onChange={e=>setTeacherForm({...teacherForm, name: e.target.value})} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl font-bold text-sm" /></div>
                <div><label className="text-[9px] font-black text-gray-400 uppercase mb-1 block">Departamento</label><input required value={teacherForm.dept} onChange={e=>setTeacherForm({...teacherForm, dept: e.target.value})} placeholder="Ej: Lenguaje / Inglés / Matemáticas" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl font-bold text-sm" /></div>
                <button type="submit" className="w-full bg-blue-600 text-white p-5 rounded-2xl font-black uppercase text-xs">AUTORIZAR DOCENTE</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default AdminView;
