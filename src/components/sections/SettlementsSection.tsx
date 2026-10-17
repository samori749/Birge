import React from 'react';
import { useApp } from '../../context/AppContext';
import { ProblemCard } from '../ProblemCard';
import { CategoryId, RegionId, ProblemStatus } from '../../types';
import {
  Building2,
  Search,
  Filter,
  PlusCircle,
  CheckCircle2,
  Clock,
  Layers,
  MapPin,
} from 'lucide-react';

export const SettlementsSection: React.FC = () => {
  const {
    t,
    lang,
    problems,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedRegion,
    setSelectedRegion,
    selectedStatus,
    setSelectedStatus,
    setIsCreateOpen,
  } = useApp();

  const filteredProblems = problems.filter((p) => {
    if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
    if (selectedRegion !== 'all' && p.region !== selectedRegion) return false;
    if (selectedStatus !== 'all' && p.status !== selectedStatus) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const combined = (p.title + ' ' + p.description + ' ' + p.district + ' ' + p.villageOrStreet).toLowerCase();
      if (!combined.includes(q)) return false;
    }
    return true;
  });

  const resolvedCount = problems.filter((p) => p.status === 'resolved').length;
  const inProgressCount = problems.filter((p) => p.status === 'in_progress').length;
  const forwardedCount = problems.filter((p) => p.status === 'forwarded').length;

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-800 text-white rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-1.5 bg-white/20 px-3 py-1 rounded-full text-xs font-bold mb-3 backdrop-blur-xs">
            <Building2 className="w-3.5 h-3.5 text-blue-200" />
            <span>{t.categories.settlements}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {lang === 'ky' ? 'Шаар жана айылдардын бирдиктүү көйгөйлөр реестри' : 'Единый реестр обращений городов и сёл КР'}
          </h2>
          <p className="text-sm text-blue-100 mt-2 leading-relaxed">
            {lang === 'ky'
              ? 'Кыргызстандын бардык айылдары жана шаарлары боюнча суу, жол, экология, медицина маселелерин бирдиктүү тутумдан көзөмөлдөңүз.'
              : 'Централизованная система гражданских обращений по всем 8 направлениям: отслеживайте статус от первичного сообщения до официального решения.'}
          </p>

          <div className="mt-5 flex items-center gap-3">
            <button
              onClick={() => setIsCreateOpen(true)}
              className="bg-white text-blue-900 hover:bg-blue-50 font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 text-blue-600" />
              <span>{t.reportProblemBtn}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="relative">
          <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="w-full pl-10 pr-24 py-3 rounded-2xl border border-slate-300 text-xs sm:text-sm focus:border-red-500 outline-hidden"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-3 text-xs text-slate-400 hover:text-slate-700"
            >
              {lang === 'ky' ? 'Тазалоо' : 'Сброс'}
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              {lang === 'ky' ? 'Облус / Шаар:' : 'Область / Город:'}
            </label>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value as any)}
              className="w-full font-semibold p-2.5 rounded-xl border border-slate-300 bg-white"
            >
              <option value="all">🇰🇬 {t.allRegions}</option>
              {Object.entries(t.regions).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              {lang === 'ky' ? 'Тармагы (8 багыт):' : 'Категория:'}
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as any)}
              className="w-full font-semibold p-2.5 rounded-xl border border-slate-300 bg-white"
            >
              <option value="all">📂 {t.allCategories}</option>
              {Object.entries(t.categories).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              {lang === 'ky' ? 'Абалы:' : 'Статус выполнения:'}
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as any)}
              className="w-full font-semibold p-2.5 rounded-xl border border-slate-300 bg-white"
            >
              <option value="all">⚡ {t.allStatuses}</option>
              <option value="new">🆕 {t.statuses.new}</option>
              <option value="review">🔍 {t.statuses.review}</option>
              <option value="confirmed">🛡️ {t.statuses.confirmed}</option>
              <option value="forwarded">🏛️ {t.statuses.forwarded}</option>
              <option value="in_progress">⚡ {t.statuses.in_progress}</option>
              <option value="resolved">✅ {t.statuses.resolved}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Problems Results Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-blue-600" />
            <span>
              {lang === 'ky' ? 'Табылган кайрылуулар:' : 'Найдено обращений:'}{' '}
              <span className="text-red-600 font-extrabold">{filteredProblems.length}</span>
            </span>
          </h3>
        </div>

        {(selectedCategory !== 'all' || selectedRegion !== 'all' || selectedStatus !== 'all' || searchQuery) && (
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedRegion('all');
              setSelectedStatus('all');
              setSearchQuery('');
            }}
            className="text-xs font-semibold text-red-600 hover:text-red-700 cursor-pointer"
          >
            {lang === 'ky' ? 'Бардык фильтрлерди тазалоо' : 'Сбросить все фильтры'}
          </button>
        )}
      </div>

      {/* Problems Grid */}
      {filteredProblems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProblems.map((p) => (
            <ProblemCard key={p.id} problem={p} />
          ))}
        </div>
      ) : (
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-10 text-center space-y-3">
          <Building2 className="w-10 h-10 text-slate-400 mx-auto" />
          <h4 className="font-bold text-slate-800 text-base">
            {lang === 'ky' ? 'Бул фильтр боюнча кайрылуу табылган жок' : 'По вашему запросу ничего не найдено'}
          </h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {lang === 'ky'
              ? 'Фильтрлерди өзгөртүп көрүңүз же биринчи болуп жаңы көйгөй тууралуу билдириңиз.'
              : 'Попробуйте изменить параметры поиска или сообщите о новой проблеме первым.'}
          </p>
          <button
            onClick={() => setIsCreateOpen(true)}
            className="bg-red-600 text-white font-bold text-xs px-4 py-2 rounded-xl mt-2 cursor-pointer shadow-xs"
          >
            {t.reportProblemBtn}
          </button>
        </div>
      )}
    </div>
  );
};
