import React from 'react';
import { Language } from '../types';
import { translations } from '../i18n/translations';
import { MapPin, BookOpen, Globe } from 'lucide-react';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenMethodology: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onLanguageChange,
  onOpenMethodology,
}) => {
  const t = translations[language];

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-30 shadow-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          
          {/* Logo & Title */}
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-700 via-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-lg border-b-[3px] border-emerald-900 ring-2 ring-emerald-500/30 transform hover:-translate-y-0.5 transition-transform">
              <MapPin className="w-6 h-6 text-white drop-shadow-sm" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
                  {t.appTitle}
                </h1>
                <span className="badge-3d px-2.5 py-0.5 text-xs font-black bg-emerald-100 text-emerald-900 border border-emerald-300">
                  {t.stateBadge}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 font-semibold">
                {t.appSubtitle}
              </p>
            </div>
          </div>

          {/* Controls: Sources & Methodology + Language Switcher */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            {/* Methodology Modal Trigger */}
            <button
              onClick={onOpenMethodology}
              className="btn-3d-secondary text-xs sm:text-sm py-2 px-3.5"
            >
              <BookOpen className="w-4 h-4 text-slate-500 mr-1.5 shrink-0" />
              <span>{t.methodologyButton}</span>
            </button>

            {/* 3D Language Selector: strictly ordered తెలుగు | हिन्दी | English */}
            <div className="inline-flex items-center rounded-2xl bg-slate-200/80 p-1 border border-slate-300 shadow-inner">
              <div className="px-2 text-slate-500">
                <Globe className="w-4 h-4" />
              </div>
              <button
                onClick={() => onLanguageChange('te')}
                className={`px-3.5 py-1.5 text-xs sm:text-sm font-black rounded-xl transition-all cursor-pointer ${
                  language === 'te'
                    ? 'bg-gradient-to-b from-emerald-500 to-emerald-600 text-white shadow-md border-b-2 border-emerald-800 -translate-y-0.5'
                    : 'text-slate-700 hover:text-slate-950 hover:bg-white/60'
                }`}
                title="తెలుగులోకి మార్చండి"
              >
                {t.langTelugu}
              </button>
              <button
                onClick={() => onLanguageChange('hi')}
                className={`px-3.5 py-1.5 text-xs sm:text-sm font-black rounded-xl transition-all cursor-pointer ${
                  language === 'hi'
                    ? 'bg-gradient-to-b from-emerald-500 to-emerald-600 text-white shadow-md border-b-2 border-emerald-800 -translate-y-0.5'
                    : 'text-slate-700 hover:text-slate-950 hover:bg-white/60'
                }`}
                title="हिन्दी में बदलें"
              >
                {t.langHindi}
              </button>
              <button
                onClick={() => onLanguageChange('en')}
                className={`px-3.5 py-1.5 text-xs sm:text-sm font-black rounded-xl transition-all cursor-pointer ${
                  language === 'en'
                    ? 'bg-gradient-to-b from-emerald-500 to-emerald-600 text-white shadow-md border-b-2 border-emerald-800 -translate-y-0.5'
                    : 'text-slate-700 hover:text-slate-950 hover:bg-white/60'
                }`}
                title="Switch to English"
              >
                {t.langEnglish}
              </button>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
};
