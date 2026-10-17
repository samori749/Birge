import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { RegionId, CategoryId, ProblemStatus } from '../types';
import {
  MapPin,
  Filter,
  Layers,
  CheckCircle2,
  Clock,
  Building,
  Info,
  Maximize2,
  PlusCircle,
} from 'lucide-react';

interface OblastShape {
  id: RegionId;
  nameKg: string;
  nameRu: string;
  center: { x: number; y: number };
  svgPath: string;
}

// Stylized geographical layout paths for the 7 oblasts of Kyrgyzstan (standard 1000x500 coordinate frame)
const OBLASTS: OblastShape[] = [
  {
    id: 'chuy',
    nameKg: 'Чүй облусу',
    nameRu: 'Чуйская область',
    center: { x: 480, y: 140 },
    svgPath: 'M 350,110 L 480,100 L 620,120 L 630,190 L 530,210 L 420,190 L 350,160 Z',
  },
  {
    id: 'issyk_kul',
    nameKg: 'Ысык-Көл облусу',
    nameRu: 'Иссык-Кульская область',
    center: { x: 780, y: 170 },
    svgPath: 'M 620,120 L 820,110 L 970,180 L 920,290 L 750,260 L 630,190 Z',
  },
  {
    id: 'talas',
    nameKg: 'Талас облусу',
    nameRu: 'Таласская область',
    center: { x: 230, y: 140 },
    svgPath: 'M 130,130 L 350,110 L 350,170 L 220,190 L 120,170 Z',
  },
  {
    id: 'naryn',
    nameKg: 'Нарын облусу',
    nameRu: 'Нарынская область',
    center: { x: 610, y: 280 },
    svgPath: 'M 450,210 L 630,190 L 750,260 L 760,370 L 580,390 L 470,300 Z',
  },
  {
    id: 'jalal_abad',
    nameKg: 'Жалал-Абад облусу',
    nameRu: 'Джалал-Абадская область',
    center: { x: 330, y: 260 },
    svgPath: 'M 220,190 L 420,190 L 470,300 L 400,340 L 260,320 L 200,240 Z',
  },
  {
    id: 'osh_oblast',
    nameKg: 'Ош облусу',
    nameRu: 'Ошская область',
    center: { x: 390, y: 390 },
    svgPath: 'M 260,320 L 400,340 L 580,390 L 540,460 L 360,450 L 280,410 Z',
  },
  {
    id: 'batken',
    nameKg: 'Баткен облусу',
    nameRu: 'Баткенская область',
    center: { x: 150, y: 390 },
    svgPath: 'M 40,360 L 200,320 L 280,410 L 210,470 L 60,460 Z',
  },
];

