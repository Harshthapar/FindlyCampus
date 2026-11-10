import React from 'react';
import { Filter } from 'lucide-react';

const FilterDropdown = ({ label, value, options, onChange, allLabel = 'All' }) => {
  return (
    <div className="flex flex-col gap-1 w-full sm:w-auto">
      {label && <label className="text-xs font-semibold text-slate-500">{label}</label>}
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="appearance-none w-full sm:w-48 bg-white border border-slate-200 text-slate-800 text-sm font-medium rounded-xl pl-3.5 pr-8 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm cursor-pointer"
        >
          <option value="">{allLabel}</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-slate-400">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default FilterDropdown;

