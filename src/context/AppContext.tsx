import React, { createContext, useContext, useEffect, useState } from 'react';
import { initialProblems } from '../data/mockData';
import { translations, Language } from '../locales/translations';
import {
  CategoryId,
  ProblemItem,
  ProblemStatus,
  RegionId,
  StatusHistoryEntry,
} from '../types';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning';
}

interface UserProfile {
  name: string;
  region: RegionId;
  language: Language;
  volunteerScore: number;
  confirmedCount: number;
}

interface AppContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: typeof translations['ky'];
  isModerator: boolean;
  setIsModerator: (val: boolean) => void;
  
  problems: ProblemItem[];
  addNewProblem: (item: Omit<ProblemItem, 'id' | 'createdAt' | 'status' | 'statusHistory' | 'confirmationsCount' | 'confirmedByUserIds'>) => ProblemItem;
  updateProblemStatus: (
    problemId: string,
    newStatus: ProblemStatus,
    note: string,
    agencyName?: string,
    officialText?: string,
    docNumber?: string,
    photoAfterUrl?: string
  ) => void;
  confirmProblem: (problemId: string) => void;

  // Navigation & Modals
  activeTab: string;
  setActiveTab: (tab: string) => void;
  activeProblemModal: ProblemItem | null;
  setActiveProblemModal: (problem: ProblemItem | null) => void;
  isCreateOpen: boolean;
  setIsCreateOpen: (val: boolean) => void;
  isAiOpen: boolean;
  setIsAiOpen: (val: boolean) => void;
  isProfileOpen: boolean;
  setIsProfileOpen: (val: boolean) => void;
  isQrOpen: boolean;
  setIsQrOpen: (val: boolean) => void;

  // Filters
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: CategoryId | 'all';
  setSelectedCategory: (cat: CategoryId | 'all') => void;
  selectedRegion: RegionId | 'all';
  setSelectedRegion: (region: RegionId | 'all') => void;
  selectedStatus: ProblemStatus | 'all';
  setSelectedStatus: (status: ProblemStatus | 'all') => void;

  userProfile: UserProfile;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  resetDemoData: () => void;

  toasts: Toast[];
  showToast: (msg: string, type?: 'success' | 'info' | 'warning') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY_PROBLEMS = 'birge_kg_problems_v1';
