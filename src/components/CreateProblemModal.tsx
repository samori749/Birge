import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { CategoryId, RegionId } from '../types';
import { CATEGORIES_CONFIG } from './CategoryNav';
import {
  X,
  Upload,
  AlertTriangle,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ThumbsUp,
  Image as ImageIcon,
} from 'lucide-react';

const PHOTO_PRESETS: { labelKg: string; labelRu: string; url: string; cat: CategoryId }[] = [
  {
    labelKg: 'Суу түтүгү / арык бузулушу',
    labelRu: 'Прорыв трубы / разрушенный арык',
    url: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80',
    cat: 'water',
  },
  {
    labelKg: 'Таштанды үймөгү / свалка',
    labelRu: 'Стихийная свалка / мусор',
    url: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=800&q=80',
    cat: 'ecology',
  },
  {
    labelKg: 'Жолдогу чуңкурлар / асфальт',
    labelRu: 'Ямы на дорогах / асфальт',
    url: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80',
    cat: 'roads',
  },
  {
    labelKg: 'Медицина / ФАП маселеси',
    labelRu: 'Медицина / ФАП / ЦСМ',
    url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
    cat: 'medicine',
  },
  {
    labelKg: 'Мектеп / Окуу китептери',
    labelRu: 'Школа / Образование',
    url: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80',
    cat: 'education',
  },
  {
    labelKg: 'Социалдык жардам / карыялар',
    labelRu: 'Социальная помощь',
    url: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&w=800&q=80',
    cat: 'social',
  },
];

