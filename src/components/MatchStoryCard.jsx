import React from 'react';

const RED = '#A80A0A';
const GOLD = '#FFD700';

export function MatchStoryCard({ book, teacher, user, innerRef }) {
  if (!book || !teacher || !user) return null;

  return (
    <div 
      ref={innerRef}
      style={{
        width: '1080px',
        height: '1920px',
        background: `radial-gradient(circle at center, #A80A0A 0%, #3a0000 60%, #050505 100%)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '120px 80px',
        color: 'white',
        fontFamily: 'Inter, system-ui, sans-serif',
        position: 'fixed',
        left: '-3000px', // Hidden from view but in DOM for canvas capture
        top: 0,
        zIndex: -1
      }}
    >
      {/* Institutional Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '30px', marginBottom: '80px' }}>
        <img src="/umbral-shield.png" alt="Logo" style={{ width: '120px', height: '120px' }} />
        <div style={{ textAlign: 'left' }}>
          <h1 style={{ fontSize: '64px', fontWeight: '900', margin: 0, tracking: '-0.05em' }}>BOOKMATCH</h1>
          <p style={{ fontSize: '28px', fontWeight: '700', color: GOLD, margin: 0, textTransform: 'uppercase', letterSpacing: '4px' }}>
            Colegio Umbral de Curauma
          </p>
        </div>
      </div>

      {/* Match Badge */}
      <div style={{
        background: GOLD,
        color: 'black',
        padding: '20px 60px',
        borderRadius: '100px',
        fontSize: '48px',
        fontWeight: '900',
        textTransform: 'uppercase',
        marginBottom: '60px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
        border: '8px solid white'
      }}>
        ¡COINCIDENCIA LECTORA!
      </div>

      {/* Book Cover Container */}
      <div style={{
        width: '800px',
        height: '1100px',
        position: 'relative',
        marginBottom: '80px',
        perspective: '1000px'
      }}>
        <img 
          src={book.image} 
          alt={book.title} 
          style={{
            width: '100%',
            height: '100%',
            objectCover: 'cover',
            borderRadius: '40px',
            boxShadow: '0 50px 100px rgba(0,0,0,0.6)',
            border: '2px solid rgba(255,255,255,0.2)'
          }} 
        />
        {/* Genre Tag on image */}
        <div style={{
          position: 'absolute',
          top: '40px',
          left: '40px',
          background: RED,
          padding: '15px 40px',
          borderRadius: '20px',
          fontSize: '32px',
          fontWeight: '900',
          boxShadow: '0 10px 20px rgba(0,0,0,0.3)'
        }}>
          {book.genre}
        </div>
      </div>

      {/* Names and Match Details */}
      <div style={{ textAlign: 'center', width: '100%' }}>
        <h2 style={{ fontSize: '80px', fontWeight: '900', margin: '0 0 20px 0', lineHeight: '1.1' }}>
          {book.title}
        </h2>
        <p style={{ fontSize: '48px', color: '#B0C4DE', fontWeight: '700', margin: 0 }}>
          {book.author}
        </p>
      </div>

      {/* Avatars / Emojis Footer */}
      <div style={{
        marginTop: 'auto',
        display: 'flex',
        alignItems: 'center',
        gap: '60px',
        padding: '60px',
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '60px',
        border: '4px solid rgba(255,255,255,0.1)',
        width: '100%',
        justifyContent: 'center'
      }}>
        {/* Student */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ fontSize: '120px', marginBottom: '20px' }}>{user.profile?.emoji || '👤'}</div>
          <p style={{ fontSize: '32px', fontWeight: '900', margin: 0 }}>{user.nombre?.split(' ')[0]}</p>
          <p style={{ fontSize: '24px', color: GOLD }}>Alumno</p>
        </div>

        {/* Big Star */}
        <div style={{ fontSize: '120px', color: GOLD, filter: 'drop-shadow(0 0 20px rgba(255,215,0,0.5))' }}>⭐</div>

        {/* Teacher */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ fontSize: '120px', marginBottom: '20px' }}>{teacher.emoji || '👨‍🏫'}</div>
          <p style={{ fontSize: '32px', fontWeight: '900', margin: 0 }}>{teacher.name}</p>
          <p style={{ fontSize: '24px', color: GOLD }}>{teacher.dept}</p>
        </div>
      </div>

      {/* Call to Action Footer */}
      <p style={{ marginTop: '60px', fontSize: '32px', fontWeight: '700', opacity: 0.6 }}>
        Encuentra tu match literario en: <span style={{ color: GOLD }}>bookmatch-bi.vercel.app</span>
      </p>
    </div>
  );
}
