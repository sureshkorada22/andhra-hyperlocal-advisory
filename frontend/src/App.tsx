import React, { useState, useEffect } from 'react';
import { BusinessProvider, useBusinessContext } from './context/BusinessContext';
import { BusinessCategory, Language } from './types';
import { translations } from './i18n/translations';
import { apiService } from './services/api';
import { Header } from './components/Header';
import { LocationStep } from './components/Wizard/LocationStep';
import { BusinessStep } from './components/Wizard/BusinessStep';
import { RadiusStep } from './components/Wizard/RadiusStep';
import { OpportunityScoreCard } from './components/Dashboard/OpportunityScoreCard';
import { KeyMetricsGrid } from './components/Dashboard/KeyMetricsGrid';
import { MapSection } from './components/Dashboard/MapSection';
import { ChartsSection } from './components/Dashboard/ChartsSection';
import { SwotCard } from './components/Dashboard/SwotCard';
import { PriceIndicatorsCard } from './components/Dashboard/PriceIndicatorsCard';
import { DataConfidenceCard } from './components/Dashboard/DataConfidenceCard';
import { Module1FeasibilityReport } from './components/Dashboard/Module1FeasibilityReport';
import { Module2FinancialStructuring } from './components/Module2/Module2FinancialStructuring';
import { ContributeModal } from './components/Dashboard/ContributeModal';
import { MethodologyModal } from './components/MethodologyModal';
import { ArrowLeft, PlusCircle, CheckCircle2, Sparkles, ShieldCheck, AlertCircle, RefreshCw } from 'lucide-react';

