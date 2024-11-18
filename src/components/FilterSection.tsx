import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FilterSectionProps {
  title: string;
  options: string[];
  selected: string[];
  onChange: (value: string) => void;
}

export default function FilterSection({ title, options, selected, onChange }: FilterSectionProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="mb-6">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between text-lg font-semibold mb-2 text-left hover:text-green-700"
      >
        <span>{title}</span>
        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>
      
      {isExpanded && (
        <div className="space-y-2 max-h-48 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-green-200 scrollbar-track-transparent">
          {options.map((option) => (
            <label key={option} className="flex items-center space-x-2 hover:bg-green-50 p-1 rounded cursor-pointer">
              <input
                type="checkbox"
                checked={selected.includes(option)}
                onChange={() => onChange(option)}
                className="rounded text-green-600 focus:ring-green-500"
              />
              <span className="text-gray-700 text-sm">{option}</span>
              <span className="text-gray-400 text-xs ml-auto">
                ({option.split(',').length})
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}