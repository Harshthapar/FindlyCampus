import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Tag,
  Palette,
  Shield,
  ShieldCheck,
  CheckCircle,
  Clock,
  Sparkles,
  MessageSquare,
  AlertTriangle,
  User,
  Share2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import StatusBadge from '../components/StatusBadge';
import MatchScoreCard from '../components/MatchScoreCard';
import ContactModal from '../components/ContactModal';
import ConfirmationModal from '../components/ConfirmationModal';
import { getItemMatches } from '../utils/matchingEngine';

const ItemDetailsPage = () => {
  const { type, id } = useParams(); // type: 'lost' | 'found'
  const navigate = useNavigate();
  const {
    lostItems,
    foundItems,
    markItemAsRecovered,
    markItemAsReturned,
    addToast
  } = useApp();

  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  const isLost = type === 'lost';
  const item = isLost
    ? lostItems.find((i) => i.id === id)
    : foundItems.find((i) => i.id === id);

  if (!item) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Report Not Found</h2>
        <p className="text-sm text-slate-500">The requested item report may have been deleted or expired.</p>
        <button
          onClick={() => navigate('/dashboard')}
          className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-semibold"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  // Calculate matching items
  const matchingSuggestions = getItemMatches(
    item,
    type,
    isLost ? foundItems : lostItems
  );

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    addToast('Direct link to report copied to clipboard!', 'info');
  };

  const handleConfirmStatusChange = () => {
    if (isLost) {
      markItemAsRecovered(item.id);
    } else {
      markItemAsReturned(item.id);
    }
  };

  const isCompleted = item.status === 'Recovered' || item.status === 'Returned';

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      {/* Back button & quick action */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to previous listing</span>
        </button>

        <button
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Share Report</span>
        </button>
      </div>

      {/* Main Details Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-12">
        {/* Left Image Section */}
        <div className="md:col-span-5 bg-slate-100 p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-200">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-inner">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3">
              <span
                className={`text-xs font-extrabold px-3 py-1 rounded-lg text-white shadow-md ${
                  isLost ? 'bg-rose-500' : 'bg-teal-600'
                }`}
              >
                {isLost ? 'LOST REPORT' : 'FOUND REPORT'}
              </span>
            </div>
            {item.isDemo && (
              <div className="absolute bottom-2 left-3 bg-slate-900/60 backdrop-blur-sm text-slate-200 text-[10px] font-medium px-2 py-0.5 rounded">
                Verified Demo Content
              </div>
            )}
          </div>

          <div className="mt-4 p-3 bg-white rounded-xl border border-slate-200/80 text-xs text-slate-600 space-y-1">
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span>Report Identifier:</span>
              <span className="font-mono text-slate-700">{item.id}</span>
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span>Reported By:</span>
              <span className="font-medium text-slate-700">{item.reportedBy}</span>
            </div>
          </div>
        </div>

        {/* Right Info Section */}
        <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 font-bold text-xs text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg">
                <Tag className="w-3.5 h-3.5" />
                {item.category}
              </span>
              <StatusBadge status={item.status} size="sm" />
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
              {item.name}
            </h1>

            <p className="mt-4 text-sm text-slate-600 leading-relaxed">
              {item.description}
            </p>

            {/* Spec Sheet */}
            <div className="mt-6 grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Primary Color</span>
                <span className="font-semibold text-slate-800 text-sm">{item.color || 'Unspecified'}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Brand / Make</span>
                <span className="font-semibold text-slate-800 text-sm">{item.brand || 'Unbranded'}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                  {isLost ? 'Misplaced Date' : 'Discovered Date'}
                </span>
                <span className="font-semibold text-slate-800 text-sm">{item.date}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Campus Area</span>
                <span className="font-semibold text-slate-800 text-sm truncate block">{item.location}</span>
              </div>
            </div>

            {/* Specific Location Note */}
            {item.locationDetails && (
              <div className="mt-3 p-3 bg-indigo-50/50 border border-indigo-100 rounded-xl text-xs text-indigo-900 flex items-start gap-2">
                <MapPin className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Location details:</strong> {item.locationDetails}
                </div>
              </div>
            )}

            {/* Private Identifying Question notice */}
            {item.additionalDetails && (
              <div className="mt-3 p-3 bg-slate-50 border border-slate-200/80 rounded-xl text-xs text-slate-600 flex items-start gap-2">
                <Shield className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <div>
                  <strong>Verification Hint:</strong> {item.additionalDetails}
                </div>
              </div>
            )}
          </div>

          {/* Action Button Row */}
          <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center gap-3">
            {!isCompleted ? (
              <>
                <button
                  onClick={() => setContactModalOpen(true)}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md transition"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{isLost ? 'Contact Item Owner' : 'Claim This Item'}</span>
                </button>

                <button
                  onClick={() => setConfirmModalOpen(true)}
                  className={`px-4 py-3 rounded-xl text-xs sm:text-sm font-bold border transition ${
                    isLost
                      ? 'border-emerald-300 text-emerald-700 hover:bg-emerald-50'
                      : 'border-teal-300 text-teal-700 hover:bg-teal-50'
                  }`}
                >
                  {isLost ? 'Mark as Recovered' : 'Mark as Returned'}
                </button>
              </>
            ) : (
              <div className="w-full p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3 text-emerald-800 text-sm font-semibold">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                <span>
                  {isLost
                    ? 'This item has been officially marked as Recovered!'
                    : 'This item has been returned to its verified owner!'}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Matching suggestions section */}
      <div className="space-y-4 pt-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-600" />
              <span>
                Matching {isLost ? 'Found Items' : 'Lost Items'} ({matchingSuggestions.length})
              </span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Automated compatibility predictions calculated for this specific {isLost ? 'lost' : 'found'} report.
            </p>
          </div>
        </div>

        {matchingSuggestions.length > 0 ? (
          <div className="space-y-4">
            {matchingSuggestions.map((m) => (
              <MatchScoreCard key={m.id} match={m} compact={false} />
            ))}
          </div>
        ) : (
          <div className="p-8 bg-white rounded-2xl border border-slate-200 text-center text-xs text-slate-500">
            No matching items above the 35% similarity threshold detected at this time.
          </div>
        )}
      </div>

      {/* In-app Contact modal */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        item={item}
        type={type}
      />

      {/* Confirmation Dialog */}
      <ConfirmationModal
        isOpen={confirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        onConfirm={handleConfirmStatusChange}
        title={isLost ? 'Mark as Recovered?' : 'Mark as Returned to Owner?'}
        message={
          isLost
            ? 'Confirming recovery will archive active match notifications and mark this item as reunited with you.'
            : 'Confirming return will complete this ticket and update campus hand-off metrics.'
        }
        confirmLabel={isLost ? 'Confirm Recovery' : 'Confirm Return'}
        confirmVariant="success"
      />
    </div>
  );
};

export default ItemDetailsPage;

