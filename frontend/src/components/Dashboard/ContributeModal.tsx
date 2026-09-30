import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Language } from '../../types';
import { translations } from '../../i18n/translations';
import { apiService } from '../../services/api';
import { PlusCircle, X, CheckCircle2, Loader2 } from 'lucide-react';

interface ContributeModalProps {
  language: Language;
  isOpen: boolean;
  onClose: () => void;
  defaultLocation?: string;
  latitude?: number;
  longitude?: number;
}

export const ContributeModal: React.FC<ContributeModalProps> = ({
  language,
  isOpen,
  onClose,
  defaultLocation = '',
  latitude,
  longitude,
}) => {
  const t = translations[language];
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [locationText, setLocationText] = useState(defaultLocation);
  const [address, setAddress] = useState('');
  const [supportingInfo, setSupportingInfo] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !category.trim()) return;

    setIsSubmitting(true);
    try {
      await apiService.suggestBusiness({
        business_name: name.trim(),
        category: category.trim(),
        location_text: locationText || defaultLocation,
        latitude,
        longitude,
        address: address.trim(),
        supporting_info: supportingInfo.trim()
      });
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
        setName('');
        setCategory('');
        setAddress('');
        setSupportingInfo('');
      }, 2500);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-300 border-b-[4px] border-b-slate-400 animate-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-emerald-700">
            <PlusCircle className="w-5 h-5" />
            <h3 className="text-lg font-black text-slate-900 tracking-tight">{t.suggestModalTitle}</h3>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition-colors flex items-center justify-center cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center text-emerald-950">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-2" />
            <p className="font-bold text-base">{t.submissionSuccess}</p>
            <p className="text-xs text-emerald-700 mt-1">
              Status: 'Suggested'
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                {t.bizNameField}
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Sri Sai Milk Point"
                className="w-full px-4 py-3 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-slate-900 bg-white font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                {t.bizCategoryField}
              </label>
              <input
                type="text"
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g. Dairy / Bakery / Grocery"
                className="w-full px-4 py-3 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-slate-900 bg-white font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                {t.bizAddressField}
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="e.g. Near Panchayat Office, Main Road"
                className="w-full px-4 py-3 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-slate-900 bg-white font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                {t.bizInfoField}
              </label>
              <textarea
                rows={2}
                value={supportingInfo}
                onChange={(e) => setSupportingInfo(e.target.value)}
                placeholder="Phone number, operating hours..."
                className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-slate-900 bg-white font-medium"
              />
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="btn-3d-secondary text-sm py-2.5 px-5"
              >
                {t.cancelBtn}
              </button>
              <button
                type="submit"
                disabled={isSubmitting || !name.trim() || !category.trim()}
                className="btn-3d-primary text-sm py-2.5 px-6"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    <span>{t.submittingBtn}</span>
                  </>
                ) : (
                  <span>{t.submitBtn}</span>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>,
    document.body
  );
};
