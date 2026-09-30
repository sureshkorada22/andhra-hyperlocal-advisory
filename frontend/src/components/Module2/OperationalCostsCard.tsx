import React, { useState, useEffect, useMemo } from 'react';
import { Language } from '../../types';
import { translations } from '../../i18n/translations';
import {
  FinancialRoadmap,
  OperationalCostItem,
  getDefaultOperationalCosts,
  formatIndianCurrency,
} from '../../services/financialEngine';
import {
  Receipt,
  RotateCcw,
  Sparkles,
  Info,
  CheckCircle2,
} from 'lucide-react';

interface OperationalCostsCardProps {
  language: Language;
  roadmap: FinancialRoadmap;
  businessKey?: string;
  businessName?: string;
  onChange?: (total: number, items: OperationalCostItem[]) => void;
}

export const OperationalCostsCard: React.FC<OperationalCostsCardProps> = ({
  language,
  roadmap,
  businessKey,
  businessName,
  onChange,
}) => {
  const t = translations[language];

  // Initialize operational cost items tailored to the user's selected business domain
  const [items, setItems] = useState<OperationalCostItem[]>(() =>
    getDefaultOperationalCosts(roadmap.totalProjectCost, businessKey)
  );

  // Sync whenever feasible project cost or business key changes
  useEffect(() => {
    const updated = getDefaultOperationalCosts(roadmap.totalProjectCost, businessKey);
    setItems(updated);
    if (onChange) {
      const sum = updated.reduce((acc, curr) => acc + curr.amount, 0);
      onChange(sum, updated);
    }
  }, [roadmap.totalProjectCost, businessKey]);

  // Handle amount change for a category
  const handleAmountChange = (id: string, val: string) => {
    const clean = val.replace(/[^0-9]/g, '');
    const num = parseInt(clean, 10) || 0;
    const updated = items.map((it) =>
      it.id === id ? { ...it, amount: num, isEstimated: false } : it
    );
    setItems(updated);
    if (onChange) {
      const sum = updated.reduce((acc, curr) => acc + curr.amount, 0);
      onChange(sum, updated);
    }
  };

  const handleReset = () => {
    const reset = getDefaultOperationalCosts(roadmap.totalProjectCost, businessKey);
    setItems(reset);
    if (onChange) {
      const sum = reset.reduce((acc, curr) => acc + curr.amount, 0);
      onChange(sum, reset);
    }
  };

  // Compute total operational costs
  const totalOperationalCosts = useMemo(
    () => items.reduce((acc, curr) => acc + curr.amount, 0),
    [items]
  );

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
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                {language === 'te'
                  ? 'కార్యాచరణ ఖర్చులు (Operational Costs)'
                  : language === 'hi'
                  ? 'परिचालन लागत (Operational Costs)'
                  : 'Operational Costs'}
              </h2>
              <span className="badge-3d px-2.5 py-0.5 text-2xs font-black bg-emerald-100 text-emerald-900 border border-emerald-300">
                SIH REQUIREMENT
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-semibold mt-0.5">
              {language === 'te'
                ? 'వ్యాపార నిర్వహణకు అవసరమైన పునరావృత ఖర్చుల అంచనా — మీరు ప్రతి విలువను సవరించవచ్చు.'
                : language === 'hi'
                ? 'व्यवसाय संचालन के लिए आवश्यक आवर्ती लागतें — आप प्रत्येक मान को संपादित कर सकते हैं।'
                : 'Key recurring operating expense categories outline — you can review and edit values.'}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="btn-3d-secondary text-xs py-2 px-3.5 flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
          title="Reset to baseline estimates"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{t.resetBreakdownBtn || 'Reset Estimates'}</span>
        </button>
      </div>

      {/* Guidance Note */}
      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-2.5 mb-5">
        <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <span className="font-bold text-slate-800">
            {language === 'te' ? 'గమనిక:' : language === 'hi' ? 'सूचना:' : 'Guidance:'}{' '}
          </span>
          {language === 'te'
            ? 'ప్రారంభ విలువలు మీ ప్రాజెక్ట్ పరిమాణం ఆధారంగా అంచనా వేయబడ్డాయి ("Estimated" లేబుల్‌తో). మీ వ్యాపార వాస్తవ ఖర్చులను నమోదు చేయండి.'
            : language === 'hi'
            ? 'प्रारंभिक मान परियोजना आकार के आधार पर अनुमानित किए गए हैं ("Estimated" लेबल)। आप वास्तविक अपेक्षित मान दर्ज कर सकते हैं।'
            : 'Initial baseline numbers are projected based on business scale and clearly labeled as Estimated. You can edit any figure to reflect your specific operating needs.'}
        </p>
      </div>

      {/* Operational Costs Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-inner bg-white mb-5">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-black uppercase tracking-wider text-2xs">
              <th className="py-3 px-4">
                {language === 'te' ? 'కార్యాచరణ వ్యయ విభాగం' : language === 'hi' ? 'परिचालन व्यय श्रेणी' : 'Operating Cost Category'}
              </th>
              <th className="py-3 px-4">
                {language === 'te' ? 'స్థితి' : language === 'hi' ? 'स्थिति' : 'Status'}
              </th>
              <th className="py-3 px-4">
                {language === 'te' ? 'అంచనా మొత్తం (₹)' : language === 'hi' ? 'अनुमानित राशि (₹)' : 'Monthly / Recurring Amount (₹)'}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {items.map((row) => {
              const localizedName =
                language === 'te'
                  ? row.name_te
                  : language === 'hi'
                  ? row.name_hi
                  : row.name_en;
              const localizedDesc =
                language === 'te'
                  ? row.notes_te
                  : language === 'hi'
                  ? row.notes_hi
                  : row.notes_en;

              return (
                <tr key={row.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-900">{localizedName}</div>
                    <div className="text-2xs text-slate-400 font-medium">
                      {localizedDesc}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`badge-3d px-2 py-0.5 text-3xs font-extrabold ${
                        row.isEstimated
                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                          : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      }`}
                    >
                      {row.isEstimated ? 'Estimated' : 'User Input'}
                    </span>
                  </td>
                  <td className="py-2.5 px-4">
                    <div className="relative max-w-[200px]">
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
                {language === 'te'
                  ? 'మొత్తం కార్యాచరణ ఖర్చులు'
                  : language === 'hi'
                  ? 'कुल परिचालन लागत'
                  : 'Total Operational Costs'}
              </td>
              <td className="py-3.5 px-4 text-slate-400 text-2xs font-sans">
                {items.length} Categories
              </td>
              <td className="py-3.5 px-4 text-base text-emerald-300 font-black">
                {formatIndianCurrency(totalOperationalCosts)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Summary Footer */}
      <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center justify-between text-xs font-semibold">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            {language === 'te'
              ? `కార్యాచరణ ఖర్చులు విజయవంతంగా లెక్కించబడ్డాయి: ${formatIndianCurrency(totalOperationalCosts)}`
              : language === 'hi'
              ? `परिचालन लागत की गणना पूर्ण: ${formatIndianCurrency(totalOperationalCosts)}`
              : `Total Estimated Operational Costs: ${formatIndianCurrency(totalOperationalCosts)}`}
          </span>
        </div>
        <span className="text-2xs text-emerald-700 font-bold font-mono">
          Reflected in Roadmap
        </span>
      </div>
    </div>
  );
};
