import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ProblemCard } from '../ProblemCard';
import {
  Droplets,
  PlusCircle,
  Calculator,
  Phone,
  HelpCircle,
  ExternalLink,
  CheckCircle2,
} from 'lucide-react';

export const WaterSection: React.FC = () => {
  const { t, lang, problems, setIsCreateOpen, setIsAiOpen } = useApp();

  const waterProblems = problems.filter((p) => p.category === 'water');

  // Interactive water savings calculator
  const [areaHectares, setAreaHectares] = useState<number>(2);
  const [currentMethod, setCurrentMethod] = useState<'flood' | 'furrow'>('flood');

  const standardWaterUsePerHa = currentMethod === 'flood' ? 6000 : 4500; // cubic meters per ha per season
  const totalTraditionalWater = areaHectares * standardWaterUsePerHa;
  const dripIrrigationWater = Math.round(totalTraditionalWater * 0.55); // 45% savings
  const savedWater = totalTraditionalWater - dripIrrigationWater;

  const avpContacts = [
    {
      regionKg: 'Чүй облусу',
      regionRu: 'Чуйская область',
      name: 'Чүй бассейндик суу чарба башкармалыгы',
      phone: '+996 (312) 54-88-21',
      address: 'Бишкек ш., Токтогул к., 175',
    },
    {
      regionKg: 'Ош облусу',
      regionRu: 'Ошская область',
      name: 'Ош облустук суу чарба башкармалыгы',
      phone: '+996 (3222) 5-64-12',
      address: 'Ош ш., Ленин к., 312',
    },
    {
      regionKg: 'Баткен облусу',
      regionRu: 'Баткенская область',
      name: 'Баткен райондук суу чарба бөлүмү',
      phone: '+996 (3622) 5-01-44',
      address: 'Баткен ш., Салихова к., 18',
    },
    {
      regionKg: 'Ысык-Көл облусу',
      regionRu: 'Иссык-Кульская область',
      name: 'Каракол жана Тоң суу пайдалануучулар бирикмеси',
      phone: '+996 (3922) 5-29-80',
      address: 'Каракол ш., Гагарин к., 40',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-700 text-white rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-1.5 bg-white/20 px-3 py-1 rounded-full text-xs font-bold mb-3 backdrop-blur-xs">
            <Droplets className="w-3.5 h-3.5 text-cyan-200" />
            <span>{t.categories.water}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {lang === 'ky' ? 'Сугат суусу жана айыл чарбасын колдоо' : 'Поливная вода и поддержка фермеров'}
          </h2>
          <p className="text-sm text-cyan-100 mt-2 leading-relaxed">
            {lang === 'ky'
              ? 'Суу каналынын бузулушу, арыктардын тазаланбашы же суу талашы тууралуу кабарлаңыз. Карта аркылуу Суу чарба министрлиги жана жергиликтүү СПАларга жеткирилет.'
              : 'Фиксируйте утечки, аварийные арыки и дефицит поливной воды на карте. Получайте советы по технологиям капельного полива.'}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsCreateOpen(true)}
              className="bg-white text-blue-900 hover:bg-cyan-50 font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 text-cyan-600" />
              <span>{lang === 'ky' ? 'Суу көйгөйүн кабарлоо' : 'Сообщить об утечке воды'}</span>
            </button>
            <button
              onClick={() => setIsAiOpen(true)}
              className="bg-cyan-500/30 hover:bg-cyan-500/40 border border-white/20 text-white font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
            >
              <HelpCircle className="w-4 h-4 text-cyan-200" />
              <span>{lang === 'ky' ? 'Суу боюнча кеңешчи' : 'ИИ-советник по поливу'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Water Savings Calculator */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-7 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-700 mb-1">
          <Calculator className="w-4 h-4 text-cyan-600" />
          <span>{lang === 'ky' ? 'Сууну үнөмдөө калькулятору' : 'Калькулятор экономии воды'}</span>
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-slate-900">
          {lang === 'ky' ? 'Тамчылатып сугаруу менен канча суу жана каражат үнөмдөйсүз?' : 'Сколько кубометров воды сэкономит капельное орошение?'}
        </h3>
        <p className="text-xs text-slate-500 mt-1 max-w-2xl">
          {lang === 'ky'
            ? 'Аянтыңызды белгилеңиз — калькулятор салттуу жайылма сугаруу менен тамчылатып сугаруунун айырмасын эсептеп берет.'
            : 'Укажите площадь участка — калькулятор покажет экономию ресурсов по сравнению с традиционным затоплением.'}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {lang === 'ky' ? 'Жер тилкесинин аянты (гектар):' : 'Площадь участка (га):'}
            </label>
            <input
              type="number"
              min={0.5}
              max={200}
              step={0.5}
              value={areaHectares}
              onChange={(e) => setAreaHectares(Number(e.target.value) || 1)}
              className="w-full p-2.5 rounded-xl border border-slate-300 text-sm font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {lang === 'ky' ? 'Учурдагы сугаруу ыкмасы:' : 'Текущий способ полива:'}
            </label>
            <select
              value={currentMethod}
              onChange={(e) => setCurrentMethod(e.target.value as any)}
              className="w-full p-2.5 rounded-xl border border-slate-300 text-sm font-semibold bg-white"
            >
              <option value="flood">{lang === 'ky' ? 'Жайылма суу (Арык менен жаюу)' : 'Затопление по арыкам'}</option>
              <option value="furrow">{lang === 'ky' ? 'Бороздо менен сугаруу' : 'Полив по бороздам'}</option>
            </select>
          </div>

          {/* Results Badge */}
          <div className="bg-cyan-50 border border-cyan-200 rounded-2xl p-4 flex flex-col justify-center">
            <span className="text-[11px] font-bold text-cyan-800">
              {lang === 'ky' ? 'Бир сезондогу үнөмдөө:' : 'Экономия за 1 сезон:'}
            </span>
            <div className="text-xl sm:text-2xl font-black text-cyan-900 mt-0.5">
              +{savedWater.toLocaleString()} м³ суу
            </div>
            <span className="text-[10px] text-cyan-700 font-medium">
              ≈ 45% {lang === 'ky' ? 'суу ресурсу үнөмдөлөт жана түшүм артат' : 'воды сохраняется, защищая почву'}
            </span>
          </div>
        </div>
      </div>

      {/* Water Problems List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">
            {lang === 'ky' ? 'Суу боюнча катталган кайрылуулар' : 'Обращения по воде и каналам'} ({waterProblems.length})
          </h3>
          <button
            onClick={() => setIsCreateOpen(true)}
            className="text-xs font-bold text-cyan-700 hover:text-cyan-800 cursor-pointer"
          >
            + {lang === 'ky' ? 'Жаңы маселе кошуу' : 'Добавить обращение'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {waterProblems.map((p) => (
            <ProblemCard key={p.id} problem={p} />
          ))}
        </div>
      </div>

      {/* Verified AVP & Water Management Contacts */}
      <div className="bg-slate-50 rounded-3xl border border-slate-200 p-5 sm:p-7">
        <h3 className="font-bold text-slate-900 text-base mb-1 flex items-center gap-2">
          <Phone className="w-4 h-4 text-blue-600" />
          <span>{lang === 'ky' ? 'Суу чарба органдарынын жана СПАлардын байланыштары' : 'Контакты управлений водного хозяйства и АВП'}</span>
        </h3>
        <p className="text-xs text-slate-500 mb-4">
          {lang === 'ky'
            ? 'Авариялык жагдайда же сугат кезеги бузулганда түз чалыңыз.'
            : 'Прямые телефоны дежурных инженеров при авариях и нарушениях графика.'}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {avpContacts.map((contact, idx) => (
            <div
              key={idx}
              className="bg-white p-3.5 rounded-2xl border border-slate-200 text-xs space-y-1 shadow-2xs"
            >
              <div className="font-bold text-slate-900">{contact.name}</div>
              <div className="text-slate-500 text-[11px]">{contact.address}</div>
              <div className="text-blue-600 font-bold font-mono pt-1">{contact.phone}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
