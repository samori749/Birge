import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Home,
  MapPin,
  Plus,
  Layers,
  Sparkles,
} from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    setIsCreateOpen,
    setIsAiOpen,
    t,
    lang,
  } = useApp();

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1.5 shadow-lg pb-safe">
      <div className="flex items-center justify-around">
        {/* Home */}
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center gap-0.5 p-1.5 rounded-xl transition-all cursor-pointer ${
            activeTab === 'home'
              ? 'text-red-600 font-extrabold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px]">{t.nav.home}</span>
        </button>

        {/* Map */}
        <button
          onClick={() => setActiveTab('map')}
          className={`flex flex-col items-center gap-0.5 p-1.5 rounded-xl transition-all cursor-pointer ${
            activeTab === 'map'
              ? 'text-red-600 font-extrabold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <MapPin className="w-5 h-5" />
          <span className="text-[10px]">{t.nav.map}</span>
        </button>

        {/* Center Floating Action Button: Add Issue */}
        <div className="-mt-5">
          <button
            onClick={() => setIsCreateOpen(true)}
            className="w-12 h-12 rounded-full bg-gradient-to-tr from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 text-white flex items-center justify-center shadow-lg shadow-red-500/40 transform active:scale-90 transition-all cursor-pointer border-2 border-white"
            title={t.reportProblemBtn}
          >
            <Plus className="w-6 h-6 stroke-[2.5]" />
          </button>
        </div>

        {/* Settlements / Registry */}
        <button
          onClick={() => setActiveTab('settlements')}
          className={`flex flex-col items-center gap-0.5 p-1.5 rounded-xl transition-all cursor-pointer ${
            activeTab === 'settlements'
              ? 'text-red-600 font-extrabold'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Layers className="w-5 h-5" />
          <span className="text-[10px]">{lang === 'ky' ? 'Көйгөйлөр' : 'Реестр'}</span>
        </button>

        {/* AI Assistant */}
        <button
          onClick={() => setIsAiOpen(true)}
          className="flex flex-col items-center gap-0.5 p-1.5 rounded-xl text-indigo-600 hover:text-indigo-700 transition-all cursor-pointer"
        >
          <Sparkles className="w-5 h-5 animate-pulse text-amber-500" />
          <span className="text-[10px] font-bold">Бирге AI</span>
        </button>
      </div>
    </div>
  );
};
