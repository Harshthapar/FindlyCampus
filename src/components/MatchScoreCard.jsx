import React from 'react';
import { Sparkles, Check, AlertTriangle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const MatchScoreCard = ({ match, onSelect, compact = false }) => {
  const { score, confidenceLevel, lostItem, foundItem, matchingAttributes, differences, explanations } = match;

  const getScoreTheme = () => {
    if (score >= 75) {
      return {
        badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        ringColor: 'text-emerald-600',
        barColor: 'bg-emerald-500',
        tag: 'High Confidence Match'
      };
    }
    if (score >= 50) {
      return {
        badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
        ringColor: 'text-indigo-600',
        barColor: 'bg-indigo-500',
        tag: 'Medium Confidence'
      };
    }
    return {
      badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
      ringColor: 'text-amber-600',
      barColor: 'bg-amber-500',
      tag: 'Potential Match'
    };
  };

  const theme = getScoreTheme();

  if (compact) {
    return (
      <div className="bg-white border border-slate-200 hover:border-indigo-300 rounded-xl p-4 transition-all shadow-sm hover:shadow-md">
        <div className="flex items-center justify-between mb-3">
          <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${theme.badgeBg}`}>
            {theme.tag}
          </span>
          <div className="flex items-center gap-1 font-bold text-slate-800">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span>{score}% Match</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs mb-3">
          <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
            <span className="text-[10px] font-bold text-rose-500 uppercase tracking-wider block">Lost Item</span>
            <p className="font-semibold text-slate-900 truncate mt-0.5">{lostItem?.name}</p>
            <p className="text-slate-500 text-[11px] truncate">{lostItem?.location}</p>
          </div>
          <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
            <span className="text-[10px] font-bold text-teal-600 uppercase tracking-wider block">Found Item</span>
            <p className="font-semibold text-slate-900 truncate mt-0.5">{foundItem?.name}</p>
            <p className="text-slate-500 text-[11px] truncate">{foundItem?.location}</p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
          <span className="text-slate-500">{matchingAttributes?.length || 0} matching points</span>
          <Link
            to="/smart-matches"
            className="text-indigo-600 font-semibold hover:text-indigo-700 inline-flex items-center gap-1"
          >
            Review Details <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 hover:border-indigo-200 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-extrabold text-sm">
            {score}%
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${theme.badgeBg}`}>
                {theme.tag}
              </span>
              <span className="text-xs text-slate-500 hidden sm:inline">Transparent weighted calculation</span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Category (30%) + Title (25%) + Color (15%) + Brand (10%) + Location (10%) + Date (10%)
            </p>
          </div>
        </div>

        <div className="w-full sm:w-44 bg-slate-100 rounded-full h-2.5 overflow-hidden">
          <div
            className={`h-2.5 rounded-full transition-all duration-500 ${theme.barColor}`}
            style={{ width: `${score}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-5">
        {/* Lost Item Details */}
        <div className="bg-rose-50/40 border border-rose-100 rounded-xl p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-100/70 px-2 py-0.5 rounded">
                Lost Report
              </span>
              <span className="text-xs text-slate-500">{lostItem?.date}</span>
            </div>
            <div className="flex gap-3">
              <img
                src={lostItem?.image}
                alt={lostItem?.name}
                className="w-16 h-16 rounded-lg object-cover border border-rose-200 shrink-0"
              />
              <div>
                <h4 className="font-bold text-slate-900 leading-snug">{lostItem?.name}</h4>
                <p className="text-xs text-slate-600 mt-1 line-clamp-2">{lostItem?.description}</p>
              </div>
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-rose-100/60 flex items-center justify-between text-xs text-slate-600">
            <span>📍 {lostItem?.location}</span>
            <span className="font-medium text-slate-800">Color: {lostItem?.color}</span>
          </div>
        </div>

        {/* Found Item Details */}
        <div className="bg-teal-50/40 border border-teal-100 rounded-xl p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-100/70 px-2 py-0.5 rounded">
                Found Report
              </span>
              <span className="text-xs text-slate-500">{foundItem?.date}</span>
            </div>
            <div className="flex gap-3">
              <img
                src={foundItem?.image}
                alt={foundItem?.name}
                className="w-16 h-16 rounded-lg object-cover border border-teal-200 shrink-0"
              />
              <div>
                <h4 className="font-bold text-slate-900 leading-snug">{foundItem?.name}</h4>
                <p className="text-xs text-slate-600 mt-1 line-clamp-2">{foundItem?.description}</p>
              </div>
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-teal-100/60 flex items-center justify-between text-xs text-slate-600">
            <span>📍 {foundItem?.location}</span>
            <span className="font-medium text-slate-800">Color: {foundItem?.color}</span>
          </div>
        </div>
      </div>

      {/* Matching Attributes & Differences */}
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 space-y-3">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">
            Why this might match:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {matchingAttributes?.map((attr, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 text-xs bg-emerald-100/80 text-emerald-800 font-medium px-2.5 py-1 rounded-md"
              >
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                {attr}
              </span>
            ))}
            {differences?.map((diff, idx) => (
              <span
                key={`diff-${idx}`}
                className="inline-flex items-center gap-1 text-xs bg-amber-100/80 text-amber-800 font-medium px-2.5 py-1 rounded-md"
              >
                <AlertTriangle className="w-3 h-3 text-amber-600" />
                {diff}
              </span>
            ))}
          </div>
        </div>

        {explanations?.length > 0 && (
          <p className="text-xs text-slate-600 pt-2 border-t border-slate-200/60 leading-relaxed">
            <span className="font-semibold text-slate-700">Analysis: </span>
            {explanations.join(' ')}
          </p>
        )}
      </div>

      {/* Disclaimers & Action */}
      <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2 text-xs">
        <p className="text-slate-600 italic">
          * Note: Automated match suggestion based on campus proximity and item traits. Not a confirmed identity.
        </p>
        <div className="flex items-center gap-2 shrink-0">
          <Link
            to={`/item/lost/${lostItem?.id}`}
            className="px-3 py-1.5 rounded-lg border border-slate-300 font-semibold text-slate-700 hover:bg-slate-100 transition"
          >
            View Lost Item
          </Link>
          <Link
            to={`/item/found/${foundItem?.id}`}
            className="px-3.5 py-1.5 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
          >
            View Found Item
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MatchScoreCard;

