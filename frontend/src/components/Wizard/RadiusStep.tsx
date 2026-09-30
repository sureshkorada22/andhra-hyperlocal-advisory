import React from 'react';
import { Language } from '../../types';
import { translations } from '../../i18n/translations';
import { Compass, Loader2 } from 'lucide-react';

interface RadiusStepProps {
  language: Language;
  selectedRadius: number;
  onRadiusChange: (r: number) => void;
  onAnalyze: () => void;
  isLoading: boolean;
  canAnalyze: boolean;
}

// Strict SIH 2026 Module 1 Specification: Keep ONLY 5 km and 10 km
const ALLOWED_RADII = [5, 10];

export const RadiusStep: React.FC<RadiusStepProps> = ({
  language,
  selectedRadius,
  onRadiusChange,
  onAnalyze,
  isLoading,
  canAnalyze,
}) => {
  const t = translations[language];

  // Guarantee selected radius is strictly 5 or 10
  const activeRadius = selectedRadius === 5 ? 5 : 10;

  return (
    <div className="card-3d-surface p-6 sm:p-8 relative overflow-hidden">
      <div className="flex items-center gap-3.5 mb-4">
        <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center font-black text-lg shadow-md border-b-[3px] border-emerald-800">
          3
        </div>
        <div>
          <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
            {language === 'te'
              ? 'స్థానిక మార్కెట్‌ను ఎంత దూరం వరకు విశ్లేషించాలి?'
              : language === 'hi'
              ? 'स्थानीय बाजार का कितनी दूरी तक विश्लेषण करें?'
              : 'How far should we analyze the local market?'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-semibold">
            {language === 'te'
              ? 'SIH నిబంధనల ప్రకారం స్థానిక వినియోగదారుల పరిధి 5–10 కి.మీ. (Strictly 5 KM or 10 KM)'
              : language === 'hi'
              ? 'एसआईएच विनिर्देशों के अनुसार स्थानीय उपभोक्ता आधार 5–10 किमी। (Strictly 5 KM or 10 KM)'
              : 'SIH specification: local consumer base within 5–10 km radius.'}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-6">
        {ALLOWED_RADII.map((r) => {
          const isSel = activeRadius === r;
          const isTen = r === 10;
          return (
            <button
              key={r}
              type="button"
              onClick={() => onRadiusChange(r)}
              className={`px-6 py-3.5 rounded-2xl text-sm font-black transition-all cursor-pointer relative ${
                isSel
                  ? 'bg-gradient-to-b from-emerald-500 to-emerald-600 text-white shadow-md border-b-[3.5px] border-emerald-800 -translate-y-0.5'
                  : 'bg-emerald-50/70 text-emerald-950 hover:text-slate-950 border-2 border-emerald-400/80 border-b-[3.5px] border-emerald-600 shadow-2xs hover:-translate-y-0.5'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-base font-black">{r} KM</span>
                {isTen ? (
                  <span className={`text-3xs font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${
                    isSel ? 'bg-white/25 text-white' : 'bg-emerald-600 text-white'
                  }`}>
                    ★ {language === 'te' ? 'సిఫార్సు చేయబడింది' : language === 'hi' ? 'अनुशंसित' : 'Wider Market (10 KM)'}
                  </span>
                ) : (
                  <span className={`text-3xs font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${
                    isSel ? 'bg-white/25 text-white' : 'bg-teal-600 text-white'
                  }`}>
                    {language === 'te' ? 'సమీప గ్రామాలు' : language === 'hi' ? 'निकटवर्ती' : 'Immediate Base (5 KM)'}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Primary Action Button */}
      <div className="pt-4 border-t border-slate-200/80 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="text-xs font-semibold text-slate-600">
          <span>
            {language === 'te'
              ? `ఎంచుకున్న ${activeRadius} కి.మీ వ్యాసార్థంలో మార్కెట్ పరిధి విశ్లేషణ.`
              : language === 'hi'
              ? `चयनित ${activeRadius} किमी दायरे में बाजार पहुंच का विश्लेषण।`
              : `Market reach analysis within the selected ${activeRadius} km radius.`}
          </span>
        </div>

        <button
          onClick={onAnalyze}
          disabled={!canAnalyze || isLoading}
          className="btn-3d-primary w-full sm:w-auto text-base sm:text-lg py-4 px-9 cursor-pointer"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              <span>{t.analyzingText}</span>
            </>
          ) : (
            <>
              <Compass className="w-5 h-5 mr-2 text-emerald-200" />
              <span>{t.analyzeBtn}</span>
            </>
          )}
        </button>
      </div>

      {!canAnalyze && !isLoading && (
        <p className="text-xs text-amber-800 mt-2 font-semibold">
          {t.incompleteWarning}
        </p>
      )}
    </div>
  );
};
