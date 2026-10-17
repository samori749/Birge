import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { useApp } from '../context/AppContext';
import { Download, Smartphone, X, Share, PlusSquare } from 'lucide-react';

export const MobileInstallBar: React.FC = () => {
  const { lang } = useApp();
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [dismissed, setDismissed] = useState(false);
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  if (isInstalled || dismissed) return null;

  return (
    <>
      <div className="bg-gradient-to-r from-red-700 via-red-600 to-amber-600 text-white px-4 py-2.5 shadow-md flex items-center justify-between gap-3 text-xs z-30">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
            <Smartphone className="w-4 h-4 text-amber-200" />
          </div>
          <div>
            <div className="font-extrabold text-xs">
              {lang === 'ky' ? 'Телефонго тиркеме кылып орнотуу' : 'Установить «БИРГЕ KG» на телефон'}
            </div>
            <div className="text-[11px] text-red-100 hidden sm:block">
              {lang === 'ky' ? 'Интернетсиз да иштейт, тез ачылат' : 'Быстрый запуск с рабочего стола телефона'}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {isInstallable && (
            <button
              onClick={install}
              className="bg-white text-red-700 hover:bg-red-50 font-black text-xs px-3.5 py-1.5 rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{lang === 'ky' ? 'Орнотуу' : 'Установить'}</span>
            </button>
          )}

          {isIOS && (
            <button
              onClick={() => setShowIOSGuide(true)}
              className="bg-white/20 hover:bg-white/30 text-white font-bold text-xs px-3 py-1.5 rounded-xl transition-colors cursor-pointer flex items-center gap-1"
            >
              <span>{lang === 'ky' ? 'iPhone үчүн' : 'Для iPhone'}</span>
            </button>
          )}

          {!isInstallable && !isIOS && (
            <button
              onClick={() => setShowIOSGuide(true)}
              className="bg-white/20 hover:bg-white/30 text-white font-bold text-xs px-3 py-1.5 rounded-xl transition-colors cursor-pointer flex items-center gap-1"
            >
              <span>{lang === 'ky' ? 'Кантип орнотуу?' : 'Инструкция'}</span>
            </button>
          )}

          <button
            onClick={() => setDismissed(true)}
            className="p-1 rounded-lg text-white/70 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Guided iOS / Android installation steps modal */}
      {showIOSGuide && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl border border-slate-200 animate-in fade-in zoom-in">
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto">
              <Smartphone className="w-6 h-6" />
            </div>

            <h3 className="text-base font-extrabold text-slate-900">
              {lang === 'ky' ? 'Телефондун экранына кошуу 📱' : 'Как установить на экран телефона 📱'}
            </h3>

            <div className="space-y-3 text-left text-xs text-slate-700 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-red-600 text-white font-bold text-[11px] flex items-center justify-center shrink-0">
                  1
                </span>
                <span>
                  {lang === 'ky'
                    ? 'Браузердин менюсун ачыңыз (Safari’де ылдыйкы «Бөлүшүү / Поделиться»'
                    : 'В браузере Safari или Chrome нажмите кнопку «Поделиться» (иконка со стрелкой)'}
                  <Share className="w-3.5 h-3.5 inline mx-1 text-slate-700" />
                  {lang === 'ky' ? 'же Chrome’до 3 чекит)' : 'или меню ⋮'}
                </span>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-red-600 text-white font-bold text-[11px] flex items-center justify-center shrink-0">
                  2
                </span>
                <span>
                  {lang === 'ky'
                    ? 'Тизмеден «Экранга кошуу» (На экран Домой)'
                    : 'В появившемся меню выберите «На экран «Домой»» (Add to Home Screen)'}
                  <PlusSquare className="w-3.5 h-3.5 inline mx-1 text-slate-700" />
                </span>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-red-600 text-white font-bold text-[11px] flex items-center justify-center shrink-0">
                  3
                </span>
                <span>
                  {lang === 'ky'
                    ? '«Кошуу» баскычын басыңыз. Эми тиркеме чыныгы колдонмо сыяктуу иштейт!'
                    : 'Нажмите «Добавить». Иконка появится на рабочем столе смартфона и приложение будет открываться на весь экран без рамок браузера!'}
                </span>
              </div>
            </div>

            <button
              onClick={() => setShowIOSGuide(false)}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-2.5 rounded-xl cursor-pointer"
            >
              {lang === 'ky' ? 'Түшүнүктүү' : 'Понятно'}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
