import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { ITEMS } from '../data/mockData';
import { Star, X, Bookmark, ChevronRight, BookOpen, Users, Loader2, Share2, Download, Heart } from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import html2canvas from 'html2canvas';
import { MatchStoryCard } from './MatchStoryCard';

function MatchDeck({ user, likedIds, userProfile, onMatch, onShowTeacher, allTeachers }) {
  const [discardedIds, setDiscardedIds] = useState([]);
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [swipeAction, setSwipeAction] = useState(null); // 'left' | 'right'

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-20, 20]);
  const likeOpacity = useTransform(x, [30, 120], [0, 1]);
  const nopeOpacity = useTransform(x, [-30, -120], [0, 1]);
  
  const cardRef = React.useRef(null);
  const [isSharing, setIsSharing] = useState(false);

  // Filter by level, exclude liked + discarded, sort by genre affinity
  const deck = useMemo(() => {
    const preferredGenres = userProfile?.genres || [];

    return ITEMS.filter(item => {
      if (likedIds.includes(item.id)) return false;
      if (discardedIds.includes(item.id)) return false;
      if (user?.nivel === undefined) return true;
      if (item.minNivel !== undefined && user.nivel < item.minNivel) return false;
      if (item.maxNivel !== undefined && user.nivel > item.maxNivel) return false;
      return true;
    }).sort((a, b) => {
      const scoreA = preferredGenres.includes(a.genre) ? 1 : 0;
      const scoreB = preferredGenres.includes(b.genre) ? 1 : 0;
      return scoreB - scoreA;
    });
  }, [user, likedIds, discardedIds, userProfile]);

  // The current card is always deck[0]
  const item = deck[0] ?? null;

  // Real-time matching: which teachers liked THIS specific book?
  const matchingTeachers = useMemo(() => {
    if (!item) return [];
    return allTeachers.filter(t => (t.likes || []).some(l => String(l.id) === String(item.id)));
  }, [item, allTeachers]);

  const handleSocialShare = async () => {
    if (!item || matchingTeachers.length === 0) return;
    setIsSharing(true);

    const firstTeacher = matchingTeachers[0];
    const text = `¡Tengo una coincidencia lectora con "${item.title}" en BookMatch Umbral! 📚✨ Recomendado por ${firstTeacher.name}. #BookMatchUmbral`;
    
    try {
      // 1. Generate image from hidden card
      const canvas = await html2canvas(cardRef.current, {
        useCORS: true, 
        scale: 2, // Better resolution (2160x3840 ideally, but 2x is enough for 1080px base)
        logging: false,
        backgroundColor: '#A80A0A'
      });
      
      const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png', 0.9));
      const file = new File([blob], `match-${item.id}.png`, { type: 'image/png' });

      // 2. Share via Native API if possible
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: '¡BookMatch Perfecto!',
          text: text
        });
      } else {
        // Fallback: Download and copy text
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `match-${item.id}.png`;
        link.click();
        
        await navigator.clipboard.writeText(text);
        alert('¡Imagen descargada! Ya puedes subirla a tus historias. El texto para el pie de foto ha sido copiado al portapapeles.');
      }
    } catch (err) {
      console.warn('Share error:', err);
      alert('Hubo un problema al generar la imagen. Inténtalo de nuevo.');
    } finally {
      setIsSharing(false);
    }
  };

  const handleSwipe = (direction) => {
    if (!item) return;
    setSwipeAction(direction);
    if (direction === 'right') {
      if (matchingTeachers.length > 0) {
        setShowMatchModal(true);
      } else {
        handleMatchContinue(); // Direct like if no professor matches yet
      }
    } else {
      setTimeout(() => {
        setDiscardedIds(prev => [...prev, item.id]); // mark as discarded → removed from deck
        setSwipeAction(null);
        x.set(0);
      }, 300);
    }
  };

  const handleMatchContinue = () => {
    if (!item) return;
    onMatch(item);
    setDiscardedIds(prev => [...prev, item.id]); // also remove liked item from deck
    setShowMatchModal(false);
    setSwipeAction(null);
    x.set(0);
  };

  if (!item) {
    return (
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        className="flex-1 flex flex-col items-center justify-center p-8 text-center"
      >
        <div className="w-32 h-32 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
          <BookOpen size={60} className="text-indigo-300" strokeWidth={1.5} />
        </div>
        <h2 className="text-3xl font-black text-gray-900 tracking-tighter mb-2">¡Todo explorado!</h2>
        <p className="text-gray-500 mb-8 max-w-xs leading-relaxed">
          Has visto todas las lecturas disponibles. ¿Quieres volver a ver las que descartaste?
        </p>
        <button
          onClick={() => setDiscardedIds([])}
          className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black shadow-lg active:scale-95 transition-all"
        >
          Releer el Catálogo
        </button>
      </motion.div>
    );
  }

  return (
    <div className="flex-1 flex flex-col p-5 pb-0 relative overflow-hidden">

      {/* ── L A Y E R   B: Professor Match Modal ── */}
      <AnimatePresence>
        {showMatchModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] backdrop-blur-3xl flex flex-col items-center p-8 text-white text-center"
            style={{ background: 'radial-gradient(circle at center, #A80A0A 0%, #3a0000 60%, #050505 100%)' }}
          >
            <div className="flex-1 w-full max-w-sm flex flex-col items-center overflow-y-auto custom-scrollbar pt-20 pb-20">
            {/* Animated star */}
            <motion.div
              initial={{ scale: 0.3 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 15 }}
              className="relative mb-8"
            >
              <Star size={110} className="text-[#FFD700] fill-[#FFD700] drop-shadow-[0_0_30px_rgba(255,215,0,0.6)]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <Bookmark size={36} className="text-[#A80A0A]" fill="currentColor" />
              </div>
              <motion.div
                initial={{ rotate: 0, opacity: 0 }}
                animate={{ rotate: 12, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="absolute -top-4 -right-14 bg-white text-[#A80A0A] px-4 py-1.5 rounded-full font-black text-xs uppercase tracking-tight shadow-xl border-4 border-[#FFD700] animate-bounce"
              >
                ¡COINCIDENCIA!
              </motion.div>
            </motion.div>

            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-5xl font-black mb-3 tracking-tighter uppercase italic leading-none"
            >
              ¡LECTURA<br />PERFECTA!
            </motion.h2>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="text-blue-100 font-bold mb-8 text-lg"
            >
              Profes que te recomiendan este libro:
            </motion.p>

            {/* Professor cards */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="space-y-3 w-full max-w-sm mb-8"
            >
              {matchingTeachers.map((prof, i) => (
                <button
                  key={prof.id}
                  onClick={() => onShowTeacher(prof)}
                  className="w-full bg-white/10 p-4 rounded-2xl flex items-center gap-4 border border-white/20 hover:bg-white/20 transition-all group"
                >
                  <div 
                    className="w-14 h-14 rounded-xl flex items-center justify-center font-black text-xl border-2 border-white/30 shadow-lg group-hover:rotate-6 transition-transform shrink-0"
                    style={{ background: 'linear-gradient(135deg, #FFD700, #E0B300)', color: '#A80A0A' }}
                  >
                    {prof.emoji || prof.name.charAt(0)}
                  </div>
                  <div className="text-left flex-1">
                    <p className="font-black text-lg leading-tight">{prof.name}</p>
                    <p className="text-xs font-bold text-white/70 uppercase tracking-widest">{prof.dept}</p>
                  </div>
                  <div className="bg-white/15 p-2 rounded-full opacity-60 group-hover:opacity-100 transition-opacity">
                    <ChevronRight size={14} />
                  </div>
                </button>
              ))}
            </motion.div>



            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col gap-3 w-full max-w-sm mt-auto"
            >
              {/* Hidden Card for capture */}
              <div className="absolute opacity-0 pointer-events-none" style={{ left: '-5000px' }}>
                <MatchStoryCard 
                  book={item} 
                  teacher={matchingTeachers[0]} 
                  user={user} 
                  innerRef={cardRef} 
                />
              </div>

              <button
                onClick={handleSocialShare}
                disabled={isSharing}
                className="bg-[#25D366] hover:bg-[#128C7E] text-white px-10 py-4 rounded-2xl font-black text-lg shadow-xl hover:scale-105 active:scale-95 transition-all flex flex-col items-center justify-center gap-1 border-4 border-white/20"
              >
                <div className="flex items-center gap-3">
                  {isSharing ? <Loader2 size={24} className="animate-spin" /> : <Share2 size={24} />}
                  <span className="text-xl">COMPARTIR HISTORIA</span>
                </div>
                <span className="text-[10px] font-bold opacity-80 uppercase tracking-widest leading-none mt-1">Generado para Instagram/TikTok</span>
              </button>

              <button
                onClick={handleMatchContinue}
                disabled={isSharing}
                className="text-[#A80A0A] bg-white px-10 py-4 rounded-2xl font-black text-lg shadow-2xl hover:scale-105 active:scale-95 transition-all w-full flex items-center justify-center"
              >
                ¡Sigue Explorando! →
              </button>
            </motion.div>
</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── L A Y E R   A: Swipe Deck ── */}
      <div className="flex-1 relative flex flex-col min-h-0">
        <AnimatePresence>
          <motion.div
            key={item.id}
            style={{ x, rotate, touchAction: 'pan-y' }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.9}
            onDragEnd={(_, info) => {
              if (info.offset.x > 100) handleSwipe('right');
              else if (info.offset.x < -100) handleSwipe('left');
              else x.set(0);
            }}
            animate={
              swipeAction === 'left'
                ? { x: -500, rotate: -25, opacity: 0 }
                : swipeAction === 'right'
                ? { x: 500, rotate: 25, opacity: 0 }
                : { x: 0, rotate: 0, opacity: 1 }
            }
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 w-full bg-white rounded-[2.5rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col border border-gray-100 cursor-grab active:cursor-grabbing"
          >
            {/* Like / Nope Labels */}
            <motion.div style={{ opacity: likeOpacity }} className="absolute top-8 right-6 z-20 rotate-[20deg]">
              <div className="border-4 border-[#FFD700] text-[#FFD700] px-4 py-1.5 rounded-xl font-black text-2xl tracking-tight bg-black/10 backdrop-blur-sm">LO QUIERO</div>
            </motion.div>
            <motion.div style={{ opacity: nopeOpacity }} className="absolute top-8 left-6 z-20 -rotate-[20deg]">
              <div className="border-4 border-gray-400 text-gray-400 px-4 py-1.5 rounded-xl font-black text-2xl tracking-tight">PASO</div>
            </motion.div>

            {/* Cover Image */}
            <div className="h-[55%] relative overflow-hidden shrink-0 group">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Type badge */}
              <div className="absolute top-4 left-4">
                <span className="bg-[#A80A0A]/90 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-lg">
                  <Bookmark size={10} fill="currentColor" /> {item.type}
                </span>
              </div>
              {/* Title overlay */}
              <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent text-white">
                <h2 className="text-3xl font-black leading-tight tracking-tighter mb-1">{item.title}</h2>
                <p className="text-base font-bold text-blue-100 opacity-90">{item.author}</p>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-6 overflow-y-auto custom-scrollbar flex flex-col gap-4">
              <span className="inline-block px-3 py-1 rounded-lg text-xs font-black uppercase tracking-widest border self-start"
                    style={{ background: '#FFF0F0', color: '#A80A0A', borderColor: '#FECACA' }}>
                {item.genre}
              </span>
              <p className="text-gray-500 leading-relaxed font-medium italic text-sm">
                "{item.description}"
              </p>
              {/* Professor hint */}
              <div className="flex items-center gap-2 mt-auto pt-3 border-t border-gray-50">
                <div className="flex -space-x-2">
                  {matchingTeachers.map((p, i) => (
                    <div
                      key={p.id}
                      className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-lg shadow-sm"
                      style={{ background: '#A80A0A' }}
                    >
                      {p.emoji || '👨‍🏫'}
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-400 font-medium">
                  {matchingTeachers.length === 0 
                    ? 'Sé el primero en recomendarlo' 
                    : `${matchingTeachers.length} profe${matchingTeachers.length !== 1 ? 's' : ''} lo recomienda${matchingTeachers.length !== 1 ? 'n' : ''}`
                  }
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Swipe Buttons ── */}
      <div className="flex justify-center items-center gap-10 py-5 shrink-0 z-10">
        <button
          onClick={() => handleSwipe('left')}
            className="w-20 h-20 rounded-full bg-white shadow-xl flex items-center justify-center border transition-all active:scale-90"
            style={{ borderColor: '#fee2e2', color: '#A80A0A' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#A80A0A'; e.currentTarget.style.color = 'white'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.color = '#A80A0A'; }}
        >
          <X size={36} strokeWidth={3} />
        </button>
        <button
          onClick={() => handleSwipe('right')}
            className="w-20 h-20 rounded-full shadow-xl flex items-center justify-center text-white border-2 border-white/50 transition-all active:scale-95"
            style={{ background: 'linear-gradient(135deg, #FFD700, #E0B300)', color: '#A80A0A', boxShadow: '0 8px 24px rgba(255,215,0,0.4)' }}
        >
          <Star size={36} fill="currentColor" strokeWidth={0} />
        </button>
      </div>
    </div>
  );
}

export default MatchDeck;
