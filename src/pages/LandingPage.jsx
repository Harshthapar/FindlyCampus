import React from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  Search,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  PlusCircle,
  CheckCircle2,
  Clock,
  Layers,
  MapPin,
  Tag,
  Zap,
  Users
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import ItemCard from '../components/ItemCard';

const LandingPage = () => {
  const { foundItems, lostItems, matches } = useApp();

  // Preview latest found items (top 3)
  const recentFoundPreview = foundItems.slice(0, 3);
  const activeReportsCount = lostItems.filter(i => i.status === 'Active').length;
  const recoveredCount = lostItems.filter(i => i.status === 'Recovered').length + foundItems.filter(i => i.status === 'Returned').length + 18;

  return (
    <div className="space-y-20 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-28">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-indigo-200/40 via-blue-100/30 to-purple-100/30 blur-3xl -z-10 rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/60 text-indigo-700 text-xs font-bold mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Next-Generation Smart Campus Lost & Found</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
            Lost Something on Campus? <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-800 bg-clip-text text-transparent">
              Let’s Find It.
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg lg:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            A smarter way to report lost belongings, discover found items, and reconnect students with what matters.
          </p>

          {/* Action Buttons */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/report?tab=lost"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-500/20 hover:shadow-lg transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Report Lost Item</span>
            </Link>

            <Link
              to="/report?tab=found"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-slate-800 bg-white border border-slate-200 hover:border-teal-400 hover:bg-teal-50/50 shadow-sm transition-all"
            >
              <CheckCircle2 className="w-4 h-4 text-teal-600" />
              <span>Report Found Item</span>
            </Link>

            <Link
              to="/lost-items"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-all"
            >
              <Search className="w-4 h-4" />
              <span>Browse Items</span>
            </Link>
          </div>

          {/* Live quick counters */}
          <div className="mt-14 pt-8 border-t border-slate-200/80 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto text-left">
            <div className="p-3 bg-white/70 backdrop-blur-sm rounded-xl border border-slate-200/60">
              <span className="text-2xl font-black text-indigo-600 block">{lostItems.length}+</span>
              <span className="text-xs font-medium text-slate-500">Lost Reports Logged</span>
            </div>
            <div className="p-3 bg-white/70 backdrop-blur-sm rounded-xl border border-slate-200/60">
              <span className="text-2xl font-black text-teal-600 block">{foundItems.length}+</span>
              <span className="text-xs font-medium text-slate-500">Found Items Logged</span>
            </div>
            <div className="p-3 bg-white/70 backdrop-blur-sm rounded-xl border border-slate-200/60">
              <span className="text-2xl font-black text-blue-600 block">{matches.length}</span>
              <span className="text-xs font-medium text-slate-500">Smart Pairs Matched</span>
            </div>
            <div className="p-3 bg-white/70 backdrop-blur-sm rounded-xl border border-slate-200/60">
              <span className="text-2xl font-black text-emerald-600 block">{recoveredCount}</span>
              <span className="text-xs font-medium text-slate-500">Total Recoveries</span>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-xs font-bold text-indigo-600 tracking-wider uppercase mb-2">
            Why Findly Campus?
          </h2>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Designed specifically for college campuses and busy student lives
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-7 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-5">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Rule-Based Smart Matching</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Transparent multi-attribute compatibility scoring analyzes category, colors, brand, campus building proximity, and dates to surface potential matches immediately.
            </p>
          </div>

          <div className="bg-white p-7 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 mb-5">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Student Privacy & Safety Guard</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              No sensitive ID numbers or wallet contents exposed publicly. Verification questions ensure rightful ownership before meeting safely at campus security stations.
            </p>
          </div>

          <div className="bg-white p-7 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition">
            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-5">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Centralized Campus Hub</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Stop endlessly scrolling through WhatsApp groups, Discord servers, and scattered bulletin boards. Everything is logged, filterable, and tracked in one unified portal.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-slate-100/70 border-y border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-xs font-bold text-indigo-600 tracking-wider uppercase mb-2">
              Step-by-Step Workflow
            </h2>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              How Findly Campus Works
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative">
              <div className="text-4xl font-black text-indigo-100 mb-2">01</div>
              <h4 className="text-base font-bold text-slate-900 mb-1">Report Details</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Post lost or found items with photos, colors, approximate campus location, and timestamps.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative">
              <div className="text-4xl font-black text-indigo-100 mb-2">02</div>
              <h4 className="text-base font-bold text-slate-900 mb-1">Instant Smart Match</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                The algorithm automatically scores your report against all campus entries and ranks matching probabilities.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative">
              <div className="text-4xl font-black text-indigo-100 mb-2">03</div>
              <h4 className="text-base font-bold text-slate-900 mb-1">Safe Verification</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Connect via an in-app verification dialog where owners answer unique identifying questions.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative">
              <div className="text-4xl font-black text-indigo-100 mb-2">04</div>
              <h4 className="text-base font-bold text-slate-900 mb-1">Item Reunited</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Hand over the item at a designated campus desk, then mark the report as recovered or returned.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Found Items Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-xs font-bold text-teal-600 tracking-wider uppercase mb-1">
              Campus Hand-ins
            </h2>
            <p className="text-2xl font-extrabold text-slate-900">
              Recently Reported Found Items
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Did you leave one of these behind? Review reports and submit a claim.
            </p>
          </div>
          <Link
            to="/found-items"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700"
          >
            <span>View All Found Items</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentFoundPreview.map((item) => (
            <ItemCard key={item.id} item={item} type="found" />
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-blue-700 rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Found an abandoned item on campus?
            </h3>
            <p className="text-indigo-100 text-sm leading-relaxed">
              Take 60 seconds to log it. You might just save a fellow student from panic, losing their coursework, or replacing expensive essentials.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link
              to="/report?tab=found"
              className="px-6 py-3 bg-white text-indigo-600 font-bold text-sm rounded-xl shadow-md hover:bg-indigo-50 transition"
            >
              Report a Found Item
            </Link>
            <Link
              to="/dashboard"
              className="px-6 py-3 bg-indigo-500/30 text-white font-bold text-sm rounded-xl border border-white/20 hover:bg-indigo-500/50 transition"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;