export const CreateProblemModal: React.FC = () => {
  const {
    isCreateOpen,
    setIsCreateOpen,
    t,
    lang,
    problems,
    addNewProblem,
    confirmProblem,
    setActiveProblemModal,
    userProfile,
  } = useApp();

  const [category, setCategory] = useState<CategoryId>('water');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [region, setRegion] = useState<RegionId>(userProfile.region || 'chuy');
  const [district, setDistrict] = useState('');
  const [villageOrStreet, setVillageOrStreet] = useState('');
  const [imageUrl, setImageUrl] = useState(
    'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=800&q=80'
  );
  const [isPrivate, setIsPrivate] = useState(true);

  // Check for similar / duplicate complaints in same region
  const potentialDuplicates = useMemo(() => {
    if (!villageOrStreet && !title) return [];
    const term = (villageOrStreet + ' ' + title).toLowerCase();
    return problems.filter((p) => {
      if (p.region !== region) return false;
      const pText = (p.villageOrStreet + ' ' + p.title + ' ' + p.district).toLowerCase();
      // Simple word match
      const words = term.split(/\s+/).filter((w) => w.length > 3);
      return words.some((w) => pText.includes(w));
    });
  }, [problems, region, villageOrStreet, title]);

  if (!isCreateOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    // Approximate regional center coordinates
    const regionCoords: Record<RegionId, { lat: number; lng: number }> = {
      bishkek: { lat: 42.8746, lng: 74.5698 },
      osh_city: { lat: 40.514, lng: 72.8161 },
      chuy: { lat: 42.85, lng: 74.6 },
      issyk_kul: { lat: 42.49, lng: 77.0 },
      naryn: { lat: 41.43, lng: 76.0 },
      talas: { lat: 42.52, lng: 72.24 },
      jalal_abad: { lat: 41.0, lng: 73.0 },
      osh_oblast: { lat: 40.2, lng: 73.2 },
      batken: { lat: 40.06, lng: 70.82 },
    };

    const baseCoords = regionCoords[region] || { lat: 42.87, lng: 74.59 };
    const jitterLat = (Math.random() - 0.5) * 0.04;
    const jitterLng = (Math.random() - 0.5) * 0.04;

    const created = addNewProblem({
      title: title.trim(),
      description: description.trim(),
      category,
      region,
      district: district.trim() || (lang === 'ky' ? 'Жергиликтүү аймак' : 'Местный район'),
      villageOrStreet: villageOrStreet.trim() || (lang === 'ky' ? 'Борбордук көчө' : 'Центральная улица'),
      coordinates: {
        lat: baseCoords.lat + jitterLat,
        lng: baseCoords.lng + jitterLng,
      },
      imageUrl,
      authorName: userProfile.name || (lang === 'ky' ? 'Жаран' : 'Житель'),
      isPrivate,
    });

    setIsCreateOpen(false);
    // Reset fields
    setTitle('');
    setDescription('');
    setDistrict('');
    setVillageOrStreet('');
    setActiveProblemModal(created);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 relative flex flex-col">
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md px-5 sm:px-7 py-4 border-b border-slate-100 flex items-center justify-between z-20">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900">
              {t.createProblem.title}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {t.createProblem.subtitle}
            </p>
          </div>
          <button
            onClick={() => setIsCreateOpen(false)}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-7 space-y-5">
          {/* Category Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-2">
              {t.createProblem.categoryLabel} *
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {CATEGORIES_CONFIG.map((cat) => {
                const Icon = cat.icon;
                const isSelected = category === cat.id;
                return (
                  <button
                    type="button"
                    key={cat.id}
                    onClick={() => {
                      setCategory(cat.id);
                      // Update preset photo accordingly
                      const matchingPreset = PHOTO_PRESETS.find((p) => p.cat === cat.id);
                      if (matchingPreset) setImageUrl(matchingPreset.url);
                    }}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs font-bold text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'border-red-500 bg-red-50/60 text-red-700 shadow-xs ring-1 ring-red-500'
                        : 'border-slate-200 bg-slate-50/70 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0 text-red-600" />
                    <span className="truncate">{t.categories[cat.id]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              {t.createProblem.problemTitle} *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={lang === 'ky' ? 'Мисалы: Сугат арыгы бузулуп, суу короолорго агып жатат' : 'Например: Разрушен поливной лоток, вода заливает дорогу'}
              className="w-full text-sm p-3 rounded-xl border border-slate-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-hidden"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              {t.createProblem.description} *
            </label>
            <textarea
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={
                lang === 'ky'
                  ? 'Качантан бери болуп жатат? Буга чейин кимдерге кайрылдыңыз? Канча кожолук жабыр тартууда?'
                  : 'Опишите детали: как давно возникла проблема, обращались ли в службы, скольким жителям мешает...'
              }
              className="w-full text-sm p-3 rounded-xl border border-slate-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-hidden leading-relaxed"
            ></textarea>
          </div>

          {/* Location Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                {t.createProblem.regionLabel} *
              </label>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value as RegionId)}
                className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-300 bg-white"
              >
                {Object.entries(t.regions).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                {t.createProblem.districtLabel}
              </label>
              <input
                type="text"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                placeholder={lang === 'ky' ? 'Сокулук р-ну' : 'Аламудунский р-н'}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-300"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                {t.createProblem.villageStreetLabel} *
              </label>
              <input
                type="text"
                required
                value={villageOrStreet}
                onChange={(e) => setVillageOrStreet(e.target.value)}
                placeholder={lang === 'ky' ? 'Алма-Ата көчөсү, 45' : 'ул. Ленина / село'}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-300"
              />
            </div>
          </div>

          {/* Duplicate Detection Alert */}
          {potentialDuplicates.length > 0 && (
            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-300 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>{t.duplicateWarning}</span>
              </div>
              <p className="text-[11px] text-amber-800 leading-snug">
                {lang === 'ky'
                  ? 'Сиз жазган аймакта окшош маселе катталган экен. Жаңы арыз ачпастан, бар кайрылууга «+1 Тастыктайм» баскычын басуу күчтүүрөөк таасир этет!'
                  : 'Похожая проблема уже зафиксирована в этом районе. Вы можете поддержать уже существующую заявку:'}
              </p>
              <div className="space-y-1.5 pt-1">
                {potentialDuplicates.slice(0, 2).map((dup) => (
                  <div
                    key={dup.id}
                    className="flex items-center justify-between p-2 rounded-lg bg-white border border-amber-200 text-xs"
                  >
                    <span className="font-semibold text-slate-800 truncate mr-2">
                      {dup.title} ({dup.villageOrStreet})
                    </span>
                    <button
                      type="button"
                      onClick={() => confirmProblem(dup.id)}
                      className="bg-red-600 hover:bg-red-700 text-white font-bold text-[10px] px-2.5 py-1 rounded-md shrink-0 flex items-center gap-1 cursor-pointer"
                    >
                      <ThumbsUp className="w-3 h-3" />
                      <span>+{dup.confirmationsCount}</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Photo Selection / Presets */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1.5">
              {t.createProblem.photoLabel}
            </label>
            <div className="flex items-center gap-2 mb-2">
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://... сүрөт шилтемеси"
                className="w-full text-xs p-2.5 rounded-xl border border-slate-300 font-mono"
              />
            </div>

            {/* Quick photo presets chips */}
            <div className="text-[11px] text-slate-500 mb-1.5">
              {lang === 'ky' ? 'Даяр тематикалык сүрөттөр:' : 'Или выберите тематический образец:'}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
              {PHOTO_PRESETS.map((preset, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => setImageUrl(preset.url)}
                  className={`text-[10px] font-medium p-1.5 rounded-lg border text-left truncate transition-colors cursor-pointer ${
                    imageUrl === preset.url
                      ? 'border-red-500 bg-red-50 text-red-700 font-bold'
                      : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {lang === 'ky' ? preset.labelKg : preset.labelRu}
                </button>
              ))}
            </div>

            {imageUrl && (
              <div className="mt-2 h-28 w-full rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          {/* Privacy Note Checkbox */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={isPrivate}
                onChange={(e) => setIsPrivate(e.target.checked)}
                className="mt-0.5 rounded-sm text-red-600 focus:ring-red-500"
              />
              <span className="text-xs text-slate-700 leading-snug">
                <span className="font-bold flex items-center gap-1 text-slate-900">
                  <Lock className="w-3.5 h-3.5 text-emerald-600 inline" />
                  {lang === 'ky' ? 'Жеке маалыматтарды коргоо' : 'Защита персональных данных'}
                </span>
                <span className="text-slate-500 block text-[11px] mt-0.5">
                  {t.createProblem.privacyNote}
                </span>
              </span>
            </label>
          </div>

          {/* Actions */}
          <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsCreateOpen(false)}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-xl shadow-md shadow-red-500/20 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{t.submit}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
