import React, { useState, useMemo } from 'react';
import { CheckCircle2, PlusCircle, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import ItemCard from '../components/ItemCard';
import SearchBar from '../components/SearchBar';
import FilterDropdown from '../components/FilterDropdown';
import EmptyState from '../components/EmptyState';
import { CATEGORIES, CAMPUS_LOCATIONS } from '../data/mockData';

const FoundItemsPage = () => {
  const { foundItems } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [sortBy, setSortBy] = useState('newest'); // newest, oldest, name

  const filteredItems = useMemo(() => {
    return foundItems
      .filter((item) => {
        // Search filter
        const query = searchQuery.toLowerCase().trim();
        const matchesQuery =
          !query ||
          item.name.toLowerCase().includes(query) ||
          (item.description && item.description.toLowerCase().includes(query)) ||
          (item.brand && item.brand.toLowerCase().includes(query)) ||
          (item.color && item.color.toLowerCase().includes(query));

        // Category filter
        const matchesCategory = !selectedCategory || item.category === selectedCategory;

        // Location filter
        const matchesLocation = !selectedLocation || item.location === selectedLocation;

        return matchesQuery && matchesCategory && matchesLocation;
      })
      .sort((a, b) => {
        if (sortBy === 'newest') {
          return new Date(b.date || 0) - new Date(a.date || 0);
        }
        if (sortBy === 'oldest') {
          return new Date(a.date || 0) - new Date(b.date || 0);
        }
        if (sortBy === 'name') {
          return a.name.localeCompare(b.name);
        }
        return 0;
      });
  }, [foundItems, searchQuery, selectedCategory, selectedLocation, sortBy]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedLocation('');
    setSortBy('newest');
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-50 border border-teal-200 text-teal-700 text-xs font-bold mb-2">
            <span>Found Articles Safe Registry</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Found Items on Campus
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Items discovered and turned in by campus staff, faculty, and students waiting to be claimed by their rightful owners.
          </p>
        </div>

        <Link
          to="/report?tab=found"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 shadow-sm transition shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Report a Found Item</span>
        </Link>
      </div>

      {/* Filters and Controls */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="md:col-span-6 lg:col-span-5">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search found items (e.g. AirPods, Keys, Backpack)..."
            />
          </div>

          <div className="md:col-span-6 lg:col-span-7 flex flex-wrap sm:flex-nowrap gap-3 items-center">
            <FilterDropdown
              label=""
              allLabel="All Categories"
              value={selectedCategory}
              options={CATEGORIES}
              onChange={setSelectedCategory}
            />

            <FilterDropdown
              label=""
              allLabel="All Found Locations"
              value={selectedLocation}
              options={CAMPUS_LOCATIONS}
              onChange={setSelectedLocation}
            />

            <div className="w-full sm:w-auto">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full sm:w-36 bg-white border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 shadow-sm cursor-pointer"
              >
                <option value="newest">Sort: Newest</option>
                <option value="oldest">Sort: Oldest</option>
                <option value="name">Sort: Name (A-Z)</option>
              </select>
            </div>

            {(searchQuery || selectedCategory || selectedLocation || sortBy !== 'newest') && (
              <button
                onClick={clearFilters}
                className="p-2.5 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition shrink-0"
                title="Reset filters"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Active Filters Pill Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs text-slate-500">
          <div>
            Showing <strong className="text-slate-900">{filteredItems.length}</strong> of{' '}
            {foundItems.length} found items
          </div>
          {selectedCategory && (
            <span className="bg-teal-50 text-teal-800 px-2 py-0.5 rounded-md font-medium">
              Category: {selectedCategory}
            </span>
          )}
          {selectedLocation && (
            <span className="bg-teal-50 text-teal-800 px-2 py-0.5 rounded-md font-medium">
              Location: {selectedLocation}
            </span>
          )}
        </div>
      </div>

      {/* Grid of Items */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <ItemCard key={item.id} item={item} type="found" />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={CheckCircle2}
          title="No found items match your filters"
          description="We couldn't find any found items currently logged matching this query. You can check back shortly or file a lost item report."
          actionLabel="Report Found Item"
          actionLink="/report?tab=found"
        />
      )}
    </div>
  );
};

export default FoundItemsPage;

