import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import {
  LocationItem,
  BusinessCategory,
  AnalysisResponse,
  Language,
} from '../types';
import {
  calculateFinancialRoadmap,
  FinancialRoadmap,
  getDefaultOperationalCosts,
  getDefaultWorkingCapital,
  OperationalCostItem,
  WorkingCapitalItem,
  generateRepaymentSchedule,
  RepaymentScheduleItem,
} from '../services/financialEngine';

export interface BusinessEntity {
  slug: string;
  category_slug?: string;
  categorySlug?: string;
  name: string;
  name_en?: string;
  name_te?: string;
  name_hi?: string;
  nameEn?: string;
  nameTe?: string;
  nameHi?: string;
  description?: string;
  isCustom?: boolean;
}

export interface BusinessContextState {
  // Step 1: Location
  location: LocationItem | null;
  setLocation: (loc: LocationItem | null) => void;

  // Step 2: Business
  business: BusinessEntity | null;
  setBusiness: (biz: BusinessEntity | null) => void;

  // Step 3: Radius
  radius: number; // strictly 5 or 10 km
  setRadius: (r: number) => void;

  // Module 1 Analysis State
  analysisResult: AnalysisResponse | null;
  setAnalysisResult: (result: AnalysisResponse | null) => void;
  isLoadingAnalysis: boolean;
  setIsLoadingAnalysis: (loading: boolean) => void;
  analysisError: string | null;
  setAnalysisError: (err: string | null) => void;

  // Module 2 Financial State
  marginCapital: number;
  setMarginCapital: (val: number) => void;
  financialRoadmap: FinancialRoadmap;
  repaymentSchedule: RepaymentScheduleItem[];
  operationalCosts: OperationalCostItem[];
  setOperationalCosts: React.Dispatch<React.SetStateAction<OperationalCostItem[]>>;
  workingCapital: WorkingCapitalItem[];
  setWorkingCapital: React.Dispatch<React.SetStateAction<WorkingCapitalItem[]>>;
  updateOperationalCostItem: (id: string, amount: number) => void;
  updateWorkingCapitalItem: (id: string, amount: number) => void;

  // Journey Navigation
  activeView: 'module1' | 'module2';
  setActiveView: (view: 'module1' | 'module2') => void;
  goToFinancialPlanning: () => void;
  backToModule1: () => void;
  resetAll: () => void;


  // Helper getters for localized display
  getLocalizedBusinessName: (lang: Language) => string;
  getFormattedLocationDisplay: () => string;
}

const BusinessContext = createContext<BusinessContextState | undefined>(undefined);

