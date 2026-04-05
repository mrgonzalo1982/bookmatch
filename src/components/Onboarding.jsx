import React, { useState } from 'react';
import { GENRES, ITEMS } from '../data/mockData';

import { Check, ChevronRight, BookOpen, Heart, Sparkles, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const STEPS = ['bienvenida', 'emoji', 'generos', 'libro', 'listo'];
const STUDENT_EMOJIS = ['🤓', '😎', '🧐', '🤠', '🤡', '🤖', '👾', '🦸', '🧙', '🧜', '🥷', '🧑‍💻', '🦄', '🐯', '🦊', '🎨', '🚀', '⚽'];

function Onboarding({ user, onFinish }) {
  const [step, setStep] = useState(0);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [favoriteBook, setFavoriteBook] = useState(null);
  const [customBook, setCustomBook] = useState('');
  const [search, setSearch] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState(null);

  const firstName = (() => {
    const parts = user?.nombre?.split(' ') || [];
    // Name is stored as "Apellido Apellido Nombre Nombre" - take last parts
    return parts.slice(-2).join(' ') || 'Lector';
  })();

  const firstNameShort = firstName.split(' ')[0];

  const toggleGenre = (g) => {
    setSelectedGenres(prev =>
      prev.includes(g) ? prev.filter(x => x !== g) : [...prev, g]
    );
  };

  const handleFinish = () => {
    onFinish({
      genres: selectedGenres,
      favoriteBook: favoriteBook?.title || customBook || search || null,
      favoriteBookObj: favoriteBook || null,
      emoji: selectedEmoji || '👤',
    });
  };

  // Books to show in search (from catalog + any typed)
  const filteredBooks = ITEMS.filter(item =>
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.author.toLowerCase().includes(search.toLowerCase())
  );

  const canAdvance = [
    true,                            // bienvenida: always
    selectedEmoji !== null,          // emoji: must pick one
    selectedGenres.length >= 1,      // géneros: at least 1
    favoriteBook || customBook.trim().length > 2 || search.trim().length > 2, // libro: picked or typed
    true                             // listo: always
  ][step];

  const variants = {
    enter: { opacity: 0, x: 40 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -40 },
  };

  return (
    <div className="min-h-screen bg-[#F8F9FD] flex flex-col max-w-md mx-auto relative shadow-2xl border-x border-gray-100 overflow-hidden" style={{ height: '100dvh' }}>

      {/* Progress Bar */}
      <div className="px-6 pt-6 pb-4 shrink-0">
        <div className="flex gap-1.5 mb-3">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full flex-1 transition-all duration-500`}
              style={{ background: i <= step ? '#A80A0A' : '#e5e7eb' }}
            />
          ))}
        </div>
        <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: '#A80A0A' }}>
          Paso {step + 1} de {STEPS.length}
        </p>
      </div>

      {/* Step Content */}
      <div className="flex-1 flex flex-col overflow-hidden px-6 pb-6">
        <AnimatePresence mode="wait">

          {/* ─── PASO 0: Bienvenida ─── */}
          {step === 0 && (
            <motion.div
              key="bienvenida"
              variants={variants} initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.25 }}
              className="flex-1 flex flex-col justify-center items-center text-center pb-12"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.1 }}
                className="mb-8"
              >
                <img src="/umbral-shield.png" alt="Umbral" className="w-28 h-auto mx-auto"
                  style={{ filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.15))' }} />
              </motion.div>

              <h1 className="text-4xl font-black text-gray-900 tracking-tighter mb-3">
                ¡Hola,<br />{firstNameShort}! 👋
              </h1>
              <p className="text-gray-500 font-medium text-lg leading-relaxed max-w-xs">
                Vamos a crear tu <span className="font-bold" style={{ color: '#A80A0A' }}>perfil lector</span> para conectarte con libros y personas que comparten tus gustos.
              </p>

              <div className="mt-6 space-y-2.5 w-full text-left">
                {[
                  { icon: '📚', text: 'Elige tus géneros favoritos' },
                  { icon: '⭐', text: 'Agrega tu libro de cabecera' },
                  { icon: '🤝', text: 'Conecta con tu comunidad' },
                ].map((item, i) => (
                  <div key={i} className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm border border-gray-100">
                    <span className="text-2xl">{item.icon}</span>
                    <p className="font-bold text-gray-700 text-sm">{item.text}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ─── PASO 1: Escoge tu Emoji ─── */}
          {step === 1 && (
            <motion.div
              key="emoji"
              variants={variants} initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.25 }}
              className="flex-1 flex flex-col"
            >
              <h2 className="text-3xl font-black text-gray-900 tracking-tighter mb-1">
                ¿Cómo te ves hoy?
              </h2>
              <p className="text-gray-400 font-medium text-sm mb-6">
                Este emoji será tu imagen de perfil en BookMatch.
              </p>

              <div className="flex-1 overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-4 gap-4 pb-4">
                  {STUDENT_EMOJIS.map(emoji => {
                    const selected = selectedEmoji === emoji;
                    return (
                      <button
                        key={emoji}
                        onClick={() => setSelectedEmoji(emoji)}
                        className={`aspect-square rounded-3xl flex items-center justify-center text-3xl transition-all duration-200 border-2
                          ${selected ? 'bg-white shadow-lg scale-110' : 'bg-gray-50 border-transparent grayscale-[0.5] hover:grayscale-0'}`}
                        style={selected ? { borderColor: '#A80A0A' } : {}}
                      >
                        {emoji}
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* ─── PASO 2: Géneros ─── */}
          {step === 2 && (
            <motion.div
              key="generos"
              variants={variants} initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.25 }}
              className="flex-1 flex flex-col"
            >
              <h2 className="text-3xl font-black text-gray-900 tracking-tighter mb-1">
                ¿Qué te gusta leer?
              </h2>
              <p className="text-gray-400 font-medium text-sm mb-6">
                Elige al menos un género. Puedes seleccionar varios.
              </p>

              <div className="flex-1 overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-2 gap-3 pb-4">
                  {GENRES.map(genre => {
                    const selected = selectedGenres.includes(genre);
                    return (
                      <button
                        key={genre}
                        onClick={() => toggleGenre(genre)}
                        className={`p-4 rounded-3xl border-2 transition-all duration-200 text-left relative overflow-hidden
                          ${
                            selected
                              ? 'border-transparent bg-white shadow-md'
                              : 'border-transparent bg-white shadow-sm hover:border-gray-200'
                          }`}
                        style={selected ? { borderColor: '#A80A0A', backgroundColor: '#FFF5F5', boxShadow: '0 4px 12px rgba(168,10,10,0.1)' } : {}}
                      >
                        <span className={`font-black tracking-tight text-sm`} style={{ color: selected ? '#A80A0A' : '#374151' }}>
                          {genre}
                        </span>
                        {selected && (
                          <div className="absolute top-2 right-2 text-white rounded-full w-5 h-5 flex items-center justify-center" style={{ background: '#A80A0A' }}>
                            <Check size={11} />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {selectedGenres.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5 pb-1">
                  {selectedGenres.map(g => (
                    <span key={g} className="text-xs font-black px-2.5 py-1 rounded-full" style={{ background: '#FFF0F0', color: '#A80A0A' }}>
                      {g}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* ─── PASO 3: Libro Favorito ─── */}
          {step === 3 && (
            <motion.div
              key="libro"
              variants={variants} initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.25 }}
              className="flex-1 flex flex-col"
            >
              <h2 className="text-3xl font-black text-gray-900 tracking-tighter mb-1">
                Tu libro favorito
              </h2>
              <p className="text-gray-400 font-medium text-sm mb-5">
                Elige del catálogo o escribe el título manualmente.
              </p>

              {/* Search in catalog */}
              <div className="relative mb-4">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={search}
                  onChange={e => { setSearch(e.target.value); setCustomBook(''); }}
                  placeholder="Busca en el catálogo..."
                  className="w-full pl-10 pr-4 py-3.5 bg-white border-2 border-gray-100 focus:border-[#A80A0A] rounded-2xl outline-none text-sm font-medium text-gray-800 transition-all font-bold"
                />
              </div>

              {/* Catalog results — scrollable */}
              <div className="overflow-y-auto space-y-2 mb-4" style={{ maxHeight: '42vh', minHeight: '120px' }}>
                {filteredBooks.map(book => {
                  const selected = favoriteBook?.id === book.id;
                  return (
                    <button
                      key={book.id}
                      onClick={() => { setFavoriteBook(book); setCustomBook(''); setSearch(''); }}
                      className={`w-full flex items-center gap-4 p-3.5 rounded-2xl border-2 transition-all text-left group
                        ${selected
                          ? 'border-[#A80A0A] bg-[#A80A0A] shadow-lg shadow-red-900/20 scale-[1.02]'
                          : 'border-transparent bg-white shadow-sm hover:border-[#A80A0A]/20'
                        }`}
                    >
                      <div className="w-12 h-16 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                        <img src={book.image} alt={book.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`font-black text-sm leading-tight mb-0.5 ${selected ? 'text-white' : 'text-gray-800'}`}>
                          {book.title}
                        </p>
                        <p className={`text-xs font-bold truncate ${selected ? 'text-white/80' : 'text-gray-400'}`}>{book.author}</p>
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-full mt-1.5 inline-block ${selected ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'}`}>
                          {book.genre}
                        </span>
                      </div>
                      {selected && (
                        <div className="shrink-0 bg-white text-[#A80A0A] rounded-full w-7 h-7 flex items-center justify-center shadow-sm">
                          <Heart size={14} fill="currentColor" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Manual entry / Direct search option */}
              <div className="shrink-0 pt-2">
                {search.trim().length > 2 && filteredBooks.length === 0 && (
                  <button
                    onClick={() => { setCustomBook(search); setFavoriteBook(null); }}
                    className={`w-full p-4 rounded-xl border-2 font-black transition-all text-sm
                      ${customBook === search 
                        ? 'border-[#A80A0A] bg-[#A80A0A] text-white shadow-lg shadow-red-900/20' 
                        : 'border-[#A80A0A]/30 text-[#A80A0A] hover:bg-[#FFF0F0]'}`}
                  >
                    Usar "{search}" como mi libro favorito 📖
                  </button>
                )}
                {search.trim().length === 0 && (
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest text-center mt-2">
                    Si no está en el catálogo, escríbelo en el buscador.
                  </p>
                )}
              </div>
            </motion.div>
          )}

          {/* ─── PASO 4: Listo ─── */}
          {step === 4 && (
            <motion.div
              key="listo"
              variants={variants} initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.25 }}
              className="flex-1 flex flex-col justify-center items-center text-center"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                style={{ background: 'linear-gradient(135deg, #FFD700, #E0B300)' }}
              >
                <Sparkles className="text-white w-14 h-14" />
              </motion.div>

              <h2 className="text-4xl font-black text-gray-900 tracking-tighter mb-3">
                ¡Todo listo!
              </h2>
              <p className="text-gray-500 font-medium text-lg leading-relaxed max-w-xs mb-8">
                Tu perfil lector está creado. Comienza a descubrir libros y encuentra tu comunidad.
              </p>

              {/* Summary card */}
              <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 w-full text-left space-y-4">
                <div className="flex gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center text-3xl border border-gray-100 shadow-sm">
                    {selectedEmoji}
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Géneros favoritos</p>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedGenres.map(g => (
                        <span key={g} className="text-xs font-black px-2.5 py-1 rounded-full" style={{ background: '#FFF0F0', color: '#A80A0A' }}>{g}</span>
                      ))}
                    </div>
                  </div>
                </div>
                {(favoriteBook || customBook || search) && (
                  <div className="border-t border-gray-50 pt-4">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Libro favorito</p>
                    {favoriteBook ? (
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-14 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                          <img src={favoriteBook.image} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="font-black text-gray-900 text-sm leading-tight">{favoriteBook.title}</p>
                          <p className="text-xs text-gray-400 font-bold">{favoriteBook.author}</p>
                        </div>
                      </div>
                    ) : (
                      <p className="font-black text-gray-900 text-sm">"{customBook || search}"</p>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Bottom CTA */}
      <div className="px-6 pb-8 shrink-0 bg-gradient-to-t from-[#F8F9FD] to-transparent">
        {step < STEPS.length - 1 ? (
          <button
            onClick={() => setStep(s => s + 1)}
            disabled={!canAdvance}
            className="w-full text-white py-5 rounded-2xl font-black text-lg shadow-lg disabled:opacity-40 active:scale-95 transition-all flex items-center justify-center gap-2 group"
            style={{ background: canAdvance ? 'linear-gradient(135deg, #A80A0A, #5e0000)' : '#d1d5db', boxShadow: canAdvance ? '0 12px 32px -10px rgba(168,10,10,0.5)' : 'none' }}
          >
            {step === 0 ? 'Empezar' : step === STEPS.length - 2 ? 'Continuar' : 'Siguiente'}
            <ChevronRight size={20} className={canAdvance ? 'group-hover:translate-x-1 transition-transform' : ''} />
          </button>
        ) : (
          <button
            onClick={handleFinish}
            className="w-full text-white py-5 rounded-2xl font-black text-lg shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2"
            style={{ background: 'linear-gradient(135deg, #A80A0A, #5e0000)', boxShadow: '0 8px 24px rgba(168,10,10,0.3)' }}
          >
            <BookOpen size={20} />
            ¡Descubrir Libros!
          </button>
        )}
        {step > 0 && step < STEPS.length - 1 && (
          <button
            onClick={() => setStep(s => s - 1)}
            className="w-full text-center text-sm text-gray-400 font-bold mt-3 py-2 hover:text-gray-600 transition-colors"
          >
            ← Volver
          </button>
        )}
      </div>
    </div>
  );
}

export default Onboarding;
