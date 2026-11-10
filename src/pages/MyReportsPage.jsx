import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  PlusCircle,
  Edit2,
  Trash2,
  CheckCircle2,
  ShieldCheck,
  Eye,
  Sparkles,
  AlertCircle,
  Calendar,
  MapPin,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import StatusBadge from '../components/StatusBadge';
import ConfirmationModal from '../components/ConfirmationModal';
import EmptyState from '../components/EmptyState';
import { CATEGORIES, CAMPUS_LOCATIONS, COLOR_OPTIONS } from '../data/mockData';

const MyReportsPage = () => {
  const {
    lostItems,
    foundItems,
    updateItemDetails,
    removeItem,
    markItemAsRecovered,
    markItemAsReturned
  } = useApp();

  const [activeTab, setActiveTab] = useState('lost'); // 'lost' | 'found'
  const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'active', 'recovered', 'returned', 'potential match'

  // Edit report state
  const [editingItem, setEditingItem] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);

  // Filter only items marked as created by current user
  const userLostReports = lostItems.filter((i) => i.isCurrentUser);
  const userFoundReports = foundItems.filter((i) => i.isCurrentUser);

  const currentList = activeTab === 'lost' ? userLostReports : userFoundReports;

  const filteredReports = currentList.filter((item) => {
    if (statusFilter === 'all') return true;
    return item.status.toLowerCase() === statusFilter.toLowerCase();
  });

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editingItem) return;
    updateItemDetails(activeTab, editingItem);
    setEditingItem(null);
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      removeItem(itemToDelete.type, itemToDelete.id);
      setItemToDelete(null);
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold mb-2">
            <span>Student Dashboard Center</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            My Campus Reports
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage your submitted lost and found listings, update statuses, edit descriptions, or mark items as recovered.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/report?tab=lost"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-rose-500 hover:bg-rose-600 transition"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>New Lost Report</span>
          </Link>
          <Link
            to="/report?tab=found"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 transition"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>New Found Report</span>
          </Link>
        </div>
      </div>

      {/* Tabs & Status Filters */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Tab switch */}
        <div className="flex items-center p-1 bg-slate-100 rounded-xl w-full sm:w-auto">
          <button
            onClick={() => {
              setActiveTab('lost');
              setStatusFilter('all');
            }}
            className={`flex-1 sm:flex-initial px-5 py-2 rounded-lg text-xs font-bold transition ${
              activeTab === 'lost'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            My Lost Items ({userLostReports.length})
          </button>
          <button
            onClick={() => {
              setActiveTab('found');
              setStatusFilter('all');
            }}
            className={`flex-1 sm:flex-initial px-5 py-2 rounded-lg text-xs font-bold transition ${
              activeTab === 'found'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            My Found Items ({userFoundReports.length})
          </button>
        </div>

        {/* Status Pills */}
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto justify-start sm:justify-end">
          <span className="text-xs text-slate-400 mr-1 font-medium">Filter Status:</span>
          {['all', 'active', 'potential match', 'recovered', 'returned'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition ${
                statusFilter === st
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Report Items List */}
      {filteredReports.length > 0 ? (
        <div className="space-y-4">
          {filteredReports.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4 flex-1">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 rounded-xl object-cover border border-slate-200 shrink-0"
                />
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                      {item.category}
                    </span>
                    <StatusBadge status={item.status} size="xs" />
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {item.date}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900">{item.name}</h3>
                  <p className="text-xs text-slate-500 line-clamp-1">{item.description}</p>

                  <div className="flex items-center gap-3 text-xs text-slate-600 pt-1">
                    <span className="flex items-center gap-1 text-slate-500">
                      <MapPin className="w-3.5 h-3.5 text-rose-500" />
                      {item.location}
                    </span>
                    <span>•</span>
                    <span>Color: <strong>{item.color}</strong></span>
                    {item.brand && (
                      <>
                        <span>•</span>
                        <span>Brand: <strong>{item.brand}</strong></span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 w-full md:w-auto justify-end pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                <Link
                  to={`/item/${activeTab}/${item.id}`}
                  className="p-2 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                  title="View Public Listing"
                >
                  <Eye className="w-4 h-4" />
                </Link>

                <button
                  onClick={() => setEditingItem({ ...item })}
                  className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                  title="Edit Report"
                >
                  <Edit2 className="w-4 h-4" />
                </button>

                {/* Mark recovered or returned */}
                {item.status === 'Active' && (
                  <button
                    onClick={() => {
                      if (activeTab === 'lost') {
                        markItemAsRecovered(item.id);
                      } else {
                        markItemAsReturned(item.id);
                      }
                    }}
                    className="px-3 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold text-xs rounded-lg transition border border-emerald-200"
                  >
                    {activeTab === 'lost' ? 'Recovered' : 'Returned'}
                  </button>
                )}

                <button
                  onClick={() => setItemToDelete({ type: activeTab, id: item.id })}
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                  title="Delete Report"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={FileText}
          title={`No ${activeTab} reports match your filter`}
          description={`You haven't posted any ${activeTab} items under this filter yet.`}
          actionLabel={`Report a ${activeTab === 'lost' ? 'Lost' : 'Found'} Item`}
          actionLink={`/report?tab=${activeTab}`}
        />
      )}

      {/* Edit Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-lg font-bold text-slate-900">Edit Report Details</h3>
              <button
                onClick={() => setEditingItem(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Item Title
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.name}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, name: e.target.value })
                  }
                  className="w-full px-3.5 py-2 border rounded-xl text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Category
                  </label>
                  <select
                    value={editingItem.category}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, category: e.target.value })
                    }
                    className="w-full px-3.5 py-2 border rounded-xl text-sm bg-white"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Status
                  </label>
                  <select
                    value={editingItem.status}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, status: e.target.value })
                    }
                    className="w-full px-3.5 py-2 border rounded-xl text-sm bg-white"
                  >
                    <option value="Active">Active</option>
                    <option value="Potential Match">Potential Match</option>
                    <option value="Recovered">Recovered</option>
                    <option value="Returned">Returned</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Color
                  </label>
                  <select
                    value={editingItem.color}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, color: e.target.value })
                    }
                    className="w-full px-3.5 py-2 border rounded-xl text-sm bg-white"
                  >
                    {COLOR_OPTIONS.map((co) => (
                      <option key={co} value={co}>
                        {co}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Brand
                  </label>
                  <input
                    type="text"
                    value={editingItem.brand || ''}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, brand: e.target.value })
                    }
                    className="w-full px-3.5 py-2 border rounded-xl text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Location
                </label>
                <select
                  value={editingItem.location}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, location: e.target.value })
                  }
                  className="w-full px-3.5 py-2 border rounded-xl text-sm bg-white"
                >
                  {CAMPUS_LOCATIONS.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={editingItem.description}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, description: e.target.value })
                  }
                  className="w-full px-3.5 py-2 border rounded-xl text-sm"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-sm"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmationModal
        isOpen={!!itemToDelete}
        onClose={() => setItemToDelete(null)}
        onConfirm={confirmDelete}
        title="Delete this report permanently?"
        message="This item report will be permanently removed from the campus board and smart matching index."
        confirmLabel="Delete Report"
        confirmVariant="danger"
      />
    </div>
  );
};

export default MyReportsPage;

