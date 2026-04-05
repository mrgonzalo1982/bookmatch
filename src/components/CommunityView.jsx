import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ITEMS, STUDENTS, canMatch, compatibilityScore } from '../data/mockData';
import { Users, X, BookOpen, Star, Sparkles, Heart, Loader2 } from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

const RED  = '#A80A0A';
const BLUE = '#154996';

// ── Teacher Detail Modal ──────────────────────────────────────────────────────
// Now receives full teacher data from Firestore (likes = recommended books)
export function TeacherModal({ teacher, onClose }) {
  if (!teacher) return null;

  // recommendedBooks = books the teacher has liked (from Firestore likss)
  const books = (teacher.likes || []).filter(b => b && b.id);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-50 bg-white flex flex-col"
    >
      {/* Header */}
      <div className="relative h-36 shrink-0" style={{ background: 'linear-gradient(135deg, #A80A0A, #001A4D)' }}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full z-10"
        >
          <X size={18} />
        </button>
        <div className="absolute -bottom-10 left-6">
          <div className="w-20 h-20 rounded-2xl bg-white shadow-xl border-4 border-white flex items-center justify-center text-4xl">
            {teacher.emoji || teacher.profile?.emoji || '📚'}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 custom-scrollbar">
        <div className="pt-14 pb-6">
          <h2 className="text-2xl font-black text-gray-900 tracking-tighter">
            {teacher.name || teacher.profile?.name || 'Docente'}
          </h2>
          <p className="font-bold text-xs uppercase tracking-widest mb-1" style={{ color: RED }}>
            {teacher.dept || teacher.profile?.dept || 'Docente'}
          </p>
          <p className="text-xs text-gray-400 font-mono mb-4">{teacher.email || ''}</p>

          {/* Bio from profile */}
          {teacher.bio && (
            <p className="text-gray-600 font-medium leading-relaxed text-sm mb-6">{teacher.bio}</p>
          )}

          {/* Recommended Books = teacher's real likes */}
          <div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-1.5">
              <Heart size={10} fill={RED} color={RED} />
              Lecturas que recomienda ({books.length})
            </p>
            {books.length === 0 ? (
              <div className="text-center py-8 text-gray-300">
                <BookOpen size={32} className="mx-auto mb-2 opacity-40" />
                <p className="font-black text-sm">Aún sin recomendaciones</p>
                <p className="text-xs mt-1">Este docente aún no ha seleccionado libros favoritos</p>
              </div>
            ) : (
              <div className="space-y-3">
                {books.map(book => (
                  <div key={book.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl border border-gray-100">
                    <div className="w-10 h-14 rounded-xl overflow-hidden shrink-0 bg-gray-200">
                      <img src={book.image} alt={book.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-black text-sm text-gray-900 leading-tight truncate">{book.title}</p>
                      <p className="text-xs font-bold truncate" style={{ color: RED }}>{book.author}</p>
                      <span className="inline-block mt-1 bg-blue-50 text-blue-600 text-[9px] font-black px-2 py-0.5 rounded-full">
                        {book.genre}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Main CommunityView ────────────────────────────────────────────────────────
function CommunityView({ user, likedIds, userProfile, allStudents, onShowTeacher }) {
  const [teachers, setTeachers]   = useState([]);
  const [firestoreDb, setFirestoreDb] = useState({}); // { rut: { likes, profile } }
  const [isLoading, setIsLoading] = useState(true);

  // Load real teachers from Firestore and peer data
  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      try {
        const snap = await getDocs(collection(db, 'users'));
        const teacherList = [];
        const dbMap = {};

        snap.forEach(docSnap => {
          const data = docSnap.data();
          const rut = docSnap.id;

          if (data.role === 'teacher') {
            // Only show teachers with at least a name
            if (data.profile?.name) {
              teacherList.push({
                id: rut,
                rut,
                name: data.profile.name,
                dept: data.profile.dept || 'Docente',
                emoji: data.profile.emoji || '📚',
                bio: data.profile.bio || '',
                email: data.profile.email || '',
                likes: data.likes || [],
                nivelMin: 5,
                nivelMax: 12,
              });
            }
          } else if (data.role === 'student' || !data.role) {
            if (data.profile && data.likes) {
              dbMap[rut] = { profile: data.profile, likes: data.likes };
            }
          }
        });

        setTeachers(teacherList);
        setFirestoreDb(dbMap);
      } catch (e) {
        console.error('CommunityView load error:', e);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, []);

  // My teachers (no nivel filter — all teachers are shown for now)
  const myTeachers = teachers;

  // Compute compatible peers from Firestore data
  const peers = useMemo(() => {
    if (!user || !userProfile || likedIds.length === 0) return [];

    const myProfile = {
      likedIds,
      genres: userProfile?.genres || [],
      favoriteBook: userProfile?.favoriteBook || null,
    };

    const clean = rut => rut.replace(/[^0-9kK]/gi, '').toLowerCase();

    return allStudents
      .filter(s => {
        if (clean(s.rut) === clean(user.rut)) return false;
        if (!canMatch(user.nivel, s.nivel)) return false;
        const cr = clean(s.rut);
        return firestoreDb[cr] && firestoreDb[cr].profile && firestoreDb[cr].likes?.length > 0;
      })
      .map(s => {
        const cr = clean(s.rut);
        const peerData = firestoreDb[cr];
        const peerLikes = (peerData.likes || []).map(li => li.id);
        const peerProf = peerData.profile || { genres: [] };
        const score = compatibilityScore(myProfile, peerLikes, peerProf);
        const commonIds = likedIds.filter(id => peerLikes.includes(id));
        const commonBooks = ITEMS.filter(item => commonIds.includes(item.id));
        const commonGenres = myProfile.genres.filter(g => peerProf.genres.includes(g));
        return { ...s, score, commonBooks, commonGenres, realEmoji: peerProf.emoji };
      })
      .filter(s => s.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 15);
  }, [user, likedIds, userProfile, allStudents, firestoreDb]);

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center opacity-40">
        <Loader2 size={32} className="animate-spin mb-2" style={{ color: RED }} />
        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Cargando comunidad...</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden relative">
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {/* ── Profesores Section ── */}
        <div className="pt-5 pb-3">
          <div className="flex items-center justify-between px-5 mb-4">
            <h2 className="text-xl font-black text-gray-900 tracking-tighter">Profesores</h2>
            <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: RED }}>
              {myTeachers.length} disponibles
            </span>
          </div>

          {myTeachers.length === 0 ? (
            <div className="px-5 py-6 text-center text-gray-300">
              <Users size={32} className="mx-auto mb-2 opacity-40" />
              <p className="font-black text-sm">Aún no hay profesores registrados</p>
              <p className="text-xs mt-1">El administrador puede agregar docentes desde el panel</p>
            </div>
          ) : (
            <div className="flex gap-4 px-5 pb-2 overflow-x-auto custom-scrollbar">
              {myTeachers.map(teacher => {
                const teacherLikedIds = (teacher.likes || []).map(b => b.id);
                const matchingBooks = ITEMS.filter(
                  item => teacherLikedIds.includes(item.id) && likedIds.includes(item.id)
                );
                const hasMatch = matchingBooks.length > 0;

                return (
                  <button
                    key={teacher.id}
                    onClick={() => onShowTeacher({ ...teacher, likes: teacher.likes })}
                    className={`shrink-0 w-36 rounded-3xl p-4 flex flex-col items-center text-center transition-all active:scale-95 border
                      ${hasMatch
                        ? 'bg-white border-[#A80A0A] shadow-md'
                        : 'bg-white border-gray-100 shadow-sm'
                      }`}
                  >
                    <div className="relative mb-3">
                      <div className="w-16 h-16 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-3xl shadow-sm">
                        {teacher.emoji}
                      </div>
                      {hasMatch && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center"
                            style={{ background: RED }}>
                          <span className="text-white text-[8px] font-black">{matchingBooks.length}</span>
                        </div>
                      )}
                    </div>
                    <p className="font-black text-xs text-gray-900 leading-tight">{teacher.name}</p>
                    <p className="text-[9px] font-bold mt-0.5 leading-tight" style={{ color: RED }}>{teacher.dept}</p>
                    {hasMatch && (
                      <span className="mt-2 text-[8px] font-black px-2 py-0.5 rounded-full" style={{ background: '#FFF0F0', color: RED }}>
                        {matchingBooks.length} libro{matchingBooks.length > 1 ? 's' : ''} en común
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* ── Divider ── */}
        <div className="mx-5 border-t border-gray-100 my-2" />

        {/* ── Community / Peers Section ── */}
        <div className="px-5 pt-3 pb-24">
          <div className="flex items-end justify-between mb-4">
            <h2 className="text-xl font-black text-gray-900 tracking-tighter">Almas Gemelas</h2>
            {peers.length > 0 && (
              <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: RED }}>{peers.length} coincidencias</span>
            )}
          </div>

          {peers.length === 0 ? (
            <div className="flex flex-col items-center py-10 text-center">
              <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                <Sparkles size={36} style={{ color: RED }} strokeWidth={1.5} opacity={0.3} />
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

                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-2xl shrink-0 border-2 border-white shadow-sm">
                    {peer.realEmoji || '👤'}
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
                          stroke={peer.score >= 70 ? RED : peer.score >= 40 ? RED : '#fca5a5'}
                          strokeWidth="3"
                          strokeDasharray={`${peer.score} 100`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs font-black" style={{ color: RED }}>{peer.score}%</span>
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
