import React, { useState } from 'react';
import { Language } from '../../types';
import { translations } from '../../i18n/translations';
import { IndianRupee, ShieldCheck, Sparkles } from 'lucide-react';

interface CapitalStepProps {
  language: Language;
  selectedCapital: number;
  onCapitalChange: (amount: number) => void;
}

const PRESET_CAPITALS = [
  {
    amount: 50000,
    labelKey: 'capital50kLabel',
    descKey: 'capital50kDesc',
    recommended: false,
  },
  {
    amount: 100000,
    labelKey: 'capital100kLabel',
    descKey: 'capital100kDesc',
    recommended: true,
  },
  {
    amount: 200000,
    labelKey: 'capital200kLabel',
    descKey: 'capital200kDesc',
    recommended: false,
  },
];

export const CapitalStep: React.FC<CapitalStepProps> = ({
  language,
  selectedCapital,
  onCapitalChange,
}) => {
  const t = translations[language];
  const isPreset = PRESET_CAPITALS.some((p) => p.amount === selectedCapital);
  const [isCustom, setIsCustom] = useState<boolean>(!isPreset);
  const [customInput, setCustomInput] = useState<string>(
    !isPreset ? String(selectedCapital) : ''
  );

  const handleSelectPreset = (amount: number) => {
    setIsCustom(false);
    onCapitalChange(amount);
  };

  const handleCustomToggle = () => {
    setIsCustom(true);
    if (customInput) {
      const val = parseFloat(customInput);
      if (!isNaN(val) && val >= 10000) {
        onCapitalChange(val);
      }
    }
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, '');
    setCustomInput(raw);
    const val = parseFloat(raw);
    if (!isNaN(val) && val >= 5000 && val <= 5000000) {
      onCapitalChange(val);
    }
  };

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 0,
    }).format(num);
  };

  return (
    <div className="card-3d-surface p-6 sm:p-8 relative overflow-hidden">
      <div className="flex items-center gap-3.5 mb-4">
        <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center font-black text-lg shadow-md border-b-[3px] border-emerald-800">
          3
        </div>
        <div>
          <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
            {t.capitalQuestion}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-semibold">
            {t.capitalSubtitle}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-4">
        {PRESET_CAPITALS.map((preset) => {
          const isSelected = !isCustom && selectedCapital === preset.amount;
          return (
            <button
              key={preset.amount}
              type="button"
              onClick={() => handleSelectPreset(preset.amount)}
              className={`text-left p-4 rounded-2xl transition-all cursor-pointer relative ${
                isSelected
                  ? 'bg-gradient-to-b from-emerald-50 to-emerald-100/90 border-2 border-emerald-500 border-b-[4px] border-emerald-700 shadow-md -translate-y-0.5'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 border-b-[3.5px] border-slate-300 shadow-2xs hover:-translate-y-0.5'
              }`}
            >
              {preset.recommended && (
                <span className="absolute top-2.5 right-2.5 text-3xs font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-600 text-white shadow-2xs flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" />
                  {t.recommendedBadge || 'Recommended'}
                </span>
              )}
              <div className="flex items-center gap-1 text-slate-900 font-black text-lg sm:text-xl font-mono mb-1">
                <span>₹</span>
                <span>{formatCurrency(preset.amount)}</span>
              </div>
              <div className="text-xs font-bold text-slate-800">
                {(t as any)[preset.labelKey] || preset.labelKey}
              </div>
              <div className="text-2xs text-slate-500 font-semibold mt-1">
                {(t as any)[preset.descKey] || preset.descKey}
              </div>
            </button>
          );
        })}
      </div>

      {/* Custom Capital Option */}
      <div className="pt-3 border-t border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCustomToggle}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
              isCustom
                ? 'bg-gradient-to-b from-emerald-500 to-emerald-600 text-white shadow-xs border-b-[3px] border-emerald-800'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 border-b-[2.5px]'
            }`}
          >
            {t.customCapitalBtn || '+ Enter Custom Amount'}
          </button>

          {isCustom && (
            <div className="inline-flex items-center gap-2">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-slate-500 text-sm">
                  ₹
                </span>
                <input
                  type="text"
                  value={customInput}
                  onChange={handleCustomChange}
                  placeholder="150000"
                  className="w-36 pl-7 pr-3 py-2 text-sm font-bold border border-emerald-400 border-b-[3px] border-emerald-600 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none bg-white text-slate-900 shadow-inner font-mono"
                />
              </div>
              <span className="text-xs font-bold text-slate-500">
                (Min ₹10,000)
              </span>
            </div>
          )}
        </div>

        <div className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{t.capitalScopeNotice || 'Module 1 only: Budget-aware feasibility. No loans or EMIs.'}</span>
        </div>
      </div>
    </div>
  );
};
