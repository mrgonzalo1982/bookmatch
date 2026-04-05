import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ITEMS, TEACHERS, canMatch, getPeerLikes, getPeerProfile, compatibilityScore } from '../data/mockData';
import { Users, X, BookOpen, Star, ChevronRight, Sparkles } from 'lucide-react';

// ── Teacher Detail Modal ──────────────────────────────────────────────────────
export function TeacherModal({ teacher, onClose }) {
  const books = ITEMS.filter(item => teacher.recommendedIds.includes(item.id));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-50 bg-white flex flex-col"
    >
      {/* Header */}
      <div className="relative h-36 shrink-0" style={{ background: 'linear-gradient(135deg, #154996, #001A4D)' }}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full z-10"
        >
          <X size={18} />
        </button>
        <div className="absolute -bottom-10 left-6">
          <div className="w-20 h-20 rounded-2xl bg-white shadow-xl border-4 border-white flex items-center justify-center text-4xl">
            {teacher.emoji}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 custom-scrollbar">
        <div className="pt-14 pb-6">
          <h2 className="text-2xl font-black text-gray-900 tracking-tighter">{teacher.name}</h2>
          <p className="font-bold text-xs uppercase tracking-widest mb-1" style={{ color: '#A80A0A' }}>{teacher.dept}</p>
          <p className="text-xs text-gray-400 font-mono mb-4">{teacher.email}</p>

          <p className="text-gray-600 font-medium leading-relaxed text-sm mb-6">{teacher.bio}</p>

          {/* Recommended Books */}
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-1.5">
              <Star size={10} className="text-yellow-400" fill="currentColor" />
              Lecturas que recomienda ({books.length})
            </p>
            <div className="space-y-3">
              {books.map(book => (
                <div key={book.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="w-10 h-14 rounded-xl overflow-hidden shrink-0 bg-gray-200">
                    <img src={book.image} alt={book.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-black text-sm text-gray-900 leading-tight truncate">{book.title}</p>
                    <p className="text-xs font-bold truncate" style={{ color: '#154996' }}>{book.author}</p>
                    <span className="inline-block mt-1 bg-blue-50 text-blue-600 text-[9px] font-black px-2 py-0.5 rounded-full">
                      {book.genre}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Main CommunityView ────────────────────────────────────────────────────────
function CommunityView({ user, likedIds, userProfile, allStudents, onShowTeacher }) {

  // Filter teachers that teach this level
  const myTeachers = useMemo(() => {
    if (!user) return TEACHERS;
    return TEACHERS.filter(t =>
      user.nivel >= t.nivelMin && user.nivel <= t.nivelMax
    );
  }, [user]);

  // Compute compatible peers
  const peers = useMemo(() => {
    if (!user) return [];

    const myProfile = {
      likedIds,
      genres: userProfile?.genres || [],
      favoriteBook: userProfile?.favoriteBook || null,
    };

    return allStudents
      .filter(s => s.rut !== user.rut && canMatch(user.nivel, s.nivel))
      .map(s => {
        const peerLikes = getPeerLikes(s.rut);
        const peerProf = getPeerProfile(s.rut);
        const score = compatibilityScore(myProfile, peerLikes, peerProf);
        const commonIds = likedIds.filter(id => peerLikes.includes(id));
        const commonBooks = ITEMS.filter(item => commonIds.includes(item.id));
        const commonGenres = (userProfile?.genres || []).filter(g => peerProf.genres.includes(g));
        return { ...s, score, commonBooks, commonGenres };
      })
      .filter(s => s.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 15);
  }, [user, likedIds, userProfile, allStudents]);

  return (
    <div className="flex-1 flex flex-col overflow-hidden relative">
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {/* ── Profesores Section ── */}
        <div className="pt-5 pb-3">
          <div className="flex items-center justify-between px-5 mb-4">
            <h2 className="text-xl font-black text-gray-900 tracking-tighter">Profesores</h2>
            <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: '#154996' }}>{myTeachers.length} disponibles</span>
          </div>

          {/* Horizontal scroll of teacher cards */}
          <div className="flex gap-4 px-5 pb-2 overflow-x-auto custom-scrollbar">
            {myTeachers.map(teacher => {
              const matchingBooks = ITEMS.filter(
                item => teacher.recommendedIds.includes(item.id) && likedIds.includes(item.id)
              );
              const hasMatch = matchingBooks.length > 0;

              return (
                <button
                  key={teacher.id}
                  onClick={() => onShowTeacher(teacher)}
                  className={`shrink-0 w-36 rounded-3xl p-4 flex flex-col items-center text-center transition-all active:scale-95 border
                    ${hasMatch
                      ? 'bg-white border-[#154996] shadow-md'
                      : 'bg-white border-gray-100 shadow-sm'
                    }`}
                >
                  <div className="relative mb-3">
                    <div className="w-16 h-16 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-3xl shadow-sm">
                      {teacher.emoji}
                    </div>
                    {hasMatch && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center"
                          style={{ background: '#A80A0A' }}>
                        <span className="text-white text-[8px] font-black">{matchingBooks.length}</span>
                      </div>
                    )}
                  </div>
                  <p className="font-black text-xs text-gray-900 leading-tight">{teacher.shortName}</p>
                  <p className="text-[9px] font-bold mt-0.5 leading-tight" style={{ color: '#154996' }}>{teacher.dept.split(' ')[0]}</p>
                  {hasMatch && (
                    <span className="mt-2 text-[8px] font-black px-2 py-0.5 rounded-full" style={{ background: '#FFF0F0', color: '#A80A0A' }}>
                      {matchingBooks.length} libro{matchingBooks.length > 1 ? 's' : ''} en común
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="mx-5 border-t border-gray-100 my-2" />

        {/* ── Community / Peers Section ── */}
        <div className="px-5 pt-3 pb-24">
          <div className="flex items-end justify-between mb-4">
            <h2 className="text-xl font-black text-gray-900 tracking-tighter">Almas Gemelas</h2>
            {peers.length > 0 && (
              <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: '#154996' }}>{peers.length} coincidencias</span>
            )}
          </div>

          {peers.length === 0 ? (
            <div className="flex flex-col items-center py-10 text-center">
              <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                <Sparkles size={36} style={{ color: '#154996' }} strokeWidth={1.5} opacity={0.3} />
              </div>
              <p className="text-sm font-black text-gray-400 max-w-[200px]">
                {(userProfile?.genres?.length || 0) > 0
                  ? 'Da Me Gusta a libros para descubrir almas gemelas.'
                  : 'Completa tu perfil y da Me Gusta a libros para conectar.'}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {peers.map((peer, idx) => (
                <motion.div
                  key={peer.rut}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.04 }}
                  className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all flex items-center gap-4"
                >
                  <div className="text-center shrink-0 w-8">
                    {idx === 0 && <span className="text-xl">🥇</span>}
                    {idx === 1 && <span className="text-xl">🥈</span>}
                    {idx === 2 && <span className="text-xl">🥉</span>}
                    {idx > 2 && <span className="text-sm font-black text-gray-300">#{idx + 1}</span>}
                  </div>

                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-100 overflow-hidden border-2 border-white shadow-sm shrink-0">
                    <img src={peer.avatar} alt={peer.nombre} className="w-full h-full object-cover p-1"
                      onError={(e) => { e.target.style.display = 'none'; }} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-black text-gray-900 text-sm truncate leading-tight">
                      {peer.nombre.split(' ').slice(2).join(' ') || peer.nombre.split(' ')[0]}
                    </p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter truncate">{peer.curso}</p>
                    <div className="flex items-center gap-1 mt-1.5 flex-wrap">
                      {peer.commonBooks.slice(0, 1).map(book => (
                        <span key={book.id} className="bg-blue-50 text-blue-600 text-[9px] font-black px-2 py-0.5 rounded-full border border-blue-100 truncate max-w-[90px]">
                          📚 {book.title.split(' ').slice(0, 2).join(' ')}
                        </span>
                      ))}
                      {peer.commonGenres?.slice(0, 1).map(g => (
                        <span key={g} className="bg-pink-50 text-pink-600 text-[9px] font-black px-2 py-0.5 rounded-full border border-pink-100">
                          🎭 {g}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="shrink-0 flex flex-col items-center">
                    <div className="relative w-14 h-14">
                      <svg className="w-14 h-14 -rotate-90" viewBox="0 0 36 36">
                        <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e0e7ff" strokeWidth="3" />
                        <circle
                          cx="18" cy="18" r="15.9" fill="none"
                          stroke={peer.score >= 70 ? '#A80A0A' : peer.score >= 40 ? '#154996' : '#fca5a5'}
                          strokeWidth="3"
                          strokeDasharray={`${peer.score} 100`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs font-black" style={{ color: '#A80A0A' }}>{peer.score}%</span>
                      </div>
                    </div>
                    <span className="text-[9px] text-gray-400 font-bold mt-0.5">Compat.</span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

CommunityView.TeacherModal = TeacherModal;
export default CommunityView;
