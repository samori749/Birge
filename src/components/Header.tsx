import React from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldAlert,
  PlusCircle,
  Sparkles,
  MapPin,
  Globe,
  User,
  CheckCircle2,
  Layers,
  Menu,
  X,
  Smartphone,
} from 'lucide-react';
import { CategoryId } from '../types';

export const Header: React.FC = () => {
  const {
    lang,
    setLang,
    t,
    isModerator,
    setIsModerator,
    activeTab,
    setActiveTab,
    setIsCreateOpen,
    setIsAiOpen,
    setIsProfileOpen,
    setIsQrOpen,
    setSelectedCategory,
    userProfile,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleNav = (tab: string, categoryId?: CategoryId) => {
    setActiveTab(tab);
    if (categoryId) {
      setSelectedCategory(categoryId);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Banner Notice: National Civic Project */}
      <div className="bg-gradient-to-r from-red-600 via-red-500 to-amber-500 text-white text-xs py-1 px-4 flex items-center justify-between font-medium">
        <div className="container mx-auto flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-2 h-2 rounded-full bg-amber-300 animate-pulse"></span>
            <span>Кыргыз Республикасынын жарандык демилгелер жана чечимдер платформасы</span>
          </span>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-block opacity-90 text-[11px]">
              {lang === 'ky' ? 'Суу • Экология • Билим • Жумуш • Жолдор • Саламаттык' : 'Вода • Экология • Образование • Работа • Дороги • Медицина'}
            </span>
            {/* Quick Lang Switch */}
            <button
              onClick={() => setLang(lang === 'ky' ? 'ru' : 'ky')}
              className="flex items-center gap-1 bg-white/20 hover:bg-white/30 text-white rounded-full px-2 py-0.5 text-xs font-bold transition-all cursor-pointer"
              title="Тилди которуу / Сменить язык"
            >
              <Globe className="w-3 h-3" />
              <span>{lang === 'ky' ? 'РУС' : 'КЫР'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div
          onClick={() => handleNav('home')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center text-white shadow-md shadow-red-500/20 group-hover:scale-105 transition-transform">
            <span className="text-xl font-black">🇰🇬</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl text-slate-900 tracking-tight">
                {t.appName}
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-sm bg-red-100 text-red-700">
                Кыргызстан
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
              {t.appSlogan}
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          <button
            onClick={() => handleNav('home')}
            className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
              activeTab === 'home'
                ? 'bg-red-50 text-red-700'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            {t.nav.home}
          </button>
          <button
            onClick={() => handleNav('map')}
            className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'map'
                ? 'bg-red-50 text-red-700'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <MapPin className="w-4 h-4 text-red-600" />
            {t.nav.map}
          </button>
          <button
            onClick={() => handleNav('settlements')}
            className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'settlements'
                ? 'bg-red-50 text-red-700'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Layers className="w-4 h-4 text-blue-600" />
            {lang === 'ky' ? 'Көйгөйлөр реестри' : 'Реестр проблем'}
          </button>
          <button
            onClick={() => handleNav('results')}
            className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'results'
                ? 'bg-emerald-50 text-emerald-700'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            {t.nav.results}
          </button>
          <button
            onClick={() => handleNav('moderator')}
            className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'moderator'
                ? 'bg-amber-100 text-amber-900 font-bold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <ShieldAlert className="w-4 h-4 text-amber-600" />
            {t.nav.moderator}
          </button>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Moderator Mode Pill Switch */}
          <button
            onClick={() => setIsModerator(!isModerator)}
            className={`hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
              isModerator
                ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
            title="Переключить режим модератора / сотрудника ведомства"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>{isModerator ? t.moderatorMode : t.citizenMode}</span>
          </button>

          {/* AI Assistant Button */}
          <button
            onClick={() => setIsAiOpen(true)}
            className="flex items-center gap-1.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white text-xs sm:text-sm font-semibold px-3 py-2 rounded-xl shadow-xs transition-all hover:shadow-indigo-500/20 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 animate-spin text-amber-300" style={{ animationDuration: '6s' }} />
            <span className="hidden sm:inline">Бирге AI</span>
          </button>

          {/* Report Button */}
          <button
            onClick={() => setIsCreateOpen(true)}
            className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 active:scale-95 text-white text-xs sm:text-sm font-bold px-3 sm:px-4 py-2 rounded-xl shadow-md shadow-red-600/20 transition-all cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{t.reportProblemBtn}</span>
          </button>

          {/* Open on Phone QR button */}
          <button
            onClick={() => setIsQrOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 text-xs font-bold transition-all cursor-pointer shadow-xs"
            title="Телефондон ачуу / Открыть на телефоне (QR-код)"
          >
            <Smartphone className="w-4 h-4 text-red-600" />
            <span className="hidden sm:inline">{lang === 'ky' ? 'Телефондон' : 'На телефоне'}</span>
          </button>

          {/* Profile Button */}
          <button
            onClick={() => setIsProfileOpen(true)}
            className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 flex items-center justify-center text-slate-700 transition-colors cursor-pointer"
            title="Жеке кабинет / Профиль"
          >
            <User className="w-4 h-4" />
          </button>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-3 space-y-2">
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-100">
            <button
              onClick={() => handleNav('home')}
              className="text-left py-2 px-3 rounded-lg text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              🏠 {t.nav.home}
            </button>
            <button
              onClick={() => handleNav('map')}
              className="text-left py-2 px-3 rounded-lg text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              📍 {t.nav.map}
            </button>
            <button
              onClick={() => handleNav('settlements')}
              className="text-left py-2 px-3 rounded-lg text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              📑 {lang === 'ky' ? 'Көйгөйлөр' : 'Реестр'}
            </button>
            <button
              onClick={() => handleNav('results')}
              className="text-left py-2 px-3 rounded-lg text-sm font-semibold text-emerald-700 hover:bg-emerald-50"
            >
              ✅ {t.nav.results}
            </button>
            <button
              onClick={() => handleNav('moderator')}
              className="text-left py-2 px-3 rounded-lg text-sm font-semibold text-amber-700 hover:bg-amber-50"
            >
              🛡️ {t.nav.moderator}
            </button>
            <button
              onClick={() => {
                setIsModerator(!isModerator);
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 px-3 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700"
            >
              {isModerator ? '⚙️ Режим: Модератор' : '👤 Режим: Жаран'}
            </button>
          </div>
          <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
            <span>Катталган колдонуучу: {userProfile.name}</span>
            <span className="font-bold text-amber-600">{userProfile.volunteerScore} балл</span>
          </div>
        </div>
      )}
    </header>
  );
};
