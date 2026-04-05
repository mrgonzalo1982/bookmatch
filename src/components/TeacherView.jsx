import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Star, BookOpen, TrendingUp, Users, Heart, Award, BarChart2, Loader2 } from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { ITEMS, GENRES } from '../data/mockData';

const RED  = '#A80A0A';
const GOLD = '#FFD700';

function TeacherView({ user, userProfile, likedItems, onBack }) {
  const [topBooks, setTopBooks]     = useState([]);
  const [topGenres, setTopGenres]   = useState([]);
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalLikes, setTotalLikes] = useState(0);
  const [isLoading, setIsLoading]   = useState(true);
  const [activeTab, setActiveTab]   = useState('trending'); // 'trending' | 'genres' | 'mylikes'

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true);
      try {
        const snap = await getDocs(collection(db, 'users'));
        const likesMap = {};
        const genreMap = {};
        let students = 0;
        let allLikes = 0;

        snap.forEach(docSnap => {
          const data = docSnap.data();
          if (data.role === 'student' || !data.role) {
            if (data.likes?.length > 0) {
              students++;
              allLikes += data.likes.length;
              data.likes.forEach(book => {
                likesMap[book.id] = (likesMap[book.id] || 0) + 1;
                if (book.genre) {
                  genreMap[book.genre] = (genreMap[book.genre] || 0) + 1;
                }
              });
            }
          }
        });

        // Sort books by likes count
        const sortedBooks = Object.entries(likesMap)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 10)
          .map(([id, count]) => {
            const book = ITEMS.find(i => String(i.id) === String(id));
            return { id, count, title: book?.title || 'Libro desconocido', author: book?.author || '', image: book?.image || '', genre: book?.genre || '' };
          });

        const sortedGenres = Object.entries(genreMap)
          .sort((a, b) => b[1] - a[1]);

        const maxGenre = sortedGenres[0]?.[1] || 1;
        const genresWithPct = sortedGenres.map(([genre, count]) => ({
          genre, count, pct: Math.round((count / maxGenre) * 100)
        }));

        setTopBooks(sortedBooks);
        setTopGenres(genresWithPct);
        setTotalStudents(students);
        setTotalLikes(allLikes);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  const TABS = [
    { id: 'trending', label: 'Tendencias', icon: TrendingUp },
    { id: 'genres',   label: 'Géneros',    icon: BarChart2 },
    { id: 'mylikes',  label: 'Mis Likes',  icon: Heart },
  ];

  return (
    <div className="flex-1 flex flex-col overflow-hidden" style={{ background: '#F7F7F9' }}>
      {/* Header */}
      <header className="px-5 py-4 text-white shrink-0 flex items-center justify-between shadow-lg relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${RED} 0%, #3a0000 100%)` }}>
        <div className="absolute -top-6 -right-6 w-28 h-28 bg-white/5 rounded-full blur-2xl" />
        <div className="flex items-center gap-3 relative z-10">
          <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full transition-all">
            <ChevronLeft size={20} />
          </button>
          <div>
            <h1 className="text-lg font-black tracking-tighter leading-none">Panel Docente</h1>
            <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest mt-0.5">
              {userProfile?.dept || 'Docente'} • {user?.nombre || ''}
            </p>
          </div>
        </div>
        {/* Quick stats */}
        <div className="flex gap-3 relative z-10">
          <div className="text-center">
            <p className="text-xl font-black leading-none">{totalStudents}</p>
            <p className="text-[8px] text-white/50 uppercase font-bold tracking-widest">Activos</p>
          </div>
          <div className="w-px bg-white/20" />
          <div className="text-center">
            <p className="text-xl font-black leading-none">{totalLikes}</p>
            <p className="text-[8px] text-white/50 uppercase font-bold tracking-widest">Likes</p>
          </div>
        </div>
      </header>

      {/* Tab Nav */}
      <div className="flex bg-white border-b border-gray-100 px-2 gap-1 shrink-0">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1.5 px-4 py-3 text-[10px] font-black uppercase tracking-widest transition-all rounded-t-xl ${
              activeTab === tab.id
                ? 'text-[#A80A0A] border-b-2 border-[#A80A0A]'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <tab.icon size={13} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4 custom-scrollbar pb-10">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 opacity-40">
            <Loader2 size={32} className="animate-spin mb-2" style={{ color: RED }} />
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Cargando estadísticas...</p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {/* ── Tab: Tendencias ──────────────────────────────────── */}
            {activeTab === 'trending' && (
              <motion.div key="trending" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-3">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                  <Star size={11} fill={GOLD} color={GOLD} /> Top libros más populares del colegio
                </p>
                {topBooks.length === 0 ? (
                  <div className="text-center py-16 text-gray-300">
                    <BookOpen size={40} className="mx-auto mb-3 opacity-40" />
                    <p className="font-black text-sm">Aún no hay estatísticas</p>
                    <p className="text-xs mt-1">Los alumnos deben comenzar a hacer matches</p>
                  </div>
                ) : topBooks.map((book, i) => (
                  <motion.div
                    key={book.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="bg-white rounded-2xl p-3 flex items-center gap-3 shadow-sm border border-gray-100"
                  >
                    {/* Rank */}
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-sm shrink-0 ${
                      i === 0 ? 'bg-amber-400 text-white' :
                      i === 1 ? 'bg-gray-300 text-gray-700' :
                      i === 2 ? 'bg-orange-300 text-white' :
                      'bg-gray-100 text-gray-400'
                    }`}>
                      {i + 1}
                    </div>
                    {/* Cover */}
                    {book.image && (
                      <img src={book.image} className="w-10 h-14 object-cover rounded-lg shadow-sm shrink-0" alt="" />
                    )}
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="font-black text-gray-900 text-xs leading-tight truncate">{book.title}</p>
                      <p className="text-[10px] text-gray-400 font-bold mt-0.5 truncate">{book.author}</p>
                      <span className="text-[8px] font-black px-2 py-0.5 rounded-full mt-1 inline-block"
                        style={{ background: '#FFF0F0', color: RED }}>{book.genre}</span>
                    </div>
                    {/* Count */}
                    <div className="shrink-0 text-center">
                      <p className="text-lg font-black" style={{ color: RED }}>{book.count}</p>
                      <p className="text-[8px] text-gray-400 font-bold leading-none">likes</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* ── Tab: Géneros ──────────────────────────────────────── */}
            {activeTab === 'genres' && (
              <motion.div key="genres" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-3">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                  <BarChart2 size={11} /> Géneros preferidos en el colegio
                </p>
                {topGenres.length === 0 ? (
                  <p className="text-center text-gray-300 font-black text-sm py-16">Sin datos aún</p>
                ) : topGenres.map((g, i) => (
                  <motion.div key={g.genre} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                    className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-black text-sm text-gray-900">{g.genre}</p>
                      <span className="text-xs font-black" style={{ color: RED }}>{g.count} likes</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${g.pct}%` }}
                        transition={{ duration: 0.6, delay: i * 0.05 }}
                        className="h-full rounded-full"
                        style={{ background: `linear-gradient(90deg, ${RED}, #FF6B6B)` }}
                      />
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* ── Tab: Mis Likes ────────────────────────────────────── */}
            {activeTab === 'mylikes' && (
              <motion.div key="mylikes" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-3">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                  <Heart size={11} fill={RED} color={RED} /> Libros que has recomendado
                </p>
                <p className="text-[10px] text-gray-400 font-bold bg-blue-50 rounded-xl p-3 border border-blue-100">
                  💡 Cuando haces Like a un libro, los alumnos pueden hacer match contigo como profesor recomendador.
                </p>
                {likedItems.length === 0 ? (
                  <div className="text-center py-16 text-gray-300">
                    <Heart size={40} className="mx-auto mb-3 opacity-40" />
                    <p className="font-black text-sm">Aún no has dado Like a ningún libro</p>
                    <p className="text-xs mt-1">Ve a Descubrir y selecciona los libros que recomiendas</p>
                  </div>
                ) : likedItems.map((book, i) => (
                  <motion.div key={book.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
                    className="bg-white rounded-2xl p-3 flex items-center gap-3 shadow-sm border border-gray-100">
                    {book.image && <img src={book.image} className="w-10 h-14 object-cover rounded-lg shadow-sm shrink-0" alt="" />}
                    <div className="flex-1 min-w-0">
                      <p className="font-black text-gray-900 text-xs leading-tight truncate">{book.title}</p>
                      <p className="text-[10px] text-gray-400 font-bold mt-0.5 truncate">{book.author}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Heart size={9} fill={RED} color={RED} />
                        <span className="text-[8px] font-black" style={{ color: RED }}>Recomendado por ti</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}

export default TeacherView;
