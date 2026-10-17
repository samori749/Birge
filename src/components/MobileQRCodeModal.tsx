import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { useApp } from '../context/AppContext';
import { Smartphone, X, Copy, Check, QrCode, ExternalLink } from 'lucide-react';

interface MobileQRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileQRCodeModal: React.FC<MobileQRCodeModalProps> = ({ isOpen, onClose }) => {
  const { lang, showToast } = useApp();
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);

  // App URL for mobile access
  const appUrl =
    typeof window !== 'undefined'
      ? window.location.origin
      : 'https://ais-pre-gxetz7ascuqbywyqxoipbg-365155239276.asia-northeast1.run.app';

  useEffect(() => {
    if (isOpen) {
      QRCode.toDataURL(appUrl, {
        width: 320,
        margin: 2,
        color: {
          dark: '#0f172a',
          light: '#ffffff',
        },
      })
        .then((url) => setQrDataUrl(url))
        .catch((err) => console.error('QR code error:', err));
    }
  }, [isOpen, appUrl]);

  if (!isOpen) return null;

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(appUrl);
      setCopied(true);
      showToast(lang === 'ky' ? 'Шилтеме көчүрүлдү!' : 'Ссылка скопирована!', 'success');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/75 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto">
          <Smartphone className="w-6 h-6" />
        </div>

        <div>
          <h3 className="text-lg font-extrabold text-slate-900">
            {lang === 'ky' ? 'Телефондон ачуу 📱' : 'Открыть на телефоне 📱'}
          </h3>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            {lang === 'ky'
              ? 'Телефонуңуздун камерасын ушул QR-кодго багыттаңыз — «БИРГЕ KG» дароо смартфонуңузда ачылат!'
              : 'Наведите камеру смартфона на QR-код ниже, чтобы открыть «БИРГЕ KG» прямо на телефоне!'}
          </p>
        </div>

        {/* QR Code Canvas/Image */}
        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 inline-block shadow-inner">
          {qrDataUrl ? (
            <img src={qrDataUrl} alt="QR Code" className="w-56 h-56 mx-auto rounded-xl" />
          ) : (
            <div className="w-56 h-56 flex items-center justify-center text-xs text-slate-400">
              QR-код даярдалууда...
            </div>
          )}
        </div>

        <div className="space-y-2 pt-1">
          <div className="p-2.5 bg-slate-100 rounded-xl text-[11px] font-mono text-slate-700 break-all select-all">
            {appUrl}
          </div>

          <button
            onClick={handleCopy}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-2.5 rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? (lang === 'ky' ? 'Көчүрүлдү!' : 'Скопировано!') : (lang === 'ky' ? 'Шилтемени көчүрүү' : 'Скопировать ссылку')}</span>
          </button>
        </div>

        <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-400">
          {lang === 'ky'
            ? '💡 Телефонго орнотуу: Браузерден «Экранга кошуу» баскычын басыңыз'
            : '💡 Установка: В браузере телефона нажмите «Добавить на главный экран»'}
        </div>
      </div>
    </div>
  );
};
