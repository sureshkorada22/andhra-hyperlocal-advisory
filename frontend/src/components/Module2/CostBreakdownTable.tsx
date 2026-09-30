import React, { useState, useEffect, useMemo } from 'react';
import { Language } from '../../types';
import { translations } from '../../i18n/translations';
import {
  FinancialRoadmap,
  BudgetBreakdownItem,
  getDefaultCostBreakdown,
  formatIndianCurrency,
} from '../../services/financialEngine';
import {
  Receipt,
  RotateCcw,
  AlertCircle,
  CheckCircle2,
  DollarSign,
  TrendingDown,
  Info,
} from 'lucide-react';

interface CostBreakdownTableProps {
  language: Language;
  roadmap: FinancialRoadmap;
  onBreakdownChange?: (total: number, items: BudgetBreakdownItem[]) => void;
}

export const CostBreakdownTable: React.FC<CostBreakdownTableProps> = ({
  language,
  roadmap,
  onBreakdownChange,
}) => {
  const t = translations[language];

  // Initialize breakdown items based on feasible project cost
  const [items, setItems] = useState<BudgetBreakdownItem[]>(() =>
    getDefaultCostBreakdown(roadmap.totalProjectCost)
  );

  // Sync whenever feasible project cost changes
  useEffect(() => {
    const updated = getDefaultCostBreakdown(roadmap.totalProjectCost);
    setItems(updated);
  }, [roadmap.totalProjectCost]);

  // Handle amount change for a category
  const handleAmountChange = (id: string, val: string) => {
    const clean = val.replace(/[^0-9]/g, '');
    const num = parseInt(clean, 10) || 0;
    const updated = items.map((it) => (it.id === id ? { ...it, amount: num } : it));
    setItems(updated);
    if (onBreakdownChange) {
      const sum = updated.reduce((acc, curr) => acc + curr.amount, 0);
      onBreakdownChange(sum, updated);
    }
  };

  const handleReset = () => {
    const reset = getDefaultCostBreakdown(roadmap.totalProjectCost);
    setItems(reset);
    if (onBreakdownChange) {
      const sum = reset.reduce((acc, curr) => acc + curr.amount, 0);
      onBreakdownChange(sum, reset);
    }
  };

  // Compute itemized total
  const itemizedTotal = useMemo(
    () => items.reduce((acc, curr) => acc + curr.amount, 0),
    [items]
  );

  const diff = itemizedTotal - roadmap.totalProjectCost;
  const isExactMatch = Math.abs(diff) < 5;
  const isHigher = diff > 5;
  const isLower = diff < -5;

  if (!roadmap.isValid || roadmap.exceedsLimit) return null;

  return (
    <div className="card-3d-surface p-6 sm:p-8 relative overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center font-black text-lg shadow-md border-b-[3px] border-emerald-800">
            6
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
              {t.businessPlanningTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-semibold mt-0.5">
              {t.businessPlanningSubtitle}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="btn-3d-secondary text-xs py-2 px-3.5 flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
          title="Restore baseline 100% allocation"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{t.resetBreakdownBtn}</span>
        </button>
      </div>

      {/* Editable Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-inner bg-white mb-5">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-black uppercase tracking-wider text-2xs">
              <th className="py-3 px-4">{t.colCategory}</th>
              <th className="py-3 px-4">Proportion</th>
              <th className="py-3 px-4">{t.colEstimatedAmt}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {items.map((row) => {
              const localizedName =
                language === 'te'
                  ? row.category_te
                  : language === 'hi'
                  ? row.category_hi
                  : row.category_en;
              const localizedDesc =
                language === 'te'
                  ? row.description_te
                  : language === 'hi'
                  ? row.description_hi
                  : row.description_en;

              return (
                <tr key={row.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-900">{localizedName}</div>
                    <div className="text-2xs text-slate-400 font-medium">
                      {localizedDesc}
                    </div>
                  </td>
                  <td className="py-3 px-4 font-mono font-semibold text-slate-500">
                    {Math.round(row.defaultPct * 100)}%
                  </td>
                  <td className="py-2.5 px-4">
                    <div className="relative max-w-[180px]">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-mono font-bold">
                        ₹
                      </span>
                      <input
                        type="text"
                        inputMode="numeric"
                        value={new Intl.NumberFormat('en-IN').format(row.amount)}
                        onChange={(e) => handleAmountChange(row.id, e.target.value)}
                        className="w-full pl-7 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="bg-slate-900 text-white font-mono font-black border-t-2 border-slate-950">
              <td className="py-3.5 px-4 font-sans text-xs uppercase tracking-wider text-emerald-300">
                {t.itemizedTotalLabel}
              </td>
              <td className="py-3.5 px-4 text-slate-400">
                {Math.round((itemizedTotal / (roadmap.totalProjectCost || 1)) * 100)}%
              </td>
              <td className="py-3.5 px-4 text-base text-emerald-300 font-black">
                {formatIndianCurrency(itemizedTotal)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Mismatch & Balancing Indicator */}
      <div className="space-y-3">
        {isExactMatch ? (
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 flex items-center gap-2.5 text-xs font-semibold">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>
              {t.budgetMatchedMsg} — Total {formatIndianCurrency(itemizedTotal)} = Available Margin (₹{new Intl.NumberFormat('en-IN').format(roadmap.availableMargin)}) + Loan (₹{new Intl.NumberFormat('en-IN').format(roadmap.maximumLoan)}).
            </span>
          </div>
        ) : isHigher ? (
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs">
            <div className="flex items-center gap-2 font-bold mb-1">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{t.budgetMismatchMsg}</span>
            </div>
            <p className="mt-1 leading-relaxed text-slate-700">
              Your itemized budget total of <span className="font-bold text-slate-900">{formatIndianCurrency(itemizedTotal)}</span> exceeds the 10%-margin feasible cost of <span className="font-bold text-slate-900">{formatIndianCurrency(roadmap.totalProjectCost)}</span> by <span className="font-bold text-amber-700">{formatIndianCurrency(diff)}</span>.
            </p>
            <p className="mt-1.5 text-2xs font-semibold text-amber-800">
              💡 To fund a {formatIndianCurrency(itemizedTotal)} project under the SIH 10% rule, you would need {formatIndianCurrency(Math.round(itemizedTotal * 0.10))} in available margin capital.
            </p>
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-teal-50 border border-teal-300 text-teal-900 text-xs">
            <div className="flex items-center gap-2 font-bold mb-1">
              <Info className="w-4 h-4 text-teal-600 shrink-0" />
              <span>Itemized Budget Is Lower Than Feasible Sizing</span>
            </div>
            <p className="mt-1 leading-relaxed text-slate-700">
              Your itemized budget is <span className="font-bold text-slate-900">{formatIndianCurrency(itemizedTotal)}</span>, which is <span className="font-bold text-teal-700">{formatIndianCurrency(Math.abs(diff))}</span> less than your available capacity of <span className="font-bold text-slate-900">{formatIndianCurrency(roadmap.totalProjectCost)}</span>.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
