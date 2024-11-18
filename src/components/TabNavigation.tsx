import React from 'react';
import { Sprout, Heart, Brain, Leaf } from 'lucide-react';

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: 'all', label: 'All Herbs', icon: Leaf },
  { id: 'digestive', label: 'Digestive Health', icon: Sprout },
  { id: 'immune', label: 'Immune Support', icon: Heart },
  { id: 'cognitive', label: 'Cognitive Health', icon: Brain },
];

export default function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  return (
    <div className="mb-8 border-b border-gray-200">
      <div className="flex space-x-8 overflow-x-auto">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
              activeTab === id
                ? 'border-green-500 text-green-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Icon size={20} />
            <span>{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}