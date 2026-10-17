import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { educationalLessons } from '../../data/mockData';
import { EducationalLesson } from '../../types';
import {
  GraduationCap,
  Sparkles,
  CheckCircle2,
  XCircle,
  HelpCircle,
  BookOpen,
  Award,
  ExternalLink,
  RotateCcw,
} from 'lucide-react';

export const EducationSection: React.FC = () => {
  const { t, lang, setIsAiOpen, showToast, userProfile, updateUserProfile } = useApp();

  const [activeLesson, setActiveLesson] = useState<EducationalLesson>(educationalLessons[0]);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showExplanation, setShowExplanation] = useState<Record<number, boolean>>({});

  const handleSelectOption = (questionIndex: number, optionIndex: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionIndex]: optionIndex }));
    setShowExplanation((prev) => ({ ...prev, [questionIndex]: true }));

    const isCorrect = optionIndex === activeLesson.quiz[questionIndex].correctIndex;
    if (isCorrect) {
      showToast(
        lang === 'ky' ? 'Туура жооп! Азаматсыз (+15 балл) 🎉' : 'Правильный ответ! Отлично (+15 баллов) 🎉',
        'success'
      );
      updateUserProfile({ volunteerScore: userProfile.volunteerScore + 15 });
    } else {
      showToast(
        lang === 'ky' ? 'Туура эмес, түшүндүрмөнү окуп чыгыңыз 💡' : 'Не совсем верно. Посмотрите разбор ошибки 💡',
        'info'
      );
    }
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setShowExplanation({});
  };

  const externalResources = [
    {
      title: 'Санарип Сабак (Министерство образования КР)',
      descKg: '1–11-класстар үчүн бардык сабактардын видеосабактары жана электрондук окуу китептери.',
      descRu: 'Видеоуроки и электронные учебники для 1-11 классов на кыргызском и русском языках.',
      link: 'https://sanarip.edu.gov.kg',
    },
    {
      title: 'Билим Булагы / Билим берүү порталы',
      descKg: 'Акысыз интерактивдүү симуляциялар, физика, химия жана математика боюнча лабораториялар.',
      descRu: 'Интерактивные образовательные материалы и симуляции по естественно-научным дисциплинам.',
      link: 'https://bb.edu.gov.kg',
    },
    {
      title: 'ЖРТ / ОРТ тесттерин даярдоо борбору (ЦОРМОТИ)',
      descKg: 'Жалпы республикалык тестирлөөнүн расмий үлгүлөрү, аналогиялар жана нормативдик тесттер.',
      descRu: 'Официальные образцы заданий ОРТ, пособия для поступающих в вузы Кыргызстана.',
      link: 'https://testing.kg',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Banner */}
      <div className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-violet-800 text-white rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-1.5 bg-white/20 px-3 py-1 rounded-full text-xs font-bold mb-3 backdrop-blur-xs">
            <GraduationCap className="w-3.5 h-3.5 text-amber-300" />
            <span>{t.categories.education}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {lang === 'ky' ? 'Сапаттуу жана акысыз билим берүү' : 'Образование и подготовка к ОРТ / ЖРТ'}
          </h2>
          <p className="text-sm text-indigo-100 mt-2 leading-relaxed">
            {lang === 'ky'
              ? 'Айылдык жана шаардык мектеп окуучулары үчүн интерактивдүү сабактар, каталарды түшүндүрүү менен авто-текшерүү тесттери жана «Бирге AI» репетитору.'
              : 'Бесплатные модули по математике, кыргызскому языку и логике. Задачи с автоматической проверкой и подробным разбором ошибок.'}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsAiOpen(true)}
              className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-extrabold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>{lang === 'ky' ? 'ИИ-репетитордон суроо' : 'Задать вопрос ИИ-репетитору'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Lesson Selector Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {educationalLessons.map((lesson) => {
          const isSelected = activeLesson.id === lesson.id;
          return (
            <button
              key={lesson.id}
              onClick={() => {
                setActiveLesson(lesson);
                handleResetQuiz();
              }}
              className={`px-4 py-3 rounded-2xl border text-xs sm:text-sm font-bold shrink-0 transition-all cursor-pointer flex items-center gap-2 ${
                isSelected
                  ? 'bg-indigo-600 text-white border-indigo-700 shadow-md shadow-indigo-600/20'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>{lang === 'ky' ? lesson.titleKg : lesson.titleRu}</span>
            </button>
          );
        })}
      </div>

      {/* Active Lesson Content Box */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-7 shadow-xs space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
            {activeLesson.grade}
          </span>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-2">
            {lang === 'ky' ? activeLesson.titleKg : activeLesson.titleRu}
          </h3>
          <p className="text-sm text-slate-500 mt-1 font-medium">
            {lang === 'ky' ? activeLesson.summaryKg : activeLesson.summaryRu}
          </p>
        </div>

        {/* Theoretical explanation */}
        <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-line font-normal">
          {lang === 'ky' ? activeLesson.contentKg : activeLesson.contentRu}
        </div>

        {/* Interactive Practice Quiz */}
        <div className="pt-2 border-t border-slate-100 space-y-5">
          <div className="flex items-center justify-between">
            <h4 className="font-extrabold text-slate-900 text-sm sm:text-base flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500" />
              <span>{lang === 'ky' ? 'Өзүңүздү текшериңиз (Тест)' : 'Практическое задание с автопроверкой'}</span>
            </h4>
            <button
              onClick={handleResetQuiz}
              className="text-xs text-slate-400 hover:text-slate-700 flex items-center gap-1 font-medium cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{lang === 'ky' ? 'Кайра баштоо' : 'Сбросить'}</span>
            </button>
          </div>

          <div className="space-y-6">
            {activeLesson.quiz.map((q, qIndex) => {
              const selectedOpt = selectedAnswers[qIndex];
              const isAnswered = selectedOpt !== undefined;
              const isCorrect = isAnswered && selectedOpt === q.correctIndex;

              const options = lang === 'ky' ? q.optionsKg : q.optionsRu;
              const question = lang === 'ky' ? q.questionKg : q.questionRu;
              const explanation = lang === 'ky' ? q.explanationKg : q.explanationRu;

              return (
                <div
                  key={qIndex}
                  className="bg-slate-50/80 rounded-2xl p-4 sm:p-5 border border-slate-200 space-y-3"
                >
                  <div className="font-bold text-slate-900 text-xs sm:text-sm">
                    {qIndex + 1}. {question}
                  </div>

                  {/* Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {options.map((opt, optIndex) => {
                      const isOptionSelected = selectedOpt === optIndex;
                      const isOptionCorrect = optIndex === q.correctIndex;

                      let btnStyle = 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100';
                      if (isAnswered) {
                        if (isOptionCorrect) {
                          btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-800 font-bold';
                        } else if (isOptionSelected && !isOptionCorrect) {
                          btnStyle = 'border-rose-500 bg-rose-50 text-rose-800 font-bold line-through';
                        }
                      }

                      return (
                        <button
                          key={optIndex}
                          onClick={() => handleSelectOption(qIndex, optIndex)}
                          className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all cursor-pointer flex items-center justify-between ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          {isAnswered && isOptionCorrect && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          )}
                          {isAnswered && isOptionSelected && !isOptionCorrect && (
                            <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Automated Explanation of Error / Reasoning */}
                  {isAnswered && (
                    <div
                      className={`p-3.5 rounded-xl border text-xs leading-relaxed ${
                        isCorrect
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                          : 'bg-amber-50 border-amber-200 text-amber-900'
                      }`}
                    >
                      <div className="font-bold flex items-center gap-1.5 mb-1">
                        <HelpCircle className="w-4 h-4" />
                        <span>
                          {isCorrect
                            ? (lang === 'ky' ? 'Туура түшүндүрмө:' : 'Верно! Разбор решения:')
                            : (lang === 'ky' ? 'Катаны түшүндүрүү:' : 'Разбор ошибки и правильный ход мысли:')}
                        </span>
                      </div>
                      <p>{explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Free State Portals & Learning Resources Catalog */}
      <div className="bg-slate-50 rounded-3xl border border-slate-200 p-5 sm:p-7 space-y-4">
        <h3 className="font-bold text-slate-900 text-base">
          {lang === 'ky' ? 'Кыргызстандын акысыз билим берүү ресурстары' : 'Каталог бесплатных образовательных платформ КР'}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {externalResources.map((res, i) => (
            <a
              key={i}
              href={res.link}
              target="_blank"
              rel="noreferrer"
              className="bg-white p-4 rounded-2xl border border-slate-200 hover:border-indigo-400 transition-all text-xs space-y-2 group shadow-2xs"
            >
              <div className="font-bold text-slate-900 text-sm group-hover:text-indigo-600 flex items-center justify-between">
                <span>{res.title}</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600" />
              </div>
              <p className="text-slate-500 leading-relaxed">
                {lang === 'ky' ? res.descKg : res.descRu}
              </p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
