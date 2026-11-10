import React, { useState, useMemo } from 'react';
import { Search, PlusCircle, SlidersHorizontal, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import ItemCard from '../components/ItemCard';
import SearchBar from '../components/SearchBar';
import FilterDropdown from '../components/FilterDropdown';
import EmptyState from '../components/EmptyState';
import { CATEGORIES, CAMPUS_LOCATIONS } from '../data/mockData';

const LostItemsPage = () => {
  const { lostItems } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [sortBy, setSortBy] = useState('newest'); // newest, oldest, name

  const filteredItems = useMemo(() => {
    return lostItems
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
  }, [lostItems, searchQuery, selectedCategory, selectedLocation, sortBy]);

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
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold mb-2">
            <span>Missing Possessions Registry</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Lost Items on Campus
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Browse through items students have misplaced. If you recognized something, contact the reporter to help return it.
          </p>
        </div>

        <Link
          to="/report?tab=lost"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm transition shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Report a Lost Item</span>
        </Link>
      </div>

      {/* Filters and Controls */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="md:col-span-6 lg:col-span-5">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search lost items (e.g. AirPods, Wallet, Blue bottle)..."
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
              allLabel="All Campus Locations"
              value={selectedLocation}
              options={CAMPUS_LOCATIONS}
              onChange={setSelectedLocation}
            />

            <div className="w-full sm:w-auto">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full sm:w-36 bg-white border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-sm cursor-pointer"
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
            {lostItems.length} lost items
          </div>
          {selectedCategory && (
            <span className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-md font-medium">
              Category: {selectedCategory}
            </span>
          )}
          {selectedLocation && (
            <span className="bg-rose-50 text-rose-700 px-2 py-0.5 rounded-md font-medium">
              Location: {selectedLocation}
            </span>
          )}
        </div>
      </div>

      {/* Grid of Items */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <ItemCard key={item.id} item={item} type="lost" />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Search}
          title="No lost items match your criteria"
          description="We couldn't find any lost items matching your search or filters. Try resetting the filters or report a new lost item."
          actionLabel="Report Lost Item"
          actionLink="/report?tab=lost"
        />
      )}
    </div>
  );
};

export default LostItemsPage;

