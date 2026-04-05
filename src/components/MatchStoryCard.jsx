import React from 'react';

const RED = '#A10D12'; // Institutional Umbral Red
const GOLD = '#D4AF37'; // Institutional Gold
const DARK = '#0A0A0A';

export function MatchStoryCard({ book, teacher, user, innerRef }) {
  if (!book || !teacher || !user) return null;

  // Fix: Role Label logic - Mr. Gonzalo (or staff) should not be "Alumno"
  const userRoleLabel = (user.role === 'admin' || user.role === 'teacher' || user.curso === 'Staff') 
    ? (user.profile?.dept || 'Docente') 
    : (user.curso || 'Alumno');

  return (
    <div 
      ref={innerRef}
      style={{
        width: '1080px',
        height: '1920px',
        background: `linear-gradient(180deg, ${DARK} 0%, #2A0404 40%, #4A0808 50%, #2A0404 60%, ${DARK} 100%)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '100px 60px',
        color: 'white',
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        position: 'fixed',
        left: '-4000px', 
        top: 0,
        zIndex: -1,
        overflow: 'hidden'
      }}
    >
      {/* Decorative background glow */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '1200px',
        height: '1200px',
        background: 'radial-gradient(circle, rgba(161,13,18,0.15) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      {/* Institutional Header - Modern layout */}
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        gap: '20px', 
        marginBottom: '100px',
        width: '100%'
      }}>
        <img src="/umbral-shield.png" alt="Logo" style={{ width: '160px', height: '160px', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.5))' }} />
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '72px', fontWeight: '900', margin: 0, letterSpacing: '-0.04em', textShadow: '0 4px 10px rgba(0,0,0,0.3)' }}>BOOKMATCH</h1>
          <p style={{ fontSize: '24px', fontWeight: '800', color: GOLD, margin: '5px 0 0 0', textTransform: 'uppercase', letterSpacing: '6px', opacity: 0.9 }}>
            COLEGIO UMBRAL DE CURAUMA
          </p>
        </div>
      </div>

      {/* Modern Badge */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.08)',
        border: `3px solid ${GOLD}`,
        color: GOLD,
        padding: '18px 50px',
        borderRadius: '100px',
        fontSize: '42px',
        fontWeight: '900',
        textTransform: 'uppercase',
        marginBottom: '100px',
        letterSpacing: '2px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
      }}>
        ¡COINCIDENCIA LECTORA!
      </div>

      {/* Book Cover Container - Professional aspect ratio (2:3) */}
      <div style={{
        width: '640px',
        height: '960px',
        position: 'relative',
        marginBottom: '100px',
        zIndex: 2
      }}>
        {/* Subtle shadow glow behind book */}
        <div style={{
          position: 'absolute',
          inset: '-20px',
          background: 'rgba(0,0,0,0.4)',
          filter: 'blur(40px)',
          borderRadius: '40px',
          zIndex: -1
        }} />
        
        <img 
          src={book.image} 
          alt={book.title} 
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '24px',
            boxShadow: '0 60px 120px rgba(0,0,0,0.8)',
            border: '2px solid rgba(255,255,255,0.1)'
          }} 
        />
        
        {/* Genre Tag - Minimalist */}
        <div style={{
          position: 'absolute',
          bottom: '40px',
          right: '-20px',
          background: RED,
          padding: '12px 36px',
          borderRadius: '12px',
          fontSize: '28px',
          fontWeight: '900',
          boxShadow: '0 15px 30px rgba(0,0,0,0.5)',
          border: '2px solid rgba(255,255,255,0.2)'
        }}>
          {book.genre}
        </div>
      </div>

      {/* Names and Match Details - Bold and Modern */}
      <div style={{ textAlign: 'center', width: '100%', marginBottom: '100px', padding: '0 40px' }}>
        <h2 style={{ fontSize: '84px', fontWeight: '900', margin: '0 0 10px 0', lineHeight: '1.05', letterSpacing: '-0.03em' }}>
          {book.title}
        </h2>
        <p style={{ fontSize: '42px', color: '#AAA', fontWeight: '600', margin: 0, opacity: 0.8 }}>
          {book.author}
        </p>
      </div>

      {/* Match Section - Glassmorphism Card */}
      <div style={{
        marginTop: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '80px',
        padding: '60px',
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '50px',
        border: '3px solid rgba(255, 255, 255, 0.1)',
        width: '100%',
        boxShadow: '0 30px 60px rgba(0,0,0,0.4)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Glass highlight */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, height: '40%',
          background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, transparent 100%)',
          pointerEvents: 'none'
        }} />

        {/* User */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
          <div style={{ fontSize: '130px', marginBottom: '15px', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))' }}>
            {user.profile?.emoji || '👤'}
          </div>
          <p style={{ fontSize: '32px', fontWeight: '900', margin: 0, textTransform: 'uppercase' }}>
            {user.nombre?.split(' ')[0]}
          </p>
          <p style={{ fontSize: '24px', color: GOLD, fontWeight: '800', margin: 0, opacity: 0.9 }}>
            {userRoleLabel}
          </p>
        </div>

        {/* Big Star Match */}
        <div style={{ 
          fontSize: '140px', 
          color: GOLD, 
          filter: 'drop-shadow(0 0 40px rgba(212,175,55,0.6))',
          animation: 'pulse 3s infinite ease-in-out'
        }}>
          ⭐
        </div>

        {/* Teacher */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
          <div style={{ fontSize: '130px', marginBottom: '15px', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))' }}>
            {teacher.emoji || '👨‍🏫'}
          </div>
          <p style={{ fontSize: '32px', fontWeight: '900', margin: 0, textTransform: 'uppercase' }}>
            {teacher.name.replace('Profe ', '').replace('Miss ', '')}
          </p>
          <p style={{ fontSize: '24px', color: GOLD, fontWeight: '800', margin: 0, opacity: 0.9 }}>
            {teacher.dept || 'Docente'}
          </p>
        </div>
      </div>

      {/* Call to Action Footer */}
      <div style={{ 
        marginTop: '60px', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        opacity: 0.7 
      }}>
        <p style={{ fontSize: '28px', fontWeight: '800', margin: 0 }}>
          Descubre tu próxima lectura en
        </p>
        <p style={{ fontSize: '32px', fontWeight: '900', color: GOLD, margin: '4px 0 0 0' }}>
          bookmatch-bi.vercel.app
        </p>
      </div>
    </div>
  );
}
