import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { CategoryNav } from './components/CategoryNav';
import { KyrgyzstanMap } from './components/KyrgyzstanMap';
import { ResultsGallery } from './components/ResultsGallery';
import { ProblemCard } from './components/ProblemCard';
import { ProblemModal } from './components/ProblemModal';
import { CreateProblemModal } from './components/CreateProblemModal';
import { AiAssistant } from './components/AiAssistant';
import { UserProfileModal } from './components/UserProfileModal';
import { ModeratorDashboard } from './components/ModeratorDashboard';
import { MobileInstallBar } from './components/MobileInstallBar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { MobileQRCodeModal } from './components/MobileQRCodeModal';
import { OfflineIndicator } from './components/OfflineIndicator';
import { WaterSection } from './components/sections/WaterSection';
import { EcologySection } from './components/sections/EcologySection';
import { EducationSection } from './components/sections/EducationSection';
import { JobsSection } from './components/sections/JobsSection';
import { RoadsSection } from './components/sections/RoadsSection';
import { MedicineSection } from './components/sections/MedicineSection';
import { SettlementsSection } from './components/sections/SettlementsSection';
import { SocialSection } from './components/sections/SocialSection';
import {
  Sparkles,
  PlusCircle,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Layers,
  ArrowRight,
  Heart,
  Phone,
  Smartphone,
} from 'lucide-react';

