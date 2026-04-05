import React, { useState } from 'react';
import { Shield, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

function formatRut(raw) {
  const clean = raw.replace(/[^0-9kK]/gi, '').toUpperCase();
  if (clean.length <= 1) return clean;
  const body = clean.slice(0, -1);
  const dv   = clean.slice(-1);
  return `${body.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}-${dv}`;
}

const NAVY = '#0E2A5C';
const RED  = '#A80A0A';

function Login({ onLogin }) {
  const [rut, setRut]       = useState('');
  const [error, setError]   = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rut.trim()) return;
    setLoading(true); setError('');
    await new Promise(r => setTimeout(r, 500));
    if (!onLogin(rut)) setError('RUT no encontrado. Verifica que sea el correcto.');
    setLoading(false);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-5"
      style={{ background: `linear-gradient(160deg, ${NAVY} 0%, #0a1f46 60%, #1a0a0a 100%)`, fontFamily: 'Poppins, sans-serif' }}
    >
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-80 h-80 rounded-full opacity-10 pointer-events-none"
        style={{ background: '#A80A0A', filter: 'blur(80px)', transform: 'translate(-30%, -30%)' }} />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-10 pointer-events-none"
        style={{ background: '#FFCC00', filter: 'blur(100px)', transform: 'translate(30%, 30%)' }} />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="w-full max-w-sm z-10"
      >
        {/* Shield + title */}
        <div className="text-center mb-8">
          <motion.img
            src="/umbral-shield.png"
            alt="Escudo Colegio Umbral"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 180, damping: 14, delay: 0.1 }}
            className="w-32 h-auto mx-auto mb-4"
            style={{ filter: 'drop-shadow(0 12px 32px rgba(0,0,0,0.5))' }}
          />
          <h1 className="text-4xl font-black text-white tracking-tighter">BookMatch</h1>
          <p className="text-white/50 text-sm font-medium mt-1.5 tracking-wide">Colegio Umbral de Curauma</p>
        </div>

        {/* Form card */}
        <div className="bg-white/95 backdrop-blur rounded-3xl p-7 shadow-2xl">
          <h2 className="text-lg font-black tracking-tight mb-1" style={{ color: NAVY }}>
            Accede con tu RUT
          </h2>
          <p className="text-gray-400 text-sm mb-6">
            Ingresa tu número de RUT para entrar a tu perfil lector.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest mb-2" style={{ color: NAVY }}>
                RUT Escolar
              </label>
              <div className="relative">
                <Shield className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4"
                  style={{ color: error ? RED : '#9ca3af' }} />
                <input
                  type="text"
                  value={rut}
                  onChange={e => { setRut(formatRut(e.target.value)); setError(''); }}
                  placeholder="12.345.678-9"
                  maxLength={12}
                  className="w-full pl-11 pr-4 py-4 rounded-2xl text-base font-semibold text-gray-900 outline-none transition-all border-2 bg-gray-50"
                  style={{ borderColor: error ? RED : '#e5e7eb', fontFamily: 'Poppins, monospace' }}
                  onFocus={e => { if (!error) e.target.style.borderColor = NAVY; }}
                  onBlur={e => { if (!error) e.target.style.borderColor = '#e5e7eb'; }}
                />
              </div>
            </div>

            {error && (
              <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-2 p-3 rounded-xl"
                style={{ background: '#FEF2F2', border: `1px solid #FECACA` }}>
                <AlertCircle size={15} className="shrink-0 mt-0.5" style={{ color: RED }} />
                <p className="text-xs font-semibold" style={{ color: RED }}>{error}</p>
              </motion.div>
            )}

            <button
              type="submit"
              disabled={loading || !rut.trim()}
              className="w-full py-4 rounded-2xl font-black text-white text-sm transition-all active:scale-95 disabled:opacity-40"
              style={{
                background: loading || !rut.trim() ? '#9ca3af' : `linear-gradient(135deg, ${NAVY}, #1a3a72)`,
                boxShadow: !loading && rut.trim() ? `0 8px 24px rgba(14,42,92,0.35)` : 'none',
              }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Verificando…
                </span>
              ) : 'Ingresar →'}
            </button>
          </form>
        </div>

        <p className="text-center text-white/25 text-xs font-medium mt-6">
          © {new Date().getFullYear()} Colegio Umbral de Curauma
        </p>
      </motion.div>
    </div>
  );
}

export default Login;
