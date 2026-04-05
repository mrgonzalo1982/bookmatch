import React from 'react';

const RED = '#A10D12';
const GOLD = '#D4AF37';
const DARK = '#050505';

export function MatchStoryCard({ book, teacher, user, innerRef }) {
  if (!book || !teacher || !user) return null;

  const userRoleLabel = (user.role === 'admin' || user.role === 'teacher' || user.curso === 'Staff') 
    ? (user.profile?.dept || 'Docente') 
    : (user.curso || 'Alumno');

  const userName = user.nombre || 'Usuario';
  const teacherName = teacher.name || 'Docente';

  return (
    <div 
      ref={innerRef}
      style={{
        width: '1080px',
        height: '1920px',
        background: `linear-gradient(180deg, ${DARK} 0%, #1a0202 30%, #2a0404 50%, #1a0202 70%, ${DARK} 100%)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '100px 80px',
        color: 'white',
        fontFamily: "'Inter', -apple-system, sans-serif",
        position: 'fixed',
        left: '-4000px', 
        top: 0,
        zIndex: -1,
        overflow: 'hidden'
      }}
    >
      {/* Institutional Header */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', marginBottom: '80px' }}>
        <img src="/umbral-shield.png" alt="Logo" style={{ width: '150px', height: '150px' }} />
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '72px', fontWeight: '900', margin: 0, letterSpacing: '-0.04em' }}>BOOKMATCH</h1>
          <p style={{ fontSize: '24px', fontWeight: '800', color: GOLD, margin: '5px 0 0 0', textTransform: 'uppercase', letterSpacing: '6px' }}>
            Colegio Umbral de Curauma
          </p>
        </div>
      </div>

      {/* Badge */}
      <div style={{
        background: GOLD,
        color: 'black',
        padding: '15px 50px',
        borderRadius: '100px',
        fontSize: '44px',
        fontWeight: '900',
        textTransform: 'uppercase',
        marginBottom: '60px',
        letterSpacing: '1px',
        border: '6px solid white'
      }}>
        ¡COINCIDENCIA LECTORA!
      </div>

      {/* Book Cover */}
      <div style={{
        width: '580px',
        height: '870px',
        position: 'relative',
        marginBottom: '60px',
        boxShadow: '0 40px 80px rgba(0,0,0,0.6)'
      }}>
        <img 
          src={book.image} 
          alt={book.title} 
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '20px',
            border: '2px solid rgba(255,255,255,0.1)'
          }} 
        />
        <div style={{
          position: 'absolute',
          bottom: '30px',
          right: '-20px',
          background: RED,
          padding: '10px 30px',
          borderRadius: '8px',
          fontSize: '26px',
          fontWeight: '900',
          boxShadow: '0 10px 20px rgba(0,0,0,0.4)',
          border: '2px solid rgba(255,255,255,0.2)'
        }}>
          {book.genre}
        </div>
      </div>

      {/* Title & Author */}
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h2 style={{ fontSize: '72px', fontWeight: '900', margin: '0 0 5px 0', lineHeight: '1.1' }}>
          {book.title}
        </h2>
        <p style={{ fontSize: '42px', color: '#BBB', fontWeight: '700', margin: 0 }}>
          {book.author}
        </p>
      </div>

      {/* Contextual Message - FIXED SPACE */}
      <div style={{ 
        textAlign: 'center', 
        marginBottom: '80px', 
        padding: '20px 40px',
        background: 'rgba(255,255,255,0.05)',
        borderRadius: '20px',
        border: '1px solid rgba(255,255,255,0.1)'
      }}>
        <p style={{ fontSize: '32px', fontWeight: '700', color: GOLD, margin: 0 }}>
          ¡{userName} y {teacherName} tienen
        </p>
        <p style={{ fontSize: '32px', fontWeight: '700', color: 'white', margin: 0 }}>
          los mismos gustos lectores! ⭐
        </p>
      </div>

      {/* Match Avatars Section - SIMPLIFIED FOR HTML2CANVAS VISIBILITY */}
      <div style={{
        marginTop: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '100px',
        padding: '50px 0',
        width: '100%',
        background: 'rgba(255, 255, 255, 0.08)',
        borderRadius: '40px',
        border: '2px solid rgba(255,255,255,0.1)'
      }}>
        {/* User */}
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '120px', marginBottom: '15px' }}>{user.profile?.emoji || '👤'}</div>
          <p style={{ fontSize: '36px', fontWeight: '900', textTransform: 'uppercase', marginBottom: '5px' }}>{userName}</p>
          <div style={{ fontSize: '24px', fontWeight: '800', color: GOLD }}>{userRoleLabel}</div>
        </div>

        {/* Connector Star */}
        <div style={{ fontSize: '110px' }}>⭐</div>

        {/* Teacher */}
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '120px', marginBottom: '15px' }}>{teacher.emoji || '👨‍🏫'}</div>
          <p style={{ fontSize: '36px', fontWeight: '900', textTransform: 'uppercase', marginBottom: '5px' }}>{teacherName}</p>
          <div style={{ fontSize: '24px', fontWeight: '800', color: GOLD }}>{teacher.dept || 'Docente'}</div>
        </div>
      </div>

      {/* Footer */}
      <p style={{ marginTop: '60px', fontSize: '28px', fontWeight: '700', opacity: 0.6 }}>
        Encuentra tu match literario en: <span style={{ color: GOLD }}>bookmatch-bi.vercel.app</span>
      </p>
    </div>
  );
}
