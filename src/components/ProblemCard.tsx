import React from 'react';
import { ProblemItem, ProblemStatus } from '../types';
import { useApp } from '../context/AppContext';
import {
  MapPin,
  Calendar,
  ThumbsUp,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Building,
  Image as ImageIcon,
} from 'lucide-react';

interface ProblemCardProps {
  problem: ProblemItem;
}

export const ProblemCard: React.FC<ProblemCardProps> = ({ problem }) => {
  const { t, lang, confirmProblem, setActiveProblemModal } = useApp();

  const getStatusBadge = (status: ProblemStatus) => {
    switch (status) {
      case 'resolved':
        return {
          bg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
          icon: CheckCircle2,
          label: t.statuses.resolved,
        };
      case 'in_progress':
        return {
          bg: 'bg-amber-100 text-amber-800 border-amber-300',
          icon: Clock,
          label: t.statuses.in_progress,
        };
      case 'forwarded':
        return {
          bg: 'bg-blue-100 text-blue-800 border-blue-300',
          icon: Building,
          label: t.statuses.forwarded,
        };
      case 'confirmed':
        return {
          bg: 'bg-purple-100 text-purple-800 border-purple-300',
          icon: ShieldCheck,
          label: t.statuses.confirmed,
        };
      case 'review':
        return {
          bg: 'bg-orange-100 text-orange-800 border-orange-300',
          icon: Clock,
          label: t.statuses.review,
        };
      case 'rejected':
        return {
          bg: 'bg-rose-100 text-rose-800 border-rose-300',
          icon: Clock,
          label: t.statuses.rejected,
        };
      case 'new':
      default:
        return {
          bg: 'bg-slate-100 text-slate-800 border-slate-300',
          icon: Clock,
          label: t.statuses.new,
        };
    }
  };

  const statusInfo = getStatusBadge(problem.status);
  const StatusIcon = statusInfo.icon;
  const isConfirmedByMe = problem.confirmedByUserIds.includes('my-user-id');

  // Simple stepper progression percent
  const getStepPercent = (status: ProblemStatus) => {
    switch (status) {
      case 'new':
        return 15;
      case 'review':
        return 30;
      case 'confirmed':
        return 50;
      case 'forwarded':
        return 70;
      case 'in_progress':
        return 85;
      case 'resolved':
        return 100;
      case 'rejected':
        return 100;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 flex flex-col group">
      {/* Card Image Banner */}
      <div className="relative h-44 w-full bg-slate-100 overflow-hidden cursor-pointer" onClick={() => setActiveProblemModal(problem)}>
        <img
          src={problem.imageUrl}
          alt={problem.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        {/* Category Pill Tag */}
        <div className="absolute top-3 left-3">
          <span className="bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-xs">
            {t.categories[problem.category]}
          </span>
        </div>

        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          <span
            className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full border backdrop-blur-md ${statusInfo.bg}`}
          >
            <StatusIcon className="w-3.5 h-3.5" />
            <span>{statusInfo.label}</span>
          </span>
        </div>

        {/* Before / After Tag if resolved */}
        {problem.status === 'resolved' && problem.imageAfterUrl && (
          <div className="absolute bottom-2 right-2 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs flex items-center gap-1">
            <ImageIcon className="w-3 h-3" />
            <span>{lang === 'ky' ? 'Чечилди: Сүрөтү бар' : 'Результат До/После'}</span>
          </div>
        )}
      </div>

      {/* Progress tracker bar */}
      <div className="w-full bg-slate-100 h-1.5">
        <div
          className={`h-full transition-all duration-500 ${
            problem.status === 'resolved'
              ? 'bg-emerald-500'
              : problem.status === 'rejected'
              ? 'bg-rose-500'
              : 'bg-red-500'
          }`}
          style={{ width: `${getStepPercent(problem.status)}%` }}
        ></div>
      </div>

      {/* Content Area */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Location details */}
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 mb-2">
            <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
            <span className="truncate">
              {t.regions[problem.region]}, {problem.villageOrStreet}
            </span>
          </div>

          {/* Title */}
          <h3
            onClick={() => setActiveProblemModal(problem)}
            className="font-bold text-slate-900 text-base leading-snug hover:text-red-600 transition-colors cursor-pointer line-clamp-2"
          >
            {problem.title}
          </h3>

          {/* Description Excerpt */}
          <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
            {problem.description}
          </p>

          {/* Official Agency mention if forwarded or answered */}
          {problem.officialResponse && (
            <div className="mt-3 p-2 rounded-lg bg-blue-50/80 border border-blue-100 text-[11px] text-blue-900 flex items-start gap-1.5">
              <Building className="w-3.5 h-3.5 text-blue-600 mt-0.5 shrink-0" />
              <div className="line-clamp-1">
                <span className="font-semibold">{problem.officialResponse.agency}:</span>{' '}
                <span className="italic">{problem.officialResponse.text}</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer Meta & Actions */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          {/* Created date */}
          <div className="flex items-center gap-1 text-[11px] text-slate-400">
            <Calendar className="w-3 h-3" />
            <span>{problem.createdAt}</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Citizen Confirm Button */}
            <button
              onClick={() => confirmProblem(problem.id)}
              className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer ${
                isConfirmedByMe
                  ? 'bg-red-50 text-red-700 border-red-200 shadow-xs'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900'
              }`}
              title={lang === 'ky' ? 'Маселе бар экенин тастыктоо' : 'Подтвердить существование проблемы'}
            >
              <ThumbsUp className={`w-3.5 h-3.5 ${isConfirmedByMe ? 'fill-red-600 text-red-600' : ''}`} />
              <span>+{problem.confirmationsCount}</span>
            </button>

            {/* View Details Button */}
            <button
              onClick={() => setActiveProblemModal(problem)}
              className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1 p-1 hover:underline cursor-pointer"
            >
              <span>{lang === 'ky' ? 'Толук' : 'Детали'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
