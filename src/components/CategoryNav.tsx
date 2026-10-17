import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Droplets,
  Leaf,
  GraduationCap,
  Briefcase,
  Construction,
  HeartPulse,
  Building2,
  HandHeart,
  ArrowRight,
} from 'lucide-react';
import { CategoryId } from '../types';

interface CategoryConfig {
  id: CategoryId;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgLight: string;
  borderColor: string;
  textColor: string;
  badgeBg: string;
}

export const CATEGORIES_CONFIG: CategoryConfig[] = [
  {
    id: 'water',
    icon: Droplets,
    color: 'from-cyan-500 to-blue-600',
    bgLight: 'bg-cyan-50/60 hover:bg-cyan-100/60',
    borderColor: 'border-cyan-200',
    textColor: 'text-cyan-700',
    badgeBg: 'bg-cyan-100 text-cyan-800',
  },
  {
    id: 'ecology',
    icon: Leaf,
    color: 'from-emerald-500 to-green-600',
    bgLight: 'bg-emerald-50/60 hover:bg-emerald-100/60',
    borderColor: 'border-emerald-200',
    textColor: 'text-emerald-700',
    badgeBg: 'bg-emerald-100 text-emerald-800',
  },
  {
    id: 'education',
    icon: GraduationCap,
    color: 'from-indigo-500 to-violet-600',
    bgLight: 'bg-indigo-50/60 hover:bg-indigo-100/60',
    borderColor: 'border-indigo-200',
    textColor: 'text-indigo-700',
    badgeBg: 'bg-indigo-100 text-indigo-800',
  },
  {
    id: 'jobs',
    icon: Briefcase,
    color: 'from-amber-500 to-orange-600',
    bgLight: 'bg-amber-50/60 hover:bg-amber-100/60',
    borderColor: 'border-amber-200',
    textColor: 'text-amber-700',
    badgeBg: 'bg-amber-100 text-amber-800',
  },
  {
    id: 'roads',
    icon: Construction,
    color: 'from-orange-500 to-amber-700',
    bgLight: 'bg-orange-50/60 hover:bg-orange-100/60',
    borderColor: 'border-orange-200',
    textColor: 'text-orange-700',
    badgeBg: 'bg-orange-100 text-orange-800',
  },
  {
    id: 'medicine',
    icon: HeartPulse,
    color: 'from-rose-500 to-red-600',
    bgLight: 'bg-rose-50/60 hover:bg-rose-100/60',
    borderColor: 'border-rose-200',
    textColor: 'text-rose-700',
    badgeBg: 'bg-rose-100 text-rose-800',
  },
  {
    id: 'settlements',
    icon: Building2,
    color: 'from-blue-600 to-indigo-700',
    bgLight: 'bg-blue-50/60 hover:bg-blue-100/60',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-700',
    badgeBg: 'bg-blue-100 text-blue-800',
  },
  {
    id: 'social',
    icon: HandHeart,
    color: 'from-purple-500 to-pink-600',
    bgLight: 'bg-purple-50/60 hover:bg-purple-100/60',
    borderColor: 'border-purple-200',
    textColor: 'text-purple-700',
    badgeBg: 'bg-purple-100 text-purple-800',
  },
];

export const CategoryNav: React.FC = () => {
  const {
    t,
    lang,
    problems,
    activeTab,
    setActiveTab,
    selectedCategory,
    setSelectedCategory,
  } = useApp();

  const handleCategoryClick = (id: CategoryId) => {
    setSelectedCategory(id);
    setActiveTab(id);
    window.scrollTo({ top: 480, behavior: 'smooth' });
  };

  return (
    <section className="py-10 bg-slate-50 border-b border-slate-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 px-2.5 py-1 rounded-full mb-2">
              <span>8 негизги багыт</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {lang === 'ky' ? 'Кыргызстандын 8 маанилүү тармагы' : '8 Ключевых разделов платформы'}
            </h2>
            <p className="text-sm text-slate-500 mt-1 max-w-2xl">
              {lang === 'ky'
                ? 'Ар бир тармак боюнча көйгөйлөр картасы, пайдалуу кеңештер, акысыз ресурстар жана чечүү жолдору камтылган.'
                : 'По каждому направлению доступны карта обращений, проверенные контакты, каталог ресурсов и практические инструменты.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setSelectedCategory('all');
                setActiveTab('settlements');
              }}
              className="text-xs sm:text-sm font-semibold text-slate-700 hover:text-red-600 flex items-center gap-1 group bg-white border border-slate-200 px-3.5 py-2 rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <span>{t.viewAll}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-red-600" />
            </button>
          </div>
        </div>

        {/* 8 Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CATEGORIES_CONFIG.map((cat) => {
            const Icon = cat.icon;
            const count = problems.filter((p) => p.category === cat.id).length;
            const isCurrent = activeTab === cat.id;

            return (
              <div
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className={`group relative p-5 rounded-2xl border transition-all duration-200 cursor-pointer text-left bg-white shadow-xs hover:shadow-md ${
                  isCurrent
                    ? 'ring-2 ring-red-500 border-transparent bg-red-50/20'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <span
                    className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${cat.badgeBg}`}
                  >
                    {count} {lang === 'ky' ? 'кайрылуу' : 'обращ.'}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-base group-hover:text-red-600 transition-colors">
                  {t.categories[cat.id]}
                </h3>

                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed line-clamp-2">
                  {t.categoryDescs[cat.id]}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-600 group-hover:text-red-600 transition-colors">
                  <span>{lang === 'ky' ? 'Бөлүмгө өтүү' : 'Перейти в раздел'}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