export const KyrgyzstanMap: React.FC = () => {
  const {
    t,
    lang,
    problems,
    selectedCategory,
    setSelectedCategory,
    selectedRegion,
    setSelectedRegion,
    selectedStatus,
    setSelectedStatus,
    setActiveProblemModal,
    setIsCreateOpen,
  } = useApp();

  const [hoveredRegion, setHoveredRegion] = useState<RegionId | null>(null);

  // Filter problems for map pins
  const filteredProblems = problems.filter((p) => {
    if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
    if (selectedRegion !== 'all' && p.region !== selectedRegion) return false;
    if (selectedStatus !== 'all' && p.status !== selectedStatus) return false;
    return true;
  });

  // Convert real GPS (approx Kyrgyzstan box: Lat 39.2 to 43.3, Lng 69.2 to 80.3) into SVG coords (1000 x 500)
  const getPinCoords = (p: { coordinates: { lat: number; lng: number }; region: RegionId }) => {
    const minLng = 69.2;
    const maxLng = 80.4;
    const minLat = 39.2;
    const maxLat = 43.4;

    const x = ((p.coordinates.lng - minLng) / (maxLng - minLng)) * 880 + 60;
    const y = ((maxLat - p.coordinates.lat) / (maxLat - minLat)) * 380 + 60;

    return { x: Math.max(50, Math.min(950, x)), y: Math.max(50, Math.min(460, y)) };
  };

  const getPinColor = (status: ProblemStatus) => {
    switch (status) {
      case 'resolved':
        return 'bg-emerald-500 ring-emerald-200 text-white';
      case 'in_progress':
        return 'bg-amber-500 ring-amber-200 text-white';
      case 'forwarded':
        return 'bg-blue-600 ring-blue-200 text-white';
      case 'confirmed':
        return 'bg-purple-600 ring-purple-200 text-white';
      default:
        return 'bg-red-600 ring-red-200 text-white';
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-7 shadow-sm space-y-6">
      {/* Map Header and Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 px-2.5 py-1 rounded-full mb-1.5">
            <MapPin className="w-3.5 h-3.5" />
            <span>Кыргызстан 🇰🇬</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            {lang === 'ky' ? 'Көйгөйлөрдүн интерактивдүү картасы' : 'Интерактивная карта проблем Кыргызстана'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {lang === 'ky'
              ? 'Облустарды тандап, аймактардагы реалдуу абал менен таанышыңыз же жаңы чекит кошуңуз.'
              : 'Кликайте по регионам и маркерам для просмотра деталей, фото До/После и официальных ответов.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsCreateOpen(true)}
            className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>{t.reportProblemBtn}</span>
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs">
        {/* Region filter */}
        <div>
          <label className="block font-bold text-slate-700 mb-1">
            {lang === 'ky' ? 'Облус / Шаар:' : 'Регион:'}
          </label>
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value as any)}
            className="w-full font-semibold p-2 rounded-xl border border-slate-300 bg-white"
          >
            <option value="all">🇰🇬 {t.allRegions}</option>
            {Object.entries(t.regions).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </div>

        {/* Category filter */}
        <div>
          <label className="block font-bold text-slate-700 mb-1">
            {lang === 'ky' ? 'Тармагы:' : 'Категория:'}
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as any)}
            className="w-full font-semibold p-2 rounded-xl border border-slate-300 bg-white"
          >
            <option value="all">📂 {t.allCategories}</option>
            {Object.entries(t.categories).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </div>

        {/* Status filter */}
        <div>
          <label className="block font-bold text-slate-700 mb-1">
            {lang === 'ky' ? 'Абалы:' : 'Статус:'}
          </label>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value as any)}
            className="w-full font-semibold p-2 rounded-xl border border-slate-300 bg-white"
          >
            <option value="all">⚡ {t.allStatuses}</option>
            <option value="resolved">✅ {t.statuses.resolved}</option>
            <option value="in_progress">⚡ {t.statuses.in_progress}</option>
            <option value="forwarded">🏛️ {t.statuses.forwarded}</option>
            <option value="confirmed">🛡️ {t.statuses.confirmed}</option>
            <option value="review">🔍 {t.statuses.review}</option>
            <option value="new">🆕 {t.statuses.new}</option>
          </select>
        </div>
      </div>

      {/* SVG Canvas Map Container */}
      <div className="relative w-full aspect-2/1 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl overflow-hidden border border-slate-700 shadow-xl select-none">
        {/* Subtle grid backdrop */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none"></div>

        {/* Issyk-Kul Lake Graphic Representation */}
        <div className="absolute top-[32%] right-[22%] w-[14%] h-[12%] rounded-[50%_40%_60%_30%] bg-cyan-500/30 border border-cyan-400/50 backdrop-blur-xs flex items-center justify-center text-[10px] text-cyan-200 font-bold pointer-events-none shadow-inner">
          <span>Ысык-Көл</span>
        </div>

        <svg viewBox="0 0 1000 500" className="w-full h-full">
          {/* Oblast Shapes */}
          {OBLASTS.map((ob) => {
            const isSelected = selectedRegion === ob.id;
            const isHovered = hoveredRegion === ob.id;
            const countInOblast = problems.filter((p) => p.region === ob.id).length;

            return (
              <g key={ob.id}>
                <path
                  d={ob.svgPath}
                  onClick={() => setSelectedRegion(isSelected ? 'all' : ob.id)}
                  onMouseEnter={() => setHoveredRegion(ob.id)}
                  onMouseLeave={() => setHoveredRegion(null)}
                  className={`transition-all duration-300 cursor-pointer stroke-slate-600/70 stroke-[1.5] ${
                    isSelected
                      ? 'fill-red-600/50 stroke-red-400 stroke-2'
                      : isHovered
                      ? 'fill-slate-700/80 stroke-slate-400'
                      : 'fill-slate-800/60 hover:fill-slate-750'
                  }`}
                />
                {/* Oblast name tag */}
                <text
                  x={ob.center.x}
                  y={ob.center.y}
                  textAnchor="middle"
                  className="fill-slate-300 text-[12px] font-bold pointer-events-none tracking-wide select-none drop-shadow-sm"
                >
                  {lang === 'ky' ? ob.nameKg : ob.nameRu}
                </text>
                <text
                  x={ob.center.x}
                  y={ob.center.y + 15}
                  textAnchor="middle"
                  className="fill-amber-400 text-[10px] font-semibold pointer-events-none"
                >
                  {countInOblast} {lang === 'ky' ? 'көйгөй' : 'обращ.'}
                </text>
              </g>
            );
          })}

          {/* Capital cities special anchors */}
          {/* Bishkek */}
          <g
            className="cursor-pointer"
            onClick={() => setSelectedRegion(selectedRegion === 'bishkek' ? 'all' : 'bishkek')}
          >
            <circle
              cx="480"
              cy="150"
              r="8"
              className="fill-red-500 stroke-2 stroke-white animate-pulse"
            />
            <text x="480" y="140" textAnchor="middle" className="fill-white font-extrabold text-[12px]">
              Бишкек ★
            </text>
          </g>

          {/* Osh City */}
          <g
            className="cursor-pointer"
            onClick={() => setSelectedRegion(selectedRegion === 'osh_city' ? 'all' : 'osh_city')}
          >
            <circle
              cx="390"
              cy="345"
              r="7"
              className="fill-amber-500 stroke-2 stroke-white animate-pulse"
            />
            <text x="390" y="338" textAnchor="middle" className="fill-white font-extrabold text-[11px]">
              Ош ш. ●
            </text>
          </g>

          {/* Problem Pins */}
          {filteredProblems.map((prob) => {
            const coords = getPinCoords(prob);
            const isResolved = prob.status === 'resolved';

            return (
              <g
                key={prob.id}
                onClick={() => setActiveProblemModal(prob)}
                className="cursor-pointer group/pin"
                transform={`translate(${coords.x}, ${coords.y})`}
              >
                {/* Glow ring */}
                <circle
                  r="14"
                  className={`${
                    isResolved ? 'fill-emerald-500/20' : 'fill-red-500/20'
                  } group-hover/pin:scale-150 transition-transform`}
                />
                {/* Center marker */}
                <circle
                  r="6"
                  className={`${
                    isResolved ? 'fill-emerald-400 stroke-emerald-100' : 'fill-red-500 stroke-white'
                  } stroke-[1.5] shadow-lg`}
                />
              </g>
            );
          })}
        </svg>

        {/* Map Legend Overlay */}
        <div className="absolute bottom-3 left-3 bg-slate-900/85 backdrop-blur-md border border-slate-700/80 rounded-2xl p-2.5 sm:p-3 text-[11px] text-slate-300 space-y-1.5 shadow-lg">
          <div className="font-bold text-white text-xs mb-1">
            {lang === 'ky' ? 'Картанын белгилери:' : 'Условные обозначения:'}
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            <span>{t.statuses.resolved}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
            <span>{t.statuses.in_progress}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
            <span>{t.statuses.forwarded}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
            <span>{t.statuses.new} / {t.statuses.review}</span>
          </div>
        </div>

        {/* Selected Region Status Pill */}
        {selectedRegion !== 'all' && (
          <div className="absolute top-3 right-3 bg-red-600/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-xl border border-red-400 flex items-center gap-2 shadow-lg">
            <span>{t.regions[selectedRegion]}</span>
            <button
              onClick={() => setSelectedRegion('all')}
              className="hover:text-amber-300 font-bold"
            >
              ✕
            </button>
          </div>
        )}
      </div>

      {/* Filtered Problems Quick List under Map */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
            <Layers className="w-4 h-4 text-slate-600" />
            <span>
              {lang === 'ky' ? 'Тандалган аймактагы кайрылуулар:' : 'Обращения по выбранным фильтрам:'}{' '}
              <span className="text-red-600 font-extrabold">{filteredProblems.length}</span>
            </span>
          </h3>
          {selectedRegion !== 'all' && (
            <button
              onClick={() => setSelectedRegion('all')}
              className="text-xs text-slate-500 hover:text-red-600 font-semibold cursor-pointer"
            >
              {lang === 'ky' ? 'Бардык облустарды көрсөтүү' : 'Сбросить фильтр региона'}
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredProblems.map((prob) => (
            <div
              key={prob.id}
              onClick={() => setActiveProblemModal(prob)}
              className="p-3.5 rounded-2xl border border-slate-200 hover:border-red-400 bg-white hover:bg-red-50/20 transition-all cursor-pointer shadow-2xs group flex items-start gap-3"
            >
              <img
                src={prob.imageUrl}
                alt=""
                className="w-16 h-16 rounded-xl object-cover shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 mb-0.5">
                  <span className="text-red-600">{t.categories[prob.category]}</span>
                  <span>•</span>
                  <span>{t.regions[prob.region]}</span>
                </div>
                <h4 className="font-bold text-xs text-slate-900 truncate group-hover:text-red-600">
                  {prob.title}
                </h4>
                <div className="flex items-center justify-between mt-2 text-[11px]">
                  <span
                    className={`font-semibold px-2 py-0.5 rounded-md ${
                      prob.status === 'resolved'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {t.statuses[prob.status]}
                  </span>
                  <span className="text-slate-400">+{prob.confirmationsCount}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
