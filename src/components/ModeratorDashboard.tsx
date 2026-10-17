import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ProblemItem, ProblemStatus } from '../types';
import {
  ShieldAlert,
  CheckCircle2,
  Clock,
  Building,
  AlertTriangle,
  Upload,
  ArrowRight,
  Eye,
  Filter,
} from 'lucide-react';

export const ModeratorDashboard: React.FC = () => {
  const {
    t,
    lang,
    problems,
    updateProblemStatus,
    setActiveProblemModal,
    showToast,
  } = useApp();

  const [filterStatus, setFilterStatus] = useState<ProblemStatus | 'all'>('all');
  const [selectedForAction, setSelectedForAction] = useState<ProblemItem | null>(null);

  // Quick Action Dialog state
  const [actionStatus, setActionStatus] = useState<ProblemStatus>('confirmed');
  const [actionNote, setActionNote] = useState('');
  const [actionAgency, setActionAgency] = useState('');
  const [actionDoc, setActionDoc] = useState('');
  const [actionPhotoAfter, setActionPhotoAfter] = useState('');
  const [actionText, setActionText] = useState('');

  const filtered = problems.filter((p) => {
    if (filterStatus !== 'all' && p.status !== filterStatus) return false;
    return true;
  });

  const openActionDialog = (prob: ProblemItem) => {
    setSelectedForAction(prob);
    setActionStatus(
      prob.status === 'new'
        ? 'review'
        : prob.status === 'review'
        ? 'confirmed'
        : prob.status === 'confirmed'
        ? 'forwarded'
        : prob.status === 'forwarded'
        ? 'in_progress'
        : 'resolved'
    );
    setActionNote('');
    setActionAgency(prob.officialResponse?.agency || '');
    setActionDoc(prob.officialResponse?.docNumber || '');
    setActionPhotoAfter(prob.imageAfterUrl || '');
    setActionText(prob.officialResponse?.text || '');
  };

  const handleActionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedForAction) return;

    updateProblemStatus(
      selectedForAction.id,
      actionStatus,
      actionNote || (lang === 'ky' ? 'Модератор тарабынан бекитилди' : 'Статус подтвержден модератором'),
      actionAgency,
      actionText,
      actionDoc,
      actionPhotoAfter
    );

    setSelectedForAction(null);
  };

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="bg-gradient-to-r from-amber-700 via-slate-800 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 bg-amber-500/20 px-3 py-1 rounded-full text-xs font-bold mb-3 border border-amber-400/30 text-amber-300">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>{t.moderatorMode}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {lang === 'ky' ? 'Модерация жана ведомстволордун иш панели' : 'Панель модератора и ответственных органов'}
          </h2>
          <p className="text-sm text-slate-300 mt-2 leading-relaxed">
            {lang === 'ky'
              ? 'Жарандардан түшкөн кайрылууларды текшериңиз, аныктыгын тастыктаңыз, тийиштүү Айыл Өкмөтү же Мэрияга багыттаңыз жана оңдолгон соң «Чечилди» статусу менен жыйынтык сүрөтүн тиркеңиз.'
              : 'Проверяйте достоверность жалоб, направляйте их в профильные ведомства, регистрируйте входящие номера ответов и прикрепляйте фото подтверждённых результатов.'}
          </p>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {(['all', 'new', 'review', 'confirmed', 'forwarded', 'in_progress', 'resolved'] as const).map(
          (st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer ${
                filterStatus === st
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {st === 'all' ? t.allStatuses : t.statuses[st]} (
              {st === 'all'
                ? problems.length
                : problems.filter((p) => p.status === st).length}
              )
            </button>
          )
        )}
      </div>

      {/* Complaints Management Table */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-bold">
              <tr>
                <th className="py-3 px-4">Сүрөт / ID</th>
                <th className="py-3 px-4">Мазмуну жана жайгашкан жери</th>
                <th className="py-3 px-4">Багыты</th>
                <th className="py-3 px-4">Учурдагы абалы</th>
                <th className="py-3 px-4">Тастыктоолор</th>
                <th className="py-3 px-4 text-right">Аракеттер</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((prob) => (
                <tr key={prob.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <img
                        src={prob.imageUrl}
                        alt=""
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <span className="font-mono text-[10px] text-slate-400">{prob.id}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 max-w-xs">
                    <div className="font-bold text-slate-900 line-clamp-1">{prob.title}</div>
                    <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                      📍 {t.regions[prob.region]}, {prob.villageOrStreet}
                    </div>
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap font-medium text-slate-700">
                    {t.categories[prob.category]}
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span
                      className={`font-bold px-2.5 py-1 rounded-full text-[10px] ${
                        prob.status === 'resolved'
                          ? 'bg-emerald-100 text-emerald-800'
                          : prob.status === 'in_progress'
                          ? 'bg-amber-100 text-amber-800'
                          : prob.status === 'forwarded'
                          ? 'bg-blue-100 text-blue-800'
                          : prob.status === 'confirmed'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {t.statuses[prob.status]}
                    </span>
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap font-bold text-slate-700">
                    +{prob.confirmationsCount}
                  </td>
                  <td className="py-3 px-4 text-right whitespace-nowrap space-x-1">
                    <button
                      onClick={() => setActiveProblemModal(prob)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
                      title="Көрүү"
                    >
                      <Eye className="w-4 h-4 inline" />
                    </button>
                    <button
                      onClick={() => openActionDialog(prob)}
                      className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-3 py-1.5 rounded-xl cursor-pointer text-xs"
                    >
                      {lang === 'ky' ? 'Статусту башкаруу' : 'Управление'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Action Modal for changing status */}
      {selectedForAction && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-base text-slate-900">
                  {lang === 'ky' ? 'Кайрылуунун статусун өзгөртүү' : 'Обновление статуса обращения'}
                </h3>
                <p className="text-xs text-slate-500">{selectedForAction.title}</p>
              </div>
              <button onClick={() => setSelectedForAction(null)} className="text-slate-400">
                ✕
              </button>
            </div>

            <form onSubmit={handleActionSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {lang === 'ky' ? 'Жаңы статус:' : 'Новый статус:'}
                </label>
                <select
                  value={actionStatus}
                  onChange={(e) => setActionStatus(e.target.value as ProblemStatus)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 font-bold bg-white"
                >
                  <option value="review">🔍 {t.statuses.review}</option>
                  <option value="confirmed">🛡️ {t.statuses.confirmed}</option>
                  <option value="forwarded">🏛️ {t.statuses.forwarded}</option>
                  <option value="in_progress">⚡ {t.statuses.in_progress}</option>
                  <option value="resolved">✅ {t.statuses.resolved}</option>
                  <option value="rejected">❌ {t.statuses.rejected}</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {lang === 'ky' ? 'Жооптуу мамлекеттик орган:' : 'Ответственное ведомство / орган:'}
                </label>
                <input
                  type="text"
                  value={actionAgency}
                  onChange={(e) => setActionAgency(e.target.value)}
                  placeholder="Мэрия г. Бишкек, МП Тазалык, Чуйское водное управление..."
                  className="w-full p-2.5 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {lang === 'ky' ? 'Кириш/Чыгыш документтин №:' : 'Входящий / Исходящий номер документа:'}
                </label>
                <input
                  type="text"
                  value={actionDoc}
                  onChange={(e) => setActionDoc(e.target.value)}
                  placeholder="№ 142/АӨ-26"
                  className="w-full p-2.5 rounded-xl border border-slate-300 font-mono"
                />
              </div>

              {actionStatus === 'resolved' && (
                <div>
                  <label className="block font-bold text-emerald-800 mb-1">
                    {lang === 'ky' ? 'Чечилгенден кийинки жыйынтык сүрөтү (После URL):' : 'Фотография после устранения (URL):'}
                  </label>
                  <input
                    type="url"
                    value={actionPhotoAfter}
                    onChange={(e) => setActionPhotoAfter(e.target.value)}
                    placeholder="https://images.unsplash.com/... результат"
                    className="w-full p-2.5 rounded-xl border border-emerald-300 bg-emerald-50/50"
                  />
                  <div className="flex gap-2 mt-1">
                    <button
                      type="button"
                      onClick={() => setActionPhotoAfter('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80')}
                      className="text-[10px] text-emerald-700 underline"
                    >
                      {lang === 'ky' ? 'Таза жээк үлгүсү' : 'Образец: очищенный берег'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setActionPhotoAfter('https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80')}
                      className="text-[10px] text-emerald-700 underline"
                    >
                      {lang === 'ky' ? 'Оңдолгон арык үлгүсү' : 'Образец: отремонтированный арык'}
                    </button>
                  </div>
                </div>
              )}

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {lang === 'ky' ? 'Расмий жооптун тексти же эскертүү:' : 'Официальный ответ или примечание:'}
                </label>
                <textarea
                  rows={3}
                  value={actionText}
                  onChange={(e) => setActionText(e.target.value)}
                  placeholder="Көрүлгөн чаралар, бөлүнгөн техника жана мөөнөттөр жөнүндө..."
                  className="w-full p-2.5 rounded-xl border border-slate-300"
                ></textarea>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedForAction(null)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-4 py-2 rounded-xl shadow-xs"
                >
                  {lang === 'ky' ? 'Ырастоо жана сактоо' : 'Подтвердить и сохранить'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
