import React from 'react';
import { Language } from '../../types';
import { translations } from '../../i18n/translations';
import { MapPin, Briefcase, Calculator, Award, ArrowLeft } from 'lucide-react';

interface StepBreadcrumbProps {
  language: Language;
  currentStep: 1 | 2 | 3 | 4;
  onBackToModule1: () => void;
  businessName: string;
  locationName: string;
}

export const StepBreadcrumb: React.FC<StepBreadcrumbProps> = ({
  language,
  currentStep,
  onBackToModule1,
  businessName,
  locationName,
}) => {
  const t = translations[language];

  const steps = [
    { num: 1, label: t.progStep1, icon: MapPin },
    { num: 2, label: t.progStep2, icon: Briefcase },
    { num: 3, label: t.progStep3, icon: Calculator },
    { num: 4, label: t.progStep4, icon: Award },
  ];

  return (
    <div className="card-3d-surface p-4 sm:p-5 mb-6 shadow-md">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Back Button & Context Badge */}
        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={onBackToModule1}
            className="btn-3d-secondary text-xs sm:text-sm py-2 px-3.5 flex items-center gap-1.5 cursor-pointer"
            title="Return to Module 1 Feasibility Results"
          >
            <ArrowLeft className="w-4 h-4 text-emerald-700" />
            <span>{t.backToModule1Btn}</span>
          </button>

          <div className="h-5 w-px bg-slate-200 hidden sm:block" />

          {/* Module 1 Context Carryover */}
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
            <span className="badge-3d px-2.5 py-1 bg-emerald-100 text-emerald-900 border border-emerald-300">
              {businessName}
            </span>
            <span>•</span>
            <span className="text-slate-600 font-semibold truncate max-w-[200px] sm:max-w-xs">
              {locationName}
            </span>
          </div>
        </div>

        {/* 4-Stage Progress Breadcrumb */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 sm:pb-0">
          {steps.map((s, idx) => {
            const isCompleted = s.num < currentStep;
            const isCurrent = s.num === currentStep;
            return (
              <React.Fragment key={s.num}>
                {idx > 0 && (
                  <div
                    className={`w-4 sm:w-6 h-0.5 ${
                      isCompleted ? 'bg-emerald-500' : 'bg-slate-200'
                    }`}
                  />
                )}
                <div
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-2xs sm:text-xs font-bold transition-all ${
                    isCurrent
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-sm'
                      : isCompleted
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  <s.icon className="w-3.5 h-3.5 shrink-0" />
                  <span className="whitespace-nowrap">{s.label}</span>
                </div>
              </React.Fragment>
            );
          })}
        </div>

      </div>
    </div>
  );
};
