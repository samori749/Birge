import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ProblemCard } from '../ProblemCard';
import { ecoPoints, volunteerEvents } from '../../data/mockData';
import {
  Leaf,
  PlusCircle,
  Users,
  Calendar,
  Recycle,
  MapPin,
  CheckCircle2,
  TreePine,
  Sparkles,
} from 'lucide-react';

export const EcologySection: React.FC = () => {
  const { t, lang, problems, setIsCreateOpen, showToast } = useApp();

  const ecologyProblems = problems.filter((p) => p.category === 'ecology');

  // Local state for volunteer events joined
  const [events, setEvents] = useState(volunteerEvents);
  const [showCleanupModal, setShowCleanupModal] = useState(false);
  const [cleanupTitle, setCleanupTitle] = useState('');
  const [cleanupLocation, setCleanupLocation] = useState('');
  const [cleanupDate, setCleanupDate] = useState('');

  const toggleJoinEvent = (eventId: string) => {
    setEvents((prev) =>
      prev.map((ev) => {
        if (ev.id !== eventId) return ev;
        const nowJoined = !ev.joined;
        showToast(
          nowJoined
            ? (lang === 'ky' ? 'Сиз ишембиликке жазылдыңыз! (+20 балл)' : 'Вы записались на субботник! (+20 баллов)')
            : (lang === 'ky' ? 'Катышуу жокко чыгарылды' : 'Участие отменено'),
          'success'
        );
        return {
          ...ev,
          joined: nowJoined,
          participantsCount: ev.participantsCount + (nowJoined ? 1 : -1),
        };
      })
    );
  };

  const handleCreateCleanup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cleanupTitle.trim() || !cleanupLocation.trim()) return;

    const newEvent = {
      id: 'vol-' + Date.now(),
      title: cleanupTitle.trim(),
      category: 'ecology' as const,
      region: 'chuy' as const,
      location: cleanupLocation.trim(),
      eventDate: cleanupDate || '2026-10-24 10:00',
      description: lang === 'ky' ? 'Жергиликтүү жарандар тарабынан уюштурулган ишембилик.' : 'Субботник организован неравнодушными жителями.',
      organizer: lang === 'ky' ? 'Жарандык демилге' : 'Инициативная группа',
      participantsCount: 1,
      requiredParticipants: 20,
      joined: true,
      imageUrl: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=800&q=80',
    };

    setEvents((prev) => [newEvent, ...prev]);
    setShowCleanupModal(false);
    setCleanupTitle('');
    setCleanupLocation('');
    showToast(
      lang === 'ky' ? 'Жаңы ишембилик жарыяланды! Ыктыярчылар чакырылды.' : 'Субботник опубликован! Волонтёры оповещены.',
      'success'
    );
  };

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-green-700 text-white rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-1.5 bg-white/20 px-3 py-1 rounded-full text-xs font-bold mb-3 backdrop-blur-xs">
            <Leaf className="w-3.5 h-3.5 text-emerald-200" />
            <span>{t.categories.ecology}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {lang === 'ky' ? 'Таза Кыргызстан: Мыйзамсыз таштандылар жана ишембиликтер' : 'Экология: Ликвидация свалок и эко-волонтёрство'}
          </h2>
          <p className="text-sm text-emerald-100 mt-2 leading-relaxed">
            {lang === 'ky'
              ? 'Жаратылышты таштандыдан бирге сактайлы. Свалкаларды сүрөткө тартып жөнөтүңүз, өзүңүздүн аймакта ишембилик уюштуруңуз же жакынкы эко-пункттарга кайрылыңыз.'
              : 'Сообщайте о стихийных свалках, организуйте уборку в своем дворе или присоединяйтесь к волонтерским субботникам по всей стране.'}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowCleanupModal(true)}
              className="bg-white text-emerald-900 hover:bg-emerald-50 font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Users className="w-4 h-4 text-emerald-600" />
              <span>{lang === 'ky' ? 'Ишембилик уюштуруу' : 'Организовать уборку'}</span>
            </button>
            <button
              onClick={() => setIsCreateOpen(true)}
              className="bg-emerald-500/30 hover:bg-emerald-500/40 border border-white/20 text-white font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 text-emerald-200" />
              <span>{lang === 'ky' ? 'Таштандыны кабарлоо' : 'Зафиксировать свалку'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Volunteer Events (Субботники) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <TreePine className="w-5 h-5 text-emerald-600" />
              <span>{lang === 'ky' ? 'Алдыдагы ишембиликтер жана эко-акциялар' : 'Предстоящие субботники и эко-акции'}</span>
            </h3>
            <p className="text-xs text-slate-500">
              {lang === 'ky' ? 'Ыктыярчы болуп кошулуңуз — каптар жана транспорт уюштурулат' : 'Присоединяйтесь к соседям и активистам для наведения чистоты'}
            </p>
          </div>
          <button
            onClick={() => setShowCleanupModal(true)}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 cursor-pointer hidden sm:block"
          >
            + {lang === 'ky' ? 'Жаңы иш-чара ачуу' : 'Создать мероприятие'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {events.map((ev) => (
            <div
              key={ev.id}
              className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 flex flex-col justify-between shadow-2xs hover:shadow-md transition-all"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    {ev.organizer}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{ev.eventDate}</span>
                  </div>
                </div>

                <h4 className="font-bold text-slate-900 text-base">{ev.title}</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{ev.description}</p>

                <div className="flex items-center gap-1 text-xs text-slate-500 mt-3 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-red-500" />
                  <span>{ev.location}</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="text-xs text-slate-500">
                  <span className="font-bold text-slate-900">{ev.participantsCount}</span> /{' '}
                  {ev.requiredParticipants} {lang === 'ky' ? 'ыктыярчы катышууда' : 'участников'}
                </div>

                <button
                  onClick={() => toggleJoinEvent(ev.id)}
                  className={`text-xs font-bold px-4 py-2 rounded-xl transition-all cursor-pointer ${
                    ev.joined
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                  }`}
                >
                  {ev.joined ? (lang === 'ky' ? 'Катышуудасыз ✓' : 'Вы участвуете ✓') : (lang === 'ky' ? 'Кошулуу' : 'Присоединиться')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reported Ecological Issues */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">
            {lang === 'ky' ? 'Катталган таштандылар жана экологиялык көйгөйлөр' : 'Зафиксированные свалки и загрязнения'} ({ecologyProblems.length})
          </h3>
          <button
            onClick={() => setIsCreateOpen(true)}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 cursor-pointer"
          >
            + {lang === 'ky' ? 'Таштанды тууралуу жазуу' : 'Сообщить о мусоре'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ecologyProblems.map((p) => (
            <ProblemCard key={p.id} problem={p} />
          ))}
        </div>
      </div>

      {/* Recycling Points */}
      <div className="bg-slate-50 rounded-3xl border border-slate-200 p-5 sm:p-7">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">
          <Recycle className="w-4 h-4 text-emerald-600" />
          <span>{lang === 'ky' ? 'Кайра иштетүү жана кабыл алуу пункттары' : 'Пункты приёма вторсырья'}</span>
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-4">
          {lang === 'ky' ? 'Пластик, айнек жана макулатураны кайда тапшырса болот?' : 'Куда сдать раздельный мусор в Кыргызстане?'}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {ecoPoints.map((point) => (
            <div
              key={point.id}
              className="bg-white p-4 rounded-2xl border border-slate-200 text-xs space-y-2 shadow-2xs"
            >
              <div className="font-bold text-slate-900 text-sm">{point.title}</div>
              <div className="flex flex-wrap gap-1">
                {point.acceptedTypes.map((tItem) => (
                  <span
                    key={tItem}
                    className="bg-emerald-50 text-emerald-800 text-[10px] font-semibold px-2 py-0.5 rounded-md"
                  >
                    {tItem === 'plastic' ? 'Пластик' : tItem === 'paper' ? 'Кагаз' : tItem === 'glass' ? 'Айнек' : 'Батарейка'}
                  </span>
                ))}
              </div>
              <div className="text-slate-500">{point.address}</div>
              <div className="text-[11px] text-slate-400">{point.hours}</div>
              <div className="text-emerald-700 font-bold font-mono pt-1">{point.phone}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Organize Cleanup Modal */}
      {showCleanupModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-600" />
                <span>{lang === 'ky' ? 'Ишембилик уюштуруу' : 'Организовать субботник'}</span>
              </h3>
              <button
                onClick={() => setShowCleanupModal(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateCleanup} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {lang === 'ky' ? 'Иш-чаранын аталышы:' : 'Название уборки:'}
                </label>
                <input
                  type="text"
                  required
                  value={cleanupTitle}
                  onChange={(e) => setCleanupTitle(e.target.value)}
                  placeholder={lang === 'ky' ? 'Мисалы: Кара-Балта суусунун жээгин тазалоо' : 'Например: Уборка парка / берега реки'}
                  className="w-full p-2.5 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {lang === 'ky' ? 'Жайгашкан жери:' : 'Точное место сбора:'}
                </label>
                <input
                  type="text"
                  required
                  value={cleanupLocation}
                  onChange={(e) => setCleanupLocation(e.target.value)}
                  placeholder={lang === 'ky' ? 'Айыл, көчө, ориентир' : 'Улица, сквер или ориентир'}
                  className="w-full p-2.5 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {lang === 'ky' ? 'Күнү жана убактысы:' : 'Дата и время:'}
                </label>
                <input
                  type="datetime-local"
                  value={cleanupDate}
                  onChange={(e) => setCleanupDate(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCleanupModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl shadow-xs"
                >
                  {lang === 'ky' ? 'Жарыялоо' : 'Опубликовать'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
