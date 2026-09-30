import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { BusinessCategory, BusinessIdea, BusinessProfile, Language } from '../../types';
import { translations } from '../../i18n/translations';
import { apiService } from '../../services/api';
import { getBusinessVisual } from '../../services/business_images';
import {
  Sprout, Milk, Utensils, ShoppingCart, Wrench, Hammer,
  Truck, BookOpen, Hotel, Laptop, Leaf, Search, PlusCircle,
  HelpCircle, CheckCircle2, ChevronRight, X, Loader2, Check
} from 'lucide-react';

interface BusinessStepProps {
  language: Language;
  categories: BusinessCategory[];
  selectedBusiness: any | null;
  onBusinessSelect: (biz: any) => void;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  Sprout: <Sprout className="w-5 h-5" />,
  Milk: <Milk className="w-5 h-5" />,
  Utensils: <Utensils className="w-5 h-5" />,
  ShoppingCart: <ShoppingCart className="w-5 h-5" />,
  Wrench: <Wrench className="w-5 h-5" />,
  Hammer: <Hammer className="w-5 h-5" />,
  Truck: <Truck className="w-5 h-5" />,
  BookOpen: <BookOpen className="w-5 h-5" />,
  Hotel: <Hotel className="w-5 h-5" />,
  Laptop: <Laptop className="w-5 h-5" />,
  Leaf: <Leaf className="w-5 h-5" />
};

