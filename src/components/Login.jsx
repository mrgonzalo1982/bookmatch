import React, { useState } from 'react';
import { Shield, AlertCircle, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

function formatRut(raw) {
  const clean = raw.replace(/[^0-9kK]/gi, '').toUpperCase();
  if (clean.length <= 1) return clean;
  const body = clean.slice(0, -1);
  const dv   = clean.slice(-1);
  return `${body.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}-${dv}`;
}

const RED  = '#A80A0A';
const BLUE = '#154996';
const GOLD = '#FFD700';

function Login({ onLogin }) {
  const [rut, setRut]       = useState('');
  const [error, setError]   = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rut.trim()) return;
    setLoading(true); setError('');
    await new Promise(r => setTimeout(r, 600));
    if (!onLogin(rut)) setError('RUT no encontrado. Verifica los datos.');
    setLoading(false);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-6"
      style={{ 
        background: `radial-gradient(circle at top left, ${BLUE} 0%, #001A4D 50%, #050505 100%)`, 
        fontFamily: 'Outfit, sans-serif' 
      }}
    >
      {/* Dynamic light effects */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full opacity-20 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${RED}, transparent 70%)`, filter: 'blur(120px)' }} />
      <div className="absolute bottom-[-5%] left-[-5%] w-[400px] h-[400px] rounded-full opacity-10 pointer-events-none"
        style={{ background: `radial-gradient(circle, ${GOLD}, transparent 70%)`, filter: 'blur(100px)' }} />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-sm z-10"
      >
        {/* Main Logo & Identity */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <img src="/umbral-shield.png" alt="Umbral" className="w-28 h-auto mx-auto mb-6 drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]" />
            <h1 className="text-5xl font-black text-white tracking-tighter mb-1 drop-shadow-sm">BookMatch</h1>
            <p className="text-blue-200/60 text-xs font-black uppercase tracking-[0.3em] mt-2">Colegio Umbral de Curauma</p>
          </motion.div>
        </div>

        {/* Premium Form Card (Glassmorphism) */}
        <div className="relative">
          {/* Subtle Glow behind card */}
          <div className="absolute inset-0 bg-white/5 blur-3xl rounded-[40px] -z-10" />
          
          <div className="bg-white/95 backdrop-blur-xl rounded-[40px] p-8 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.4)] border border-white/20">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-black text-gray-900 tracking-tight mb-1">Bienvenido de nuevo</h2>
              <p className="text-gray-400 text-sm font-medium">Ingresa con tu RUT para continuar</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-[10px] font-black uppercase tracking-[0.15em] text-gray-400 ml-1">
                  Identificación (RUT)
                </label>
                <div className="relative group">
                  <Shield className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300"
                    style={{ color: error ? RED : rut ? BLUE : '#D1D5DB' }} />
                  <input
                    type="text"
                    value={rut}
                    onChange={e => { setRut(formatRut(e.target.value)); setError(''); }}
                    placeholder="12.345.678-9"
                    maxLength={12}
                    className="w-full pl-12 pr-5 py-4.5 rounded-2xl text-lg font-bold text-gray-900 outline-none transition-all border-2 bg-gray-50/50"
                    style={{ 
                      borderColor: error ? RED : '#F3F4F6',
                      fontFamily: 'Space Grotesk, monospace' 
                    }}
                    onFocus={e => { if (!error) e.target.style.borderColor = BLUE; }}
                    onBlur={e => { if (!error) e.target.style.borderColor = '#F3F4F6'; }}
                  />
                </div>
              </div>

              {error && (
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-red-50 border border-red-100">
                  <AlertCircle size={16} className="shrink-0 text-red-500" />
                  <p className="text-[11px] font-bold text-red-600 leading-tight">{error}</p>
                </motion.div>
              )}

              <button
                type="submit"
                disabled={loading || !rut.trim()}
                className="w-full py-5 rounded-2xl font-black text-white text-base transition-all active:scale-[0.98] disabled:opacity-30 relative overflow-hidden group"
                style={{
                  background: loading || !rut.trim() ? '#9ca3af' : `linear-gradient(135deg, ${BLUE}, #1a3a72)`,
                  boxShadow: !loading && rut.trim() ? `0 20px 40px -12px rgba(0,51,153,0.4)` : 'none',
                }}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-3">
                    <span className="w-5 h-5 border-3 border-white/20 border-t-white rounded-full animate-spin" />
                    <span className="tracking-wide">VALIDANDO...</span>
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    INGRESAR <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                )}
                
                {/* Subtle shine effect */}
                {!loading && rut.trim() && (
                  <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 skew-x-[-20deg]" />
                )}
              </button>
            </form>
          </div>
        </div>

        <div className="flex flex-col items-center mt-10 space-y-4 opacity-40">
          <div className="h-px w-12 bg-white/30" />
          <p className="text-[10px] font-black text-white uppercase tracking-[0.2em]">
            © {new Date().getFullYear()} COMUNIDAD LECTORA UMBRAL
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;
