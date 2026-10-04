import React, { useState, useEffect, useRef } from 'react';
import {
  LocationItem,
  Language,
  LocationHierarchyResponse
} from '../../types';
import { translations } from '../../i18n/translations';
import { apiService } from '../../services/api';
import {
  MapPin,
  Search,
  Navigation,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ChevronRight,
  ArrowRight
} from 'lucide-react';

interface LocationStepProps {
  language: Language;
  selectedLocation: LocationItem | null;
  onLocationSelect: (loc: LocationItem) => void;
}

export const LocationStep: React.FC<LocationStepProps> = ({
  language,
  selectedLocation,
  onLocationSelect,
}) => {
  const t = translations[language];

  // Active method: null (initially closed), 'hierarchy', 'search', or 'live_gps'
  const [activeMethod, setActiveMethod] = useState<'hierarchy' | 'search' | 'live_gps' | null>(null);

  // Method 1: Cascading Hierarchy State
  const [hierarchyData, setHierarchyData] = useState<LocationHierarchyResponse | null>(null);
  const [isLoadingHierarchy, setIsLoadingHierarchy] = useState(false);
  const [selectedDistrictName, setSelectedDistrictName] = useState<string>('');
  const [selectedMandalName, setSelectedMandalName] = useState<string>('');
  const [selectedVillageName, setSelectedVillageName] = useState<string>('');

  // Method 2: Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<LocationItem[]>([]);
  const debounceTimerRef = useRef<any>(null);

  // Method 3 (Secondary): Live GPS State
  const [isDetectingGps, setIsDetectingGps] = useState(false);

  // Validation / Feedback Messages
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Load AP administrative hierarchy once in the background
  useEffect(() => {
    let isMounted = true;
    const loadHierarchy = async () => {
      setIsLoadingHierarchy(true);
      try {
        const data = await apiService.getLocationHierarchy();
        if (isMounted && data && data.districts) {
          setHierarchyData(data);
        }
      } catch (err) {
        console.warn("Could not load AP location hierarchy:", err);
      } finally {
        if (isMounted) setIsLoadingHierarchy(false);
      }
    };
    loadHierarchy();
    return () => { isMounted = false; };
  }, []);

  // Derived lists for Method 1 Cascading
  const currentDistrictObj = hierarchyData?.districts.find(d => d.district === selectedDistrictName);
  const currentMandalList = currentDistrictObj ? currentDistrictObj.mandals : [];
  const currentMandalObj = currentMandalList.find(m => m.mandal === selectedMandalName);
  const currentVillageList = currentMandalObj ? currentMandalObj.villages : [];

  // =========================================================================
  // METHOD 1: CASCADING DROPDOWNS
  // =========================================================================
  const handleDistrictChange = (dName: string) => {
    setSelectedDistrictName(dName);
    setSelectedMandalName('');
    setSelectedVillageName('');
    setErrorMessage(null);
  };

  const handleMandalChange = (mName: string) => {
    setSelectedMandalName(mName);
    setSelectedVillageName('');
    setErrorMessage(null);
  };

  const handleVillageChange = (vName: string) => {
    setSelectedVillageName(vName);
    setErrorMessage(null);

    const vObj = currentVillageList.find(v => v.village_or_town === vName);
    if (!vObj) return;

    const locItem: LocationItem = {
      state: "Andhra Pradesh",
      district: selectedDistrictName,
      mandal: selectedMandalName,
      village: vObj.village_or_town,
      village_or_town: vObj.village_or_town,
      latitude: vObj.latitude,
      longitude: vObj.longitude,
      postal_code: vObj.postal_code || "",
      pincode: vObj.postal_code || "",
      location_code: vObj.location_code || "",
      resolved_name: `${vObj.village_or_town}, ${selectedMandalName}, ${selectedDistrictName} District, Andhra Pradesh`,
      source: "hierarchy",
      provider: "AP Official Administrative Registry",
      confidence: 1.0,
      is_demo: false
    };

    onLocationSelect(locItem);
    setActiveMethod(null);
  };

  // =========================================================================
  // METHOD 2: SEARCH LOCATION
  // =========================================================================
  const handleSearchInputChange = (val: string) => {
    setSearchQuery(val);
    setErrorMessage(null);

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    const trimmed = val.trim();
    if (trimmed.length < 2) {
      setSearchResults([]);
      return;
    }

    debounceTimerRef.current = setTimeout(async () => {
      setIsSearching(true);
      try {
        const res = await apiService.geocodeLocation(trimmed);
        if (res.is_ap && res.candidates && res.candidates.length > 0) {
          setSearchResults(res.candidates);
        } else {
          setSearchResults([]);
        }
      } catch (e) {
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 200);
  };

  const handleSelectSearchResult = (cand: LocationItem) => {
    const standardItem: LocationItem = {
      state: "Andhra Pradesh",
      district: cand.district || "Andhra Pradesh",
      mandal: cand.mandal || "",
      village: cand.village_or_town || cand.village || "",
      village_or_town: cand.village_or_town || cand.village || "",
      latitude: cand.latitude,
      longitude: cand.longitude,
      postal_code: cand.postal_code || cand.pincode || "",
      pincode: cand.postal_code || cand.pincode || "",
      location_code: cand.location_code || "",
      resolved_name: cand.resolved_name,
      source: "search",
      provider: cand.provider || "AP Canonical Registry",
      confidence: cand.confidence || 1.0,
      is_demo: false
    };

    onLocationSelect(standardItem);
    setActiveMethod(null);
    setSearchQuery('');
    setSearchResults([]);
    setErrorMessage(null);
  };

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = searchQuery.trim();
    if (!trimmed) return;

    setIsSearching(true);
    setErrorMessage(null);

    try {
      const res = await apiService.geocodeLocation(trimmed);
      if (!res.is_ap) {
        setErrorMessage(
          res.error_message ||
          t.errorOutsideAp ||
          "This application currently supports locations within Andhra Pradesh only."
        );
        return;
      }
      if (res.candidates && res.candidates.length > 0) {
        setSearchResults(res.candidates);
      } else if (res.selected_location) {
        handleSelectSearchResult(res.selected_location);
      } else {
        setErrorMessage(t.errorSearchNotFound || "No matching Andhra Pradesh location found.");
      }
    } catch (err) {
      setErrorMessage("Network error connecting to AP geocoding service.");
    } finally {
      setIsSearching(false);
    }
  };

  // =========================================================================
  // METHOD 3 (SECONDARY): SMALL LIVE GPS OPTION
  // =========================================================================
  const handleStartGps = () => {
    if (!navigator.geolocation) {
      setErrorMessage(t.gpsNotSupported || "Geolocation is not supported by your browser.");
      return;
    }

    setActiveMethod('live_gps');
    setIsDetectingGps(true);
    setErrorMessage(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await apiService.reverseGeocodeLocation(latitude, longitude);
          if (!res.is_ap || !res.success) {
            setErrorMessage(
              res.error_message ||
              t.errorOutsideAp ||
              "This application currently supports locations within Andhra Pradesh only."
            );
            setIsDetectingGps(false);
            return;
          }

          if (res.location) {
            const loc = res.location;
            const villageName = loc.village_or_town || loc.village || "";
            const mandalName = loc.mandal || "";
            const districtName = loc.district || "Andhra Pradesh";

            const standardItem: LocationItem = {
              state: "Andhra Pradesh",
              district: districtName,
              mandal: mandalName,
              village: villageName,
              village_or_town: villageName,
              latitude: loc.latitude,
              longitude: loc.longitude,
              postal_code: loc.postal_code || "",
              pincode: loc.postal_code || "",
              location_code: loc.location_code || "",
              resolved_name: loc.resolved_name || `${villageName ? villageName + ', ' : ''}${mandalName ? mandalName + ', ' : ''}${districtName}, Andhra Pradesh`,
              source: "live_gps",
              provider: loc.provider || "GPS Live Detection",
              confidence: loc.confidence || 1.0,
              is_demo: false,
              undetermined_note: loc.undetermined_note
            };

            // AUTOMATICALLY SELECT LIVE LOCATION IMMEDIATELY:
            // No secondary confirmation needed; chooser UI disappears
            onLocationSelect(standardItem);
            setActiveMethod(null);
            setErrorMessage(null);
          }
        } catch (err) {
          setErrorMessage("Network error connecting to AP geocoding service.");
        } finally {
          setIsDetectingGps(false);
        }
      },
      (error) => {
        setIsDetectingGps(false);
        if (error.code === error.PERMISSION_DENIED) {
          setErrorMessage(
            t.errorGpsDenied ||
            "Location permission was denied. Please select your location manually."
          );
        } else {
          setErrorMessage(
            t.errorGpsUnavailable ||
            "Unable to detect your location. Please use manual selection or search."
          );
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  };

  // Automatically detect and select live location if browser permission was already granted
  useEffect(() => {
    if (!selectedLocation && typeof navigator !== 'undefined' && navigator.geolocation && 'permissions' in navigator) {
      navigator.permissions.query({ name: 'geolocation' }).then((status) => {
        if (status.state === 'granted') {
          handleStartGps();
        }
      }).catch(() => {
        // Permissions API query not supported or blocked, ignore
      });
    }
  }, []);


  // =========================================================================
  // RESET / CHANGE LOCATION HANDLER
  // =========================================================================
  const handleChangeLocation = () => {
    setSelectedDistrictName('');
    setSelectedMandalName('');
    setSelectedVillageName('');
    setSearchQuery('');
    setSearchResults([]);
    setErrorMessage(null);
    setActiveMethod(null);
    onLocationSelect(null as any);
  };

  // =========================================================================
  // RENDER: COMPACT CONFIRMATION CARD (AFTER LOCATION SELECTION)
  // =========================================================================
  if (selectedLocation) {
    const villageName = selectedLocation.village_or_town || selectedLocation.village;
    const mandalName = selectedLocation.mandal;
    const districtName = selectedLocation.district || "Andhra Pradesh";

    return (
      <div className="bg-white rounded-2xl border border-emerald-200/90 shadow-2xs p-5 sm:p-6 relative overflow-hidden">
        {/* Subtle decorative green accent line on the left */}
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-emerald-500" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="pl-1 sm:pl-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 uppercase tracking-wider bg-emerald-50 border border-emerald-200/60 px-2.5 py-1 rounded-md mb-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>
                {selectedLocation.source === 'live_gps'
                  ? (language === 'te' ? '✓ లైవ్ లొకేషన్ ఎంపికైంది' : language === 'hi' ? '✓ लाइव स्थान चुना गया' : '✓ Live Location Selected')
                  : (t.locationSelectedBadge || "✓ Location Selected")}
              </span>
            </div>

            <div className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
              {villageName || (mandalName ? `${mandalName} Mandal` : districtName)}
            </div>

            {villageName && mandalName && (
              <div className="text-sm font-medium text-slate-600 mt-0.5">
                {mandalName} Mandal
              </div>
            )}

            <div className="text-sm font-medium text-slate-500 mt-0.5">
              {districtName} District, Andhra Pradesh
            </div>

            {selectedLocation.latitude && selectedLocation.longitude && (
              <div className="text-xs font-mono text-emerald-700 font-semibold mt-1 flex items-center gap-1.5">
                <span>📍 {selectedLocation.latitude.toFixed(4)}, {selectedLocation.longitude.toFixed(4)}</span>
                {selectedLocation.source === 'live_gps' && (
                  <span className="text-3xs bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-sans font-bold">
                    GPS Live
                  </span>
                )}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={handleChangeLocation}
            className="h-9 px-4 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 hover:border-slate-400 rounded-lg transition-colors cursor-pointer self-start sm:self-center shrink-0 shadow-2xs"
          >
            {t.changeLocationBtn || "Change Location"}
          </button>
        </div>
      </div>
    );
  }

  // =========================================================================
  // RENDER: CLEAN, MINIMAL STEP 1 SELECTION INTERFACE
  // =========================================================================
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-6 sm:p-7 relative overflow-hidden">
      {/* 1. Header and Step Badge */}
      <div className="flex items-start gap-3 mb-5">
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs sm:text-sm shadow-xs shrink-0 mt-0.5">
          1
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug uppercase">
            {t.locationQuestion || "Where do you want to start this business?"}
          </h2>
          <p className="text-sm font-medium text-slate-600 mt-0.5">
            {t.locationSubtitle || "Select a location in Andhra Pradesh"}
          </p>
          <p className="text-xs text-slate-500 font-normal mt-1">
            {t.chooseProvideLocation || "Choose how you want to provide your location"}
          </p>
        </div>
      </div>

      {/* 2. Two Primary Options: Side-by-Side Cards on Desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {/* Card 1: Select Location */}
        <button
          type="button"
          onClick={() => {
            setActiveMethod(activeMethod === 'hierarchy' ? null : 'hierarchy');
            setErrorMessage(null);
          }}
          className={`w-full min-h-[80px] sm:min-h-[86px] rounded-xl px-4 sm:px-5 py-3.5 text-left flex items-center justify-between transition-all duration-200 cursor-pointer ${
            activeMethod === 'hierarchy'
              ? 'bg-emerald-50/70 border-2 border-emerald-600 shadow-xs -translate-y-0.5'
              : 'bg-white hover:bg-slate-50/80 border border-slate-200 hover:border-slate-300 shadow-2xs hover:-translate-y-0.5 hover:shadow-xs'
          }`}
        >
          <div className="flex items-center gap-3.5">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors ${
              activeMethod === 'hierarchy'
                ? 'bg-emerald-100 text-emerald-700'
                : 'bg-slate-100 text-slate-600'
            }`}>
              <MapPin className="w-5 h-5" strokeWidth={2} />
            </div>
            <div>
              <div className={`text-[15px] sm:text-[16px] leading-snug font-semibold ${
                activeMethod === 'hierarchy' ? 'text-emerald-950' : 'text-slate-800'
              }`}>
                {t.locationMethodHierarchy || "Select Location"}
              </div>
              <div className={`text-xs mt-0.5 font-normal ${
                activeMethod === 'hierarchy' ? 'text-emerald-800/80' : 'text-slate-500'
              }`}>
                {t.selectLocationDesc || "District, Mandal, Village/Town"}
              </div>
            </div>
          </div>
          <div className="shrink-0 ml-2">
            <ChevronRight className={`w-4 h-4 transition-transform ${
              activeMethod === 'hierarchy' ? 'rotate-90 text-emerald-700' : 'text-slate-400'
            }`} />
          </div>
        </button>

        {/* Card 2: Search Location */}
        <button
          type="button"
          onClick={() => {
            setActiveMethod(activeMethod === 'search' ? null : 'search');
            setErrorMessage(null);
          }}
          className={`w-full min-h-[80px] sm:min-h-[86px] rounded-xl px-4 sm:px-5 py-3.5 text-left flex items-center justify-between transition-all duration-200 cursor-pointer ${
            activeMethod === 'search'
              ? 'bg-emerald-50/70 border-2 border-emerald-600 shadow-xs -translate-y-0.5'
              : 'bg-white hover:bg-slate-50/80 border border-slate-200 hover:border-slate-300 shadow-2xs hover:-translate-y-0.5 hover:shadow-xs'
          }`}
        >
          <div className="flex items-center gap-3.5">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors ${
              activeMethod === 'search'
                ? 'bg-emerald-100 text-emerald-700'
                : 'bg-slate-100 text-slate-600'
            }`}>
              <Search className="w-5 h-5" strokeWidth={2} />
            </div>
            <div>
              <div className={`text-[15px] sm:text-[16px] leading-snug font-semibold ${
                activeMethod === 'search' ? 'text-emerald-950' : 'text-slate-800'
              }`}>
                {t.locationMethodSearch || "Search Location"}
              </div>
              <div className={`text-xs mt-0.5 font-normal ${
                activeMethod === 'search' ? 'text-emerald-800/80' : 'text-slate-500'
              }`}>
                {t.searchLocationDesc || "Find your location directly"}
              </div>
            </div>
          </div>
          <div className="shrink-0 ml-2">
            <ChevronRight className={`w-4 h-4 transition-transform ${
              activeMethod === 'search' ? 'rotate-90 text-emerald-700' : 'text-slate-400'
            }`} />
          </div>
        </button>
      </div>

      {/* 3. Live Location Shortcut */}
      <div className="mt-3.5 flex items-center justify-center">
        <button
          type="button"
          onClick={handleStartGps}
          disabled={isDetectingGps}
          className="text-sm font-bold text-emerald-700 hover:text-emerald-800 transition-colors inline-flex items-center gap-2 cursor-pointer py-1.5 px-4 rounded-xl hover:bg-emerald-50/90 border border-emerald-300/80 bg-emerald-50/40 shadow-2xs disabled:opacity-60"
        >
          {isDetectingGps ? (
            <Loader2 className="w-[18px] h-[18px] animate-spin text-emerald-600" />
          ) : (
            <Navigation className="w-[18px] h-[18px] text-emerald-600" />
          )}
          <span>
            {isDetectingGps
              ? (language === 'te' ? "లైవ్ లొకేషన్ గుర్తిస్తున్నాము..." : language === 'hi' ? "लाइव स्थान खोज रहे हैं..." : "Detecting live location...")
              : (t.useMyCurrentLocation || "Use my current location")}
          </span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* EXPANDED CONTENT: ONLY SELECTED METHOD CONTENT APPEARS BELOW             */}
      {/* ========================================================================= */}

      {/* METHOD 1 CONTENT: SELECT LOCATION HIERARCHY */}
      {activeMethod === 'hierarchy' && (
        <div className="mt-4 p-4 sm:p-5 bg-slate-50/90 rounded-xl border border-slate-200 animate-in fade-in duration-200 space-y-3">
          <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            {language === 'te' ? "మీ లొకేషన్‌ను ఎంచుకోండి" : language === 'hi' ? "अपना स्थान चुनें" : "Select your location"}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* 1. District */}
            <div className="w-full">
              <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                {language === 'te' ? "జిల్లా" : language === 'hi' ? "जिला" : "District"}
              </label>
              <select
                value={selectedDistrictName}
                onChange={(e) => handleDistrictChange(e.target.value)}
                disabled={isLoadingHierarchy}
                className="h-11 sm:h-12 w-full px-3 text-sm font-medium bg-white border border-slate-300 rounded-xl focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none text-slate-900 cursor-pointer shadow-2xs"
              >
                <option value="">{t.selectDistrictPlaceholder || "Select District"}</option>
                {hierarchyData?.districts.map((d, idx) => (
                  <option key={idx} value={d.district}>
                    {d.district}
                  </option>
                ))}
              </select>
            </div>

            {/* 2. Mandal */}
            <div className="w-full">
              <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                {language === 'te' ? "మండలం" : language === 'hi' ? "मंडल" : "Mandal"}
              </label>
              <select
                value={selectedMandalName}
                onChange={(e) => handleMandalChange(e.target.value)}
                disabled={!selectedDistrictName || currentMandalList.length === 0}
                className="h-11 sm:h-12 w-full px-3 text-sm font-medium bg-white border border-slate-300 rounded-xl focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none text-slate-900 disabled:opacity-40 disabled:bg-slate-100 cursor-pointer shadow-2xs"
              >
                <option value="">{t.selectMandalPlaceholder || "Select Mandal"}</option>
                {currentMandalList.map((m, idx) => (
                  <option key={idx} value={m.mandal}>
                    {m.mandal}
                  </option>
                ))}
              </select>
            </div>

            {/* 3. Village / Town / Locality */}
            <div className="w-full">
              <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                {language === 'te' ? "గ్రామం / పట్టణం" : language === 'hi' ? "गांव / कस्बा" : "Village / Town / Locality"}
              </label>
              <select
                value={selectedVillageName}
                onChange={(e) => handleVillageChange(e.target.value)}
                disabled={!selectedMandalName || currentVillageList.length === 0}
                className="h-11 sm:h-12 w-full px-3 text-sm font-medium bg-white border border-slate-300 rounded-xl focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none text-slate-900 disabled:opacity-40 disabled:bg-slate-100 cursor-pointer shadow-2xs"
              >
                <option value="">{t.selectVillagePlaceholder || "Select Village / Town / Locality"}</option>
                {currentVillageList.map((v, idx) => (
                  <option key={idx} value={v.village_or_town}>
                    {v.village_or_town} {v.name_te ? `(${v.name_te})` : ''}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* METHOD 2 CONTENT: SEARCH LOCATION */}
      {activeMethod === 'search' && (
        <div className="mt-4 p-4 sm:p-5 bg-slate-50/90 rounded-xl border border-slate-200 animate-in fade-in duration-200 space-y-2.5">
          <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            {language === 'te' ? "లొకేషన్ శోధించండి" : language === 'hi' ? "स्थान खोजें" : "Search your location"}
          </div>

          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchInputChange(e.target.value)}
              placeholder={language === 'te' ? "గ్రామం, పట్టణం, మండలం లేదా జిల్లాను శోధించండి..." : language === 'hi' ? "गांव, कस्बा, मंडल या जिला खोजें..." : "Search village, town, mandal or district..."}
              className="h-11 sm:h-12 w-full pl-10 pr-10 text-sm font-medium border border-slate-300 rounded-xl focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 outline-none bg-white text-slate-900 shadow-2xs"
            />
            {isSearching && (
              <Loader2 className="w-4 h-4 text-emerald-600 animate-spin absolute right-3.5 top-1/2 -translate-y-1/2" />
            )}
          </form>

          {/* Clean Matching Results List */}
          {searchResults.length > 0 && (
            <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100 max-h-56 overflow-y-auto shadow-2xs">
              {searchResults.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectSearchResult(item)}
                  className="w-full text-left p-3 hover:bg-emerald-50/70 transition-colors flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div>
                      <div className="font-semibold text-slate-900 text-sm group-hover:text-emerald-950">
                        {item.village_or_town || item.village || item.resolved_name.split(',')[0]}
                      </div>
                      <div className="text-xs text-slate-500 font-normal">
                        {item.mandal && `${item.mandal} Mandal, `}{item.district} District, Andhra Pradesh
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-600 shrink-0" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* METHOD 3 CONTENT: LIVE GPS DETECTION */}
      {activeMethod === 'live_gps' && isDetectingGps && (
        <div className="mt-4 p-4 sm:p-5 bg-emerald-50/70 rounded-xl border border-emerald-200 animate-in fade-in duration-200">
          <div className="flex items-center gap-3 text-emerald-900 font-semibold text-sm py-1">
            <Loader2 className="w-5 h-5 animate-spin text-emerald-600 shrink-0" />
            <span>
              {language === 'te'
                ? "మీ లైవ్ లొకేషన్‌ను గుర్తించి స్వయంచాలకంగా ఎంచుకుంటున్నాము..."
                : language === 'hi'
                ? "आपका लाइव स्थान खोजकर स्वतः चुन रहे हैं..."
                : "Detecting and automatically selecting your live location..."}
            </span>
          </div>
        </div>
      )}

      {/* Error Alert */}
      {errorMessage && (
        <div className="mt-3.5 p-3 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-rose-900 text-xs sm:text-sm font-medium animate-in fade-in">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
};
