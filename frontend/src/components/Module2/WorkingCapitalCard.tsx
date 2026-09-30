import React, { useState, useEffect, useMemo } from 'react';
import { Language } from '../../types';
import { translations } from '../../i18n/translations';
import {
  FinancialRoadmap,
  WorkingCapitalItem,
  getDefaultWorkingCapital,
  formatIndianCurrency,
} from '../../services/financialEngine';
import {
  Coins,
  RotateCcw,
  Sparkles,
  Info,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

interface WorkingCapitalCardProps {
  language: Language;
  roadmap: FinancialRoadmap;
  businessKey?: string;
  businessName?: string;
  onChange?: (total: number, items: WorkingCapitalItem[]) => void;
}

export const WorkingCapitalCard: React.FC<WorkingCapitalCardProps> = ({
  language,
  roadmap,
  businessKey,
  businessName,
  onChange,
}) => {
  const t = translations[language];

  // Initialize working capital items tailored to the selected business domain
  const [items, setItems] = useState<WorkingCapitalItem[]>(() =>
    getDefaultWorkingCapital(roadmap.totalProjectCost, businessKey)
  );

  // Sync whenever feasible project cost or business key changes
  useEffect(() => {
    const updated = getDefaultWorkingCapital(roadmap.totalProjectCost, businessKey);
    setItems(updated);
    if (onChange) {
      const sum = updated.reduce((acc, curr) => acc + curr.amount, 0);
      onChange(sum, updated);
    }
  }, [roadmap.totalProjectCost, businessKey]);

  // Handle amount change for an item
  const handleAmountChange = (id: string, val: string) => {
    const clean = val.replace(/[^0-9]/g, '');
    const num = parseInt(clean, 10) || 0;
    const updated = items.map((it) =>
      it.id === id ? { ...it, amount: num } : it
    );
    setItems(updated);
    if (onChange) {
      const sum = updated.reduce((acc, curr) => acc + curr.amount, 0);
      onChange(sum, updated);
    }
  };

  const handleReset = () => {
    const reset = getDefaultWorkingCapital(roadmap.totalProjectCost, businessKey);
    setItems(reset);
    if (onChange) {
      const sum = reset.reduce((acc, curr) => acc + curr.amount, 0);
      onChange(sum, reset);
    }
  };

  const handleClear = () => {
    const cleared = items.map((it) => ({ ...it, amount: 0 }));
    setItems(cleared);
    if (onChange) {
      onChange(0, cleared);
    }
  };

  // Compute total estimated working capital
  const totalWorkingCapital = useMemo(
    () => items.reduce((acc, curr) => acc + curr.amount, 0),
    [items]
  );

  const hasEnteredValues = totalWorkingCapital > 0;

  if (!roadmap.isValid || roadmap.exceedsLimit) return null;

  return (
    <div className="card-3d-surface p-6 sm:p-8 relative overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center font-black text-lg shadow-md border-b-[3px] border-emerald-800">
            7
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                {language === 'te'
                  ? 'వర్కింగ్ క్యాపిటల్ అవసరాలు (Working Capital Requirement)'
                  : language === 'hi'
                  ? 'कार्यशील पूंजी की आवश्यकता (Working Capital Requirement)'
                  : 'Working Capital Requirement'}
              </h2>
              <span className="badge-3d px-2.5 py-0.5 text-2xs font-black bg-emerald-100 text-emerald-900 border border-emerald-300">
                SIH REQUIREMENT
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 font-semibold mt-0.5">
              {language === 'te'
                ? 'వ్యాపార కార్యకలాపాలు ప్రారంభించాక నిరంతర నగదు ప్రవాహం మరియు స్టాక్ నిర్వహణ కోసం అవసరమైన మూలధనం.'
                : language === 'hi'
                ? 'दैनिक व्यवसाय संचालन और इन्वेंटरी चक्र को बनाए रखने के लिए आवश्यक कार्यशील पूंजी।'
                : 'Estimate necessary operational buffer and inventory funds to sustain business cash flow.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={handleReset}
            className="btn-3d-secondary text-xs py-2 px-3 flex items-center gap-1.5 cursor-pointer"
            title="Reset to recommended estimates"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{language === 'te' ? 'రీసెట్' : language === 'hi' ? 'रीसेट' : 'Reset'}</span>
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="btn-3d-secondary text-xs py-2 px-3 flex items-center gap-1.5 cursor-pointer text-slate-500"
            title="Clear all fields"
          >
            <span>{language === 'te' ? 'ఖాళీ చేయండి' : language === 'hi' ? 'साफ़ करें' : 'Clear'}</span>
          </button>
        </div>
      </div>

      {/* Prominent Working Capital Sizing Display */}
      <div className="mb-6 p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-teal-900 via-slate-900 to-emerald-950 text-white shadow-lg border-b-[4px] border-b-teal-950">
        <span className="text-2xs font-extrabold uppercase tracking-widest text-teal-300">
          {language === 'te' ? 'అంచనా వేసిన వర్కింగ్ క్యాపిటల్' : language === 'hi' ? 'अनुमानित कार्यशील पूंजी' : 'Estimated Working Capital'}
        </span>

        {hasEnteredValues ? (
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mt-2">
            <div className="text-3xl sm:text-4xl font-black font-mono text-emerald-300">
              {formatIndianCurrency(totalWorkingCapital)}
            </div>
            <div className="text-xs text-slate-300 font-medium">
              Sum of 5 working capital components
            </div>
          </div>
        ) : (
          <div className="mt-3 p-3.5 rounded-xl bg-white/10 border border-white/20 text-xs text-teal-100 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
            <p className="font-semibold italic">
              {language === 'te'
                ? 'వర్కింగ్ క్యాపిటల్‌ను అంచనా వేయడానికి మీ ఆశించిన నిర్వహణ మరియు ఇన్వెంటరీ అవసరాలను నమోదు చేయండి.'
                : language === 'hi'
                ? 'कार्यशील पूंजी का अनुमान लगाने के लिए अपनी अपेक्षित परिचालन और इन्वेंटरी आवश्यकताओं को दर्ज करें।'
                : 'Enter your expected operating and inventory requirements to estimate working capital.'}
            </p>
          </div>
        )}
      </div>

      {/* 5 Working Capital Categories Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-inner bg-white mb-5">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-black uppercase tracking-wider text-2xs">
              <th className="py-3 px-4">
                {language === 'te' ? 'వర్కింగ్ క్యాపిటల్ భాగం' : language === 'hi' ? 'कार्यशील पूंजी घटक' : 'Working Capital Component'}
              </th>
              <th className="py-3 px-4">
                {language === 'te' ? 'వివరణ' : language === 'hi' ? 'विवरण' : 'Operational Scope'}
              </th>
              <th className="py-3 px-4">
                {language === 'te' ? 'అంచనా మొత్తం (₹)' : language === 'hi' ? 'अनुमानित राशि (₹)' : 'Estimated Amount (₹)'}
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
                  <td className="py-3 px-4 font-bold text-slate-900">
                    {localizedName}
                  </td>
                  <td className="py-3 px-4 text-2xs text-slate-500 font-medium">
                    {localizedDesc}
                  </td>
                  <td className="py-2.5 px-4">
                    <div className="relative max-w-[200px]">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-mono font-bold">
                        ₹
                      </span>
                      <input
                        type="text"
                        inputMode="numeric"
                        placeholder="0"
                        value={row.amount > 0 ? new Intl.NumberFormat('en-IN').format(row.amount) : ''}
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
              <td className="py-3.5 px-4 font-sans text-xs uppercase tracking-wider text-teal-300">
                {language === 'te'
                  ? 'మొత్తం వర్కింగ్ క్యాపిటల్'
                  : language === 'hi'
                  ? 'कुल कार्यशील पूंजी'
                  : 'Total Working Capital Requirement'}
              </td>
              <td className="py-3.5 px-4 text-slate-400 text-2xs font-sans">
                {items.length} Essential Reserve Buffers
              </td>
              <td className="py-3.5 px-4 text-base text-teal-300 font-black">
                {hasEnteredValues ? formatIndianCurrency(totalWorkingCapital) : '₹0'}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Summary Footer */}
      <div className="p-3.5 rounded-xl bg-teal-50 border border-teal-200 text-teal-900 flex items-center justify-between text-xs font-semibold">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
          <span>
            {hasEnteredValues
              ? `${language === 'te' ? 'వర్కింగ్ క్యాపిటల్ విజయవంతంగా పొందుపరచబడింది' : language === 'hi' ? 'कार्यशील पूंजी को रोडमैप में जोड़ा गया' : 'Working Capital buffer ready'}: ${formatIndianCurrency(totalWorkingCapital)}`
              : `${language === 'te' ? 'వర్కింగ్ క్యాపిటల్ నమోదు కాలేదు' : language === 'hi' ? 'कार्यशील पूंजी दर्ज नहीं की गई' : 'Working Capital not yet entered'}`}
          </span>
        </div>
        <span className="text-2xs text-teal-700 font-bold font-mono">
          Reflected in Roadmap
        </span>
      </div>
    </div>
  );
};
