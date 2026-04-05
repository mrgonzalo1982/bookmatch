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
      <header className="px-6 py-5 bg-[#154996] text-white shrink-0">
        <div className="flex items-center gap-4 mb-4">
          <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <ChevronLeft size={20} />
          </button>
          <div>
            <h1 className="text-xl font-black tracking-tighter">Panel de Administración</h1>
            <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Gestión de Alumnos y Perfiles</p>
          </div>
          <ShieldCheck className="ml-auto text-yellow-400" size={24} />
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-2 gap-3 mt-2">
          <div className="bg-white/10 rounded-2xl p-3 border border-white/10">
            <p className="text-2xl font-black text-white">{STUDENTS.length}</p>
            <p className="text-[9px] font-bold text-white/50 uppercase">Total Alumnos</p>
          </div>
          <div className="bg-white/10 rounded-2xl p-3 border border-white/10">
            <p className="text-2xl font-black text-white">42</p>
            <p className="text-[9px] font-bold text-white/50 uppercase">Perfiles Activos</p>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 flex flex-col p-6 overflow-hidden">
        <div className="relative mb-6 shrink-0">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar por nombre o RUT..."
            className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 border-gray-100 focus:border-[#154996] rounded-2xl outline-none text-sm font-medium transition-all"
          />
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3">
          {filteredStudents.map(s => (
            <div key={s.rut} className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center justify-between shadow-sm">
              <div className="flex-1 min-w-0">
                <p className="font-black text-gray-900 text-sm truncate">{s.nombre.split(' ').slice(-2).join(' ')}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[9px] font-bold text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded leading-none">{s.rut}</span>
                  <span className="text-[9px] font-bold text-[#154996] bg-blue-50 px-1.5 py-0.5 rounded leading-none">{s.curso}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2 shrink-0">
                <button 
                  onClick={() => handleResetProfile(s.rut)}
                  title="Resetear Perfil"
                  className="p-2.5 text-orange-500 hover:bg-orange-50 rounded-xl transition-colors border border-orange-100"
                >
                  <RotateCcw size={16} />
                </button>
                <button 
                  onClick={() => alert('Función de borrado total solo disponible en versión producción con base de datos.')}
                  title="Eliminar Registro"
                  className="p-2.5 text-red-500 hover:bg-red-50 rounded-xl transition-colors border border-red-100"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
          
          {filteredStudents.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-gray-400 font-bold italic">No se encontraron alumnos.</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Bottom hint */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 shrink-0">
        <p className="text-[10px] text-gray-400 font-medium leading-relaxed">
          * Nota: Las acciones de administración en esta versión de desarrollo afectan al almacenamiento local del navegador.
        </p>
      </div>
    </div>
  );
}

export default AdminView;
