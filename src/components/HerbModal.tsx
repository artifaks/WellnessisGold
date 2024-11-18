import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import type { CustomHerb } from '../types/herb';

interface HerbModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (herbData: Omit<CustomHerb, 'id' | 'isCustom'>) => void;
  initialData: CustomHerb | null;
}

export default function HerbModal({ isOpen, onClose, onSave, initialData }: HerbModalProps) {
  const [formData, setFormData] = useState<Omit<CustomHerb, 'id' | 'isCustom'>>({
    name: '',
    scientificName: '',
    category: [],
    benefits: [],
    traditionalUses: [],
    dosage: '',
    interactions: [],
    precautions: [],
    image: '',
    conditions: [],
    herbGroup: 'all',
    growingSeason: '',
    careInstructions: '',
  });

  useEffect(() => {
    if (initialData) {
      const { id, isCustom, ...rest } = initialData;
      setFormData(rest);
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleArrayInput = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    field: keyof CustomHerb
  ) => {
    const value = e.target.value.split('\n').filter(Boolean);
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">
              {initialData ? 'Edit' : 'Add'} Custom Herb
            </h2>
            <button onClick={onClose}>
              <X className="h-6 w-6 text-gray-400 hover:text-gray-500" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Scientific Name
                </label>
                <input
                  type="text"
                  value={formData.scientificName}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, scientificName: e.target.value }))
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Categories</label>
              <textarea
                value={formData.category.join('\n')}
                onChange={(e) => handleArrayInput(e, 'category')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                placeholder="Enter categories (one per line)"
                rows={3}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Benefits</label>
              <textarea
                value={formData.benefits.join('\n')}
                onChange={(e) => handleArrayInput(e, 'benefits')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                placeholder="Enter benefits (one per line)"
                rows={3}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Traditional Uses
              </label>
              <textarea
                value={formData.traditionalUses.join('\n')}
                onChange={(e) => handleArrayInput(e, 'traditionalUses')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                placeholder="Enter traditional uses (one per line)"
                rows={3}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Dosage</label>
              <input
                type="text"
                value={formData.dosage}
                onChange={(e) => setFormData((prev) => ({ ...prev, dosage: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Growing Season
                </label>
                <input
                  type="text"
                  value={formData.growingSeason}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, growingSeason: e.target.value }))
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Care Instructions
                </label>
                <input
                  type="text"
                  value={formData.careInstructions}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, careInstructions: e.target.value }))
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Image URL</label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData((prev) => ({ ...prev, image: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                required
              />
            </div>

            <div className="flex justify-end space-x-3 pt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700"
              >
                {initialData ? 'Update' : 'Add'} Herb
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}