import React from 'react';
import { Search, Filter } from 'lucide-react';

interface FilterPanelProps {
  search: string;
  onSearchChange: (value: string) => void;
  categories: string[];
  selectedCategories: string[];
  onCategoryChange: (category: string) => void;
  conditions: string[];
  selectedConditions: string[];
  onConditionChange: (condition: string) => void;
}

export default function FilterPanel({
  search,
  onSearchChange,
  categories,
  selectedCategories,
  onCategoryChange,
  conditions,
  selectedConditions,
  onConditionChange,
}: FilterPanelProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700">
            Search Herbs
          </label>
          <div className="flex items-center space-x-1 text-xs text-gray-500">
            <Filter size={12} />
            <span>{selectedCategories.length + selectedConditions.length} active filters</span>
          </div>
        </div>
        <div className="relative">
          <input
            type="text"
            id="search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Search by name, property, or use..."
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          {search && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          )}
        </div>
        <p className="mt-1 text-xs text-gray-500">
          Try searching for "digestive", "anxiety", or specific herb names
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Categories</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
            {categories.map((category) => (
              <label key={category} className="flex items-center group hover:bg-green-50 rounded-md p-1 transition-colors">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => onCategoryChange(category)}
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <span className="ml-2 text-sm text-gray-600 group-hover:text-gray-900">
                  {category}
                </span>
                <span className="ml-auto text-xs text-gray-400 group-hover:text-gray-500">
                  ({categories.filter(c => c === category).length})
                </span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Health Conditions</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
            {conditions.map((condition) => (
              <label key={condition} className="flex items-center group hover:bg-green-50 rounded-md p-1 transition-colors">
                <input
                  type="checkbox"
                  checked={selectedConditions.includes(condition)}
                  onChange={() => onConditionChange(condition)}
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <span className="ml-2 text-sm text-gray-600 group-hover:text-gray-900">
                  {condition}
                </span>
                <span className="ml-auto text-xs text-gray-400 group-hover:text-gray-500">
                  ({conditions.filter(c => c === condition).length})
                </span>
              </label>
            ))}
          </div>
        </div>

        {(selectedCategories.length > 0 || selectedConditions.length > 0) && (
          <button
            onClick={() => {
              onSearchChange('');
              selectedCategories.forEach(onCategoryChange);
              selectedConditions.forEach(onConditionChange);
            }}
            className="w-full py-2 px-4 bg-gray-50 text-gray-600 text-sm rounded-lg hover:bg-gray-100 transition-colors"
          >
            Clear all filters
          </button>
        )}
      </div>
    </div>
  );
}