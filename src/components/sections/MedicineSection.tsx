import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { medicalFacilities } from '../../data/mockData';
import { MedicalFacility, RegionId } from '../../types';
import {
  HeartPulse,
  PhoneCall,
  Search,
  MapPin,
  Clock,
  ShieldCheck,
  AlertCircle,
  PlusCircle,
  FileText,
} from 'lucide-react';

export const MedicineSection: React.FC = () => {
  const { t, lang, setIsCreateOpen, showToast } = useApp();

  const [facilities, setFacilities] = useState<MedicalFacility[]>(medicalFacilities);
  const [selectedReg, setSelectedReg] = useState<RegionId | 'all'>('all');
  const [searchFilter, setSearchFilter] = useState('');

  const filteredFacilities = facilities.filter((f) => {
    if (selectedReg !== 'all' && f.region !== selectedReg) return false;
    if (searchFilter) {
      const term = searchFilter.toLowerCase();
      return (
        f.name.toLowerCase().includes(term) ||
        f.cityOrVillage.toLowerCase().includes(term) ||
        f.services.some((s) => s.toLowerCase().includes(term))
      );
    }
    return true;
  });

  const stateGuarantees = [
    {
      titleKg: 'Акысыз баштапкы кароо жана консультация',
      titleRu: 'Бесплатный первичный осмотр и консультация врача',
      descKg: 'Жашаган жери боюнча ҮДБ (ЦСМ) же ФАПта ар бир жаранга терапевт, педиатр жана акушер кароосу акысыз көрсөтүлөт.',
      descRu: 'В центрах семейной медицины и сельских ФАПах базовый прием врача общей практики проводится бесплатно.',
    },
    {
      titleKg: 'ФОМС кошумча пакети (Дары-дармектерге 50% чейин жеңилдик)',
      titleRu: 'Дополнительная программа ОМС (Скидка до 50% на лекарства)',
      descKg: 'Камсыздандырылган жарандарга жана пенсионерлерге дарыгердин атайын рецепти боюнча дарыканалардан арзандатуу берилет.',
      descRu: 'Для застрахованных граждан и пенсионеров по льготным рецептам предоставляется компенсация до 50% стоимости медикаментов.',
    },
    {
      titleKg: 'Балдар жана кош бойлуулар үчүн акысыз эмдөө',
      titleRu: 'Бесплатная вакцинация детей и наблюдение беременных',
      descKg: 'Улуттук календарь боюнча бардык профилактикалык эмдөөлөр толугу менен мамлекет тарабынан каржыланат.',
      descRu: 'Плановая вакцинация детей по национальному календарю прививок осуществляется полностью за счет госбюджета.',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 text-white rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-1.5 bg-white/20 px-3 py-1 rounded-full text-xs font-bold mb-3 backdrop-blur-xs">
            <HeartPulse className="w-3.5 h-3.5 text-rose-200" />
            <span>{t.categories.medicine}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {lang === 'ky' ? 'Саламаттыкты сактоо жана медициналык навигатор' : 'Доступ к медицине: ЦСМ, ФАП и скорая помощь'}
          </h2>
          <p className="text-sm text-rose-100 mt-2 leading-relaxed">
            {lang === 'ky'
              ? 'Аймактардагы Үй-бүлөлүк дарыгерлер борборлору (ҮДБ/ЦСМ), айылдык ФАПтар, шашылыш байланыштар (103, 112) жана ММК/ФОМС акысыз кызматтары.'
              : 'Каталог медицинских учреждений по всем областям Кыргызстана, график работы, телефоны регистратур и права по Программе госгарантий.'}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsCreateOpen(true)}
              className="bg-white text-rose-900 hover:bg-rose-50 font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 text-rose-600" />
              <span>{lang === 'ky' ? 'Медицина көйгөйүн жазуу' : 'Сообщить о проблеме в больнице'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Emergency numbers quick card */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 flex items-center justify-between shadow-2xs">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-red-600">
              {lang === 'ky' ? 'Тез медициналык жардам' : 'Скорая медицинская помощь'}
            </span>
            <div className="text-2xl sm:text-3xl font-black text-red-900 mt-0.5">103</div>
            <span className="text-[11px] text-red-700">{lang === 'ky' ? 'Бардык мобилдиктерден акысыз' : 'Бесплатно круглосуточно'}</span>
          </div>
          <PhoneCall className="w-8 h-8 text-red-600 animate-pulse" />
        </div>

        <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-4 flex items-center justify-between shadow-2xs">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">
              {lang === 'ky' ? 'Бирдиктүү куткаруу кызматы (ӨКМ)' : 'Единая служба спасения (МЧС)'}
            </span>
            <div className="text-2xl sm:text-3xl font-black text-amber-900 mt-0.5">112</div>
            <span className="text-[11px] text-amber-700">{lang === 'ky' ? 'Кырсыктар жана өрт' : 'Любые экстренные вызовы'}</span>
          </div>
          <PhoneCall className="w-8 h-8 text-amber-600" />
        </div>

        <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-4 flex items-center justify-between shadow-2xs">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700">
              {lang === 'ky' ? 'ФОМС / Саламаттык сактоо ишеним телефону' : 'Горячая линия Минздрава КР'}
            </span>
            <div className="text-2xl sm:text-3xl font-black text-blue-900 mt-0.5">118 / 1120</div>
            <span className="text-[11px] text-blue-700">{lang === 'ky' ? 'Бейтаптын укуктары жана дарылар' : 'Права пациентов и льготы'}</span>
          </div>
          <PhoneCall className="w-8 h-8 text-blue-600" />
        </div>
      </div>

      {/* Facilities Registry & Search */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-7 space-y-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              {lang === 'ky' ? 'Медициналык мекемелердин каталогу' : 'Каталог медицинских учреждений'} ({filteredFacilities.length})
            </h3>
            <p className="text-xs text-slate-500">
              {lang === 'ky' ? 'Даректери, байланыштары жана көрсөтүлүүчү кызматтары' : 'Адреса, перечень бесплатных услуг и прямые телефоны'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={selectedReg}
              onChange={(e) => setSelectedReg(e.target.value as any)}
              className="text-xs font-semibold p-2 rounded-xl border border-slate-300 bg-white"
            >
              <option value="all">🇰🇬 {t.allRegions}</option>
              {Object.entries(t.regions).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Search input */}
        <div className="relative">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder={lang === 'ky' ? 'Оорукана, ҮДБ, ФАП же кызмат боюнча издөө...' : 'Поиск по названию учреждения или услуге (УЗИ, прививки)...'}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:border-rose-500 outline-hidden"
          />
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredFacilities.map((fac) => (
            <div
              key={fac.id}
              className="p-4 sm:p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-rose-300 transition-all space-y-2 shadow-2xs"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-rose-100 text-rose-800">
                  {fac.type === 'csm' ? 'ҮДБ / ЦСМ' : fac.type === 'fap' ? 'Айылдык ФАП' : fac.type === 'hospital' ? 'Оорукана' : 'Тез жардам'}
                </span>
                {fac.is24Hours && (
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                    24/7 Күнү-түнү
                  </span>
                )}
              </div>

              <h4 className="font-extrabold text-slate-900 text-sm sm:text-base">
                {fac.name}
              </h4>

              <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                <span>{t.regions[fac.region]}, {fac.cityOrVillage}, {fac.address}</span>
              </div>

              {/* Services tags */}
              <div className="flex flex-wrap gap-1 pt-1">
                {fac.services.map((serv, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] bg-white border border-slate-200 text-slate-700 px-2 py-0.5 rounded-md"
                  >
                    {serv}
                  </span>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-rose-700">
                  {fac.phone}
                </span>

                <a
                  href={`tel:${fac.phone.replace(/[^0-9+]/g, '')}`}
                  className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs px-3 py-1.5 rounded-xl transition-colors cursor-pointer flex items-center gap-1"
                >
                  <PhoneCall className="w-3 h-3" />
                  <span>{lang === 'ky' ? 'Чалуу' : 'Позвонить'}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* State Guarantees Program Info */}
      <div className="bg-slate-50 rounded-3xl border border-slate-200 p-5 sm:p-7 space-y-4">
        <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          <span>{lang === 'ky' ? 'Мамлекеттик кепилдиктер программасы боюнча акысыз кызматтар' : 'Бесплатные услуги по Программе государственных гарантий'}</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stateGuarantees.map((item, idx) => (
            <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-200 text-xs space-y-1.5 shadow-2xs">
              <div className="font-bold text-slate-900 text-sm">
                {lang === 'ky' ? item.titleKg : item.titleRu}
              </div>
              <p className="text-slate-500 leading-relaxed">
                {lang === 'ky' ? item.descKg : item.descRu}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
