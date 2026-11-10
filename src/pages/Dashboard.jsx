import React from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  CheckCircle2,
  PlusCircle,
  Sparkles,
  TrendingUp,
  FileText,
  Clock,
  ArrowRight,
  ShieldCheck,
  MapPin,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import ItemCard from '../components/ItemCard';
import MatchScoreCard from '../components/MatchScoreCard';
import { RECENT_RECOVERIES } from '../data/mockData';

const Dashboard = () => {
  const { lostItems, foundItems, matches } = useApp();

  // Statistics
  const totalLost = lostItems.length;
  const totalFound = foundItems.length;
  const activeReports = lostItems.filter((i) => i.status === 'Active').length + foundItems.filter((i) => i.status === 'Active').length;
  const successfulRecoveries = lostItems.filter((i) => i.status === 'Recovered').length + foundItems.filter((i) => i.status === 'Returned').length + 18; // Includes campus historical demo

  // Top 3 high confidence smart matches
  const topMatches = matches.slice(0, 3);

  // Latest reports (lost + found merged or side by side)
  const recentLost = lostItems.slice(0, 3);
  const recentFound = foundItems.slice(0, 3);

  return (
    <div className="space-y-10 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Campus Operations Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time campus lost & found activity, smart match recommendations, and recovery tracking.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            to="/report?tab=lost"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-rose-500 hover:bg-rose-600 shadow-sm transition"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Report Lost</span>
          </Link>
          <Link
            to="/report?tab=found"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 shadow-sm transition"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Report Found</span>
          </Link>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Lost Items</span>
            <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <Search className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900">{totalLost}</div>
          <span className="text-[11px] text-slate-500 mt-1 block">Active on campus board</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Found Items</span>
            <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-slate-900">{totalFound}</div>
          <span className="text-[11px] text-slate-500 mt-1 block">Handed in or reported</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Recoveries</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-emerald-600">{successfulRecoveries}</div>
          <span className="text-[11px] text-emerald-600/90 font-medium mt-1 block">Reunited successfully</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Active Reports</span>
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-black text-indigo-600">{activeReports}</div>
          <span className="text-[11px] text-slate-500 mt-1 block">Pending hand-off/claim</span>
        </div>
      </div>

      {/* Quick Action Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 rounded-2xl p-6 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs text-indigo-300 font-semibold bg-white/10 px-2.5 py-0.5 rounded-full mb-1">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Campus Matching Engine Active</span>
          </div>
          <h2 className="text-xl font-bold">Have you misplaced your essentials today?</h2>
          <p className="text-xs text-slate-300 max-w-xl">
            Check the smart match suggestions below or explore live listings with keyword search and building filters.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Link
            to="/smart-matches"
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 font-bold text-xs rounded-xl shadow transition"
          >
            View Smart Matches ({matches.length})
          </Link>
          <Link
            to="/lost-items"
            className="px-4 py-2.5 bg-white/10 hover:bg-white/20 font-bold text-xs rounded-xl transition border border-white/10"
          >
            Browse All Items
          </Link>
        </div>
      </div>

      {/* Smart Match Recommendations Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-600" />
              <span>Smart Match Recommendations</span>
            </h2>
            <p className="text-xs text-slate-500">
              High compatibility pairs determined by category, location proximity, colors, and timestamps.
            </p>
          </div>
          <Link
            to="/smart-matches"
            className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
          >
            <span>See All ({matches.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {topMatches.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {topMatches.map((match) => (
              <MatchScoreCard key={match.id} match={match} compact={true} />
            ))}
          </div>
        ) : (
          <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-sm text-slate-500">
            No active match pairs currently detected.
          </div>
        )}
      </div>

      {/* Recent Items: Lost vs Found Split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Lost */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <h3 className="font-bold text-slate-900 text-base">Recently Reported Lost</h3>
            </div>
            <Link
              to="/lost-items"
              className="text-xs font-semibold text-indigo-600 hover:underline"
            >
              View All
            </Link>
          </div>

          <div className="space-y-3">
            {recentLost.map((item) => (
              <div
                key={item.id}
                className="bg-white p-3.5 rounded-xl border border-slate-200 hover:border-indigo-300 transition-all flex items-center gap-3 shadow-sm"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-14 rounded-lg object-cover shrink-0 border border-slate-100"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                      {item.category}
                    </span>
                    <span className="text-[11px] text-slate-400">{item.date}</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm truncate mt-1">
                    {item.name}
                  </h4>
                  <p className="text-xs text-slate-500 truncate flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-rose-500 shrink-0" />
                    <span>{item.location}</span>
                  </p>
                </div>
                <Link
                  to={`/item/lost/${item.id}`}
                  className="p-2 rounded-lg bg-slate-50 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 transition"
                  title="View"
                >
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Found */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-500" />
              <h3 className="font-bold text-slate-900 text-base">Recently Reported Found</h3>
            </div>
            <Link
              to="/found-items"
              className="text-xs font-semibold text-indigo-600 hover:underline"
            >
              View All
            </Link>
          </div>

          <div className="space-y-3">
            {recentFound.map((item) => (
              <div
                key={item.id}
                className="bg-white p-3.5 rounded-xl border border-slate-200 hover:border-teal-300 transition-all flex items-center gap-3 shadow-sm"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-14 rounded-lg object-cover shrink-0 border border-slate-100"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
                      {item.category}
                    </span>
                    <span className="text-[11px] text-slate-400">{item.date}</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm truncate mt-1">
                    {item.name}
                  </h4>
                  <p className="text-xs text-slate-500 truncate flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-teal-600 shrink-0" />
                    <span>{item.location}</span>
                  </p>
                </div>
                <Link
                  to={`/item/found/${item.id}`}
                  className="p-2 rounded-lg bg-slate-50 hover:bg-teal-50 text-slate-600 hover:text-teal-600 transition"
                  title="View"
                >
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recovery Activity Feed (Demo Data) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Recent Campus Recoveries</h3>
              <p className="text-xs text-slate-500">Live verified returns and successful owner matches</p>
            </div>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200">
            Verified Hand-offs
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {RECENT_RECOVERIES.map((rec) => (
            <div key={rec.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                <div>
                  <span className="font-bold text-slate-900 text-sm">{rec.item}</span>
                  <div className="text-slate-500 flex items-center gap-2 mt-0.5">
                    <span>Category: {rec.category}</span>
                    <span>•</span>
                    <span>📍 {rec.location}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 text-slate-600 sm:text-right">
                <div>
                  <span className="block text-slate-400 text-[10px]">Owner / Finder</span>
                  <span>{rec.owner} ↔ {rec.finder}</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-slate-100 font-medium text-slate-700">
                  {rec.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

