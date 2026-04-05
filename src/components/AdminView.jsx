import React, { useState, useMemo } from 'react';
import { STUDENTS } from '../data/mockData';
import { Search, Trash2, RotateCcw, Users, BookOpen, ChevronLeft, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

function AdminView({ onBack }) {
  const [search, setSearch] = useState('');
  
  // In a real app, this would come from a backend.
  // Here we'll simulate "Active Profiles" by checking if entries exist in localStorage
  // Or just show the full list and allow "Resetting" them.
  
  const filteredStudents = useMemo(() => {
    return STUDENTS.filter(s => 
      s.nombre.toLowerCase().includes(search.toLowerCase()) ||
      s.rut.includes(search)
    ).slice(0, 50); // Limit for performance
  }, [search]);

  const handleResetProfile = (rut) => {
    if (window.confirm(`¿Estás seguro de resetear el perfil de RUT ${rut}? Se borrarán sus gustos y libros favoritos.`)) {
      // In this local-only version, we can only really clear the CURRENT user if it matches
      // But for the sake of the demo, we'll simulate success.
      alert(`Perfil ${rut} reseteado con éxito.`);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden">
      {/* Header */}
      <header className="px-6 py-5 shrink-0 shadow-lg relative overflow-hidden" 
        style={{ background: `linear-gradient(135deg, #003399 0%, #001A4D 100%)` }}>
        
        {/* Decorative elements */}
        <div className="absolute top-[-20px] right-[-20px] w-24 h-24 bg-white/5 rounded-full blur-2xl" />
        
        <div className="flex items-center gap-4 mb-4 relative z-10">
          <button onClick={onBack} className="p-2.5 bg-white/10 hover:bg-white/20 rounded-2xl transition-all active:scale-90">
            <ChevronLeft size={20} className="text-white" />
          </button>
          <div>
            <h1 className="text-xl font-black tracking-tighter text-white">Panel de Control</h1>
            <p className="text-[10px] font-black text-blue-200/50 uppercase tracking-[0.2em]">Gestión Institucional</p>
          </div>
          <div className="ml-auto bg-[#FFCC00] p-2 rounded-xl shadow-lg shadow-yellow-900/20">
            <ShieldCheck className="text-[#003399]" size={20} />
          </div>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-2 gap-3 mt-4 relative z-10">
          <div className="bg-white/10 backdrop-blur-md rounded-[20px] p-4 border border-white/10 shadow-inner">
            <p className="text-2xl font-black text-white leading-none">{STUDENTS.length}</p>
            <p className="text-[9px] font-black text-white/40 uppercase tracking-widest mt-1.5">Total Alumnos</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-[20px] p-4 border border-white/10 shadow-inner">
            <p className="text-2xl font-black text-white leading-none">42</p>
            <p className="text-[9px] font-black text-white/40 uppercase tracking-widest mt-1.5">Perfiles Activos</p>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 flex flex-col p-6 overflow-hidden bg-[#F7F7F9]">
        <div className="relative mb-6 shrink-0 group">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#003399] transition-colors" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar por nombre o RUT..."
            className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-100 focus:border-[#003399] rounded-[22px] outline-none text-sm font-bold shadow-sm transition-all text-gray-800"
          />
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3 pb-10">
          {filteredStudents.map(s => (
            <motion.div 
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              key={s.rut} 
              className="bg-white border border-gray-100 rounded-[22px] p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex-1 min-w-0">
                <p className="font-black text-gray-900 text-sm truncate leading-tight">
                  {s.nombre.split(' ').slice(-2).join(' ')}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[9px] font-black text-gray-400 bg-gray-50 border border-gray-100 px-2 py-1 rounded-full leading-none tracking-widest uppercase">
                    {s.rut}
                  </span>
                  <span className="text-[9px] font-black text-[#003399] bg-blue-50/50 border border-blue-100 px-2 py-1 rounded-full leading-none uppercase tracking-widest">
                    {s.curso}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center gap-2 shrink-0 ml-4">
                <button 
                  onClick={() => handleResetProfile(s.rut)}
                  className="w-10 h-10 flex items-center justify-center text-orange-500 bg-orange-50 hover:bg-orange-100 rounded-2xl transition-all border border-orange-100 active:scale-90"
                  title="Resetear Perfil"
                >
                  <RotateCcw size={16} strokeWidth={2.5} />
                </button>
                <button 
                  onClick={() => alert('Función de borrado total solo disponible en versión producción.')}
                  className="w-10 h-10 flex items-center justify-center text-[#D30F15] bg-red-50 hover:bg-red-100 rounded-2xl transition-all border border-red-100 active:scale-90"
                  title="Eliminar Registro"
                >
                  <Trash2 size={16} strokeWidth={2.5} />
                </button>
              </div>
            </motion.div>
          ))}
          
          {filteredStudents.length === 0 && (
            <div className="py-20 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users size={24} className="text-gray-300" />
              </div>
              <p className="text-sm font-black text-gray-400 tracking-tighter">No se encontraron resultados</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Bottom hint */}
      <div className="px-6 py-4 bg-white border-t border-gray-100 shrink-0">
        <div className="flex items-start gap-2">
          <ShieldCheck size={12} className="text-[#003399] mt-0.5" />
          <p className="text-[9px] text-gray-400 font-bold leading-relaxed uppercase tracking-widest">
            Acceso administrativo restringido • Datos locales simulados
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminView;
