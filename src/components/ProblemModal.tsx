import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ProblemStatus } from '../types';
import {
  X,
  MapPin,
  Calendar,
  ThumbsUp,
  CheckCircle2,
  Clock,
  Building,
  ShieldCheck,
  Share2,
  ArrowRight,
  FileText,
  AlertTriangle,
  Upload,
} from 'lucide-react';

export const ProblemModal: React.FC = () => {
  const {
    activeProblemModal,
    setActiveProblemModal,
    t,
    lang,
    isModerator,
    updateProblemStatus,
    confirmProblem,
    showToast,
  } = useApp();

  const [activePhotoTab, setActivePhotoTab] = useState<'before' | 'after'>('before');
  
  // Moderator form states
  const [modStatus, setModStatus] = useState<ProblemStatus>('in_progress');
  const [modNote, setModNote] = useState('');
  const [modAgency, setModAgency] = useState('');
  const [modOfficialText, setModOfficialText] = useState('');
  const [modDocNumber, setModDocNumber] = useState('');
  const [modPhotoAfter, setModPhotoAfter] = useState('');

  if (!activeProblemModal) return null;

  const problem = activeProblemModal;
  const isConfirmedByMe = problem.confirmedByUserIds.includes('my-user-id');

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast(lang === 'ky' ? 'Шилтеме көчүрүлдү!' : 'Ссылка скопирована в буфер обмена!', 'success');
    }
  };

  const handleModeratorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProblemStatus(
      problem.id,
      modStatus,
      modNote || (lang === 'ky' ? 'Абал модератор тарабынан өзгөртүлдү' : 'Статус обновлен модератором'),
      modAgency,
      modOfficialText,
      modDocNumber,
      modPhotoAfter
    );
    setModNote('');
    setModOfficialText('');
    setModPhotoAfter('');
  };

  const getStatusLabel = (s: ProblemStatus) => t.statuses[s];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 relative flex flex-col">
        {/* Modal Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md px-5 sm:px-7 py-4 border-b border-slate-100 flex items-center justify-between z-20">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-900 text-white">
              {t.categories[problem.category]}
            </span>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-red-100 text-red-800 border border-red-200">
              {getStatusLabel(problem.status)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
              title={t.share}
            >
              <Share2 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setActiveProblemModal(null)}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-7 space-y-6">
          {/* Title & Location */}
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1.5">
              <MapPin className="w-4 h-4 text-red-600 shrink-0" />
              <span>
                {t.regions[problem.region]}, {problem.district}, {problem.villageOrStreet}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
              {problem.title}
            </h2>
          </div>

          {/* Photo Gallery with Before / After Tabs if resolved */}
          <div className="space-y-2">
            {problem.imageAfterUrl && (
              <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl w-fit">
                <button
                  onClick={() => setActivePhotoTab('before')}
                  className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    activePhotoTab === 'before'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  📷 {t.photoBefore}
                </button>
                <button
                  onClick={() => setActivePhotoTab('after')}
                  className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    activePhotoTab === 'after'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  ✅ {t.photoAfter}
                </button>
              </div>
            )}

            <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
              <img
                src={activePhotoTab === 'after' && problem.imageAfterUrl ? problem.imageAfterUrl : problem.imageUrl}
                alt={problem.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 bg-slate-950/70 backdrop-blur-md text-white text-xs px-3 py-1 rounded-lg">
                {activePhotoTab === 'after' ? t.photoAfter : t.photoBefore}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              {lang === 'ky' ? 'Көйгөйдүн толук маңызы' : 'Суть проблемы'}
            </h4>
            <p className="text-sm text-slate-800 leading-relaxed whitespace-pre-line">
              {problem.description}
            </p>
            <div className="mt-4 pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>{lang === 'ky' ? 'Катталган күнү:' : 'Дата создания:'} {problem.createdAt}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span>{lang === 'ky' ? 'Автор:' : 'Автор:'} <span className="font-semibold text-slate-700">{problem.authorName}</span></span>
              </div>
            </div>
          </div>

          {/* Citizen Confirmation Action Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-2xl bg-gradient-to-r from-red-50 to-amber-50 border border-red-100">
            <div>
              <div className="flex items-center gap-1.5 font-bold text-slate-900 text-sm">
                <ShieldCheck className="w-4 h-4 text-red-600" />
                <span>{problem.confirmationsCount} {t.confirmedByCount}</span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                {lang === 'ky'
                  ? 'Канчалык көп жаран тастыктаса, тийиштүү мекемелер ошончолук тез чара көрүшөт.'
                  : 'Чем больше подтверждений от жителей, тем выше приоритет в плане госорганов.'}
              </p>
            </div>

            <button
              onClick={() => confirmProblem(problem.id)}
              className={`w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                isConfirmedByMe
                  ? 'bg-red-600 text-white shadow-md shadow-red-500/20'
                  : 'bg-white hover:bg-red-50 text-red-600 border border-red-300 shadow-xs'
              }`}
            >
              <ThumbsUp className={`w-4 h-4 ${isConfirmedByMe ? 'fill-white' : ''}`} />
              <span>{isConfirmedByMe ? (lang === 'ky' ? 'Сиз тастыктадыңыз' : 'Вы подтвердили') : t.confirmProblem}</span>
            </button>
          </div>

          {/* Official Response Section if available */}
          {problem.officialResponse && (
            <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-900">
                  <Building className="w-4 h-4 text-blue-700" />
                  <span>{t.officialResponseLabel}</span>
                </span>
                {problem.officialResponse.docNumber && (
                  <span className="text-[11px] font-mono font-bold text-blue-800 bg-white px-2 py-0.5 rounded-md border border-blue-200">
                    {problem.officialResponse.docNumber}
                  </span>
                )}
              </div>

              <div className="text-xs text-slate-600">
                <span className="font-bold text-slate-900">{problem.officialResponse.agency}</span>
                {problem.officialResponse.responderName && ` • ${problem.officialResponse.responderName}`}
                <span className="text-slate-400"> ({problem.officialResponse.responseDate})</span>
              </div>

              <p className="text-sm text-slate-800 leading-relaxed bg-white/80 p-3.5 rounded-xl border border-blue-100 italic">
                "{problem.officialResponse.text}"
              </p>
            </div>
          )}

          {/* Status Timeline History */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-600" />
              <span>{t.historyTimeline}</span>
            </h4>

            <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {problem.statusHistory.map((item, index) => {
                const isLast = index === problem.statusHistory.length - 1;
                return (
                  <div key={item.id} className="relative group">
                    <div
                      className={`absolute -left-6 top-1 w-4 h-4 rounded-full border-2 border-white shadow-xs ${
                        isLast ? 'bg-red-600 ring-4 ring-red-100' : 'bg-slate-400'
                      }`}
                    ></div>

                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-xs font-bold text-slate-900">
                          {getStatusLabel(item.status)}
                        </span>
                        <span className="text-[11px] text-slate-400 font-mono">
                          {item.date}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600">{item.note}</p>
                      <div className="text-[10px] text-slate-400 mt-1 font-medium">
                        {item.author} {item.agency ? `(${item.agency})` : ''}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Moderator Controls Panel (Visible for civil servants / testers) */}
          {isModerator && (
            <div className="mt-6 p-5 rounded-2xl bg-amber-50 border-2 border-amber-300 space-y-4">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>{lang === 'ky' ? 'Модератордук башкаруу панели' : 'Панель модератора / сотрудника ведомства'}</span>
              </div>
              <p className="text-xs text-amber-800">
                {lang === 'ky'
                  ? 'Сиз бул маселенин абалын өзгөртө аласыз, расмий мекеменин жообун же оңдолгон соң жыйынтык сүрөтүн тиркей аласыз.'
                  : 'Вы можете изменить статус обращения, добавить официальный ответ ведомства и прикрепить фото после решения.'}
              </p>

              <form onSubmit={handleModeratorSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {lang === 'ky' ? 'Жаңы статус:' : 'Новый статус:'}
                    </label>
                    <select
                      value={modStatus}
                      onChange={(e) => setModStatus(e.target.value as ProblemStatus)}
                      className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-300 bg-white"
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
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {lang === 'ky' ? 'Жооптуу ведомство:' : 'Ответственное ведомство:'}
                    </label>
                    <input
                      type="text"
                      value={modAgency}
                      onChange={(e) => setModAgency(e.target.value)}
                      placeholder="Мэрия, Айыл Өкмөтү, Тазалык же Водхоз"
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === 'ky' ? 'Жаңылоо эскертмеси:' : 'Примечание к изменению:'}
                  </label>
                  <input
                    type="text"
                    value={modNote}
                    onChange={(e) => setModNote(e.target.value)}
                    placeholder="Мисалы: Бригада жерине чыкты же материалдар бөлүндү"
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {lang === 'ky' ? 'Документ / Входящий №:' : 'Входящий / Исходящий №:'}
                    </label>
                    <input
                      type="text"
                      value={modDocNumber}
                      onChange={(e) => setModDocNumber(e.target.value)}
                      placeholder="№ 512/КР"
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {lang === 'ky' ? 'Жыйынтык сүрөтү (После URL):' : 'Фото после решения (URL):'}
                    </label>
                    <input
                      type="url"
                      value={modPhotoAfter}
                      onChange={(e) => setModPhotoAfter(e.target.value)}
                      placeholder="https://... сүрөт шилтемеси"
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {lang === 'ky' ? 'Расмий жооптун тексти:' : 'Официальный текст ответа ведомства:'}
                  </label>
                  <textarea
                    rows={2}
                    value={modOfficialText}
                    onChange={(e) => setModOfficialText(e.target.value)}
                    placeholder="Көйгөй боюнча көрүлгөн чаралар жана мөөнөттөр жөнүндө расмий жооп..."
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-white"
                  ></textarea>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition-colors cursor-pointer"
                  >
                    {lang === 'ky' ? 'Статусту сактоо' : 'Сохранить изменения'}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <div className="text-xs text-slate-500 font-mono">ID: {problem.id}</div>
          <button
            onClick={() => setActiveProblemModal(null)}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
};
