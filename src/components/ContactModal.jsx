import React, { useState } from 'react';
import { X, Send, ShieldAlert, CheckCircle, Mail, Phone, MessageSquare, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

const ContactModal = ({ isOpen, onClose, item, type = 'lost' }) => {
  const { addToast } = useApp();
  const [formData, setFormData] = useState({
    name: 'Student Inquirer',
    email: 'student.inquiry@campus.edu',
    phone: '',
    claimProof: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen || !item) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    addToast('Simulation: Contact inquiry simulated! (Demo mode only)', 'info');
  };

  const resetAndClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              {type === 'lost' ? 'Reach Out to Item Owner' : 'Submit Ownership Claim'}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Regarding item: <span className="font-semibold text-slate-700">{item.name}</span>
            </p>
          </div>
          <button
            onClick={resetAndClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Demo Mode Notice */}
        <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2.5 text-xs text-amber-900">
          <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <strong className="font-bold">Frontend Prototype Simulation:</strong> No external emails or SMS messages will actually be dispatched. This interactive modal demonstrates the campus student verification and handoff workflow.
          </div>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-slate-900">Claim Request Simulated</h4>
            <p className="text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
              Your inquiry regarding <strong className="text-slate-800">{item.name}</strong> has been logged in this demo prototype session. In a live system, the campus lost & found administrator and reporter receive instant push & email alerts.
            </p>
            <div className="pt-2">
              <button
                onClick={resetAndClose}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-xl transition shadow-sm"
              >
                Close Dialog
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Your Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Campus Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Phone / WhatsApp (Optional)
                </label>
                <input
                  type="text"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Identifying Ownership Proof / Question *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Serial code last 4 digits, wallpaper description, card name"
                value={formData.claimProof}
                onChange={(e) => setFormData({ ...formData, claimProof: e.target.value })}
                className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">
                Never share full passwords or credit card numbers.
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Message / Meeting Preference *
              </label>
              <textarea
                required
                rows={3}
                placeholder="Suggest a safe handover campus spot (e.g., Library front desk or SAC security)..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 resize-none"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={resetAndClose}
                className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-xl transition shadow-sm"
              >
                <Send className="w-4 h-4" />
                Submit Simulated Inquiry
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ContactModal;