const MainContent: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    t,
    lang,
    problems,
    setIsCreateOpen,
    setIsAiOpen,
    isQrOpen,
    setIsQrOpen,
    toasts,
  } = useApp();

  // Render sub-view depending on activeTab
  const renderActiveSection = () => {
    switch (activeTab) {
      case 'map':
        return <KyrgyzstanMap />;
      case 'results':
        return <ResultsGallery />;
      case 'moderator':
        return <ModeratorDashboard />;
      case 'settlements':
        return <SettlementsSection />;
      case 'water':
        return <WaterSection />;
      case 'ecology':
        return <EcologySection />;
      case 'education':
        return <EducationSection />;
      case 'jobs':
        return <JobsSection />;
      case 'roads':
        return <RoadsSection />;
      case 'medicine':
        return <MedicineSection />;
      case 'social':
        return <SocialSection />;
      case 'home':
      default:
        return (
          <div className="space-y-12">
            {/* 8 Categories Navigation Grid */}
            <CategoryNav />

            {/* Interactive Kyrgyzstan Map Section */}
            <section className="container mx-auto px-4">
              <KyrgyzstanMap />
            </section>

            {/* Real Impact: Verified Results Gallery */}
            <ResultsGallery />

            {/* Recent Problems Feed */}
            <section className="container mx-auto px-4 pb-12">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-3">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 px-2.5 py-1 rounded-full mb-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{lang === 'ky' ? 'Жаңы кайрылуулар' : 'Свежие обращения'}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                    {lang === 'ky' ? 'Жарандардан түшкөн акыркы билдирүүлөр' : 'Лента гражданских инициатив и проблем'}
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab('settlements')}
                    className="text-xs sm:text-sm font-bold text-red-600 hover:text-red-700 flex items-center gap-1 cursor-pointer"
                  >
                    <span>{lang === 'ky' ? 'Бардык реестрди көрүү' : 'Смотреть все обращения'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {problems.slice(0, 6).map((prob) => (
                  <ProblemCard key={prob.id} problem={prob} />
                ))}
              </div>
            </section>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col text-slate-900 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Mobile Install Top Banner */}
      <MobileInstallBar />

      {/* Navigation Header */}
      <Header />

      {/* Hero Banner only on Home view */}
      {activeTab === 'home' && <HeroBanner />}

      {/* Main Tabbed Container - bottom padding on mobile for thumb nav */}
      <main className="flex-1 py-6 sm:py-8 pb-24 lg:pb-8">
        <div className="container mx-auto px-4">
          {activeTab !== 'home' && (
            <div className="mb-6 flex items-center gap-2 text-xs font-semibold text-slate-500">
              <button
                onClick={() => setActiveTab('home')}
                className="hover:text-red-600 cursor-pointer"
              >
                {t.nav.home}
              </button>
              <span>/</span>
              <span className="text-slate-900 font-bold">
                {activeTab === 'map'
                  ? t.nav.map
                  : activeTab === 'results'
                  ? t.nav.results
                  : activeTab === 'moderator'
                  ? t.nav.moderator
                  : t.categories[activeTab as keyof typeof t.categories] || activeTab}
              </span>
            </div>
          )}

          {renderActiveSection()}
        </div>
      </main>

      {/* Floating Action Buttons for Desktop / Tablet */}
      <div className="hidden lg:flex fixed bottom-6 right-6 z-40 flex-col items-end gap-2.5">
        <button
          onClick={() => setIsCreateOpen(true)}
          className="bg-red-600 hover:bg-red-700 text-white p-3.5 rounded-full shadow-xl shadow-red-600/30 transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2 group pr-4"
          title={t.reportProblemBtn}
        >
          <PlusCircle className="w-5 h-5" />
          <span className="font-bold text-xs">{t.reportProblemBtn}</span>
        </button>

        <button
          onClick={() => setIsAiOpen(true)}
          className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white p-3.5 rounded-full shadow-xl shadow-indigo-600/30 transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2 group pr-4"
          title="Бирге AI кеңешчиси"
        >
          <Sparkles className="w-5 h-5 text-amber-300" />
          <span className="font-bold text-xs">«Бирге AI» кеңешчиси</span>
        </button>
      </div>

      {/* Native-style Mobile Bottom Navigation Bar for Smartphones */}
      <MobileBottomNav />

      {/* Offline Status Badge */}
      <OfflineIndicator />

      {/* Footer */}
      <footer className="bg-slate-900 text-white pt-12 pb-24 lg:pb-8 border-t border-slate-800">
        <div className="container mx-auto px-4 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🇰🇬</span>
                <span className="font-black text-xl tracking-tight text-white">{t.appName}</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {t.heroSubtitle}
              </p>
              <div className="text-[11px] text-amber-400 font-semibold">
                «{t.appSlogan}»
              </div>
            </div>

            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400 mb-3">
                {lang === 'ky' ? 'Тармактык бөлүмдөр' : 'Разделы платформы'}
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                <li>
                  <button onClick={() => setActiveTab('water')} className="hover:text-red-400 cursor-pointer">
                    {t.categories.water}
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('ecology')} className="hover:text-red-400 cursor-pointer">
                    {t.categories.ecology}
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('education')} className="hover:text-red-400 cursor-pointer">
                    {t.categories.education}
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('jobs')} className="hover:text-red-400 cursor-pointer">
                    {t.categories.jobs}
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveTab('roads')} className="hover:text-red-400 cursor-pointer">
                    {t.categories.roads}
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400 mb-3">
                {lang === 'ky' ? 'Мамлекеттик байланыштар' : 'Экстренные службы КР'}
              </h4>
              <ul className="space-y-2 text-xs text-slate-300 font-mono">
                <li className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-red-400" />
                  <span>103 — Тез жардам / Скорая помощь</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>112 — Бирдиктүү куткаруу кызматы (ӨКМ)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-blue-400" />
                  <span>118 / 1120 — Саламаттык сактоо / ФОМС</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>111 — Балдардын ишеним телефону</span>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400 mb-1">
                {lang === 'ky' ? 'Телефондо колдонуу' : 'Мобильная версия'}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                {lang === 'ky'
                  ? 'Тиркеме бардык смартфондордо толук экрандуу режимде иштейт.'
                  : 'Приложение адаптировано под экраны любых смартфонов и работает как мобильное приложение.'}
              </p>
              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={() => setIsQrOpen(true)}
                  className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs px-3 py-2 rounded-xl border border-white/20 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Smartphone className="w-4 h-4 text-amber-300" />
                  <span>{lang === 'ky' ? 'Телефондон ачуу (QR-код)' : 'Открыть на телефоне (QR)'}</span>
                </button>
                <button
                  onClick={() => setActiveTab('moderator')}
                  className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer pt-1"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>{lang === 'ky' ? 'Ведомстволор жана модераторлор үчүн' : 'Кабинет ответственных органов'}</span>
                </button>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
            <div>
              © 2026 «БИРГЕ KG». {lang === 'ky' ? 'Бардык укуктар корголгон.' : 'Все права защищены.'}
            </div>
            <div className="flex items-center gap-1 text-slate-400">
              <span>{lang === 'ky' ? 'Кыргызстандын жаркын келечеги үчүн' : 'Для развития гражданского общества Кыргызстана'}</span>
              <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            </div>
          </div>
        </div>
      </footer>

      {/* Global Modals */}
      <ProblemModal />
      <CreateProblemModal />
      <AiAssistant />
      <UserProfileModal />
      <MobileQRCodeModal isOpen={isQrOpen} onClose={() => setIsQrOpen(false)} />

      {/* Toast Notification Container */}
      <div className="fixed top-16 right-4 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto p-3.5 rounded-2xl shadow-xl border text-xs font-bold flex items-center gap-2 transform transition-all animate-bounce ${
              toast.type === 'success'
                ? 'bg-emerald-600 text-white border-emerald-500 shadow-emerald-500/20'
                : toast.type === 'warning'
                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-amber-500/20'
                : 'bg-slate-900 text-white border-slate-700 shadow-slate-900/30'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span className="flex-1 leading-snug">{toast.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
