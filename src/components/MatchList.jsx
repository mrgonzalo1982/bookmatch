import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bookmark, Heart, Star, BookOpen, X, Copy, Check } from 'lucide-react';

function MatchList({ matches, setView }) {
  const [showLoanList, setShowLoanList] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyLoan = () => {
    const list = matches.map((m, i) => `${i + 1}. ${m.title} — ${m.author}`).join('\n');
    navigator.clipboard.writeText(list).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="flex-1 flex flex-col relative overflow-hidden">
      
      {/* Loan List Modal */}
      <AnimatePresence>
        {showLoanList && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-white flex flex-col"
          >
            <div className="px-6 pt-6 pb-4 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-black text-gray-900 tracking-tighter">Lista de Préstamo</h3>
                <p className="text-xs text-gray-400 font-medium">Para llevar a la Biblioteca Umbral</p>
              </div>
              <button onClick={() => setShowLoanList(false)} className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <X size={24} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-3 custom-scrollbar">
              {matches.map((m, i) => (
                <div key={m.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <span className="text-2xl font-black text-indigo-200 w-8 text-center shrink-0">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-black text-gray-900 text-sm truncate">{m.title}</p>
                    <p className="text-xs text-indigo-500 font-bold truncate">{m.author}</p>
                  </div>
                  <span className="text-[10px] bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full font-black uppercase tracking-tighter shrink-0">{m.genre}</span>
                </div>
              ))}
            </div>
            <div className="p-6 border-t border-gray-100">
              <button
                onClick={handleCopyLoan}
                className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-3 active:scale-95 transition-all shadow-lg"
              >
                {copied ? <Check size={18} /> : <Copy size={18} />}
                {copied ? '¡Copiado!' : 'Copiar Lista'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="px-5 pt-5 pb-3 flex items-end justify-between shrink-0">
        <div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tighter">Mis Matches</h2>
          <p className="text-xs text-gray-400 font-medium mt-0.5">Tu biblioteca personal</p>
        </div>
        <span className="text-xs font-black text-indigo-400 uppercase tracking-widest">{matches.length} libro{matches.length !== 1 ? 's' : ''}</span>
      </div>

      {/* Content */}
      {matches.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <div className="w-32 h-32 bg-gray-50 rounded-full flex items-center justify-center mb-6">
            <Bookmark size={60} strokeWidth={1} className="text-gray-300" />
          </div>
          <h3 className="text-xl font-black text-gray-400 tracking-tighter mb-2">Aún no hay libros</h3>
          <p className="text-gray-400 text-sm font-medium max-w-[200px]">
            Desliza a la derecha en los libros que te gusten.
          </p>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto px-5 pb-36 custom-scrollbar">
          <div className="grid grid-cols-2 gap-4">
            {matches.map((match, idx) => (
              <motion.div
                key={`${match.id}-${idx}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.07 }}
                className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group flex flex-col"
              >
                <div className="h-36 overflow-hidden relative shrink-0">
                  <img
                    src={match.image}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    alt={match.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <span className="absolute bottom-2 left-2 bg-white/90 text-gray-700 text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter">
                    {match.type}
                  </span>
                </div>
                <div className="p-3 flex-1 flex flex-col">
                  <h3 className="font-black text-xs text-gray-900 line-clamp-2 leading-tight mb-1">{match.title}</h3>
                  <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-tighter truncate">{match.author}</p>
                  <div className="mt-auto pt-2 border-t border-gray-50 flex items-center justify-between">
                    <div className="flex -space-x-1.5">
                      {match.professors?.slice(0, 2).map((p, i) => (
                        <div key={i} title={p.name} className="w-6 h-6 rounded-full bg-indigo-600 border-2 border-white flex items-center justify-center text-[8px] font-black text-white shadow-sm">
                          {p.name.replace('Profe ', '').replace('Miss ', '').replace('Tía ', '').charAt(0)}
                        </div>
                      ))}
                    </div>
                    <div className="bg-pink-50 text-pink-500 p-1 rounded-lg">
                      <Heart size={12} fill="currentColor" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Actions */}
      <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-[#F8F9FD] via-[#F8F9FD]/95 to-transparent z-10 space-y-3">
        {matches.length > 0 && (
          <button
            onClick={() => setShowLoanList(true)}
            className="w-full bg-white text-indigo-700 py-4 rounded-2xl font-black border-2 border-indigo-100 shadow-md flex items-center justify-center gap-2 active:scale-95 transition-all text-sm"
          >
            <BookOpen size={16} /> Lista para Biblioteca
          </button>
        )}
        <button
          onClick={() => setView('deck')}
          className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black shadow-xl flex items-center justify-center gap-2 active:scale-95 transition-all text-sm"
        >
          <Star size={16} fill="currentColor" />
          Descubrir más lecturas
        </button>
      </div>
    </div>
  );
}

export default MatchList;
