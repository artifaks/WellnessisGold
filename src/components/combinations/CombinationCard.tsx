import React from 'react';
import { Heart, Share2, Printer, BookmarkPlus, ExternalLink } from 'lucide-react';
import type { HerbCombination } from '../../types/combination';

interface CombinationCardProps {
  combination: HerbCombination;
  onSave?: () => void;
  onShare?: () => void;
  onPrint?: () => void;
  isSaved?: boolean;
}

export default function CombinationCard({
  combination,
  onSave,
  onShare,
  onPrint,
  isSaved = false
}: CombinationCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="relative h-48">
        <img
          src={combination.image}
          alt={combination.name}
          className="w-full h-full object-cover"
        />
        {combination.isVerified && (
          <div className="absolute top-2 left-2 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
            Verified
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{combination.name}</h3>
        <p className="text-gray-600 text-sm mb-4">{combination.description}</p>

        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Herbs:</h4>
          <div className="flex flex-wrap gap-2">
            {combination.herbs.map((herb) => (
              <span
                key={herb}
                className="px-2 py-1 bg-green-50 text-green-700 rounded-full text-xs"
              >
                {herb}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Benefits:</h4>
          <ul className="list-disc list-inside text-sm text-gray-600">
            {combination.benefits.map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>
        </div>

        <div className="border-t pt-4 mt-4">
          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              <button
                onClick={onSave}
                className={`p-2 rounded-full ${
                  isSaved
                    ? 'text-red-600 bg-red-50 hover:bg-red-100'
                    : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                }`}
                title={isSaved ? 'Remove from favorites' : 'Save to favorites'}
              >
                <Heart size={20} className={isSaved ? 'fill-current' : ''} />
              </button>
              <button
                onClick={onShare}
                className="p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                title="Share combination"
              >
                <Share2 size={20} />
              </button>
              <button
                onClick={onPrint}
                className="p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                title="Print information"
              >
                <Printer size={20} />
              </button>
            </div>
            <button
              onClick={() => window.print()}
              className="flex items-center space-x-1 text-sm text-green-600 hover:text-green-700"
            >
              <span>View Details</span>
              <ExternalLink size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}