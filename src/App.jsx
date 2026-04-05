import React, { useState, useEffect } from 'react';
import { STUDENTS } from './data/mockData';
import Login from './components/Login';
import Onboarding from './components/Onboarding';
import MatchDeck from './components/MatchDeck';
import MatchList from './components/MatchList';
import CommunityView from './components/CommunityView';
import { BookOpen, Heart, Users, User, LogOut, GraduationCap, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ── Bottom nav tabs ───────────────────────────────────────────────────────────
const NAV = [
  { id: 'deck',      label: 'Descubrir',  Icon: BookOpen },
  { id: 'matches',   label: 'Matches',    Icon: Heart },
  { id: 'community', label: 'Comunidad',  Icon: Users },
  { id: 'profile',   label: 'Perfil',     Icon: User },
];

// Navy / brand palette
const RED  = '#A80A0A';
const NAVY = '#0E2A5C';
const GOLD = '#FFCC00';

function App() {
  const [user, setUser]             = useState(null);
  const [view, setView]             = useState('login');
  const [likedItems, setLikedItems] = useState([]);
  const [userProfile, setUserProfile] = useState(null);

  // ── Restore session ──────────────────────────────────────────────────────────
  useEffect(() => {
    try {
      const saved      = localStorage.getItem('bm-user');
      const savedLikes = localStorage.getItem('bm-likes');
      const savedProf  = localStorage.getItem('bm-profile');
      if (saved) {
        setUser(JSON.parse(saved));
        setView('deck');
        if (savedLikes) setLikedItems(JSON.parse(savedLikes));
        if (savedProf)  setUserProfile(JSON.parse(savedProf));
      }
    } catch {}
  }, []);

  // ── Login ────────────────────────────────────────────────────────────────────
  const handleLogin = (rut) => {
    const clean = s => s.replace(/[^0-9kK]/gi, '').toLowerCase();
    const found = STUDENTS.find(s => clean(s.rut) === clean(rut));
    if (found) {
      setUser(found);
      localStorage.setItem('bm-user', JSON.stringify(found));
      const existingProfile = localStorage.getItem('bm-profile');
      if (existingProfile) {
        setUserProfile(JSON.parse(existingProfile));
        setView('deck');
      } else {
        setView('onboarding');
      }
      return true;
    }
    return false;
  };

  // ── Onboarding ───────────────────────────────────────────────────────────────
  const handleFinishOnboarding = (profile) => {
    setUserProfile(profile);
    localStorage.setItem('bm-profile', JSON.stringify(profile));
    setView('deck');
  };

  // ── Match ────────────────────────────────────────────────────────────────────
  const handleMatch = (item) => {
    if (likedItems.find(m => m.id === item.id)) return;
    const updated = [...likedItems, item];
    setLikedItems(updated);
    localStorage.setItem('bm-likes', JSON.stringify(updated));
  };

  // ── Logout ───────────────────────────────────────────────────────────────────
  const handleLogout = () => {
    setUser(null); setLikedItems([]); setUserProfile(null);
    setView('login'); localStorage.clear();
  };

  // ── Guard ────────────────────────────────────────────────────────────────────
  if (!user || view === 'login')   return <Login onLogin={handleLogin} />;
  if (view === 'onboarding')       return <Onboarding user={user} onFinish={handleFinishOnboarding} />;

  const likedIds = likedItems.map(i => i.id);

  // ── Badges ───────────────────────────────────────────────────────────────────
  const ALL_BADGES = [
    { id: 'first_match', emoji: '🌟', name: 'Primer Match',    desc: 'Diste tu primer Like',              unlocked: likedIds.length >= 1 },
    { id: 'voraz',       emoji: '📚', name: 'Lector Voraz',    desc: '5 libros en tu biblioteca',          unlocked: likedIds.length >= 5 },
    { id: 'perfil',      emoji: '🎓', name: 'Perfil Completo', desc: 'Completaste tu perfil lector',       unlocked: !!userProfile?.genres?.length },
    { id: 'explorador',  emoji: '📌', name: 'Explorador',      desc: 'Iniciaste sesión por primera vez',   unlocked: true },
    { id: 'genero',      emoji: '🎨', name: 'Con Estilo',      desc: 'Seleccionaste 3 géneros favoritos',  unlocked: (userProfile?.genres?.length || 0) >= 3 },
    { id: 'favorito',    emoji: '⭐', name: 'Libro del Alma',  desc: 'Agregaste tu libro favorito',        unlocked: !!userProfile?.favoriteBook },
  ];

  // ── Views ────────────────────────────────────────────────────────────────────
  const renderView = () => {
    switch (view) {
      case 'deck':
        return <MatchDeck key="deck" user={user} likedIds={likedIds} userProfile={userProfile} onMatch={handleMatch} />;

      case 'matches':
        return <MatchList key="matches" matches={likedItems} setView={setView} />;

      case 'community':
        return (
          <CommunityView
            key="community"
            user={user}
            likedIds={likedIds}
            userProfile={userProfile}
            allStudents={STUDENTS}
          />
        );

      case 'profile':
        return (
          <div key="profile" className="flex-1 overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
            {/* Profile hero */}
            <div className="pb-10 px-6 pt-10" style={{ background: `linear-gradient(160deg, ${NAVY} 0%, #1a3a72 100%)` }}>
              <div className="flex flex-col items-center">
                <div className="relative mb-4">
                  <div className="w-28 h-28 rounded-3xl overflow-hidden bg-white/10 border-4 border-white/20 shadow-2xl">
                    <img src={user.avatar} alt={user.nombre} className="w-full h-full object-cover p-1.5"
                      onError={e => { e.target.style.display = 'none'; }} />
                  </div>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-emerald-400 px-3 py-0.5 rounded-full text-white text-[9px] font-black uppercase tracking-widest shadow">
                    En línea
                  </div>
                </div>
                <h2 className="text-2xl font-black text-white tracking-tighter text-center mt-2">
                  {user.nombre?.split(' ').slice(-2).join(' ')}
                </h2>
                <p className="font-bold text-xs uppercase tracking-widest mt-1" style={{ color: GOLD }}>{user.curso}</p>
                <p className="text-white/40 font-mono text-xs mt-1">{user.rut}</p>
              </div>

              {/* Stats inside hero */}
              <div className="grid grid-cols-3 gap-3 mt-6">
                {[
                  { Icon: Heart, value: likedItems.length, label: 'Matches', fill: true },
                  { Icon: BookOpen, value: userProfile?.genres?.length || 0, label: 'Géneros' },
                  { Icon: GraduationCap, value: user.nivel, label: 'Nivel' },
                ].map(({ Icon, value, label, fill }) => (
                  <div key={label} className="bg-white rounded-2xl p-4 shadow-lg border border-gray-100 text-center">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center mx-auto mb-1.5"
                      style={{ background: '#FFF0F0' }}>
                      <Icon size={16} style={{ color: RED }} fill={fill ? RED : 'none'} />
                    </div>
                    <p className="text-xl font-black text-gray-900">{value}</p>
                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-tighter">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Content cards */}
            <div className="px-5 pb-10 space-y-4">
              {/* Badges */}
              <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Insignias</p>
                  <span className="text-xs font-black" style={{ color: RED }}>
                    {ALL_BADGES.filter(b => b.unlocked).length}/{ALL_BADGES.length}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {ALL_BADGES.map(badge => (
                    <div key={badge.id} title={badge.desc}
                      className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl text-center transition-all border
                        ${badge.unlocked ? 'bg-amber-50 border-amber-100' : 'bg-gray-50 opacity-35 grayscale border-gray-100'}`}>
                      <span className="text-2xl">{badge.emoji}</span>
                      <p className={`text-[9px] font-black leading-tight ${badge.unlocked ? 'text-amber-700' : 'text-gray-400'}`}>
                        {badge.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Genres */}
              {userProfile?.genres?.length > 0 && (
                <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Géneros favoritos</p>
                  <div className="flex flex-wrap gap-2">
                    {userProfile.genres.map(g => (
                      <span key={g} className="text-xs font-black px-3 py-1 rounded-full"
                        style={{ background: '#EEF2FF', color: NAVY }}>{g}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Fav book */}
              {userProfile?.favoriteBook && (
                <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                    <Star size={10} style={{ color: GOLD }} fill={GOLD} /> Libro de cabecera
                  </p>
                  {userProfile.favoriteBookObj ? (
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-16 rounded-xl overflow-hidden shrink-0 bg-gray-100">
                        <img src={userProfile.favoriteBookObj.image} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-black text-gray-900 text-sm leading-tight">{userProfile.favoriteBookObj.title}</p>
                        <p className="text-xs font-bold" style={{ color: NAVY }}>{userProfile.favoriteBookObj.author}</p>
                      </div>
                    </div>
                  ) : (
                    <p className="font-black text-gray-800 text-sm italic">"{userProfile.favoriteBook}"</p>
                  )}
                </div>
              )}

              {/* Liked books */}
              {likedItems.length > 0 && (
                <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Mi Biblioteca</p>
                  {likedItems.map(book => (
                    <div key={book.id} className="flex items-center gap-3 py-2.5 border-b border-gray-50 last:border-0">
                      <div className="w-8 h-11 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                        <img src={book.image} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-black text-gray-800 truncate">{book.title}</p>
                        <p className="text-[10px] font-bold truncate" style={{ color: NAVY }}>{book.author}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <button onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 text-gray-400 font-bold text-xs uppercase tracking-widest hover:text-red-500 py-4 transition-all">
                <LogOut size={14} /> Cerrar Sesión
              </button>
            </div>
          </div>
        );

      default: return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto relative overflow-hidden shadow-2xl"
      style={{ height: '100dvh', fontFamily: 'Poppins, sans-serif', background: '#F2F4F8' }}>

      {/* ── Header (dark navy) ─────────────────────────────────────────────── */}
      <header className="px-5 py-3 flex items-center justify-between shrink-0 z-10"
        style={{ background: NAVY }}>

        {/* Avatar */}
        <button onClick={() => setView('profile')}
          className={`transition-all duration-200 ${view === 'profile' ? 'scale-90 opacity-80' : ''}`}>
          <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-white/20">
            <img src={user.avatar} alt="" className="w-full h-full object-cover p-0.5"
              onError={e => { e.target.style.display = 'none'; }} />
          </div>
        </button>

        {/* Logo */}
        <button onClick={() => setView('deck')} className="flex items-center gap-2.5">
          <img src="/umbral-shield.png" alt="Umbral" className="w-7 h-auto"
            style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.4))' }} />
          <span className="font-black text-base tracking-tighter text-white">BookMatch</span>
        </button>

        {/* Like counter */}
        <div className="flex items-center gap-1.5 rounded-full px-3 py-1 border border-white/10"
          style={{ background: 'rgba(255,255,255,0.08)' }}>
          <Heart size={11} fill={RED} color={RED} />
          <span className="text-xs font-black text-white">{likedItems.length}</span>
        </div>
      </header>

      {/* ── Main ────────────────────────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col min-h-0 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="absolute inset-0 flex flex-col"
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* ── Bottom Nav (dark navy) ─────────────────────────────────────────── */}
      <nav className="px-4 py-2 flex justify-around items-center shrink-0 z-10 border-t border-white/10"
        style={{ background: NAVY }}>
        {NAV.map(({ id, label, Icon }) => {
          const active = view === id;
          return (
            <button key={id} onClick={() => setView(id)}
              className="flex flex-col items-center gap-1 px-3 py-1.5 rounded-2xl transition-all duration-200 relative"
              style={active ? { background: 'rgba(255,255,255,0.12)' } : {}}>
              <div className="relative">
                <Icon size={22}
                  className="transition-all"
                  style={{ color: active ? 'white' : 'rgba(255,255,255,0.35)' }}
                  strokeWidth={active ? 2.5 : 1.8}
                  fill={id === 'matches' && active ? 'white' : 'none'}
                />
                {id === 'matches' && likedItems.length > 0 && (
                  <span className="absolute -top-1 -right-2 text-[8px] w-4 h-4 flex items-center justify-center rounded-full border border-white/20 font-black text-white"
                    style={{ background: RED }}>
                    {likedItems.length > 9 ? '9+' : likedItems.length}
                  </span>
                )}
              </div>
              <span className="text-[9px] font-bold transition-colors"
                style={{ color: active ? 'white' : 'rgba(255,255,255,0.35)' }}>
                {label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}

export default App;
