import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { socialHelpRequests } from '../../data/mockData';
import { SocialHelpRequest, RegionId } from '../../types';
import {
  HandHeart,
  PlusCircle,
  ShieldCheck,
  Lock,
  Heart,
  Users,
  CheckCircle2,
  AlertTriangle,
  Gift,
  HelpCircle,
} from 'lucide-react';

export const SocialSection: React.FC = () => {
  const { t, lang, showToast, userProfile, updateUserProfile } = useApp();

  const [requests, setRequests] = useState<SocialHelpRequest[]>(socialHelpRequests);
  const [showRequestModal, setShowRequestModal] = useState(false);

  // Form states for creating a safe social request
  const [reqTitle, setReqTitle] = useState('');
  const [reqType, setReqType] = useState<SocialHelpRequest['categoryType']>('food');
  const [reqDesc, setReqDesc] = useState('');
  const [reqDistrict, setReqDistrict] = useState('');
  const [reqRegion, setReqRegion] = useState<RegionId>('bishkek');

  const handleJoinVolunteer = (requestId: string) => {
    setRequests((prev) =>
      prev.map((r) => {
        if (r.id !== requestId) return r;
        return {
          ...r,
          volunteersJoined: r.volunteersJoined + 1,
          status: 'assigned',
        };
      })
    );
    showToast(
      lang === 'ky'
        ? 'Рахмат! Сиз ыктыярчы болуп кошулдуңуз. Координатор сиз менен байланышат (+25 балл)'
        : 'Спасибо! Вы откликнулись на заявку. Координатор свяжется с вами (+25 баллов)',
      'success'
    );
    updateUserProfile({ volunteerScore: userProfile.volunteerScore + 25 });
  };

  const handleCreateRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reqTitle.trim() || !reqDesc.trim()) return;

    const newReq: SocialHelpRequest = {
      id: 'soc-' + Date.now(),
      title: reqTitle.trim(),
      categoryType: reqType,
      region: reqRegion,
      district: reqDistrict.trim() || (lang === 'ky' ? 'Жергиликтүү аймак' : 'Район'),
      description: reqDesc.trim(),
      urgency: 'medium',
      status: 'open',
      createdAt: new Date().toISOString().slice(0, 10),
      volunteersJoined: 0,
    };

    setRequests((prev) => [newReq, ...prev]);
    setShowRequestModal(false);
    setReqTitle('');
    setReqDesc('');
    setReqDistrict('');
    showToast(
      lang === 'ky' ? 'Жардам өтүнүчү модерацияга кабыл алынды!' : 'Заявка на помощь принята на проверку!',
      'success'
    );
  };

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="bg-gradient-to-r from-purple-700 via-indigo-700 to-pink-700 text-white rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-1.5 bg-white/20 px-3 py-1 rounded-full text-xs font-bold mb-3 backdrop-blur-xs">
            <HandHeart className="w-3.5 h-3.5 text-pink-200" />
            <span>{t.categories.social}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {lang === 'ky' ? 'Бирге боорукерлик: Муктаждарга коопсуз колдоо' : 'Социальная помощь и волонтёрская солидарность'}
          </h2>
          <p className="text-sm text-purple-100 mt-2 leading-relaxed">
            {lang === 'ky'
              ? 'Жалгыз бой карыларга кышка көмүр даярдоо, аз камсыз болгон балдарга кийим-кече жана бытовой коопсуз жардам берүү платформасы.'
              : 'Платформа безопасной адресной помощи пожилым людям, многодетным семьям и людям с инвалидностью без разглашения персональных данных.'}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowRequestModal(true)}
              className="bg-white text-purple-900 hover:bg-purple-50 font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 text-purple-600" />
              <span>{lang === 'ky' ? 'Жардам өтүнүчүн калтыруу' : 'Оставить заявку на помощь'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Privacy & Safety Warning Card */}
      <div className="bg-amber-50 border border-amber-200 rounded-3xl p-4 sm:p-5 flex items-start gap-3 shadow-2xs">
        <Lock className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-900 leading-relaxed">
          <span className="font-bold block text-sm mb-0.5">
            {lang === 'ky' ? 'Купуялуулук жана коопсуздук эрежеси:' : 'Правило безопасности и конфиденциальности:'}
          </span>
          {lang === 'ky'
            ? 'Муктаж жарандардын паспорттук маалыматтары жана так үй даректери эч качан ачык жарыяланбайт. Жардам көрсөтүү текшерилген координаторлор жана социалдык кызматкерлердин көзөмөлүндө гана өтөт.'
            : 'Точные домашние адреса и персональные данные получателей помощи скрыты от публичного доступа в целях безопасности. Вся помощь координируется через верифицированных волонтёров.'}
        </div>
      </div>

      {/* Active Requests List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-600" />
              <span>{lang === 'ky' ? 'Учурдагы жардам суроо-талаптары' : 'Актуальные запросы на волонтёрскую помощь'}</span>
            </h3>
            <p className="text-xs text-slate-500">
              {lang === 'ky' ? 'Сиз дагы катышып, кол суна аласыз' : 'Присоединяйтесь к добрым делам в вашем районе'}
            </p>
          </div>
          <button
            onClick={() => setShowRequestModal(true)}
            className="text-xs font-bold text-purple-700 hover:text-purple-800 cursor-pointer hidden sm:block"
          >
            + {lang === 'ky' ? 'Жаңы өтүнүч' : 'Подать заявку'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {requests.map((req) => (
            <div
              key={req.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800">
                    {req.categoryType === 'coal'
                      ? 'Көмүр / Жылуулук'
                      : req.categoryType === 'food'
                      ? 'Азык-түлүк'
                      : req.categoryType === 'clothing'
                      ? 'Кийим-кече'
                      : 'Кароо / Жардам'}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                      req.status === 'open'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {req.status === 'open'
                      ? (lang === 'ky' ? 'Ыктыярчылар керек' : 'Ищем волонтёров')
                      : (lang === 'ky' ? 'Аткарылууда' : 'В процессе')}
                  </span>
                </div>

                <h4 className="font-bold text-slate-900 text-base mt-2">
                  {req.title}
                </h4>

                <div className="text-xs text-slate-500 font-medium mt-1">
                  📍 {t.regions[req.region]}, {req.district}
                </div>

                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {req.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  <span className="font-bold text-slate-900">{req.volunteersJoined}</span>{' '}
                  {lang === 'ky' ? 'ыктыярчы кошулду' : 'волонтёра откликнулись'}
                </span>

                <button
                  onClick={() => handleJoinVolunteer(req.id)}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs px-3.5 py-1.5 rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Heart className="w-3.5 h-3.5 fill-white" />
                  <span>{lang === 'ky' ? 'Кол сунуу' : 'Помочь'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Request Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                <HandHeart className="w-4 h-4 text-purple-600" />
                <span>{lang === 'ky' ? 'Жардам өтүнүчү' : 'Заявка на помощь'}</span>
              </h3>
              <button onClick={() => setShowRequestModal(false)} className="text-slate-400">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateRequest} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {lang === 'ky' ? 'Жардамдын түрү:' : 'Категория помощи:'}
                </label>
                <select
                  value={reqType}
                  onChange={(e) => setReqType(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white"
                >
                  <option value="coal">{lang === 'ky' ? 'Көмүр / отун түшүрүү' : 'Заготовка угля / дров'}</option>
                  <option value="food">{lang === 'ky' ? 'Азык-түлүк топтому' : 'Продуктовая помощь'}</option>
                  <option value="clothing">{lang === 'ky' ? 'Жылуу кийим-кече' : 'Теплая одежда'}</option>
                  <option value="elderly_care">{lang === 'ky' ? 'Карыларга бытовой жардам' : 'Уход за пожилыми'}</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {lang === 'ky' ? 'Кыскача маңызы:' : 'Суть заявки:'}
                </label>
                <input
                  type="text"
                  required
                  value={reqTitle}
                  onChange={(e) => setReqTitle(e.target.value)}
                  placeholder="Мисалы: 2 тонна көмүрдү сарайга киргизүү"
                  className="w-full p-2.5 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {lang === 'ky' ? 'Облус:' : 'Область:'}
                </label>
                <select
                  value={reqRegion}
                  onChange={(e) => setReqRegion(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white"
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
                  {lang === 'ky' ? 'Район же айыл аймагы (так дарек жазбаңыз):' : 'Район или айылный округ:'}
                </label>
                <input
                  type="text"
                  value={reqDistrict}
                  onChange={(e) => setReqDistrict(e.target.value)}
                  placeholder="Мисалы: Сокулук району, Военно-Антоновка а."
                  className="w-full p-2.5 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {lang === 'ky' ? 'Кандай жардам керек (кеңири):' : 'Подробности ситуации:'}
                </label>
                <textarea
                  rows={3}
                  required
                  value={reqDesc}
                  onChange={(e) => setReqDesc(e.target.value)}
                  placeholder="Муктаждыктын чоо-жайын жазыңыз..."
                  className="w-full p-2.5 rounded-xl border border-slate-300"
                ></textarea>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowRequestModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-4 py-2 rounded-xl shadow-xs"
                >
                  {lang === 'ky' ? 'Жөнөтүү' : 'Отправить'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
