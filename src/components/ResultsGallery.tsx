import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  CheckCircle2,
  MapPin,
  Calendar,
  Building,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';

export const ResultsGallery: React.FC = () => {
  const { t, lang, problems, setActiveProblemModal } = useApp();

  const resolvedWithAfterPhoto = problems.filter(
    (p) => p.status === 'resolved' && p.imageAfterUrl
  );

  const [activeTabMap, setActiveTabMap] = useState<Record<string, 'before' | 'after'>>({});

  const toggleTab = (id: string, tab: 'before' | 'after') => {
    setActiveTabMap((prev) => ({ ...prev, [id]: tab }));
  };

  return (
    <section className="py-12 bg-white border-b border-slate-200">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full mb-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>{t.metrics.realImpactTitle}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {lang === 'ky' ? 'Чечилген маселелер: Сүрөттөр менен далил' : 'Подтверждённые результаты: До и После'}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            {t.metrics.realImpactDesc}
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resolvedWithAfterPhoto.map((prob) => {
            const currentTab = activeTabMap[prob.id] || 'after';

            return (
              <div
                key={prob.id}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col group"
              >
                {/* Photo Viewer with Before/After Switcher */}
                <div className="relative h-60 w-full bg-slate-100 overflow-hidden">
                  <img
                    src={currentTab === 'after' ? prob.imageAfterUrl! : prob.imageUrl}
                    alt={prob.title}
                    className="w-full h-full object-cover transition-all duration-500"
                  />

                  {/* Switcher Pill Button */}
                  <div className="absolute top-3 left-3 bg-slate-950/70 backdrop-blur-md p-1 rounded-xl flex items-center gap-1 shadow-md">
                    <button
                      onClick={() => toggleTab(prob.id, 'before')}
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                        currentTab === 'before'
                          ? 'bg-red-600 text-white shadow-xs'
                          : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      {lang === 'ky' ? 'Чейин' : 'До'}
                    </button>
                    <button
                      onClick={() => toggleTab(prob.id, 'after')}
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                        currentTab === 'after'
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      {lang === 'ky' ? 'Кийин ✅' : 'После ✅'}
                    </button>
                  </div>

                  {/* Category badge */}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-slate-900 text-[10px] font-bold px-2.5 py-1 rounded-full shadow-xs">
                    {t.categories[prob.category]}
                  </div>

                  {/* Current view indicator label */}
                  <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-semibold px-2 py-0.5 rounded-md">
                    {currentTab === 'after' ? t.photoAfter : t.photoBefore}
                  </div>
                </div>

                {/* Card Details */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1.5 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                      <span className="truncate">
                        {t.regions[prob.region]}, {prob.villageOrStreet}
                      </span>
                    </div>

                    <h3
                      onClick={() => setActiveProblemModal(prob)}
                      className="font-bold text-slate-900 text-base group-hover:text-emerald-700 transition-colors cursor-pointer line-clamp-2"
                    >
                      {prob.title}
                    </h3>

                    {/* Official confirmation snippet */}
                    {prob.officialResponse && (
                      <div className="mt-3 p-3 rounded-xl bg-emerald-50/70 border border-emerald-100 text-xs text-emerald-950 space-y-1">
                        <div className="font-bold flex items-center gap-1 text-emerald-900">
                          <Building className="w-3.5 h-3.5 text-emerald-700" />
                          <span>{prob.officialResponse.agency}</span>
                        </div>
                        <p className="italic line-clamp-2 text-slate-700">
                          "{prob.officialResponse.text}"
                        </p>
                        {prob.officialResponse.docNumber && (
                          <div className="text-[10px] font-mono text-emerald-700 font-bold pt-1">
                            {prob.officialResponse.docNumber} • {prob.officialResponse.responseDate}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Footer Stats & Modal Link */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1 text-slate-500 font-medium">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{prob.confirmationsCount} {lang === 'ky' ? 'тастыктоо' : 'голосов'}</span>
                    </span>

                    <button
                      onClick={() => setActiveProblemModal(prob)}
                      className="font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
                    >
                      <span>{lang === 'ky' ? 'Аткарылуу тарыхы' : 'История решения'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
