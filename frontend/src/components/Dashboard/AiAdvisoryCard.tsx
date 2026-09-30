import React, { useState, useEffect } from 'react';
import { AiExplanation, Language } from '../../types';
import { translations } from '../../i18n/translations';
import { Sparkles, Volume2, VolumeX, ShieldCheck, Activity } from 'lucide-react';

interface AiAdvisoryCardProps {
  language: Language;
  explanation: AiExplanation;
}

export const AiAdvisoryCard: React.FC<AiAdvisoryCardProps> = ({
  language,
  explanation,
}) => {
  const t = translations[language];
  const [isPlaying, setIsPlaying] = useState(false);

  const textToRead =
    language === 'te'
      ? (explanation.te || explanation.selected_language_text)
      : language === 'hi'
      ? (explanation.hi || explanation.selected_language_text)
      : (explanation.en || explanation.selected_language_text);

  const handleSpeak = () => {
    if (!('speechSynthesis' in window)) {
      alert("Speech synthesis is not supported on this browser.");
      return;
    }

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(textToRead);
    
    if (language === 'te') {
      utterance.lang = 'te-IN';
    } else if (language === 'hi') {
      utterance.lang = 'hi-IN';
    } else {
      utterance.lang = 'en-IN';
    }

    utterance.rate = 0.92;
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
  };

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [language]);

  return (
    <div className="card-dark card-3d p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-emerald-500/25 text-emerald-300 flex items-center justify-center border border-emerald-400/50 shadow-inner">
            <Sparkles className="w-5 h-5 text-emerald-300" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-black text-white tracking-tight flex items-center gap-2">
              {t.aiAdvisoryHeading}
            </h3>
            <span className="inline-block mt-0.5 px-2.5 py-0.5 rounded-full text-2xs text-emerald-200 font-extrabold uppercase tracking-widest bg-emerald-500/25 border border-emerald-400/30">
              {t.aiAdvisoryLangTag}
            </span>
          </div>
        </div>

        {/* Audio Speech Readout Button */}
        <button
          onClick={handleSpeak}
          className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-black transition-all shadow-xl active:scale-95 cursor-pointer ${
            isPlaying
              ? 'bg-rose-500 text-white hover:bg-rose-600 ring-4 ring-rose-400/40 animate-pulse'
              : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black shadow-emerald-500/30'
          }`}
        >
          {isPlaying ? (
            <>
              <VolumeX className="w-4 h-4 text-white animate-pulse" />
              <span>{t.audioStop}</span>
              <Activity className="w-3.5 h-3.5 text-rose-200 animate-pulse ml-1" />
            </>
          ) : (
            <>
              <Volume2 className="w-4 h-4 text-slate-950" />
              <span>{t.audioListen}</span>
            </>
          )}
        </button>
      </div>

      {/* Crystal Clear High-Contrast Advisory Text */}
      <div className="relative z-10 text-sm sm:text-base leading-relaxed text-white font-normal bg-black/45 p-5 sm:p-6 rounded-2xl border border-emerald-400/30 shadow-inner backdrop-blur-sm">
        <p className="text-slate-100 font-medium tracking-normal leading-relaxed selection:bg-emerald-400 selection:text-black">
          {textToRead}
        </p>
      </div>

      <div className="mt-4 pt-3.5 border-t border-emerald-500/20 flex items-center gap-2 text-xs text-emerald-200/85 relative z-10 font-semibold">
        <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
        <span>{t.aiRuleNotice}</span>
      </div>
    </div>
  );
};
