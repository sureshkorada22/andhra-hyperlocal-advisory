import React, { useState, useEffect } from 'react';
import { Language } from '../../types';
import { translations } from '../../i18n/translations';
import { formatIndianCurrency } from '../../services/financialEngine';
import { Wallet, HelpCircle, Sparkles, Check, Info } from 'lucide-react';

interface MarginInputStepProps {
  language: Language;
  marginCapital: number;
  onMarginChange: (amount: number) => void;
}

const PRESET_AMOUNTS = [10000, 14000, 20000, 100000, 500000];

export const MarginInputStep: React.FC<MarginInputStepProps> = ({
  language,
  marginCapital,
  onMarginChange,
}) => {
  const t = translations[language];
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const [customInputValue, setCustomInputValue] = useState<string>(
    PRESET_AMOUNTS.includes(marginCapital) ? '' : marginCapital > 0 ? marginCapital.toString() : ''
  );
  const [isCustomMode, setIsCustomMode] = useState<boolean>(
    !PRESET_AMOUNTS.includes(marginCapital)
  );

  useEffect(() => {
    if (!PRESET_AMOUNTS.includes(marginCapital)) {
      setIsCustomMode(true);
      setCustomInputValue(marginCapital > 0 ? marginCapital.toString() : '');
    } else {
      setIsCustomMode(false);
      setCustomInputValue('');
    }
  }, [marginCapital]);

  const handleSelectPreset = (amt: number) => {
    setIsCustomMode(false);
    setCustomInputValue('');
    onMarginChange(amt);
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, '');
    setCustomInputValue(raw);
    const parsed = parseInt(raw, 10);
    if (!isNaN(parsed) && parsed >= 0) {
      onMarginChange(parsed);
    } else if (raw === '') {
      onMarginChange(0);
    }
  };

  const approxCost = marginCapital > 0 ? marginCapital * 10 : 0;
  const approxLoan = marginCapital > 0 ? Math.round(approxCost * 0.90) : 0;

  return (
    <div className="card-3d-surface p-6 sm:p-8 relative overflow-hidden">
      {/* Step Header */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center font-black text-lg shadow-md border-b-[3px] border-emerald-800">
            1
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                Available Margin Capital
              </h2>
              {/* Info Tooltip Icon */}
              <button
                type="button"
                onClick={() => setShowTooltip(!showTooltip)}
                className="text-slate-400 hover:text-emerald-600 transition-colors cursor-pointer"
                title="Financial Terminology Tooltip"
              >
                <HelpCircle className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs sm:text-sm text-emerald-800 font-semibold mt-1">
              Your available margin capital represents your contribution toward the total project cost.
            </p>
          </div>
        </div>

        {/* Current Active Margin Indicator */}
        <div className="hidden sm:flex flex-col items-end shrink-0">
          <span className="text-2xs font-bold text-slate-400 uppercase tracking-wider">
            Current Margin
          </span>
          <span className="text-lg font-black text-emerald-700 font-mono">
            {formatIndianCurrency(marginCapital)}
          </span>
        </div>
      </div>

      {/* Tooltip / Terminology Explanation Banner */}
      {showTooltip && (
        <div className="mb-4 p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-xs text-emerald-950 flex items-start gap-2.5 animate-in fade-in duration-200">
          <Info className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-bold">What is Margin Capital?</p>
            <p className="leading-relaxed text-slate-700">
              Margin capital is the entrepreneur&apos;s own equity/seed savings required upfront before bank loan disbursement. Under the SIH 2026 financial model, the beneficiary contribution is exactly 10%, while 90% is supported through institutional concessional loan financing.
            </p>
          </div>
        </div>
      )}

      {/* Preset Amount Badges including SIH Test Cases */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 mb-4">
        {PRESET_AMOUNTS.map((amt) => {
          const isSelected = !isCustomMode && marginCapital === amt;
          const label = formatIndianCurrency(amt);
          let note = 'Custom';
          if (amt === 10000) note = 'Case 1 (Micro)';
          else if (amt === 14000) note = 'Case 2 (Micro Cap)';
          else if (amt === 20000) note = 'Case 3 (Term Loan)';
          else if (amt === 100000) note = 'SIH Standard (₹1L)';
          else if (amt === 500000) note = 'Case 5 (₹50L Cap)';

          return (
            <button
              key={amt}
              type="button"
              onClick={() => handleSelectPreset(amt)}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer relative ${
                isSelected
                  ? 'bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-600 ring-2 ring-emerald-500/20 shadow-sm border-b-[3px] border-b-emerald-700'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/80'
              }`}
            >
              {isSelected && (
                <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                  <Check className="w-2.5 h-2.5" />
                </div>
              )}
              <div className="text-sm font-black text-slate-900 font-mono">
                {label}
              </div>
              <div className="text-3xs font-semibold text-slate-500 mt-0.5 truncate">
                {note}
              </div>
            </button>
          );
        })}

        {/* Custom Mode Toggle Button */}
        <button
          type="button"
          onClick={() => setIsCustomMode(true)}
          className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
            isCustomMode
              ? 'bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-600 ring-2 ring-emerald-500/20 shadow-sm border-b-[3px] border-b-emerald-700'
              : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/80'
          }`}
        >
          <div className="text-sm font-black text-slate-900">
            Custom
          </div>
          <div className="text-3xs font-semibold text-slate-500 mt-0.5">
            + Any Amount
          </div>
        </button>
      </div>

      {/* Custom Input Field */}
      {isCustomMode && (
        <div className="mt-3 p-4 rounded-xl bg-slate-50 border border-slate-200 animate-in fade-in duration-200">
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Enter Available Margin Capital (₹)
          </label>
          <div className="relative max-w-md">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base font-black text-slate-400 font-mono">
              ₹
            </span>
            <input
              type="text"
              inputMode="numeric"
              value={customInputValue}
              onChange={handleCustomChange}
              placeholder="e.g. 100000"
              className="w-full pl-8 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl text-base font-black text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-600 shadow-inner"
            />
          </div>
        </div>
      )}

      {/* User-Friendly Simple Language Explanation (SIH Section 9) */}
      <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-md">
        <div className="text-2xs font-extrabold uppercase tracking-widest text-emerald-400 mb-2">
          Plain Language Explanation for Rural Entrepreneurs
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-2.5 rounded-lg bg-white/10">
            <span className="text-3xs text-slate-300 uppercase block font-semibold">You have</span>
            <span className="text-base font-black font-mono text-white">
              {formatIndianCurrency(marginCapital)}
            </span>
          </div>

          <div className="p-2.5 rounded-lg bg-white/10">
            <span className="text-3xs text-slate-300 uppercase block font-semibold">You can plan a project of</span>
            <span className="text-base font-black font-mono text-emerald-300">
              {formatIndianCurrency(approxCost)}
            </span>
          </div>

          <div className="p-2.5 rounded-lg bg-white/10">
            <span className="text-3xs text-slate-300 uppercase block font-semibold">Potential loan component</span>
            <span className="text-base font-black font-mono text-teal-300">
              {formatIndianCurrency(approxLoan)}
            </span>
          </div>

          <div className="p-2.5 rounded-lg bg-emerald-500/20 border border-emerald-400/30">
            <span className="text-3xs text-emerald-200 uppercase block font-black">Why?</span>
            <span className="text-3xs text-emerald-100 font-medium leading-snug">
              Because the SIH model uses: <strong className="text-white">10% beneficiary contribution + 90% concessional loan</strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