const STORAGE_KEY_LANG = 'birge_kg_lang_v1';
const STORAGE_KEY_PROFILE = 'birge_kg_profile_v1';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_LANG);
    return (saved === 'ru' || saved === 'ky') ? saved : 'ky';
  });

  const [isModerator, setIsModerator] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('home');
  const [activeProblemModal, setActiveProblemModal] = useState<ProblemItem | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);
  const [isAiOpen, setIsAiOpen] = useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [isQrOpen, setIsQrOpen] = useState<boolean>(false);

  // Filters
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>('all');
  const [selectedRegion, setSelectedRegion] = useState<RegionId | 'all'>('all');
  const [selectedStatus, setSelectedStatus] = useState<ProblemStatus | 'all'>('all');

  const [toasts, setToasts] = useState<Toast[]>([]);

  const [userProfile, setUserProfileState] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PROFILE);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    return {
      name: 'Бекболот Касымов',
      region: 'bishkek',
      language: 'ky',
      volunteerScore: 120,
      confirmedCount: 3,
    };
  });

  const [problems, setProblems] = useState<ProblemItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PROBLEMS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      // fallback
    }
    return initialProblems;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PROBLEMS, JSON.stringify(problems));
  }, [problems]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_LANG, lang);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(userProfile));
  }, [userProfile]);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    setUserProfileState(prev => ({ ...prev, language: newLang }));
  };

  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'info') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const addNewProblem = (item: Omit<ProblemItem, 'id' | 'createdAt' | 'status' | 'statusHistory' | 'confirmationsCount' | 'confirmedByUserIds'>) => {
    const newId = 'pr-' + Date.now();
    const dateStr = new Date().toISOString().slice(0, 10);
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newHistoryEntry: StatusHistoryEntry = {
      id: 'h-' + Date.now(),
      status: 'new',
      date: `${dateStr} ${timeStr}`,
      note: lang === 'ky' ? 'Кайрылуу системага катталды жана текшерүүгө жөнөтүлдү' : 'Обращение зарегистрировано и передано на модерацию',
      author: item.authorName || (lang === 'ky' ? 'Жаран' : 'Житель'),
    };

    const created: ProblemItem = {
      ...item,
      id: newId,
      createdAt: dateStr,
      status: 'new',
      statusHistory: [newHistoryEntry],
      confirmationsCount: 1,
      confirmedByUserIds: ['my-user-id'],
    };

    setProblems(prev => [created, ...prev]);
    showToast(
      lang === 'ky'
        ? 'Сиздин кайрылууңуз катталды! Модерациядан кийин картада активдешет.'
        : 'Ваше обращение принято и зарегистрировано со статусом «Новое»!',
      'success'
    );
    return created;
  };

  const updateProblemStatus = (
    problemId: string,
    newStatus: ProblemStatus,
    note: string,
    agencyName?: string,
    officialText?: string,
    docNumber?: string,
    photoAfterUrl?: string
  ) => {
    const dateStr = new Date().toISOString().slice(0, 10);
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setProblems((prev) =>
      prev.map((p) => {
        if (p.id !== problemId) return p;

        const newEntry: StatusHistoryEntry = {
          id: 'h-' + Date.now(),
          status: newStatus,
          date: `${dateStr} ${timeStr}`,
          note: note || `Статус өзгөртүлдү: ${newStatus}`,
          author: isModerator ? (agencyName || 'Модератор БИРГЕ KG') : 'Системалык жаңыртуу',
          agency: agencyName,
          photoAfterUrl: photoAfterUrl || p.imageAfterUrl,
        };

        const updatedOfficial = (agencyName && officialText) ? {
          agency: agencyName,
          responderName: 'Ыйгарым укуктуу өкүл',
          text: officialText,
          responseDate: dateStr,
          docNumber: docNumber || `№ ${Math.floor(100 + Math.random() * 900)}/КР`,
        } : p.officialResponse;

        return {
          ...p,
          status: newStatus,
          statusHistory: [...p.statusHistory, newEntry],
          imageAfterUrl: photoAfterUrl || p.imageAfterUrl,
          officialResponse: updatedOfficial,
        };
      })
    );

    // Update active modal view if currently open
    setActiveProblemModal((curr) => {
      if (!curr || curr.id !== problemId) return curr;
      return {
        ...curr,
        status: newStatus,
        imageAfterUrl: photoAfterUrl || curr.imageAfterUrl,
      };
    });

    showToast(
      lang === 'ky'
        ? `Кайрылуунун абалы «${translations.ky.statuses[newStatus]}» деп өзгөртүлдү!`
        : `Статус обращения обновлен на «${translations.ru.statuses[newStatus]}»!`,
      'success'
    );
  };

  const confirmProblem = (problemId: string) => {
    setProblems((prev) =>
      prev.map((p) => {
        if (p.id !== problemId) return p;
        const already = p.confirmedByUserIds.includes('my-user-id');
        if (already) {
          showToast(
            lang === 'ky' ? 'Сиз бул маселени буга чейин тастыктагансыз!' : 'Вы уже подтверждали эту проблему!',
            'info'
          );
          return p;
        }

        const newConfirmed = [...p.confirmedByUserIds, 'my-user-id'];
        const newCount = p.confirmationsCount + 1;

        // Auto promote from review to confirmed if count reaches threshold
        let updatedStatus = p.status;
        let newHistory = p.statusHistory;
        if (p.status === 'review' && newCount >= 5) {
          updatedStatus = 'confirmed';
          newHistory = [
            ...p.statusHistory,
            {
              id: 'h-' + Date.now(),
              status: 'confirmed',
              date: new Date().toISOString().slice(0, 10),
              note: lang === 'ky' ? `Жергиликтүү ${newCount} жаран маселени тастыктады` : `Подтверждено ${newCount} жителями района`,
              author: 'Жарандар коомчулугу',
            },
          ];
        }

        return {
          ...p,
          confirmationsCount: newCount,
          confirmedByUserIds: newConfirmed,
          status: updatedStatus,
          statusHistory: newHistory,
        };
      })
    );

    setUserProfileState(prev => ({
      ...prev,
      confirmedCount: prev.confirmedCount + 1,
      volunteerScore: prev.volunteerScore + 10,
    }));

    showToast(
      lang === 'ky' ? 'Рахмат! Сиздин тастыктооңуз маселени чечүүгө көмөктөшөт (+10 балл)' : 'Спасибо! Ваш голос подтвердил проблему (+10 баллов)',
      'success'
    );
  };

  const updateUserProfile = (profile: Partial<UserProfile>) => {
    setUserProfileState((prev) => ({ ...prev, ...profile }));
    showToast(lang === 'ky' ? 'Профиль жаңыртылды' : 'Профиль успешно обновлен', 'success');
  };

  const resetDemoData = () => {
    setProblems(initialProblems);
    localStorage.removeItem(STORAGE_KEY_PROBLEMS);
    showToast(lang === 'ky' ? 'Демо маалыматтар калыбына келтирилди' : 'Демо-данные восстановлены', 'info');
  };

  const t = translations[lang];

  return (
    <AppContext.Provider
      value={{
        lang,
        setLang,
        t,
        isModerator,
        setIsModerator,
        problems,
        addNewProblem,
        updateProblemStatus,
        confirmProblem,
        activeTab,
        setActiveTab,
        activeProblemModal,
        setActiveProblemModal,
        isCreateOpen,
        setIsCreateOpen,
        isAiOpen,
        setIsAiOpen,
        isProfileOpen,
        setIsProfileOpen,
        isQrOpen,
        setIsQrOpen,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedRegion,
        setSelectedRegion,
        selectedStatus,
        setSelectedStatus,
        userProfile,
        updateUserProfile,
        resetDemoData,
        toasts,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
