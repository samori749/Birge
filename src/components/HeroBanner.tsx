import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Search,
  PlusCircle,
  MapPin,
  Sparkles,
  CheckCircle2,
  Droplets,
  TreePine,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';

export const HeroBanner: React.FC = () => {
  const {
    t,
    lang,
    problems,
    searchQuery,
    setSearchQuery,
    setIsCreateOpen,
    setIsAiOpen,
    setActiveTab,
  } = useApp();

  const totalCount = problems.length;
  const resolvedCount = problems.filter((p) => p.status === 'resolved').length;
  const inProgressCount = problems.filter(
    (p) => p.status === 'in_progress' || p.status === 'forwarded'
  ).length;
  const waterFixedCount = problems.filter(
    (p) => p.category === 'water' && p.status === 'resolved'
  ).length + 3;

  const quickSearchTags = [
    { labelKg: 'Сугат суусу', labelRu: 'Поливная вода', cat: 'water' },
    { labelKg: 'Таштанды үймөгү', labelRu: 'Свалка мусора', cat: 'ecology' },
    { labelKg: 'ОРТ сабактары', labelRu: 'Уроки ОРТ', cat: 'education' },
    { labelKg: 'Жол оңдоо', labelRu: 'Ремонт ям', cat: 'roads' },
    { labelKg: '100 миң сом соцконтракт', labelRu: 'Соцконтракт 100к', cat: 'jobs' },
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white py-12 md:py-16">
      {/* Decorative mountain graphic silhouette and solar aura */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#e11d48_1px,transparent_1px)] [background-size:24px_24px]"></div>
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-red-600/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Main Header Tag & Title */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-medium text-amber-300">
            <span>🇰🇬</span>
            <span>{t.appSlogan}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            <span className="text-white/80">8 маанилүү тармак</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
            {t.heroTitle}
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            {t.heroSubtitle}
          </p>
        </div>

        {/* Global Live Search Bar */}
        <div className="max-w-2xl mx-auto mt-8">
          <div className="relative flex items-center shadow-2xl">
            <Search className="absolute left-4 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full pl-12 pr-28 sm:pr-32 py-3.5 sm:py-4 bg-white/95 text-slate-900 placeholder:text-slate-400 text-sm sm:text-base rounded-2xl border-2 border-transparent focus:border-red-500 focus:outline-hidden transition-all shadow-lg"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-20 text-xs text-slate-400 hover:text-slate-700 font-medium px-2 py-1"
              >
                ✕
              </button>
            )}
            <button
              onClick={() => setActiveTab('settlements')}
              className="absolute right-2 bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-bold px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl transition-all cursor-pointer shadow-sm"
            >
              {lang === 'ky' ? 'Издөө' : 'Найти'}
            </button>
          </div>

          {/* Quick search tags */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 mt-3 text-xs text-slate-400">
            <span className="text-slate-400 font-medium">{lang === 'ky' ? 'Көп изделгендер:' : 'Популярные:'}</span>
            {quickSearchTags.map((tag, idx) => (
              <button
                key={idx}
                onClick={() => setSearchQuery(lang === 'ky' ? tag.labelKg : tag.labelRu)}
                className="bg-white/10 hover:bg-white/20 text-slate-200 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
              >
                {lang === 'ky' ? tag.labelKg : tag.labelRu}
              </button>
            ))}
          </div>
        </div>

        {/* Primary Action Buttons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl mx-auto mt-8">
          <button
            onClick={() => setIsCreateOpen(true)}
            className="flex items-center justify-center gap-2.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white p-3.5 rounded-2xl font-bold shadow-lg shadow-red-700/30 transition-all transform hover:-translate-y-0.5 cursor-pointer text-sm sm:text-base"
          >
            <PlusCircle className="w-5 h-5 text-amber-300" />
            <span>{t.reportProblemBtn}</span>
          </button>

          <button
            onClick={() => setActiveTab('map')}
            className="flex items-center justify-center gap-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white p-3.5 rounded-2xl font-semibold backdrop-blur-md transition-all transform hover:-translate-y-0.5 cursor-pointer text-sm sm:text-base"
          >
            <MapPin className="w-5 h-5 text-red-400" />
            <span>{t.interactiveMapBtn}</span>
          </button>

          <button
            onClick={() => setIsAiOpen(true)}
            className="flex items-center justify-center gap-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white p-3.5 rounded-2xl font-semibold shadow-lg shadow-indigo-600/30 transition-all transform hover:-translate-y-0.5 cursor-pointer text-sm sm:text-base"
          >
            <Sparkles className="w-5 h-5 text-amber-300" />
            <span>{t.aiAssistantBtn}</span>
          </button>
        </div>

        {/* Real Outcome Metrics Ribbon */}
        <div className="mt-12 pt-8 border-t border-slate-700/70 max-w-4xl mx-auto">
          <div className="text-center mb-5">
            <span className="text-xs uppercase font-bold tracking-widest text-emerald-400 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>{t.metrics.realImpactTitle}</span>
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-xs">
              <div className="flex items-center justify-center gap-1.5 text-2xl sm:text-3xl font-extrabold text-white">
                <TrendingUp className="w-5 h-5 text-red-400" />
                <span>{totalCount}</span>
              </div>
              <p className="text-xs text-slate-300 mt-1 font-medium">{t.metrics.totalProblems}</p>
            </div>

            <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-2xl p-4 backdrop-blur-xs">
              <div className="flex items-center justify-center gap-1.5 text-2xl sm:text-3xl font-extrabold text-emerald-400">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>{resolvedCount}</span>
              </div>
              <p className="text-xs text-emerald-200 mt-1 font-medium">{t.metrics.resolvedProblems}</p>
            </div>

            <div className="bg-blue-950/40 border border-blue-500/30 rounded-2xl p-4 backdrop-blur-xs">
              <div className="flex items-center justify-center gap-1.5 text-2xl sm:text-3xl font-extrabold text-cyan-400">
                <Droplets className="w-5 h-5 text-cyan-400" />
                <span>{waterFixedCount}</span>
              </div>
              <p className="text-xs text-cyan-200 mt-1 font-medium">{t.metrics.waterSaved}</p>
            </div>

            <div className="bg-amber-950/40 border border-amber-500/30 rounded-2xl p-4 backdrop-blur-xs">
              <div className="flex items-center justify-center gap-1.5 text-2xl sm:text-3xl font-extrabold text-amber-400">
                <TreePine className="w-5 h-5 text-amber-400" />
                <span>{inProgressCount + 8}</span>
              </div>
              <p className="text-xs text-amber-200 mt-1 font-medium">{lang === 'ky' ? 'Иштеги маселелер' : 'На контроле / В работе'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
