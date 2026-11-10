import React, { useState, useMemo } from 'react';
import { Sparkles, SlidersHorizontal, Info, ShieldCheck, CheckCircle2, Search } from 'lucide-react';
import { useApp } from '../context/AppContext';
import MatchScoreCard from '../components/MatchScoreCard';
import FilterDropdown from '../components/FilterDropdown';
import SearchBar from '../components/SearchBar';
import EmptyState from '../components/EmptyState';
import { CATEGORIES } from '../data/mockData';

const SmartMatchesPage = () => {
  const { matches, lostItems, foundItems } = useApp();
  const [selectedConfidence, setSelectedConfidence] = useState('all'); // all, high, medium, low
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Confidence options
  const confidenceOptions = [
    { id: 'all', label: `All Matches (${matches.length})` },
    { id: 'high', label: `High Confidence (75%+) (${matches.filter(m => m.score >= 75).length})` },
    { id: 'medium', label: `Medium Confidence (50-74%) (${matches.filter(m => m.score >= 50 && m.score < 75).length})` },
    { id: 'low', label: `Low Confidence (<50%) (${matches.filter(m => m.score < 50).length})` }
  ];

  const filteredMatches = useMemo(() => {
    return matches.filter((match) => {
      // Confidence filter
      if (selectedConfidence === 'high' && match.score < 75) return false;
      if (selectedConfidence === 'medium' && (match.score < 50 || match.score >= 75)) return false;
      if (selectedConfidence === 'low' && match.score >= 50) return false;

      // Category filter
      if (
        selectedCategory &&
        match.lostItem?.category !== selectedCategory &&
        match.foundItem?.category !== selectedCategory
      ) {
        return false;
      }

      // Search keyword filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesLost =
          match.lostItem?.name.toLowerCase().includes(query) ||
          match.lostItem?.location.toLowerCase().includes(query) ||
          match.lostItem?.description.toLowerCase().includes(query);
        const matchesFound =
          match.foundItem?.name.toLowerCase().includes(query) ||
          match.foundItem?.location.toLowerCase().includes(query) ||
          match.foundItem?.description.toLowerCase().includes(query);

        if (!matchesLost && !matchesFound) return false;
      }

      return true;
    });
  }, [matches, selectedConfidence, selectedCategory, searchQuery]);

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-blue-900 text-white rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-8 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-2xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-indigo-200 text-xs font-bold border border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Campus AI Compatibility Engine</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Transparent Smart Matches
          </h1>

          <p className="text-xs sm:text-sm text-indigo-100/90 leading-relaxed">
            Our multi-attribute matching algorithm cross-references lost reports with found articles across category hierarchy, title keywords, color, brand, campus building proximity, and chronological closeness.
          </p>

          <div className="pt-2 flex flex-wrap gap-3 text-xs text-indigo-200">
            <span className="bg-white/10 px-2.5 py-1 rounded-lg">Category: 30%</span>
            <span className="bg-white/10 px-2.5 py-1 rounded-lg">Title & Keywords: 25%</span>
            <span className="bg-white/10 px-2.5 py-1 rounded-lg">Color: 15%</span>
            <span className="bg-white/10 px-2.5 py-1 rounded-lg">Brand: 10%</span>
            <span className="bg-white/10 px-2.5 py-1 rounded-lg">Location Proximity: 10%</span>
            <span className="bg-white/10 px-2.5 py-1 rounded-lg">Date Proximity: 10%</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        {/* Confidence Tier Selector */}
        <div className="flex flex-wrap gap-2">
          {confidenceOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setSelectedConfidence(opt.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedConfidence === opt.id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-2 border-t border-slate-100">
          <div className="md:col-span-8">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search across match pairs (e.g. AirPods, Wallet, Library)..."
            />
          </div>
          <div className="md:col-span-4">
            <FilterDropdown
              label=""
              allLabel="All Categories"
              value={selectedCategory}
              options={CATEGORIES}
              onChange={setSelectedCategory}
            />
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
          <span>
            Displaying <strong className="text-slate-800">{filteredMatches.length}</strong> smart match suggestions
          </span>
          <span className="text-[11px] text-slate-400 italic">
            Matches are calculated suggestions to guide item verification.
          </span>
        </div>
      </div>

      {/* Matches List */}
      {filteredMatches.length > 0 ? (
        <div className="space-y-6">
          {filteredMatches.map((match) => (
            <MatchScoreCard key={match.id} match={match} compact={false} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Sparkles}
          title="No smart matches in this tier"
          description="Try loosening your filters or selecting 'All Matches' to inspect lower score suggestions."
          actionLabel="Clear Filter"
          onAction={() => {
            setSelectedConfidence('all');
            setSelectedCategory('');
            setSearchQuery('');
          }}
        />
      )}
    </div>
  );
};

export default SmartMatchesPage;

