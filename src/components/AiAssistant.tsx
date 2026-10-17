import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  X,
  Send,
  FileText,
  Copy,
  Check,
  Bot,
  User,
  Lightbulb,
  Building,
  RefreshCw,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
}

export const AiAssistant: React.FC = () => {
  const { isAiOpen, setIsAiOpen, t, lang, showToast, userProfile } = useApp();

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Official Letter Generator Sub-modal / drawer
  const [showLetterGen, setShowLetterGen] = useState(false);
  const [letterRecipient, setLetterRecipient] = useState(
    lang === 'ky' ? 'Сокулук айыл өкмөтүнүн башчысына' : 'Главе Айыл Окмоту / Мэрии'
  );
  const [letterSender, setLetterSender] = useState(userProfile.name || 'Жаран');
  const [letterAddress, setLetterAddress] = useState(
    lang === 'ky' ? 'Сокулук айылы, Алма-Ата көчөсү 12' : 'с. Сокулук, ул. Алма-Атинская 12'
  );
  const [letterTopic, setLetterTopic] = useState(
    lang === 'ky' ? 'Сугат суусун камсыздоо жана арыктарды калыбына келтирүү жөнүндө' : 'Об устранении утечки и ремонте поливного канала'
  );

  const initialWelcomeText =
    lang === 'ky'
      ? `Саламатсызбы, ${userProfile.name}! Мен — Кыргызстандын жарандык демилгелер жана көйгөйлөрдү чечүү боюнча санариптик жардамчысы «Бирге AI» болом 🇰🇬.\n\nМага төмөнкү багыттар боюнча кайрылсаңыз болот:\n• Айыл Өкмөтүнө же Мэрияга расмий арыздын текстин даярдоо\n• Сугат суусун үнөмдөө жана капельный полив ыкмалары\n• ОРТ/ЖРТ тесттерине даярдануу жана акысыз курстар\n• Мыйзамсыз таштандылар боюнча кимге кайрылуу керектиги\n• 100 000 сом «Социалдык контракт» гранты жөнүндө маалымат\n\nКандай сурооңуз бар?`
      : `Здравствуйте, ${userProfile.name}! Я — «Бирге AI», цифровой гражданский помощник платформы решений Кыргызстана 🇰🇬.\n\nЯ могу помочь вам:\n• Составить официальное заявление в Мэрию или Айыл Окмоту по закону КР\n• Подобрать методы экономии поливной воды и контакты АВП\n• Разобрать сложные темы для подготовки к ОРТ и найти бесплатные уроки\n• Найти проверенные контакты экстренных служб (103, 112) и ЦСМ\n• Узнать об условиях получения безвозмездных 100 000 сомов по Соцконтракту\n\nКакой вопрос вас интересует сегодня?`;

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-init',
      sender: 'ai',
      text: initialWelcomeText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  if (!isAiOpen) return null;

  const handleSend = async (userPrompt?: string) => {
    const textToSend = userPrompt || input.trim();
    if (!textToSend || loading) return;

    const userMsg: ChatMessage = {
      id: 'u-' + Date.now(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: textToSend,
          language: lang,
          context: `User region: ${userProfile.region}, name: ${userProfile.name}`,
        }),
      });

      if (!res.ok) throw new Error('Network error');
      const data = await res.json();

      const aiMsg: ChatMessage = {
        id: 'ai-' + Date.now(),
        sender: 'ai',
        text: data.text || 'Жооп даярдалууда ката кетти.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      // client-side safe fallback
      const fallbackMsg: ChatMessage = {
        id: 'ai-fallback-' + Date.now(),
        sender: 'ai',
        text:
          lang === 'ky'
            ? `Рахмат! Сиздин кайрылууңуз катталды.\n• Суроо боюнча тийиштүү мамлекеттик орган: Жергиликтүү Айыл Өкмөтү же Мэрия.\n• Шашылыш кырдаалдар үчүн расмий байланыш: 112 (ӨКМ), 103 (Тез жардам).\n• Расмий арыз үлгүсүн алуу үчүн жогорудагы «Расмий арыз түзүүчү» баскычын басыңыз.`
            : `Спасибо за ваш вопрос!\n• По данному направлению рекомендуется направить официальное обращение в местный Айыл Окмоту или Мэрию согласно Закону КР «О порядке рассмотрения обращений граждан».\n• Экстренные службы: 112 (МЧС), 103 (Скорая помощь).\n• Нажмите кнопку «Генератор официального заявления» выше, чтобы сформировать готовый документ.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  const copyText = (text: string, id: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedId(id);
      showToast(lang === 'ky' ? 'Текст көчүрүлдү!' : 'Текст скопирован в буфер!', 'success');
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const generatedOfficialLetter =
    lang === 'ky'
      ? `Кимге: ${letterRecipient}
Кимден: ${letterSender}
Дареги: ${letterAddress}
Байланыш телефону: +996 (___) __-__-__

АРЫЗ
(${letterTopic})

Сизге кайрылуумдун себеби: биздин аймактагы ${letterTopic.toLowerCase()} маселеси көптөн бери жергиликтүү тургундарга олуттуу ыңгайсыздык жана кооптуулук жаратып келет.

Кыргыз Республикасынын «Жарандардын кайрылууларын кароо тартиби жөнүндө» Мыйзамынын 8-беренесине ылайык, аталган маселени жеринен текшерип чыгып, аны чечүү боюнча көрүлгөн чаралар тууралуу мыйзамда белгиленген 14 күндүк мөөнөттө жазуу түрүндө расмий жооп берүүңүздү өтүнөм.

Тиркеме: Көйгөйдү тастыктаган фотоматериалдар.

Күнү: ${new Date().toLocaleDateString('ru-RU')} ж.
Колу: ____________ / ${letterSender}`
      : `Кому: ${letterRecipient}
От кого: ${letterSender}
Адрес проживания: ${letterAddress}
Контактный телефон: +996 (___) __-__-__

ЗАЯВЛЕНИЕ
(О принятии мер по вопросу: ${letterTopic})

Обращаюсь к вам по вопросу, вызывающему серьезные неудобства и угрозу безопасности жителей нашего района: ${letterTopic}.

На основании статьи 8 Закона Кыргызской Республики «О порядке рассмотрения обращений граждан», прошу вас провести комиссионную проверку указанного факта, принять меры по устранению проблемы и предоставить официальный письменный ответ в установленный законом 14-дневный срок.

Приложение: Фотоматериалы с фиксацией проблемы.

Дата: ${new Date().toLocaleDateString('ru-RU')} г.
Подпись: ____________ / ${letterSender}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
      <div className="bg-white rounded-3xl max-w-3xl w-full h-[88vh] shadow-2xl border border-slate-200 relative flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-5 sm:px-7 py-4 bg-gradient-to-r from-indigo-700 via-indigo-600 to-violet-700 text-white flex items-center justify-between shrink-0 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-base sm:text-lg">{t.aiBot.title}</h3>
                <span className="text-[10px] uppercase font-bold bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full">
                  AI Кыргызстан
                </span>
              </div>
              <p className="text-[11px] text-indigo-100 line-clamp-1">{t.aiBot.subtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowLetterGen(!showLetterGen)}
              className="text-xs font-bold px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.aiBot.officialLetterGenerator}</span>
            </button>
            <button
              onClick={() => setIsAiOpen(false)}
              className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Official Letter Drawer Panel */}
        {showLetterGen && (
          <div className="bg-amber-50/95 border-b border-amber-200 p-4 sm:p-5 overflow-y-auto max-h-64 space-y-3 shrink-0">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-amber-900 flex items-center gap-1.5 uppercase tracking-wider">
                <Building className="w-4 h-4 text-amber-700" />
                <span>{t.aiBot.officialLetterGenerator}</span>
              </span>
              <button
                onClick={() => copyText(generatedOfficialLetter, 'official-letter')}
                className="flex items-center gap-1 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold px-3 py-1.5 rounded-xl cursor-pointer shadow-xs"
              >
                {copiedId === 'official-letter' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedId === 'official-letter' ? (lang === 'ky' ? 'Көчүрүлдү!' : 'Скопировано!') : (lang === 'ky' ? 'Арызды көчүрүү' : 'Скопировать текст')}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-0.5">Кимге (Адресат):</label>
                <input
                  type="text"
                  value={letterRecipient}
                  onChange={(e) => setLetterRecipient(e.target.value)}
                  className="w-full p-2 rounded-lg border border-slate-300 bg-white"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-0.5">Кимден (Аты-жөнү):</label>
                <input
                  type="text"
                  value={letterSender}
                  onChange={(e) => setLetterSender(e.target.value)}
                  className="w-full p-2 rounded-lg border border-slate-300 bg-white"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-0.5">Дареги:</label>
                <input
                  type="text"
                  value={letterAddress}
                  onChange={(e) => setLetterAddress(e.target.value)}
                  className="w-full p-2 rounded-lg border border-slate-300 bg-white"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-0.5">Маселе (Тема):</label>
                <input
                  type="text"
                  value={letterTopic}
                  onChange={(e) => setLetterTopic(e.target.value)}
                  className="w-full p-2 rounded-lg border border-slate-300 bg-white"
                />
              </div>
            </div>

            <pre className="text-[11px] font-mono bg-white p-3 rounded-xl border border-amber-200 text-slate-800 whitespace-pre-wrap max-h-32 overflow-y-auto">
              {generatedOfficialLetter}
            </pre>
          </div>
        )}

        {/* Chat Message History */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50">
          {messages.map((msg) => {
            const isAi = msg.sender === 'ai';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-2xl ${
                  isAi ? 'mr-auto' : 'ml-auto flex-row-reverse'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                    isAi
                      ? 'bg-gradient-to-br from-indigo-600 to-violet-600 text-white'
                      : 'bg-red-600 text-white'
                  }`}
                >
                  {isAi ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>

                <div
                  className={`relative p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    isAi
                      ? 'bg-white text-slate-800 border border-slate-200 shadow-xs'
                      : 'bg-indigo-600 text-white shadow-xs'
                  }`}
                >
                  <div className="whitespace-pre-line">{msg.text}</div>

                  <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-100 text-[10px] text-slate-400">
                    <span>{msg.timestamp}</span>
                    {isAi && (
                      <button
                        onClick={() => copyText(msg.text, msg.id)}
                        className="hover:text-slate-700 flex items-center gap-1 cursor-pointer"
                      >
                        {copiedId === msg.id ? (
                          <Check className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                        <span>{copiedId === msg.id ? 'Көчүрүлдү' : 'Көчүрүү'}</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {loading && (
            <div className="flex gap-3 max-w-lg mr-auto">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-500 flex items-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin text-indigo-600" />
                <span>{t.aiBot.thinking}</span>
              </div>
            </div>
          )}
        </div>

        {/* Quick prompt buttons */}
        <div className="px-4 py-2 bg-slate-100 border-t border-slate-200 flex gap-2 overflow-x-auto shrink-0 scrollbar-none">
          <span className="text-[11px] font-bold text-slate-500 self-center shrink-0 flex items-center gap-1">
            <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
            {lang === 'ky' ? 'Сунуштар:' : 'Подсказки:'}
          </span>
          {t.aiBot.quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(prompt)}
              className="text-[11px] font-medium bg-white hover:bg-slate-50 text-slate-700 px-3 py-1.5 rounded-xl border border-slate-200 shrink-0 transition-colors cursor-pointer"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-white border-t border-slate-200 shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.aiBot.inputPlaceholder}
              className="flex-1 text-xs sm:text-sm p-3 rounded-2xl border border-slate-300 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 outline-hidden"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all shadow-md shadow-indigo-600/20 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">{t.aiBot.send}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