const AppContent: React.FC = () => {
  const [language, setLanguage] = useState<Language>('te');
  const [categories, setCategories] = useState<BusinessCategory[]>([]);
  const [showContributeModal, setShowContributeModal] = useState<boolean>(false);
  const [showMethodologyModal, setShowMethodologyModal] = useState<boolean>(false);

  // Centralized BusinessContext shared state
  const {
    location,
    setLocation,
    business,
    setBusiness,
    radius,
    setRadius,
    analysisResult,
    setAnalysisResult,
    isLoadingAnalysis,
    setIsLoadingAnalysis,
    analysisError,
    setAnalysisError,
    marginCapital,
    activeView,
    setActiveView,
    goToFinancialPlanning,
    backToModule1,
    resetAll,
    getLocalizedBusinessName,
    getFormattedLocationDisplay,
  } = useBusinessContext();

  const t = translations[language];

  // Load business categories on mount
  useEffect(() => {
    const fetchCats = async () => {
      try {
        const cats = await apiService.getCategories();
        setCategories(cats);
      } catch (err) {
        console.error("Failed to fetch business categories:", err);
      }
    };
    fetchCats();
  }, []);

  // Perform Analysis using shared context
  const handleAnalyze = async () => {
    if (!location || !business) return;

    setIsLoadingAnalysis(true);
    setAnalysisError(null);
    try {
      const res = await apiService.analyze(
        location,
        business,
        radius,
        language,
        marginCapital,
        false
      );
      setAnalysisResult(res);
      setActiveView('module1');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error("Analysis execution error:", err);
      const errMsg = language === 'te'
        ? "లొకేషన్ విశ్లేషణ సమయంలో నెట్‌వర్క్ సమస్య ఏర్పడింది. దయచేసి మళ్లీ ప్రయత్నించండి."
        : language === 'hi'
        ? "स्थान विश्लेषण के दौरान नेटवर्क समस्या आई। कृपया पुनः प्रयास करें।"
        : "Network or server timeout during location analysis. Please try again.";
      setAnalysisError(errMsg);
    } finally {
      setIsLoadingAnalysis(false);
    }
  };

  const getResultBusinessTitle = () => {
    return getLocalizedBusinessName(language) || analysisResult?.business?.name || 'Proposed Business';
  };

  const businessKey = business?.category_slug || business?.categorySlug || business?.slug || business?.name || '';
  const locationDisplayName = getFormattedLocationDisplay() || analysisResult?.location.village_or_town || analysisResult?.location.resolved_name || '';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-emerald-500 selection:text-white transition-colors duration-200">
      
      {/* Header with strictly ordered Telugu | Hindi | English selector */}
      <Header
        language={language}
        onLanguageChange={setLanguage}
        onOpenMethodology={() => setShowMethodologyModal(true)}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {!analysisResult ? (
          /* Step-by-Step Configuration Wizard */
          <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-300">
            
            {/* 3D Hero Banner */}
            <div className="card-3d-hero p-7 sm:p-9 text-white relative">
              <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-emerald-400/15 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-400/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="relative z-10">
                <span className="badge-3d px-3.5 py-1 text-xs font-black uppercase tracking-widest bg-emerald-500/30 text-emerald-200 border border-emerald-400/40">
                  <Sparkles className="w-3.5 h-3.5 mr-1.5 text-emerald-300" />
                  {t.heroTag}
                </span>
                
                <h2 className="text-2xl sm:text-3xl font-black mt-3.5 tracking-tight leading-snug drop-shadow-sm">
                  {t.heroTitle}
                </h2>
                <p className="text-sm sm:text-base text-emerald-100 mt-2 max-w-2xl font-medium leading-relaxed drop-shadow-xs">
                  {t.heroSubtitle}
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-3 text-xs font-extrabold text-emerald-100">
                  <div className="badge-3d bg-white/15 px-3.5 py-1.5 border border-white/25 backdrop-blur-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-300 mr-1.5" />
                    <span>{t.heroFeature1}</span>
                  </div>
                  <div className="badge-3d bg-white/15 px-3.5 py-1.5 border border-white/25 backdrop-blur-xs">
                    <ShieldCheck className="w-4 h-4 text-emerald-300 mr-1.5" />
                    <span>{t.heroFeature2}</span>
                  </div>
                  <div className="badge-3d bg-white/15 px-3.5 py-1.5 border border-white/25 backdrop-blur-xs">
                    <Sparkles className="w-4 h-4 text-emerald-300 mr-1.5" />
                    <span>{t.heroFeature3}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 1: Location Input */}
            <LocationStep
              language={language}
              selectedLocation={location}
              onLocationSelect={setLocation}
            />

            {/* Step 2: Business Selection & Custom NLP */}
            <BusinessStep
              language={language}
              categories={categories}
              selectedBusiness={business}
              onBusinessSelect={setBusiness}
            />

            {/* Step 3: Radius & Analysis Execution */}
            <RadiusStep
              language={language}
              selectedRadius={radius}
              onRadiusChange={setRadius}
              onAnalyze={handleAnalyze}
              isLoading={isLoadingAnalysis}
              canAnalyze={Boolean(location && business)}
            />

            {/* Error Notification with Retry */}
            {analysisError && (
              <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/90 border border-amber-300 text-amber-900 flex items-center justify-between gap-4 shadow-sm animate-in fade-in duration-200">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
                  <p className="text-sm font-semibold">{analysisError}</p>
                </div>
                <button
                  onClick={handleAnalyze}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs inline-flex items-center gap-1.5 shrink-0 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>{language === 'te' ? 'మళ్లీ ప్రయత్నించండి' : language === 'hi' ? 'पुनः प्रयास करें' : 'Try Again'}</span>
                </button>
              </div>
            )}

          </div>
        ) : (
          /* Results Stage: Module 1 (Feasibility) & Module 2 (Financial Structuring) */
          <div>
            {/* Active Module View */}
            {activeView === 'module2' ? (
              <Module2FinancialStructuring
                language={language}
                analysisResult={analysisResult}
                locationName={locationDisplayName}
                businessName={getResultBusinessTitle()}
                radiusKm={analysisResult.radius.radius_km}
                onBackToModule1={backToModule1}
                onModifySearch={resetAll}
              />
            ) : (
              <Module1FeasibilityReport
                language={language}
                analysisResult={analysisResult}
                locationName={locationDisplayName}
                businessName={getResultBusinessTitle()}
                radiusKm={analysisResult.radius.radius_km}
                marginCapital={marginCapital}
                onModifySearch={resetAll}
                onProceedToModule2={goToFinancialPlanning}
                onOpenContributeModal={() => setShowContributeModal(true)}
              />
            )}
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-7 text-center text-xs text-slate-500 font-medium">
        <div className="max-w-7xl mx-auto px-4 space-y-1.5">
          <p className="font-bold text-slate-800 text-sm">
            {t.footerTitle}
          </p>
          <p className="text-slate-500">
            {t.footerGeo}
          </p>
        </div>
      </footer>

      {/* Modals */}
      <ContributeModal
        language={language}
        isOpen={showContributeModal}
        onClose={() => setShowContributeModal(false)}
        defaultLocation={analysisResult?.location.resolved_name}
        latitude={analysisResult?.location.latitude}
        longitude={analysisResult?.location.longitude}
      />

      <MethodologyModal
        language={language}
        isOpen={showMethodologyModal}
        onClose={() => setShowMethodologyModal(false)}
      />

    </div>
  );
};

export const App: React.FC = () => {
  return (
    <BusinessProvider>
      <AppContent />
    </BusinessProvider>
  );
};

export default App;
