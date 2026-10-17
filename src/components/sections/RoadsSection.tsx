import React from 'react';
import { useApp } from '../../context/AppContext';
import { ProblemCard } from '../ProblemCard';
import {
  Construction,
  PlusCircle,
  Lightbulb,
  FileText,
  MapPin,
  CheckCircle2,
  Clock,
  Sparkles,
} from 'lucide-react';

export const RoadsSection: React.FC = () => {
  const { t, lang, problems, setIsCreateOpen, setIsAiOpen } = useApp();

  const roadProblems = problems.filter((p) => p.category === 'roads');
  const resolvedRoads = roadProblems.filter((p) => p.status === 'resolved');

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="bg-gradient-to-r from-orange-600 via-amber-700 to-amber-800 text-white rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-1.5 bg-white/20 px-3 py-1 rounded-full text-xs font-bold mb-3 backdrop-blur-xs">
            <Construction className="w-3.5 h-3.5 text-amber-200" />
            <span>{t.categories.roads}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {lang === 'ky' ? 'Жолдор, көпүрөлөр жана көчө чырактары' : 'Дорожная инфраструктура и уличное освещение'}
          </h2>
          <p className="text-sm text-orange-100 mt-2 leading-relaxed">
            {lang === 'ky'
              ? 'Чуңкурларды, бузулган светофорлорду жана караңгы көчөлөрдү белгилеңиз. Бир нече тургун бир маселени тастыктаганда, мэрия же айыл өкмөтү тезирээк планга кошот.'
              : 'Фиксируйте выбоины на асфальте, разбитые тротуары и неработающие фонари. Мы формируем коллективное обращение в дорожные службы.'}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsCreateOpen(true)}
              className="bg-white text-orange-900 hover:bg-orange-50 font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 text-orange-600" />
              <span>{lang === 'ky' ? 'Жолдогу чуңкурду кабарлоо' : 'Сообщить о яме на дороге'}</span>
            </button>
            <button
              onClick={() => setIsAiOpen(true)}
              className="bg-orange-500/30 hover:bg-orange-500/40 border border-white/20 text-white font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
            >
              <FileText className="w-4 h-4 text-amber-200" />
              <span>{lang === 'ky' ? 'Жол оңдоого арыз түзүү' : 'Сформировать заявление'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Road stats summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            {lang === 'ky' ? 'Бардык катталган тилкелер' : 'Всего зафиксировано участков'}
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
            {roadProblems.length}
          </div>
          <div className="text-xs text-slate-400 mt-1 font-medium">
            {lang === 'ky' ? 'Асфальт, тротуар жана чырактар' : 'Ямы, освещение, тротуары'}
          </div>
        </div>

        <div className="bg-emerald-50/70 p-5 rounded-2xl border border-emerald-200 shadow-2xs">
          <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
            {lang === 'ky' ? 'Оңдолгон жана кабыл алынган' : 'Отремонтировано участков'}
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-900 mt-1">
            {resolvedRoads.length}
          </div>
          <div className="text-xs text-emerald-700 mt-1 font-medium">
            {lang === 'ky' ? 'Сүрөт тастыктамасы менен' : 'С актом и фото фиксацией'}
          </div>
        </div>

        <div className="bg-blue-50/70 p-5 rounded-2xl border border-blue-200 shadow-2xs">
          <div className="text-xs font-bold text-blue-800 uppercase tracking-wider">
            {lang === 'ky' ? 'Жооптуу ведомстволор' : 'Партнеры по инфраструктуре'}
          </div>
          <div className="text-base font-extrabold text-blue-900 mt-1">
            КР Транспорт министрлиги
          </div>
          <div className="text-xs text-blue-700 mt-0.5 font-medium">
            «Бишкекасфальтсервис», Райондук ДЭУ
          </div>
        </div>
      </div>

      {/* Problems cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">
            {lang === 'ky' ? 'Жолдор боюнча кайрылуулар' : 'Обращения по дорогам и освещению'} ({roadProblems.length})
          </h3>
          <button
            onClick={() => setIsCreateOpen(true)}
            className="text-xs font-bold text-orange-700 hover:text-orange-800 cursor-pointer"
          >
            + {lang === 'ky' ? 'Жаңы чекит кошуу' : 'Добавить точку'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {roadProblems.map((p) => (
            <ProblemCard key={p.id} problem={p} />
          ))}
        </div>
      </div>
    </div>
  );
};