export const BusinessProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // 1. Location state
  const [location, setLocationInternal] = useState<LocationItem | null>(null);

  // 2. Business state
  const [business, setBusinessInternal] = useState<BusinessEntity | null>(null);

  // 3. Radius state (strictly 5 or 10 km per SIH26091)
  const [radius, setRadiusInternal] = useState<number>(10);

  // 4. Module 1 Analysis result
  const [analysisResult, setAnalysisResult] = useState<AnalysisResponse | null>(null);
  const [isLoadingAnalysis, setIsLoadingAnalysis] = useState<boolean>(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  // 5. Module 2 Financial inputs & plan (default margin capital: ₹1,00,000)
  const [marginCapital, setMarginCapital] = useState<number>(100000);

  // 6. Navigation
  const [activeView, setActiveView] = useState<'module1' | 'module2'>('module1');

  // Deterministic Roadmap based on marginCapital
  const financialRoadmap = useMemo(
    () => calculateFinancialRoadmap(marginCapital),
    [marginCapital]
  );

  // Business key string to pass to operational costs / working capital generators
  const businessDomainKey = useMemo(() => {
    if (!business) return 'general';
    return (
      business.slug ||
      business.category_slug ||
      business.categorySlug ||
      business.name ||
      'general'
    );
  }, [business]);

  // Operational costs items state (re-initialized when projectCost or business changes)
  const [operationalCosts, setOperationalCosts] = useState<OperationalCostItem[]>(() =>
    getDefaultOperationalCosts(financialRoadmap.totalProjectCost, businessDomainKey)
  );

  // Working capital items state (re-initialized when projectCost or business changes)
  const [workingCapital, setWorkingCapital] = useState<WorkingCapitalItem[]>(() =>
    getDefaultWorkingCapital(financialRoadmap.totalProjectCost, businessDomainKey)
  );

  // Synchronize operational costs and working capital whenever projectCost or business changes
  useEffect(() => {
    setOperationalCosts(
      getDefaultOperationalCosts(financialRoadmap.totalProjectCost, businessDomainKey)
    );
    setWorkingCapital(
      getDefaultWorkingCapital(financialRoadmap.totalProjectCost, businessDomainKey)
    );
  }, [financialRoadmap.totalProjectCost, businessDomainKey]);

  // Repayment schedule based on loan, interest rate, tenure, and moratorium from roadmap
  const repaymentSchedule = useMemo(() => {
    if (!financialRoadmap.isValid || financialRoadmap.maximumLoan <= 0) return [];
    const annualRate = financialRoadmap.interestRatePct > 1
      ? financialRoadmap.interestRatePct / 100
      : financialRoadmap.interestRatePct;
    return generateRepaymentSchedule(
      financialRoadmap.maximumLoan,
      annualRate,
      financialRoadmap.tenureYears,
      financialRoadmap.moratoriumMonths,
      'quarterly'
    );
  }, [financialRoadmap]);

  // =========================================================================
  // REQUIREMENT 11: CHANGE LOCATION BEHAVIOUR
  // If the user changes location, invalidate previous location-dependent analysis.
  // =========================================================================
  const setLocation = (newLoc: LocationItem | null) => {
    setLocationInternal(newLoc);
    // Clear old location-dependent analysis results so user sees fresh state
    setAnalysisResult(null);
    setAnalysisError(null);
  };

  // =========================================================================
  // REQUIREMENT 12: CHANGE BUSINESS BEHAVIOUR
  // If the user changes business, invalidate previous business-dependent analysis.
  // =========================================================================
  const setBusiness = (newBiz: BusinessEntity | null) => {
    setBusinessInternal(newBiz);
    // Clear old business-dependent analysis results
    setAnalysisResult(null);
    setAnalysisError(null);
  };

  // =========================================================================
  // REQUIREMENT 13: RADIUS CHANGE BEHAVIOUR
  // If user changes radius (5 km -> 10 km), update radius. Do NOT wipe financial state.
  // =========================================================================
  const setRadius = (newR: number) => {
    const validated = newR === 5 ? 5 : 10;
    setRadiusInternal(validated);
    // If analysis was already executed and radius changes, invalidate result to trigger refresh
    if (analysisResult && analysisResult.radius.radius_km !== validated) {
      setAnalysisResult(null);
    }
  };

  // Editable item handlers for Module 2
  const updateOperationalCostItem = (id: string, amount: number) => {
    setOperationalCosts((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, amount: Math.max(0, amount), isEstimated: false } : item
      )
    );
  };

  const updateWorkingCapitalItem = (id: string, amount: number) => {
    setWorkingCapital((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, amount: Math.max(0, amount) } : item
      )
    );
  };

  // =========================================================================
  // REQUIREMENT 5 & 14: MODULE 1 -> MODULE 2 CONTINUOUS JOURNEY
  // =========================================================================
  const goToFinancialPlanning = () => {
    setActiveView('module2');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // =========================================================================
  // REQUIREMENT 10: BACK BUTTON MUST NOT LOSE INFORMATION
  // =========================================================================
  const backToModule1 = () => {
    setActiveView('module1');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetAll = () => {
    setAnalysisResult(null);
    setActiveView('module1');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  const getLocalizedBusinessName = (lang: Language): string => {
    if (!business) return '';
    if (lang === 'te' && (business.name_te || business.nameTe)) {
      return business.name_te || business.nameTe || '';
    }
    if (lang === 'hi' && (business.name_hi || business.nameHi)) {
      return business.name_hi || business.nameHi || '';
    }
    return business.name_en || business.nameEn || business.name || '';
  };

  const getFormattedLocationDisplay = (): string => {
    if (!location) return '';
    const parts = [
      location.village_or_town || location.village,
      location.mandal,
      location.district,
      location.state || 'Andhra Pradesh',
    ].filter(Boolean);
    if (parts.length > 0) {
      return parts.join(', ');
    }
    return location.resolved_name;
  };

  return (
    <BusinessContext.Provider
      value={{
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
        repaymentSchedule,
        operationalCosts,
        setOperationalCosts,
        workingCapital,
        setWorkingCapital,
        updateOperationalCostItem,
        updateWorkingCapitalItem,
        activeView,
        setActiveView,
        goToFinancialPlanning,
        backToModule1,
        resetAll,
        getLocalizedBusinessName,
        getFormattedLocationDisplay,
      }}
    >
      {children}
    </BusinessContext.Provider>
  );
};

export const useBusinessContext = (): BusinessContextState => {
  const context = useContext(BusinessContext);
  if (!context) {
    throw new Error('useBusinessContext must be used within a BusinessProvider');
  }
  return context;
};
