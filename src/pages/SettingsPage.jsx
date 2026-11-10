import React, { useState } from 'react';
import {
  Settings as SettingsIcon,
  User,
  Bell,
  Sun,
  Moon,
  RotateCcw,
  Shield,
  Trash2,
  CheckCircle2,
  Info
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import ConfirmationModal from '../components/ConfirmationModal';

const SettingsPage = () => {
  const { settings, updateUserSettings, resetPlatformData } = useApp();

  const [formData, setFormData] = useState({
    displayName: settings?.displayName || 'Student User',
    email: settings?.email || 'student@campus.edu',
    studentId: settings?.studentId || 'ST-2024-9182',
    department: settings?.department || 'Computer Science & Engineering',
    theme: settings?.theme || 'light',
    notifications: {
      matchAlerts: settings?.notifications?.matchAlerts ?? true,
      statusUpdates: settings?.notifications?.statusUpdates ?? true,
      campusBulletins: settings?.notifications?.campusBulletins ?? false,
      emailSummary: settings?.notifications?.emailSummary ?? true
    }
  });

  const [confirmResetOpen, setConfirmResetOpen] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    updateUserSettings(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleReset = () => {
    resetPlatformData();
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Application Preferences & Settings
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Customize your student profile, configure simulated push alerts, and manage local storage cache.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* User Profile Box */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Student Profile</h2>
              <p className="text-xs text-slate-500">
                Identifiers used when claiming or authoring campus reports
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Display Name *
              </label>
              <input
                type="text"
                required
                value={formData.displayName}
                onChange={(e) =>
                  setFormData({ ...formData, displayName: e.target.value })
                }
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Campus Email *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Student ID / Roll Number
              </label>
              <input
                type="text"
                value={formData.studentId}
                onChange={(e) =>
                  setFormData({ ...formData, studentId: e.target.value })
                }
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Major / Academic Department
              </label>
              <input
                type="text"
                value={formData.department}
                onChange={(e) =>
                  setFormData({ ...formData, department: e.target.value })
                }
                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Theme Preferences */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Sun className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Theme Preference</h2>
              <p className="text-xs text-slate-500">
                Findly Campus is crafted with a clean, soft modern light aesthetic
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, theme: 'light' })}
              className={`p-4 rounded-2xl border flex items-center gap-3 text-left transition ${
                formData.theme === 'light'
                  ? 'border-indigo-600 bg-indigo-50/50 text-indigo-900 ring-2 ring-indigo-500/20'
                  : 'border-slate-200 hover:bg-slate-50 text-slate-700'
              }`}
            >
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center">
                <Sun className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-sm block">Light Mode</span>
                <span className="text-[11px] text-slate-500">Default clean campus palette</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setFormData({ ...formData, theme: 'dark' })}
              className={`p-4 rounded-2xl border flex items-center gap-3 text-left transition ${
                formData.theme === 'dark'
                  ? 'border-indigo-600 bg-indigo-50/50 text-indigo-900 ring-2 ring-indigo-500/20'
                  : 'border-slate-200 hover:bg-slate-50 text-slate-700'
              }`}
            >
              <div className="w-8 h-8 rounded-lg bg-slate-800 text-slate-200 flex items-center justify-center">
                <Moon className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-sm block">Dark Accents</span>
                <span className="text-[11px] text-slate-500">High contrast for night labs</span>
              </div>
            </button>
          </div>
        </div>

        {/* Notifications Simulation */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Notification Simulation</h2>
              <p className="text-xs text-slate-500">
                Choose simulated alerts for matches and handover updates
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {[
              {
                id: 'matchAlerts',
                title: 'High-Confidence Smart Match Alerts',
                desc: 'Prompt notification when a report scores >= 75% compatibility with your lost items.'
              },
              {
                id: 'statusUpdates',
                title: 'Status Progression Updates',
                desc: 'Simulated updates when items change state to Potential Match or Recovered.'
              },
              {
                id: 'campusBulletins',
                title: 'Campus High-Value Lost Item Broadcasts',
                desc: 'Alerts when laptops, official smart IDs, or car keyfobs are reported missing.'
              },
              {
                id: 'emailSummary',
                title: 'Daily Campus Recovery Digest',
                desc: 'Simulated daily round-up of returned belongings across campus sectors.'
              }
            ].map((item) => (
              <label
                key={item.id}
                className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={formData.notifications[item.id]}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      notifications: {
                        ...formData.notifications,
                        [item.id]: e.target.checked
                      }
                    })
                  }
                  className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4 mt-0.5"
                />
                <div>
                  <span className="text-sm font-semibold text-slate-800 block">
                    {item.title}
                  </span>
                  <span className="text-xs text-slate-500">{item.desc}</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex items-center justify-between pt-2">
          {savedSuccess ? (
            <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Preferences saved!
            </span>
          ) : (
            <span className="text-xs text-slate-400">Settings persist in localStorage</span>
          )}

          <button
            type="submit"
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl shadow transition"
          >
            Save Preferences
          </button>
        </div>
      </form>

      {/* Reset & Storage Management */}
      <div className="bg-rose-50/50 border border-rose-200/80 rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center">
            <Trash2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">Reset Application Demo Data</h2>
            <p className="text-xs text-slate-500">
              Clear your custom local storage additions and reset back to original seed items
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          This will wipe any newly created lost/found reports and restore the default 11 lost items and 11 found items designed for testing the Smart Matching engine.
        </p>

        <div className="pt-2 flex items-center justify-end">
          <button
            type="button"
            onClick={() => setConfirmResetOpen(true)}
            className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs rounded-xl shadow-sm transition flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo State</span>
          </button>
        </div>
      </div>

      {/* Confirm Reset Modal */}
      <ConfirmationModal
        isOpen={confirmResetOpen}
        onClose={() => setConfirmResetOpen(false)}
        onConfirm={handleReset}
        title="Reset all campus demo data?"
        message="This action will clear all custom reports, reset preferences, and seed the original campus demo database."
        confirmLabel="Reset Everything"
        confirmVariant="danger"
      />
    </div>
  );
};

export default SettingsPage;

