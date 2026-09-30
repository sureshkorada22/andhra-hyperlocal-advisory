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
import { AiAdvisoryCard } from './components/Dashboard/AiAdvisoryCard';
import { ContributeModal } from './components/Dashboard/ContributeModal';
import { MethodologyModal } from './components/MethodologyModal';
import { FinancialModule } from './components/Module2/FinancialModule';
import { ArrowLeft, PlusCircle, CheckCircle2, Sparkles, ShieldCheck, AlertCircle, RefreshCw, Calculator } from 'lucide-react';

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
    setMarginCapital,
    financialRoadmap,
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
        ) : activeView === 'module2' ? (
          /* Module 2: Continuous Financial Structuring */
          <FinancialModule
            language={language}
            marginCapital={marginCapital}
            onMarginChange={setMarginCapital}
            businessName={getResultBusinessTitle()}
            businessKey={businessKey}
            locationName={locationDisplayName}
            onBackToModule1={backToModule1}
          />
        ) : (
          /* Final Results Dashboard (Module 1) */
          <div className="space-y-6 animate-in fade-in duration-300">
            
            {/* 3D Navigation & Analysis Summary Bar */}
            <div className="card-3d-surface p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 shadow-md">
              <div className="flex items-center gap-2.5 flex-wrap">
                <button
                  onClick={resetAll}
                  className="btn-3d-secondary text-xs sm:text-sm py-2 px-3.5 flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>{t.modifySearchBtn}</span>
                </button>

                <button
                  onClick={goToFinancialPlanning}
                  className="btn-3d-primary text-xs sm:text-sm py-2 px-4 flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Calculator className="w-4 h-4" />
                  <span>{t.continueToFinanceBtn}</span>
                </button>
              </div>

              {/* Compact Analysis Summary */}
              <div className="bg-slate-100/90 rounded-xl p-2.5 sm:px-4 sm:py-2 border border-slate-200 flex items-center gap-2 text-xs flex-wrap text-slate-700">
                <span className="text-3xs font-black uppercase tracking-wider text-slate-500">Analysis Summary:</span>
                <span className="font-black text-slate-900">{getResultBusinessTitle()}</span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-700 font-semibold">{locationDisplayName}</span>
                <span className="text-slate-400">•</span>
                <span className="badge-3d px-2 py-0.5 bg-emerald-100 text-emerald-950 font-black border border-emerald-300">
                  {analysisResult.radius.radius_km} KM
                </span>
                <span className="text-slate-400">•</span>
                <span className="font-medium">Margin: <strong className="text-slate-900">₹{marginCapital.toLocaleString('en-IN')}</strong></span>
                <span className="text-slate-400">•</span>
                <span className="font-medium">Project: <strong className="text-slate-900">₹{financialRoadmap.totalProjectCost.toLocaleString('en-IN')}</strong></span>
                <span className="text-slate-400">•</span>
                <span className="font-medium text-emerald-800">Max Loan: <strong>₹{financialRoadmap.maximumLoan.toLocaleString('en-IN')}</strong></span>
              </div>
            </div>

            {/* 1. Opportunity Score Card */}
            <OpportunityScoreCard
              language={language}
              scoreData={analysisResult.opportunity_score}
              businessName={getResultBusinessTitle()}
              locationName={locationDisplayName}
            />

            {/* 2. Key Metrics Grid */}
            <KeyMetricsGrid
              language={language}
              competitors={analysisResult.competitors}
              demographics={analysisResult.market_reach}
              accessibility={analysisResult.accessibility}
              marketGap={analysisResult.market_gap}
              localSnapshot={analysisResult.local_snapshot}
              businessLandscape={analysisResult.business_landscape}
              dataMode={analysisResult.data_mode}
            />

            {/* 3. AI Natural Language Audio Advisory */}
            <AiAdvisoryCard
              language={language}
              explanation={analysisResult.ai_explanation}
            />

            {/* 4. Interactive Map */}
            <MapSection
              language={language}
              location={analysisResult.location}
              radiusKm={analysisResult.radius.radius_km}
              competitors={analysisResult.competitors}
            />

            {/* 5. Empirical Recharts Visualizations */}
            <ChartsSection
              language={language}
              factors={analysisResult.opportunity_score.factors}
              directCount={analysisResult.competitors.direct_count}
              indirectCount={analysisResult.competitors.indirect_count}
              distanceBins={analysisResult.competitors.distance_distribution}
              threats={analysisResult.threats}
            />

            {/* 6. SWOT Analysis Card */}
            <SwotCard
              language={language}
              swot={analysisResult.swot}
              budgetFeasibility={analysisResult.budget_feasibility}
            />

            {/* 7. Local AP Price Indicators & Valuation Strategy */}
            <PriceIndicatorsCard
              language={language}
              priceIndicators={analysisResult.price_indicators}
              analysisResult={analysisResult}
            />

            {/* 8. Data Confidence Indicator */}
            <DataConfidenceCard
              language={language}
              confidence={analysisResult.data_confidence}
              qualityCoverage={analysisResult.data_quality_coverage}
              normalizedIndicators={analysisResult.normalized_indicators}
            />

            {/* 3D Community Contribution Prompt Banner */}
            <div className="card-dark p-6 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xl">
              <div>
                <h4 className="text-base sm:text-lg font-black text-white drop-shadow-xs">
                  {t.missingBizHeading}
                </h4>
                <p className="text-xs sm:text-sm text-slate-200 mt-1 font-medium">
                  {t.missingBizDesc}
                </p>
              </div>
              <button
                onClick={() => setShowContributeModal(true)}
                className="btn-3d-primary text-xs sm:text-sm py-3 px-6 shrink-0 cursor-pointer"
              >
                <PlusCircle className="w-4 h-4 mr-2" />
                <span>{t.suggestBizBtn}</span>
              </button>
            </div>

            {/* Seamless Transition Banner to Module 2 */}
            <div className="card-3d-hero p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-5 shadow-2xl relative overflow-hidden">
              <div className="relative z-10">
                <span className="badge-3d px-3 py-1 bg-white/20 text-white text-2xs font-black uppercase tracking-wider">
                  {t.module2Tag} • SMART FINANCIAL STRUCTURING
                </span>
                <h3 className="text-xl sm:text-2xl font-black mt-2 tracking-tight">
                  {language === 'te'
                    ? 'వ్యాపార ఆర్థిక ప్రణాళిక మరియు స్కీమ్ ఎంపికకు కొనసాగండి'
                    : language === 'hi'
                    ? 'व्यावसायिक वित्तीय योजना और सरकारी योजना चयन पर आगे बढ़ें'
                    : 'Ready for Financial Structuring & Scheme Routing?'}
                </h3>
                <p className="text-xs sm:text-sm text-emerald-100 mt-1 max-w-xl font-medium leading-relaxed">
                  {language === 'te'
                    ? 'మీ మార్జిన్ నిధుల ఆధారంగా 10% నిష్పత్తిలో మొత్తం ప్రాజెక్ట్ ఖర్చు, 90% ప్రభుత్వ రుణ సహాయం మరియు తిరిగి చెల్లింపుల రోడ్‌మ్యాప్‌ను పొందండి.'
                    : language === 'hi'
                    ? 'अपनी उपलब्ध पूंजी से 10% मार्जिन मॉडल पर कुल परियोजना लागत, 90% संस्थागत ऋण और SIH पुनर्भुगतान अनुसूची देखें।'
                    : 'Convert your hyper-local feasibility findings into an actionable financial roadmap with 10% margin sizing, 90% loan routing, and quarterly repayment schedule.'}
                </p>
              </div>
              <button
                onClick={goToFinancialPlanning}
                className="btn-3d-primary text-sm sm:text-base py-3.5 px-7 shrink-0 flex items-center gap-2 cursor-pointer shadow-xl relative z-10"
              >
                <Calculator className="w-5 h-5" />
                <span>{t.continueToFinanceBtn}</span>
              </button>
            </div>

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
