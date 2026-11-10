import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Upload,
  AlertTriangle,
  CheckCircle2,
  Image as ImageIcon,
  Shield,
  HelpCircle,
  Eye,
  Info
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CATEGORIES, CAMPUS_LOCATIONS, COLOR_OPTIONS } from '../data/mockData';

const ReportItemPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { createLostReport, createFoundReport } = useApp();

  // Tab: 'lost' or 'found'
  const activeTab = searchParams.get('tab') === 'found' ? 'found' : 'lost';

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    color: '',
    brand: '',
    location: '',
    locationDetails: '',
    date: new Date().toISOString().split('T')[0],
    image: '',
    additionalDetails: '',
    hideSensitiveDetails: false,
    contactInfo: 'student@campus.edu'
  });

  const [imagePreview, setImagePreview] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Reset errors when switching tab
    setErrors({});
  }, [activeTab]);

  const switchTab = (tab) => {
    setSearchParams({ tab });
  };

  // Image Upload handler (Base64 file or sample preset)
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, image: 'Image size should be less than 2MB' }));
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData((prev) => ({ ...prev, image: reader.result }));
        setErrors((prev) => ({ ...prev, image: null }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSampleImage = (url) => {
    setImagePreview(url);
    setFormData((prev) => ({ ...prev, image: url }));
  };

  // Validation
  const validateForm = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Item title is required';
    if (!formData.category) errs.category = 'Please select a category';
    if (!formData.color) errs.color = 'Please select the primary color';
    if (!formData.location) errs.location = 'Campus location is required';
    if (!formData.date) errs.date = 'Date is required';
    if (!formData.description.trim() || formData.description.length < 10) {
      errs.description = 'Please provide a clear description (at least 10 characters)';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Use default fallback image if none uploaded
    const submissionData = {
      ...formData,
      image:
        formData.image ||
        (activeTab === 'lost'
          ? 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=600&q=80'
          : 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80')
    };

    if (activeTab === 'lost') {
      createLostReport(submissionData);
      navigate('/lost-items');
    } else {
      createFoundReport(submissionData);
      navigate('/found-items');
    }
  };

  const isSensitiveCategory =
    formData.category === 'ID Cards' || formData.category === 'Wallets';

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Campus Item Reporting
        </h1>
        <p className="text-sm text-slate-500 max-w-lg mx-auto">
          File a detailed report to tap into our transparent Smart Matching engine and notify the campus community.
        </p>

        {/* Tab Switcher */}
        <div className="inline-flex p-1.5 bg-slate-200/80 rounded-2xl mt-4">
          <button
            type="button"
            onClick={() => switchTab('lost')}
            className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'lost'
                ? 'bg-rose-500 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            I Lost Something
          </button>
          <button
            type="button"
            onClick={() => switchTab('found')}
            className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'found'
                ? 'bg-teal-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            I Found Something
          </button>
        </div>
      </div>

      {/* Main Card Form */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10">
        {/* Privacy notice for sensitive items */}
        {isSensitiveCategory && (
          <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3 text-xs text-amber-900">
            <Shield className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <strong className="font-bold">Student Privacy Warning:</strong>
              <p>
                When reporting Student ID cards or Wallets, do NOT post complete registration numbers, full date of births, or financial details. We mask sensitive identifiers by default.
              </p>
              <label className="inline-flex items-center gap-2 mt-2 font-semibold text-slate-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.hideSensitiveDetails}
                  onChange={(e) =>
                    setFormData({ ...formData, hideSensitiveDetails: e.target.checked })
                  }
                  className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4"
                />
                <span>Mask sensitive details in public listings (Recommended)</span>
              </label>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Item Name */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Item Name / Title *
            </label>
            <input
              type="text"
              placeholder={
                activeTab === 'lost'
                  ? 'e.g., Apple AirPods Pro (2nd Gen) with clip'
                  : 'e.g., Black Leather Bifold Wallet'
              }
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 ${
                errors.name
                  ? 'border-rose-400 focus:ring-rose-200'
                  : 'border-slate-200 focus:ring-indigo-500/20 focus:border-indigo-500'
              }`}
            />
            {errors.name && <p className="text-xs text-rose-500 mt-1">{errors.name}</p>}
          </div>

          {/* Category & Color */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className={`w-full px-4 py-2.5 border rounded-xl text-sm bg-white focus:outline-none focus:ring-2 ${
                  errors.category
                    ? 'border-rose-400 focus:ring-rose-200'
                    : 'border-slate-200 focus:ring-indigo-500/20 focus:border-indigo-500'
                }`}
              >
                <option value="">Select Item Category</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-xs text-rose-500 mt-1">{errors.category}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Primary Color *
              </label>
              <select
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                className={`w-full px-4 py-2.5 border rounded-xl text-sm bg-white focus:outline-none focus:ring-2 ${
                  errors.color
                    ? 'border-rose-400 focus:ring-rose-200'
                    : 'border-slate-200 focus:ring-indigo-500/20 focus:border-indigo-500'
                }`}
              >
                <option value="">Select Primary Color</option>
                {COLOR_OPTIONS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              {errors.color && <p className="text-xs text-rose-500 mt-1">{errors.color}</p>}
            </div>
          </div>

          {/* Brand & Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Brand / Manufacturer (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g., Apple, Casio, Nike, Hydro Flask"
                value={formData.brand}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                {activeTab === 'lost' ? 'Date Misplaced *' : 'Date Discovered *'}
              </label>
              <input
                type="date"
                value={formData.date}
                max={new Date().toISOString().split('T')[0]}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 ${
                  errors.date
                    ? 'border-rose-400 focus:ring-rose-200'
                    : 'border-slate-200 focus:ring-indigo-500/20 focus:border-indigo-500'
                }`}
              />
              {errors.date && <p className="text-xs text-rose-500 mt-1">{errors.date}</p>}
            </div>
          </div>

          {/* Campus Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                {activeTab === 'lost' ? 'Last Seen Campus Zone *' : 'Found Campus Zone *'}
              </label>
              <select
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className={`w-full px-4 py-2.5 border rounded-xl text-sm bg-white focus:outline-none focus:ring-2 ${
                  errors.location
                    ? 'border-rose-400 focus:ring-rose-200'
                    : 'border-slate-200 focus:ring-indigo-500/20 focus:border-indigo-500'
                }`}
              >
                <option value="">Select Campus Spot</option>
                {CAMPUS_LOCATIONS.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
              {errors.location && (
                <p className="text-xs text-rose-500 mt-1">{errors.location}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Specific Spot / Room / Desk (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g., 2nd Floor Study Room 204, Table 8"
                value={formData.locationDetails}
                onChange={(e) =>
                  setFormData({ ...formData, locationDetails: e.target.value })
                }
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Item Description & Distinguishing Traits *
            </label>
            <textarea
              rows={3}
              placeholder="Describe scratches, custom stickers, case colors, contents, stickers, or specific marks..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 resize-none ${
                errors.description
                  ? 'border-rose-400 focus:ring-rose-200'
                  : 'border-slate-200 focus:ring-indigo-500/20 focus:border-indigo-500'
              }`}
            />
            {errors.description && (
              <p className="text-xs text-rose-500 mt-1">{errors.description}</p>
            )}
          </div>

          {/* Additional Details */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Secret Identifying Question / Private Verification
            </label>
            <input
              type="text"
              placeholder="e.g. Device lock screen photo or specific sticker text to prove ownership"
              value={formData.additionalDetails}
              onChange={(e) =>
                setFormData({ ...formData, additionalDetails: e.target.value })
              }
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
            <span className="text-[11px] text-slate-400 mt-1 block">
              Helps verify the claimant when they reach out.
            </span>
          </div>

          {/* Image Upload with Preview */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Item Photo (Upload or Choose Demo Preset)
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <label className="sm:col-span-2 border-2 border-dashed border-slate-300 hover:border-indigo-400 rounded-2xl p-4 flex flex-col items-center justify-center text-center cursor-pointer transition bg-slate-50 hover:bg-indigo-50/20">
                <Upload className="w-6 h-6 text-slate-400 mb-2" />
                <span className="text-xs font-semibold text-slate-700">
                  Click to upload a picture
                </span>
                <span className="text-[11px] text-slate-400 mt-0.5">
                  PNG, JPG, WebP up to 2MB
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>

              {/* Preview Box */}
              <div className="border border-slate-200 rounded-2xl p-2 bg-slate-100 flex items-center justify-center min-h-[100px] relative overflow-hidden">
                {imagePreview ? (
                  <div className="relative w-full h-full min-h-[100px]">
                    <img
                      src={imagePreview}
                      alt="Upload preview"
                      className="w-full h-full object-cover rounded-xl max-h-28"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview('');
                        setFormData((prev) => ({ ...prev, image: '' }));
                      }}
                      className="absolute top-1 right-1 bg-slate-900/70 text-white rounded-full p-1 text-xs"
                      title="Remove image"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <div className="text-center p-3 text-slate-400">
                    <ImageIcon className="w-6 h-6 mx-auto mb-1 opacity-50" />
                    <span className="text-[10px]">No image selected</span>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Demo Presets */}
            <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1 text-xs text-slate-500">
              <span className="text-[11px] font-medium shrink-0">Quick presets:</span>
              <button
                type="button"
                onClick={() =>
                  handleSampleImage(
                    'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=600&q=80'
                  )
                }
                className="px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded-md text-[11px] shrink-0 font-medium"
              >
                Earbuds
              </button>
              <button
                type="button"
                onClick={() =>
                  handleSampleImage(
                    'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=600&q=80'
                  )
                }
                className="px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded-md text-[11px] shrink-0 font-medium"
              >
                Wallet
              </button>
              <button
                type="button"
                onClick={() =>
                  handleSampleImage(
                    'https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=600&q=80'
                  )
                }
                className="px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded-md text-[11px] shrink-0 font-medium"
              >
                Keys
              </button>
              <button
                type="button"
                onClick={() =>
                  handleSampleImage(
                    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80'
                  )
                }
                className="px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded-md text-[11px] shrink-0 font-medium"
              >
                Backpack
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-7 py-3 rounded-xl text-sm font-bold text-white shadow-md transition ${
                activeTab === 'lost'
                  ? 'bg-rose-500 hover:bg-rose-600 shadow-rose-500/20'
                  : 'bg-teal-600 hover:bg-teal-700 shadow-teal-500/20'
              }`}
            >
              {activeTab === 'lost' ? 'Post Lost Item Report' : 'Post Found Item Report'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportItemPage;