export const BusinessStep: React.FC<BusinessStepProps> = ({
  language,
  categories,
  selectedBusiness,
  onBusinessSelect,
}) => {
  const t = translations[language];
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchFilter, setSearchFilter] = useState('');
  const [customInput, setCustomInput] = useState('');
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [analyzingNLP, setAnalyzingNLP] = useState(false);
  const [pendingProfile, setPendingProfile] = useState<BusinessProfile | null>(null);

  // Filter ideas based on active category and search filter
  const displayedIdeas: { idea: BusinessIdea; catSlug: string }[] = [];

  categories.forEach((cat) => {
    if (!selectedCategory || cat.slug === selectedCategory) {
      cat.ideas.forEach((idea) => {
        const visual = getBusinessVisual(idea.slug, cat.slug);
        const matches =
          idea.name_en.toLowerCase().includes(searchFilter.toLowerCase()) ||
          idea.name_te.toLowerCase().includes(searchFilter.toLowerCase()) ||
          idea.name_hi.toLowerCase().includes(searchFilter.toLowerCase()) ||
          visual.oneLiner_en.toLowerCase().includes(searchFilter.toLowerCase()) ||
          visual.oneLiner_te.toLowerCase().includes(searchFilter.toLowerCase()) ||
          visual.oneLiner_hi.toLowerCase().includes(searchFilter.toLowerCase());
        if (!searchFilter || matches) {
          displayedIdeas.push({ idea, catSlug: cat.slug });
        }
      });
    }
  });

  const handleSelectIdea = (idea: BusinessIdea, catSlug: string) => {
    const name = language === 'te' ? idea.name_te : language === 'hi' ? idea.name_hi : idea.name_en;
    const visual = getBusinessVisual(idea.slug, catSlug);
    onBusinessSelect({
      slug: idea.slug,
      business_name: name,
      name_en: idea.name_en,
      name_te: idea.name_te,
      name_hi: idea.name_hi,
      category_slug: catSlug,
      image: visual.imageUrl
    });
  };

  const handleCustomSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!customInput.trim()) return;

    setAnalyzingNLP(true);
    try {
      const res = await apiService.understandBusiness(customInput.trim(), selectedCategory || undefined);
      if (res.success && res.profile) {
        setPendingProfile(res.profile);
        if (res.needs_confirmation) {
          setShowConfirmModal(true);
        } else {
          onBusinessSelect(res.profile);
          setShowCustomModal(false);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setAnalyzingNLP(false);
    }
  };

  const handleConfirmProfile = () => {
    if (pendingProfile) {
      onBusinessSelect(pendingProfile);
    }
    setShowConfirmModal(false);
    setShowCustomModal(false);
  };

  // Helper to get localized category name
  const getCatName = (cat: BusinessCategory) => {
    return language === 'te' ? cat.name_te : language === 'hi' ? cat.name_hi : cat.name_en;
  };

  // Helper to get localized business title
  const getSelectedDisplayName = () => {
    if (!selectedBusiness) return '';
    if (language === 'te' && selectedBusiness.name_te) return selectedBusiness.name_te;
    if (language === 'hi' && selectedBusiness.name_hi) return selectedBusiness.name_hi;
    if (selectedBusiness.name_en) return selectedBusiness.name_en;
    return selectedBusiness.business_name;
  };

  return (
    <div className="card-3d-surface p-6 sm:p-8 relative overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center font-black text-lg shadow-md border-b-[3px] border-emerald-800">
            2
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
              {t.businessQuestion}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-semibold">
              {t.businessNotice}
            </p>
          </div>
        </div>

        {/* Custom Business Button */}
        <button
          onClick={() => setShowCustomModal(true)}
          className="btn-3d-secondary text-xs sm:text-sm py-2 px-4 self-start sm:self-auto cursor-pointer"
        >
          <PlusCircle className="w-4 h-4 mr-1.5 text-emerald-600" />
          <span>{t.customBusinessBtn}</span>
        </button>
      </div>

      {/* Selected Business Highlight */}
      {selectedBusiness && (
        <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border border-emerald-300 border-b-[3.5px] border-b-emerald-400/80 flex items-center justify-between text-emerald-950 shadow-sm">
          <div className="flex items-center gap-3.5">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 drop-shadow-xs" />
            <div>
              <span className="text-2xs font-extrabold text-emerald-700 uppercase tracking-widest">
                {t.selectedBusinessLabel}
              </span>
              <div className="text-base sm:text-lg font-black text-slate-900">
                {getSelectedDisplayName()}
              </div>
            </div>
          </div>
          <span className="badge-3d text-xs font-black px-3.5 py-1 bg-emerald-200 text-emerald-950 border border-emerald-400">
            {selectedBusiness.category_slug}
          </span>
        </div>
      )}

      {/* Search Input */}
      <div className="relative mb-5">
        <Search className="w-5 h-5 text-emerald-600 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none drop-shadow-xs" />
        <input
          type="text"
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
          placeholder={t.searchIdeasPlaceholder}
          className="w-full pl-12 pr-4 py-3.5 text-sm sm:text-base border border-slate-300 border-b-[3px] border-b-slate-400/80 rounded-2xl focus:ring-3 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none transition-all shadow-inner bg-white text-slate-900 font-semibold"
        />
      </div>

      {/* Category Pills with Smooth Responsive Horizontal Scroll */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-3 mb-5 scrollbar-thin pt-1 px-0.5">
        <button
          type="button"
          onClick={() => setSelectedCategory(null)}
          className={`flex-shrink-0 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black whitespace-nowrap transition-all cursor-pointer ${
            selectedCategory === null
              ? 'bg-gradient-to-b from-emerald-600 to-emerald-700 text-white shadow-md border-b-[3.5px] border-emerald-900 -translate-y-0.5 ring-2 ring-emerald-500/30'
              : 'bg-white text-slate-700 hover:text-slate-950 border border-slate-300 border-b-[3px] border-slate-300 shadow-2xs hover:-translate-y-0.5'
          }`}
        >
          {t.allCategories} ({categories.length})
        </button>
        {categories.map((cat) => {
          const isSel = selectedCategory === cat.slug;
          return (
            <button
              key={cat.slug}
              type="button"
              onClick={() => setSelectedCategory(isSel ? null : cat.slug)}
              className={`flex-shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black whitespace-nowrap transition-all cursor-pointer ${
                isSel
                  ? 'bg-gradient-to-b from-emerald-600 to-emerald-700 text-white shadow-md border-b-[3.5px] border-emerald-900 -translate-y-0.5 ring-2 ring-emerald-500/30'
                  : 'bg-white text-slate-700 hover:text-slate-950 border border-slate-300 border-b-[3px] border-slate-300 shadow-2xs hover:-translate-y-0.5'
              }`}
            >
              <span className="opacity-90">{ICON_MAP[cat.icon] || <Sprout className="w-4 h-4" />}</span>
              <span>{getCatName(cat)}</span>
            </button>
          );
        })}
      </div>

      {/* Ideas Grid with Rich Visual 3D Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[520px] overflow-y-auto pr-1.5 scrollbar-thin">
        {displayedIdeas.map(({ idea, catSlug }, idx) => {
          const isSelected =
            selectedBusiness?.slug === idea.slug ||
            selectedBusiness?.name_en === idea.name_en;
          const displayName = language === 'te' ? idea.name_te : language === 'hi' ? idea.name_hi : idea.name_en;
          const visual = getBusinessVisual(idea.slug, catSlug);
          const oneLiner = language === 'te' ? visual.oneLiner_te : language === 'hi' ? visual.oneLiner_hi : visual.oneLiner_en;

          return (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelectIdea(idea, catSlug)}
              className={`text-left rounded-2xl overflow-hidden flex flex-col justify-between group cursor-pointer transition-all duration-200 border ${
                isSelected
                  ? 'tile-3d-selected ring-2 ring-emerald-500 shadow-md border-emerald-400 -translate-y-0.5'
                  : 'tile-3d hover:border-emerald-300 hover:-translate-y-0.5'
              }`}
            >
              {/* Card Image Header (4:3 aspect ratio) - Clean without category overlay */}
              <div className="relative w-full aspect-[4/3] bg-slate-100 overflow-hidden">
                <img
                  src={visual.imageUrl}
                  alt={displayName}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=600&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10 pointer-events-none" />

                {/* Selection Checkmark Badge */}
                {isSelected && (
                  <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg border-2 border-white animate-in zoom-in-50 duration-150">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-3.5 flex flex-col justify-between flex-1 bg-white/95">
                <div>
                  <div className="flex items-start justify-between gap-1">
                    <div className={`font-black text-sm sm:text-base leading-snug ${isSelected ? 'text-emerald-950' : 'text-slate-900 group-hover:text-emerald-700'}`}>
                      {displayName}
                    </div>
                  </div>
                  <div className="text-2xs text-slate-500 mt-0.5 font-bold">
                    {idea.name_en}
                  </div>
                  <p className="text-2xs text-slate-600 line-clamp-2 mt-1.5 leading-relaxed font-medium">
                    {oneLiner}
                  </p>
                </div>

                {/* Card Footer */}
                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-2xs font-bold text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-2 h-2 rounded-full inline-block"
                      style={{ backgroundColor: visual.themeColor }}
                    />
                    <span className="capitalize">{catSlug.replace('_', ' ')}</span>
                  </div>
                  <ChevronRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${isSelected ? 'text-emerald-700 font-bold' : 'text-slate-400 group-hover:text-emerald-600'}`} />
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Custom Idea Modal (Portaled to document.body) */}
      {showCustomModal && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-300 border-b-[4px] border-b-slate-400 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-black text-slate-900 tracking-tight">{t.customModalTitle}</h3>
              <button
                onClick={() => setShowCustomModal(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-slate-600 mb-4 font-semibold">
              {t.customModalDesc}
            </p>
            <form onSubmit={handleCustomSubmit}>
              <textarea
                rows={3}
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                placeholder={t.customModalPlaceholder}
                className="w-full p-3.5 text-sm border border-slate-300 border-b-[3px] border-b-slate-400/80 rounded-2xl focus:ring-3 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none transition-all mb-4 text-slate-900 bg-white font-semibold shadow-inner"
              />
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowCustomModal(false)}
                  className="btn-3d-secondary text-sm py-2 px-4"
                >
                  {t.cancelBtn}
                </button>
                <button
                  type="submit"
                  disabled={analyzingNLP || !customInput.trim()}
                  className="btn-3d-primary text-sm py-2 px-6"
                >
                  {analyzingNLP ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      <span>{t.classifyingText}</span>
                    </>
                  ) : (
                    <span>{t.classifyBtn}</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}

      {/* Low Confidence Confirmation Modal (Portaled to document.body) */}
      {showConfirmModal && pendingProfile && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-amber-300 border-b-[4px] border-b-amber-500 animate-in zoom-in-95 duration-150">
            <div className="flex items-center gap-2.5 mb-3 text-amber-700">
              <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center border border-amber-300">
                <HelpCircle className="w-5 h-5 text-amber-600" />
              </div>
              <h3 className="text-lg font-black text-slate-900">{t.confirmBusinessTitle}</h3>
            </div>
            <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 border-b-[3px] border-b-amber-300 text-sm mb-5 text-amber-950 shadow-2xs">
              <p className="font-bold text-slate-900 text-xs">
                {t.confirmPrefix}
              </p>
              <div className="mt-1.5 text-base font-black text-emerald-900">
                "{pendingProfile.business_name}"
              </div>
              <div className="text-xs text-slate-600 mt-1 font-semibold">
                {t.categoryLabel} {pendingProfile.category_name_en}
              </div>
              <p className="mt-3 text-xs text-amber-900 font-black">
                {t.isThisCorrect}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleConfirmProfile}
                className="btn-3d-primary flex-1 text-sm py-3"
              >
                {t.yesContinue}
              </button>
              <button
                onClick={() => {
                  setShowConfirmModal(false);
                  setShowCustomModal(true);
                }}
                className="btn-3d-secondary flex-1 text-sm py-3"
              >
                {t.changeBusiness}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

    </div>
  );
};
