import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import type { Herb } from '../types/herb';

interface HerbCardProps {
  herb: Herb;
  onEdit?: (herb: Herb) => void;
  onDelete?: (id: string) => void;
}

export default function HerbCard({ herb, onEdit, onDelete }: HerbCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="relative h-48">
        <img
          src={herb.image}
          alt={herb.name}
          className="w-full h-full object-cover"
        />
        {herb.isCustom && (
          <div className="absolute top-2 right-2 flex space-x-2">
            <button
              onClick={() => onEdit?.(herb)}
              className="p-1 bg-white rounded-full shadow-sm hover:bg-gray-50"
            >
              <Edit2 className="h-4 w-4 text-gray-600" />
            </button>
            <button
              onClick={() => onDelete?.(herb.id)}
              className="p-1 bg-white rounded-full shadow-sm hover:bg-gray-50"
            >
              <Trash2 className="h-4 w-4 text-red-600" />
            </button>
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{herb.name}</h3>
            <p className="text-sm text-gray-500 italic">{herb.scientificName}</p>
          </div>
        </div>
        <div className="mb-4">
          <div className="flex flex-wrap gap-2 mb-2">
            {herb.category.map((cat) => (
              <span
                key={cat}
                className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <div>
            <h4 className="text-sm font-medium text-gray-700">Benefits:</h4>
            <ul className="list-disc list-inside text-sm text-gray-600 ml-2">
              {herb.benefits.slice(0, 3).map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-700">Traditional Uses:</h4>
            <ul className="list-disc list-inside text-sm text-gray-600 ml-2">
              {herb.traditionalUses.slice(0, 3).map((use, index) => (
                <li key={index}>{use}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-700">Dosage:</h4>
            <p className="text-sm text-gray-600">{herb.dosage}</p>
          </div>
        </div>
      </div>
    </div>
  );
}