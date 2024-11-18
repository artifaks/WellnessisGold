import React, { useState } from 'react';
import { X, Plus, Trash } from 'lucide-react';
import type { HerbCombination } from '../../types/combination';

interface CombinationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<HerbCombination>) => void;
  initialData?: HerbCombination;
}

export default function CombinationModal({
  isOpen,
  onClose,
  onSave,
  initialData
}: CombinationModalProps) {
  const [formData, setFormData] = useState<Partial<HerbCombination>>(
    initialData || {
      name: '',
      description: '',
      herbs: [],
      benefits: [],
      scientificEvidence: [],
      dosage: '',
      interactions: [],
      contraindications: [],
      image: ''
    }
  );

  const [newReference, setNewReference] = useState({ summary: '', references: [''] });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const addReference = () => {
    setFormData(prev => ({
      ...prev,
      scientificEvidence: [
        ...(prev.scientificEvidence || []),
        newReference
      ]
    }));
    setNewReference({ summary: '', references: [''] });
  };

  const removeReference = (index: number) => {
    setFormData(prev => ({
      ...prev,
      scientificEvidence: prev.scientificEvidence?.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">
              {initialData ? 'Edit' : 'Add'} Herb Combination
            </h2>
            <button onClick={onClose}>
              <X className="h-6 w-6 text-gray-400 hover:text-gray-500" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={formData.description || ''}
                  onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  rows={3}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Scientific Evidence</label>
                <div className="space-y-4">
                  {formData.scientificEvidence?.map((evidence, index) => (
                    <div key={index} className="border rounded-md p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-sm font-medium">Reference #{index + 1}</h4>
                        <button
                          type="button"
                          onClick={() => removeReference(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash size={16} />
                        </button>
                      </div>
                      <textarea
                        value={evidence.summary}
                        onChange={e => {
                          const newEvidence = [...(formData.scientificEvidence || [])];
                          newEvidence[index] = { ...evidence, summary: e.target.value };
                          setFormData(prev => ({ ...prev, scientificEvidence: newEvidence }));
                        }}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                        placeholder="Summary of findings"
                        rows={2}
                      />
                      <div className="mt-2 space-y-2">
                        {evidence.references.map((ref, refIndex) => (
                          <input
                            key={refIndex}
                            type="text"
                            value={ref}
                            onChange={e => {
                              const newEvidence = [...(formData.scientificEvidence || [])];
                              newEvidence[index].references[refIndex] = e.target.value;
                              setFormData(prev => ({ ...prev, scientificEvidence: newEvidence }));
                            }}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                            placeholder="Reference citation"
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addReference}
                    className="flex items-center space-x-2 text-green-600 hover:text-green-700"
                  >
                    <Plus size={16} />
                    <span>Add Reference</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Image URL</label>
                <input
                  type="url"
                  value={formData.image || ''}
                  onChange={e => setFormData(prev => ({ ...prev, image: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  required
                />
              </div>
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
                {initialData ? 'Update' : 'Add'} Combination
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}