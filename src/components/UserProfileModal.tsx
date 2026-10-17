import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { RegionId } from '../types';
import {
  User,
  X,
  Award,
  ShieldCheck,
  Globe,
  MapPin,
  RotateCcw,
  CheckCircle2,
  Bell,
  Heart,
} from 'lucide-react';

export const UserProfileModal: React.FC = () => {
  const {
    isProfileOpen,
    setIsProfileOpen,
    t,
    lang,
    setLang,
    userProfile,
    updateUserProfile,
    problems,
    setActiveProblemModal,
    resetDemoData,
  } = useApp();

  const [name, setName] = useState(userProfile.name);
  const [region, setRegion] = useState<RegionId>(userProfile.region);

  if (!isProfileOpen) return null;

  // My reported complaints
  const myProblems = problems.filter((p) => p.confirmedByUserIds.includes('my-user-id'));

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({ name, region });
    setIsProfileOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 relative flex flex-col">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-t-3xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white text-xl font-black">
              🇰🇬
            </div>
            <div>
              <h3 className="font-extrabold text-lg">{userProfile.name}</h3>
              <p className="text-xs text-red-100">
                {lang === 'ky' ? '«Бирге KG» жарандык катышуучусу' : 'Гражданский активист платформы'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsProfileOpen(false)}
            className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Badges & Impact Points */}
        <div className="p-5 sm:p-6 space-y-6">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center gap-3">
              <Award className="w-8 h-8 text-amber-600 shrink-0" />
              <div>
                <span className="text-xs font-bold text-amber-900">
                  {lang === 'ky' ? 'Активдүүлүк упайы' : 'Баллы активности'}
                </span>
                <div className="text-xl font-extrabold text-amber-900 mt-0.5">
                  {userProfile.volunteerScore} упай
                </div>
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center gap-3">
              <ShieldCheck className="w-8 h-8 text-emerald-600 shrink-0" />
              <div>
                <span className="text-xs font-bold text-emerald-900">
                  {lang === 'ky' ? 'Тастыкталган үн' : 'Подтверждено проблем'}
                </span>
                <div className="text-xl font-extrabold text-emerald-900 mt-0.5">
                  {userProfile.confirmedCount} маселе
                </div>
              </div>
            </div>
          </div>

          {/* Profile settings form */}
          <form onSubmit={handleSave} className="space-y-4 text-xs">
            <h4 className="font-bold text-slate-900 text-sm">
              {lang === 'ky' ? 'Жеке маалыматтарды өзгөртүү' : 'Настройки профиля'}
            </h4>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                {lang === 'ky' ? 'Аты-жөнү же никнейм:' : 'Отображаемое имя:'}
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 text-sm font-semibold"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                {lang === 'ky' ? 'Жашаган облус / шаар:' : 'Регион проживания:'}
              </label>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value as RegionId)}
                className="w-full p-2.5 rounded-xl border border-slate-300 text-sm font-semibold bg-white"
              >
                {Object.entries(t.regions).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                {lang === 'ky' ? 'Интерфейс тили:' : 'Язык приложения:'}
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setLang('ky')}
                  className={`flex-1 py-2 rounded-xl border font-bold text-xs ${
                    lang === 'ky'
                      ? 'bg-red-600 text-white border-red-600'
                      : 'bg-white text-slate-700 border-slate-300'
                  }`}
                >
                  Кыргызча 🇰🇬
                </button>
                <button
                  type="button"
                  onClick={() => setLang('ru')}
                  className={`flex-1 py-2 rounded-xl border font-bold text-xs ${
                    lang === 'ru'
                      ? 'bg-red-600 text-white border-red-600'
                      : 'bg-white text-slate-700 border-slate-300'
                  }`}
                >
                  Русский 🇷🇺
                </button>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-xs"
              >
                {t.save}
              </button>
            </div>
          </form>

          {/* My Complaints List */}
          <div className="space-y-3 pt-3 border-t border-slate-100">
            <h4 className="font-bold text-slate-900 text-sm">
              {lang === 'ky' ? 'Менин кайрылууларым жана колдоолорум' : 'Мои обращения и голоса'} ({myProblems.length})
            </h4>

            <div className="space-y-2">
              {myProblems.map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    setIsProfileOpen(false);
                    setActiveProblemModal(p);
                  }}
                  className="p-3 rounded-xl border border-slate-200 hover:border-red-400 bg-slate-50/50 hover:bg-white transition-all cursor-pointer flex items-center justify-between text-xs"
                >
                  <div className="truncate mr-2">
                    <div className="font-bold text-slate-800 truncate">{p.title}</div>
                    <div className="text-[10px] text-slate-400">{t.regions[p.region]} • {p.createdAt}</div>
                  </div>
                  <span
                    className={`font-semibold text-[10px] px-2 py-0.5 rounded-md shrink-0 ${
                      p.status === 'resolved'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {t.statuses[p.status]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Demo Data Reset */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
            <span>{lang === 'ky' ? 'Сыноо маалыматтары' : 'Демонстрационные данные'}</span>
            <button
              onClick={resetDemoData}
              className="text-xs text-slate-500 hover:text-red-600 flex items-center gap-1 cursor-pointer font-medium"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{lang === 'ky' ? 'Демо маалыматтарды баштапкы абалга келтирүү' : 'Сбросить демо-данные'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
