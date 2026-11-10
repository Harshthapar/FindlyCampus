import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Shield, Heart, ExternalLink, Sparkles } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1 space-y-3">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                <Compass className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-lg text-slate-900">
                Findly<span className="text-indigo-600">Campus</span>
              </span>
            </Link>
            <p className="text-xs text-slate-500 leading-relaxed">
              The centralized campus lost-and-found system with transparent smart matching, helping students reconnect with lost belongings.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-slate-400">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Campus Network Active</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Explore
            </h4>
            <ul className="space-y-2 text-xs font-medium text-slate-600">
              <li>
                <Link to="/lost-items" className="hover:text-indigo-600 transition">
                  Browse Lost Items
                </Link>
              </li>
              <li>
                <Link to="/found-items" className="hover:text-indigo-600 transition">
                  Browse Found Items
                </Link>
              </li>
              <li>
                <Link to="/smart-matches" className="hover:text-indigo-600 transition flex items-center gap-1">
                  <span>Smart Matches</span>
                  <Sparkles className="w-3 h-3 text-indigo-500" />
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-indigo-600 transition">
                  Student Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Actions
            </h4>
            <ul className="space-y-2 text-xs font-medium text-slate-600">
              <li>
                <Link to="/report?tab=lost" className="hover:text-indigo-600 transition">
                  Report a Lost Item
                </Link>
              </li>
              <li>
                <Link to="/report?tab=found" className="hover:text-indigo-600 transition">
                  Report a Found Item
                </Link>
              </li>
              <li>
                <Link to="/my-reports" className="hover:text-indigo-600 transition">
                  Track My Reports
                </Link>
              </li>
              <li>
                <Link to="/settings" className="hover:text-indigo-600 transition">
                  Account Preferences
                </Link>
              </li>
            </ul>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <div className="flex items-center gap-2 text-slate-800 text-xs font-bold mb-1.5">
              <Shield className="w-4 h-4 text-indigo-600" />
              <span>Student Safety First</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed mb-3">
              Never share credit card PINs or passwords. For recovered student ID cards, return them directly to campus security or the registrar.
            </p>
            <div className="text-[10px] text-indigo-600 font-semibold bg-indigo-50/80 px-2 py-1 rounded-md">
              Frontend MVP Showcase — College Capstone
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <p>© {new Date().getFullYear()} Findly Campus. Built for College Showcase.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for campus communities
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

