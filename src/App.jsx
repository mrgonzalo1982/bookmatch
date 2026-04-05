import React, { useState, useEffect } from 'react';
import { STUDENTS } from './data/mockData';
import Login from './components/Login';
import Onboarding from './components/Onboarding';
import MatchDeck from './components/MatchDeck';
import MatchList from './components/MatchList';
import CommunityView from './components/CommunityView';
import AdminView from './components/AdminView';
import TeacherView from './components/TeacherView';
import { BookOpen, Heart, Users, User, LogOut, GraduationCap, Star, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from './lib/firebase';
import { doc, getDoc, setDoc, updateDoc, collection, getDocs } from 'firebase/firestore';
import { ITEMS } from './data/mockData';

// ── Bottom nav tabs ───────────────────────────────────────────────────────────
const NAV = [
  { id: 'deck',      label: 'Descubrir',  Icon: BookOpen },
  { id: 'matches',   label: 'Matches',    Icon: Heart },
  { id: 'community', label: 'Comunidad',  Icon: Users },
  { id: 'profile',   label: 'Perfil',     Icon: User },
];

// Institutional palette (Colegio Umbral)
const RED  = '#A80A0A';
const BLUE = '#154996'; // Official institutional blue
const GOLD = '#FFD700';
const BG   = '#F7F7F9';

function App() {
  const [user, setUser]             = useState(null);
  const [view, setView]             = useState('login');
  const [likedItems, setLikedItems] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // ── Restore session ──────────────────────────────────────────────────────────
  useEffect(() => {
    const hydrate = async () => {
      try {
        // Fetch Live Catalog globally (Fase 1.4)
        try {
          const catSnap = await getDocs(collection(db, 'catalog'));
          catSnap.forEach(docSnap => {
            const extraBook = docSnap.data();
            if (!ITEMS.find(i => i.id === extraBook.id)) {
              ITEMS.push(extraBook);
            }
          });
        } catch(catErr) {
          console.warn("No extra catalog data", catErr);
        }

        const saved = localStorage.getItem('bm-user');
        const savedRut = localStorage.getItem('bm-active-rut');
        
        if (saved && savedRut) {
          setUser(JSON.parse(saved));
          setView('loading');
          
          const docRef = doc(db, 'users', savedRut);
          const snap = await getDoc(docRef);
          
          if (snap.exists()) {
            const userState = snap.data();
            if (userState.likes) setLikedItems(userState.likes);
            if (userState.profile && userState.profile.genres && userState.profile.genres.length > 0) {
              setUserProfile(userState.profile);
              setView(userState.role === 'admin' || userState.role === 'teacher' ? 'admin' : 'deck');
            } else {
              setView('onboarding');
            }
          } else {
            setView('onboarding');
          }
        }
      } catch (e) {
        console.warn("DB restore error", e);
      }
    };
    hydrate();
  }, []);

  // ── Login ────────────────────────────────────────────────────────────────────
  const handleLogin = async (rut) => {
    const clean = s => s.replace(/[^0-9kK]/gi, '').toLowerCase();
    const cleanRut = clean(rut);
    
    // Admin Backdoor
    if (cleanRut === 'admin' || cleanRut === '123456789') {
      const adminUser = { rut: '12.345.678-9', nombre: 'Administrador Umbral', curso: 'Staff', role: 'admin', avatar: '/umbral-shield.png' };
      setUser(adminUser);
      localStorage.setItem('bm-user', JSON.stringify(adminUser));
      localStorage.setItem('bm-active-rut', 'admin');
      
      const adminData = { profile: { emoji: '🛡️', genres: [] }, likes: [], role: 'admin' };
      await setDoc(doc(db, 'users', 'admin'), adminData, { merge: true });
      setUserProfile(adminData.profile);
      
      setView('admin');
      return true;
    }

    // ── Known Teacher RUTs (seed list) ─────────────────────────────────────
    // Only Gonzalo is pre-recognized. Other teachers must be added via Admin panel.
    // Danixa will be added when she logs in for the first time through the Admin.
    const SEED_TEACHERS = {
      '150685478': { name: 'Profe Gonzalo', dept: 'Inglés' },
    };

    // Step 1: Check Firestore for existing user
    const docRef = doc(db, 'users', cleanRut);
    const snap = await getDoc(docRef);
    
    if (snap.exists()) {
      const userData = snap.data();
      if (userData.role === 'teacher' || userData.role === 'admin') {
        const teacherUser = { 
          rut: cleanRut, 
          nombre: userData.profile?.name || 'Docente Umbral', 
          curso: 'Docente', 
          role: userData.role, 
          avatar: '/umbral-shield.png' 
        };
        setUser(teacherUser);
        localStorage.setItem('bm-user', JSON.stringify(teacherUser));
        localStorage.setItem('bm-active-rut', cleanRut);
        setUserProfile(userData.profile);
        // Teachers land on deck (books) just like students.
        // Admin panel is accessible via the Profile tab → "Panel Docente" button.
        setView(userData.profile?.genres?.length > 0 ? 'deck' : 'onboarding');
        return true;
      }
      
      // Registered Student with existing profile
      const studentMatch = STUDENTS.find(s => clean(s.rut) === cleanRut);
      if (studentMatch) {
         setUser(studentMatch);
         localStorage.setItem('bm-user', JSON.stringify(studentMatch));
         localStorage.setItem('bm-active-rut', cleanRut);
         setUserProfile(userData.profile);
         setLikedItems(userData.likes || []);
         setView(userData.profile?.genres?.length > 0 ? 'deck' : 'onboarding');
         return true;
      }
    }

    // Step 2: Seed known teacher RUTs (no Firestore doc yet → create teacher seed)
    if (SEED_TEACHERS[cleanRut]) {
      const seed = SEED_TEACHERS[cleanRut];
      const seedData = {
        role: 'teacher',
        profile: { name: seed.name, dept: seed.dept, emoji: '📚', genres: [] },
        likes: []
      };
      await setDoc(docRef, seedData, { merge: true });
      const teacherUser = { rut: cleanRut, nombre: seed.name, curso: 'Docente', role: 'teacher', avatar: '/umbral-shield.png' };
      setUser(teacherUser);
      localStorage.setItem('bm-user', JSON.stringify(teacherUser));
      localStorage.setItem('bm-active-rut', cleanRut);
      setUserProfile(seedData.profile);
      setView('onboarding');
      return true;
    }

    // Step 3: New student logging in for the first time
    const found = STUDENTS.find(s => clean(s.rut) === cleanRut);
    if (found) {
      setUser(found);
      localStorage.setItem('bm-user', JSON.stringify(found));
      localStorage.setItem('bm-active-rut', cleanRut);
      setView('onboarding');
      return true;
    }
    return false;
  };

  // ── Onboarding ───────────────────────────────────────────────────────────────
  const handleFinishOnboarding = async (profile) => {
    const cleanRut = user.rut.replace(/[^0-9kK]/gi, '').toLowerCase();
    const docRef = doc(db, 'users', cleanRut);
    
    // Retrieve current to maintain role if exists
    const snap = await getDoc(docRef);
    let role = 'student';
    if (snap.exists() && snap.data().role) {
      role = snap.data().role;
    }
    
    await setDoc(docRef, { profile, likes: snap.exists() ? (snap.data().likes || []) : [], role }, { merge: true });
    
    setUserProfile(profile);
    // All users (including teachers) go to 'deck' after onboarding.
    // Teachers can access the admin panel via the button in their Profile tab.
    setView('deck');
  };

  // ── Match ────────────────────────────────────────────────────────────────────
  const handleMatch = (item) => {
    if (likedItems.find(m => m.id === item.id)) return;
    const updated = [...likedItems, item];
    setLikedItems(updated);
    
    const cleanRut = user.rut.replace(/[^0-9kK]/gi, '').toLowerCase();
    const docRef = doc(db, 'users', cleanRut);
    // Silent asynchronous update to avoid blocking gestures
    updateDoc(docRef, { likes: updated }).catch(e => console.warn("Failed to save match to cloud", e));
  };

  // ── Logout ───────────────────────────────────────────────────────────────────
  const handleLogout = () => {
    setUser(null); setLikedItems([]); setUserProfile(null);
    setView('login'); 
    localStorage.removeItem('bm-user');
    localStorage.removeItem('bm-active-rut');
  };

  // ── Guard ────────────────────────────────────────────────────────────────────
  if (view === 'loading') {
     return (
       <div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ background: '#F7F7F9' }}>
         <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
            <Loader2 size={40} className="text-[#A80A0A]" />
         </motion.div>
       </div>
     );
  }
  if (!user || view === 'login')   return <Login onLogin={handleLogin} />;
  if (view === 'onboarding')       return <Onboarding user={user} onFinish={handleFinishOnboarding} />;

  const likedIds = likedItems.map(i => i.id);

  // ── Badges ───────────────────────────────────────────────────────────────────
  const ALL_BADGES = [
    { id: 'first_match', emoji: '🥉', name: 'Iniciado',      desc: '1er Match realizado',               unlocked: likedIds.length >= 1 },
    { id: 'critic',      emoji: '🥈', name: 'Crítico',       desc: '10 libros en tu biblioteca',        unlocked: likedIds.length >= 10 },
    { id: 'top_fan',     emoji: '🥇', name: 'Ratón de Bib.', desc: '30 libros en tu biblioteca',        unlocked: likedIds.length >= 30 },
    { id: 'erudito',     emoji: '🏛️', name: 'Erudito',       desc: 'Hiciste Match con un Clásico',      unlocked: likedItems.some(i => i.genre === 'Clásico') },
    { id: 'atlas',       emoji: '🌍', name: 'Atlas',         desc: '3+ géneros favoritos elegidos',     unlocked: (userProfile?.genres?.length || 0) >= 3 },
    { id: 'corazon',     emoji: '💝', name: 'Fiel',          desc: 'Agregaste tu libro del alma',       unlocked: !!userProfile?.favoriteBook },
  ];

  // ── Views ────────────────────────────────────────────────────────────────────
  const renderView = () => {
    switch (view) {
      case 'deck':
        return (
          <MatchDeck
            key="deck"
            user={user}
            likedIds={likedIds}
            userProfile={userProfile}
            onMatch={handleMatch}
            onShowTeacher={setSelectedTeacher}
          />
        );

      case 'matches':
        return <MatchList key="matches" matches={likedItems} setView={setView} onShowTeacher={setSelectedTeacher} />;

      case 'community':
        return (
          <CommunityView
            key="community"
            user={user}
            likedIds={likedIds}
            userProfile={userProfile}
            allStudents={STUDENTS}
            onShowTeacher={setSelectedTeacher}
          />
        );
      
      case 'admin':
        return <AdminView key="admin" onBack={() => setView('profile')} />;

      case 'teacher-panel':
        return (
          <TeacherView
            key="teacher-panel"
            user={user}
            userProfile={userProfile}
            likedItems={likedItems}
            onBack={() => setView('profile')}
          />
        );

      case 'profile':
        return (
          <div key="profile" className="flex-1 overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
            {/* Profile hero */}
            <div className="pb-10 px-6 pt-10" style={{ background: `linear-gradient(160deg, ${RED} 0%, #3a0000 100%)` }}>
              <div className="flex flex-col items-center">
                <div className="relative mb-4">
                  <div className="w-28 h-28 rounded-3xl overflow-hidden bg-white/20 backdrop-blur-xl border-4 border-white/30 shadow-2xl flex items-center justify-center text-6xl">
                    {userProfile?.emoji || user.avatar || '👤'}
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
                {user.role === 'admin' && (
                  <button onClick={() => setView('admin')} className="mt-4 bg-[#A80A0A] hover:bg-[#8B0707] text-white px-5 py-2 rounded-full text-[11px] font-black uppercase tracking-widest transition-all shadow-lg border-2 border-white/20">
                    Panel Admin ⚙️
                  </button>
                )}
                {user.role === 'teacher' && (
                  <button onClick={() => setView('teacher-panel')} className="mt-4 bg-[#A80A0A] hover:bg-[#8B0707] text-white px-5 py-2 rounded-full text-[11px] font-black uppercase tracking-widest transition-all shadow-lg border-2 border-white/20">
                    Panel Docente 📊
                  </button>
                )}
                <button onClick={() => setView('onboarding')} className="mt-3 bg-white/20 hover:bg-white/30 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border border-white/30">
                  Editar Perfil ✏️
                </button>
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
                        style={{ background: '#EEF2FF', color: BLUE }}>{g}</span>
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
                        <p className="text-xs font-bold" style={{ color: BLUE }}>{userProfile.favoriteBookObj.author}</p>
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
                        <p className="text-[10px] font-bold truncate" style={{ color: BLUE }}>{book.author}</p>
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
      style={{ height: '100dvh', fontFamily: 'Poppins, sans-serif', background: BG }}>

      {/* ── Header (Institutional Carmine) ─────────────────────────────────────────────── */}
      <header className="px-5 py-3 flex items-center justify-between shrink-0 z-10"
        style={{ background: RED }}>

        {/* Avatar */}
        <button onClick={() => setView('profile')}
          className={`transition-all duration-200 ${view === 'profile' ? 'scale-90 opacity-80' : ''}`}>
          <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-xl border border-white/20">
            {userProfile?.emoji || '👤'}
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

      {/* ── Bottom Nav (Institutional Carmine) ─────────────────────────────────────────── */}
      <nav className="px-4 py-2 flex justify-around items-center shrink-0 z-10 border-t border-white/10"
        style={{ background: RED }}>
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

      {/* Global Teacher Modal */}
      <AnimatePresence>
        {selectedTeacher && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none">
            <div className="pointer-events-auto w-full h-full max-w-md">
              <CommunityView.TeacherModal teacher={selectedTeacher} onClose={() => setSelectedTeacher(null)} />
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
