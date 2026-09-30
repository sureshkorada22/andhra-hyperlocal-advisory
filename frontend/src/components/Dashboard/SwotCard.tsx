import React from 'react';
import { SwotMatrix, Language, BudgetFeasibility } from '../../types';
import { translations } from '../../i18n/translations';
import { ShieldCheck, AlertTriangle, Lightbulb, ShieldAlert, IndianRupee, Layers } from 'lucide-react';

interface SwotCardProps {
  language: Language;
  swot: SwotMatrix;
  budgetFeasibility?: BudgetFeasibility;
}

export const SwotCard: React.FC<SwotCardProps> = ({ language, swot, budgetFeasibility }) => {
  const t = translations[language];

  return (
    <div className="card-3d-surface p-6 sm:p-7 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-b from-emerald-100 to-emerald-200 text-emerald-800 flex items-center justify-center border border-emerald-300 border-b-2 border-b-emerald-400 shadow-2xs">
            <ShieldCheck className="w-5 h-5 text-emerald-700 drop-shadow-xs" />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-900 tracking-tight">{t.swotTitle}</h3>
            <p className="text-2xs sm:text-xs text-slate-500 font-semibold">
              Budget-grounded enterprise strengths, weaknesses, opportunities & threats
            </p>
          </div>
        </div>

        {budgetFeasibility && (
          <div className="badge-3d px-3.5 py-1.5 bg-emerald-50 text-emerald-950 border border-emerald-300 text-xs font-black flex items-center gap-1.5 self-start sm:self-auto shadow-2xs">
            <Layers className="w-3.5 h-3.5 text-emerald-600" />
            <span>Scale: {budgetFeasibility.scale_classification}</span>
            <span className="font-mono text-emerald-800">(₹{new Intl.NumberFormat('en-IN').format(budgetFeasibility.margin_capital)})</span>
          </div>
        )}
      </div>

      {budgetFeasibility && (
        <div className="mb-5 p-4 rounded-2xl bg-gradient-to-r from-emerald-50/70 via-teal-50/50 to-white border border-emerald-200/80 shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 text-xs font-bold text-slate-700">
            <span className="text-slate-900 font-black">
              Budget Feasibility Allocation Guide (Module 1 Scope — No Loans):
            </span>
            <span className="text-2xs text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-md font-extrabold">
              Runway: {budgetFeasibility.working_capital_runway}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-2xs font-bold text-center">
            <div className="p-2 rounded-xl bg-white border border-slate-200 shadow-2xs">
              <span className="text-slate-400 block text-3xs uppercase font-extrabold">Equipment & Setup</span>
              <span className="text-slate-900 font-black text-xs font-mono">
                {budgetFeasibility.recommended_allocation.fixed_setup_equipment_pct}%
              </span>
            </div>
            <div className="p-2 rounded-xl bg-white border border-slate-200 shadow-2xs">
              <span className="text-slate-400 block text-3xs uppercase font-extrabold">Initial Stock</span>
              <span className="text-emerald-700 font-black text-xs font-mono">
                {budgetFeasibility.recommended_allocation.initial_inventory_stock_pct}%
              </span>
            </div>
            <div className="p-2 rounded-xl bg-white border border-slate-200 shadow-2xs">
              <span className="text-slate-400 block text-3xs uppercase font-extrabold">Operating Reserve</span>
              <span className="text-teal-700 font-black text-xs font-mono">
                {budgetFeasibility.recommended_allocation.working_capital_buffer_pct}%
              </span>
            </div>
          </div>
          <p className="text-2xs text-slate-500 mt-2 font-medium">
            💡 {budgetFeasibility.capital_assessment}
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Strengths */}
        <div className="p-5 rounded-2xl bg-gradient-to-b from-white to-emerald-50/80 border border-emerald-300 border-b-[3.5px] border-b-emerald-400 shadow-sm hover:-translate-y-0.5 transition-transform">
          <div className="flex items-center gap-2 text-emerald-950 font-black text-sm mb-3">
            <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>{t.strengths}</span>
          </div>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 font-semibold">
            {swot.strengths.map((s, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-600 mt-1.5 shrink-0 shadow-2xs" />
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Weaknesses */}
        <div className="p-5 rounded-2xl bg-gradient-to-b from-white to-amber-50/80 border border-amber-300 border-b-[3.5px] border-b-amber-400 shadow-sm hover:-translate-y-0.5 transition-transform">
          <div className="flex items-center gap-2 text-amber-950 font-black text-sm mb-3">
            <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
            <span>{t.weaknesses}</span>
          </div>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 font-semibold">
            {swot.weaknesses.map((w, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-amber-600 mt-1.5 shrink-0 shadow-2xs" />
                <span>{w}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Opportunities */}
        <div className="p-5 rounded-2xl bg-gradient-to-b from-white to-teal-50/80 border border-teal-300 border-b-[3.5px] border-b-teal-400 shadow-sm hover:-translate-y-0.5 transition-transform">
          <div className="flex items-center gap-2 text-teal-950 font-black text-sm mb-3">
            <Lightbulb className="w-4 h-4 text-teal-700 shrink-0" />
            <span>{t.opportunities}</span>
          </div>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 font-semibold">
            {swot.opportunities.map((o, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-teal-600 mt-1.5 shrink-0 shadow-2xs" />
                <span>{o}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Threats */}
        <div className="p-5 rounded-2xl bg-gradient-to-b from-white to-rose-50/80 border border-rose-300 border-b-[3.5px] border-b-rose-400 shadow-sm hover:-translate-y-0.5 transition-transform">
          <div className="flex items-center gap-2 text-rose-950 font-black text-sm mb-3">
            <ShieldAlert className="w-4 h-4 text-rose-700 shrink-0" />
            <span>{t.threats}</span>
          </div>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 font-semibold">
            {swot.threats.map((th, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-rose-600 mt-1.5 shrink-0 shadow-2xs" />
                <span>{th}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
};
