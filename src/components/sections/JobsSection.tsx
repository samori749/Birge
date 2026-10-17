import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { mockVacancies } from '../../data/mockData';
import { JobVacancy, RegionId } from '../../types';
import {
  Briefcase,
  PlusCircle,
  Coins,
  ShieldCheck,
  CheckCircle2,
  BookOpen,
  MapPin,
  ExternalLink,
  HelpCircle,
  Building2,
} from 'lucide-react';

export const JobsSection: React.FC = () => {
  const { t, lang, showToast, setIsAiOpen } = useApp();

  const [vacancies, setVacancies] = useState<JobVacancy[]>(mockVacancies);
  const [selectedReg, setSelectedReg] = useState<RegionId | 'all'>('all');
  const [showPostModal, setShowPostModal] = useState(false);

  // New Job post form
  const [newTitle, setNewTitle] = useState('');
  const [newCompany, setNewCompany] = useState('');
  const [newSalary, setNewSalary] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newContacts, setNewContacts] = useState('');

  const filteredJobs = vacancies.filter((j) => {
    if (selectedReg !== 'all' && j.region !== selectedReg) return false;
    return true;
  });

  const handlePostJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newCompany.trim()) return;

    const created: JobVacancy = {
      id: 'job-' + Date.now(),
      title: newTitle.trim(),
      company: newCompany.trim(),
      region: selectedReg === 'all' ? 'bishkek' : selectedReg,
      cityOrVillage: lang === 'ky' ? 'Кыргызстан' : 'Кыргызстан',
      salary: newSalary.trim() || (lang === 'ky' ? 'Сүйлөшүү жолу менен' : 'По договоренности'),
      type: lang === 'ky' ? 'Толук күн' : 'Полная занятость',
      description: newDesc.trim(),
      contacts: newContacts.trim() || '+996 (...) ...-...',
      isVerified: true,
      publishedAt: new Date().toISOString().slice(0, 10),
    };

    setVacancies((prev) => [created, ...prev]);
    setShowPostModal(false);
    setNewTitle('');
    setNewCompany('');
    setNewSalary('');
    setNewDesc('');
    setNewContacts('');
    showToast(
      lang === 'ky' ? 'Вакансия кошулду жана модерациядан өттү!' : 'Вакансия успешно добавлена в каталог!',
      'success'
    );
  };

  const businessIdeas = [
    {
      titleKg: '100 000 сом «Социалдык контракт» программасы',
      titleRu: 'Программа «Социальный контракт» на 100 000 сомов',
      badge: '100% Кайтарымсыз грант',
      descKg: 'Аз камсыз болгон үй-бүлөлөргө мал сатып алууга, тигүү машиналарына же күнөскана курууга берилет. Райондук Соцөнүгүү бөлүмүнө арыз берилет.',
      descRu: 'Безвозмездное государственное финансирование для открытия семейного дела. Оформляется через районные управления соцразвития.',
      icon: Coins,
    },
    {
      titleKg: 'Балчылык жана табигый тоо балы (Пчеловодство)',
      titleRu: 'Пчеловодство и сбор натурального горного меда',
      badge: 'Айыл чарба',
      descKg: '5-10 челек менен баштап, 1 сезондо өзүн актай турган пайдалуу бизнес. Суроо-талап ички жана тышкы рынокто жогору.',
      descRu: 'Высокорентабельное производство с окупаемостью за один сезон. Мед Кыргызстана пользуется огромным спросом на экспорт.',
      icon: Coins,
    },
    {
      titleKg: 'Чакан тигүү цехи (Швейное производство)',
      titleRu: 'Малый швейный цех на 3-5 машинок',
      badge: 'Шаар жана аймактар',
      descKg: 'Дордой жана «Мадина» базарларындагы даяр буйрутмаларды тигүү. Жергиликтүү кыз-келиндерге туруктуу жумуш орундары түзүлөт.',
      descRu: 'Пошив по готовым лекалам для экспортных рынков. Стабильная сдельная занятость для женщин в селах и городах.',
      icon: Coins,
    },
  ];

  const freeCourses = [
    {
      title: 'IT & Санариптик көндүмдөр (CODIFY & Жарандык курстар)',
      desc: 'Компьютердик сабаттуулук, маалымат базалары жана социалдык тармактарды иштетүү.',
    },
    {
      title: 'Айылдык чакан күн күнөсканаларын куруу жана гидропоника',
      desc: 'Кышында жана эрте жазда жашылчаларды үнөмдүү өстүрүү технологиялары.',
    },
    {
      title: 'Электрик жана күн панелдерин орнотуу боюнча базалык чеберчилик',
      desc: 'Энергияны үнөмдөө, инверторлорду жана аккумуляторлорду туташтыруу.',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-1.5 bg-white/20 px-3 py-1 rounded-full text-xs font-bold mb-3 backdrop-blur-xs">
            <Briefcase className="w-3.5 h-3.5 text-amber-200" />
            <span>{t.categories.jobs}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {lang === 'ky' ? 'Ишкердик, жумуш орундары жана чакан бизнес' : 'Работа, занятость и малый бизнес в КР'}
          </h2>
          <p className="text-sm text-amber-100 mt-2 leading-relaxed">
            {lang === 'ky'
              ? 'Аймактардагы текшерилген вакансиялар, мамлекеттик 100 000 сомдук «Социалдык контракт» гранты, акысыз курстар жана эмгек укуктарын коргоо.'
              : 'Проверенные вакансии без посредников, пошаговые инструкции по господдержке и грантам, обучение профессиям и бизнес-идеи.'}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowPostModal(true)}
              className="bg-white text-amber-900 hover:bg-amber-50 font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 text-amber-600" />
              <span>{lang === 'ky' ? 'Вакансия жарыялоо' : 'Разместить вакансию'}</span>
            </button>
            <button
              onClick={() => setIsAiOpen(true)}
              className="bg-amber-500/30 hover:bg-amber-500/40 border border-white/20 text-white font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
            >
              <HelpCircle className="w-4 h-4 text-amber-200" />
              <span>{lang === 'ky' ? 'Бизнес идеялар кеңеши' : 'ИИ-советник по бизнесу'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Social Contract & Small Business Ideas */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Coins className="w-5 h-5 text-amber-600" />
            <span>{lang === 'ky' ? 'Чакан бизнес идеялары жана мамлекеттик гранттар' : 'Идеи для малого бизнеса и гранты'}</span>
          </h3>
          <p className="text-xs text-slate-500">
            {lang === 'ky' ? 'Кыргызстандагы реалдуу иштей турган долбоорлор' : 'Проверенные направления самозанятости и господдержки'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {businessIdeas.map((idea, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-amber-100 text-amber-800">
                  {idea.badge}
                </span>
                <h4 className="font-bold text-slate-900 text-sm mt-2">
                  {lang === 'ky' ? idea.titleKg : idea.titleRu}
                </h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {lang === 'ky' ? idea.descKg : idea.descRu}
                </p>
              </div>

              <button
                onClick={() => setIsAiOpen(true)}
                className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1 cursor-pointer pt-2 border-t border-slate-100"
              >
                <span>{lang === 'ky' ? 'Бизнес-план алуу' : 'Получить план и расчеты'}</span>
                <span>→</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Jobs Catalog */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              {lang === 'ky' ? 'Текшерилген бош жумуш орундары' : 'Каталог проверенных вакансий'} ({filteredJobs.length})
            </h3>
            <p className="text-xs text-slate-500">
              {lang === 'ky' ? 'Алдамчылыктан корголгон, чыныгы иш берүүчүлөр' : 'Без мошенничества и скрытых комиссий'}
            </p>
          </div>

          {/* Region filter */}
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-bold text-slate-500">
                    {job.company}
                  </span>
                  <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    {job.salary}
                  </span>
                </div>

                <h4 className="font-extrabold text-slate-900 text-base mt-1">
                  {job.title}
                </h4>

                <div className="flex items-center gap-2 text-xs text-slate-500 mt-1 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-red-500" />
                  <span>{t.regions[job.region]}, {job.cityOrVillage}</span>
                  <span>•</span>
                  <span>{job.type}</span>
                </div>

                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {job.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-slate-700">
                  {job.contacts}
                </span>

                <button
                  onClick={() => showToast(lang === 'ky' ? 'Иш берүүчүнүн байланыштары ачылды!' : 'Контакты подтверждены!', 'info')}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-3.5 py-1.5 rounded-xl transition-colors cursor-pointer"
                >
                  {lang === 'ky' ? 'Байланышуу' : 'Откликнуться'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Free Vocational Courses & Labor Rights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Free courses */}
        <div className="bg-slate-50 rounded-3xl border border-slate-200 p-5 sm:p-6 space-y-3">
          <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber-600" />
            <span>{lang === 'ky' ? 'Акысыз кесиптик курстар' : 'Бесплатные курсы и профобучение'}</span>
          </h4>
          <div className="space-y-2">
            {freeCourses.map((c, idx) => (
              <div key={idx} className="bg-white p-3 rounded-xl border border-slate-200 text-xs">
                <div className="font-bold text-slate-900">{c.title}</div>
                <div className="text-slate-500 mt-0.5">{c.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Labor Rights */}
        <div className="bg-slate-50 rounded-3xl border border-slate-200 p-5 sm:p-6 space-y-3">
          <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>{lang === 'ky' ? 'Эмгек укуктары жана коопсуздук' : 'Трудовые права и безопасность'}</span>
          </h4>
          <ul className="text-xs text-slate-600 space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">✓</span>
              <span>
                {lang === 'ky' ? 'Эмгек келишимин түзүүнү талап кылыңыз — бул айлык акыны кепилдейт.' : 'Всегда требуйте заключения трудового договора — это гарантирует выплату зарплаты.'}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">✓</span>
              <span>
                {lang === 'ky' ? 'Жумушка орношуу үчүн эч качан алдын ала акча же төлөм бербеңиз.' : 'Никогда не платите деньги «за регистрацию» или «бронь вакансии» — это мошенничество.'}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">✓</span>
              <span>
                {lang === 'ky' ? 'Мыйзам бузулса, Эмгек министрлигинин инспекциясына же 118 номерине кайрылыңыз.' : 'При нарушении прав обращайтесь в Государственную инспекцию труда КР.'}
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Post Job Modal */}
      {showPostModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-base text-slate-900">
                {lang === 'ky' ? 'Жаңы вакансия жарыялоо' : 'Разместить вакансию'}
              </h3>
              <button onClick={() => setShowPostModal(false)} className="text-slate-400">
                ✕
              </button>
            </div>

            <form onSubmit={handlePostJob} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {lang === 'ky' ? 'Кесип / Кызмат оруну:' : 'Должность / Профессия:'}
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Тигүүчү, тракторист, сатуучу..."
                  className="w-full p-2.5 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {lang === 'ky' ? 'Компания же ишкердин аты:' : 'Компания или ИП:'}
                </label>
                <input
                  type="text"
                  required
                  value={newCompany}
                  onChange={(e) => setNewCompany(e.target.value)}
                  placeholder="«АгроФерма», жеке чарба..."
                  className="w-full p-2.5 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {lang === 'ky' ? 'Айлык акы (сом):' : 'Заработная плата:'}
                </label>
                <input
                  type="text"
                  value={newSalary}
                  onChange={(e) => setNewSalary(e.target.value)}
                  placeholder="40 000 – 60 000 сом"
                  className="w-full p-2.5 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {lang === 'ky' ? 'Байланыш телефону / WhatsApp:' : 'Контакты:'}
                </label>
                <input
                  type="text"
                  required
                  value={newContacts}
                  onChange={(e) => setNewContacts(e.target.value)}
                  placeholder="+996 (555) 12-34-56"
                  className="w-full p-2.5 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  {lang === 'ky' ? 'Кыскача милдеттери:' : 'Описание обязанностей:'}
                </label>
                <textarea
                  rows={2}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Жумуш убактысы, тамак-аш, талаптар..."
                  className="w-full p-2.5 rounded-xl border border-slate-300"
                ></textarea>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowPostModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-4 py-2 rounded-xl shadow-xs"
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
