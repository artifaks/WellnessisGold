import React, { useState, useMemo } from 'react';
import { Leaf, Plus, BookOpen } from 'lucide-react';
import { herbs, categories, conditions, herbGroups } from './data/herbs';
import { useCustomHerbs } from './hooks/useCustomHerbs';
import FilterPanel from './components/FilterPanel';
import HerbCard from './components/HerbCard';
import HerbModal from './components/HerbModal';
import TabNavigation from './components/TabNavigation';
import type { Herb, CustomHerb } from './types/herb';

function App() {
  const [search, setSearch] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [herbToEdit, setHerbToEdit] = useState<CustomHerb | null>(null);
  const [showWelcome, setShowWelcome] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  const {
    customHerbs,
    addCustomHerb,
    updateCustomHerb,
    deleteCustomHerb,
  } = useCustomHerbs();

  const allHerbs = useMemo(() => [...herbs, ...customHerbs], [customHerbs]);

  const filteredHerbs = useMemo(() => {
    const searchTerms = search.toLowerCase().split(' ').filter(Boolean);
    
    return allHerbs.filter((herb) => {
      // If no search terms, only apply category and condition filters
      if (searchTerms.length === 0) {
        const matchesCategories = selectedCategories.length === 0 ||
          selectedCategories.some(cat => herb.category.includes(cat));
        
        const matchesConditions = selectedConditions.length === 0 ||
          selectedConditions.some(condition => herb.conditions.includes(condition));
        
        const matchesTab = activeTab === 'all' || herb.herbGroup === activeTab;

        return matchesCategories && matchesConditions && matchesTab;
      }

      // Check if all search terms match any of the herb's searchable fields
      const matchesSearch = searchTerms.every(term => {
        const searchableText = [
          herb.name,
          herb.scientificName,
          ...herb.category,
          ...herb.conditions,
          ...herb.benefits,
          ...herb.traditionalUses
        ].join(' ').toLowerCase();

        return searchableText.includes(term);
      });
      
      const matchesCategories = selectedCategories.length === 0 ||
        selectedCategories.some(cat => herb.category.includes(cat));
      
      const matchesConditions = selectedConditions.length === 0 ||
        selectedConditions.some(condition => herb.conditions.includes(condition));
      
      const matchesTab = activeTab === 'all' || herb.herbGroup === activeTab;

      return matchesSearch && matchesCategories && matchesConditions && matchesTab;
    });
  }, [allHerbs, search, selectedCategories, selectedConditions, activeTab]);

  const handleEditHerb = (herb: Herb) => {
    if (herb.isCustom) {
      setHerbToEdit(herb as CustomHerb);
      setIsModalOpen(true);
    }
  };

  const handleSaveHerb = (herbData: Omit<CustomHerb, 'id' | 'isCustom'>) => {
    if (herbToEdit) {
      updateCustomHerb(herbToEdit.id, herbData);
      setHerbToEdit(null);
    } else {
      addCustomHerb(herbData);
    }
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const toggleCondition = (condition: string) => {
    setSelectedConditions(prev =>
      prev.includes(condition)
        ? prev.filter(c => c !== condition)
        : [...prev, condition]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <Leaf className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  <span className="text-green-600">Wellnessisgolden.com</span>
                  <span className="mx-2">|</span>
                  <span>Herbal Medicine Guide</span>
                </h1>
                <p className="text-sm text-gray-500">Discover nature's healing wisdom</p>
              </div>
            </div>
            <button
              onClick={() => {
                setHerbToEdit(null);
                setIsModalOpen(true);
              }}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-sm"
            >
              <Plus size={20} />
              <span>Add Custom Herb</span>
            </button>
          </div>
        </div>
      </header>

      {showWelcome && (
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <BookOpen className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">Welcome to the Herbal Medicine Guide</h2>
                  <p className="text-gray-600 mt-1">Explore our comprehensive database of medicinal herbs and their traditional uses.</p>
                </div>
              </div>
              <button
                onClick={() => setShowWelcome(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                ×
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <FilterPanel
                search={search}
                onSearchChange={setSearch}
                categories={categories}
                selectedCategories={selectedCategories}
                onCategoryChange={toggleCategory}
                conditions={conditions}
                selectedConditions={selectedConditions}
                onConditionChange={toggleCondition}
              />
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="mb-6 flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
              <p className="text-gray-600">
                Showing {filteredHerbs.length} {filteredHerbs.length === 1 ? 'herb' : 'herbs'}
                {activeTab !== 'all' && ` in ${herbGroups[activeTab as keyof typeof herbGroups]}`}
                {(selectedCategories.length > 0 || selectedConditions.length > 0) && ' matching your filters'}
              </p>
              {(selectedCategories.length > 0 || selectedConditions.length > 0) && (
                <button
                  onClick={() => {
                    setSelectedCategories([]);
                    setSelectedConditions([]);
                  }}
                  className="text-sm text-green-600 hover:text-green-700"
                >
                  Clear all filters
                </button>
              )}
            </div>

            {filteredHerbs.length === 0 ? (
              <div className="bg-white rounded-lg p-8 text-center shadow-sm">
                <div className="inline-block p-3 bg-green-100 rounded-full mb-4">
                  <Leaf className="h-8 w-8 text-green-600" />
                </div>
                <p className="text-gray-500 text-lg mb-4">No herbs found matching your criteria.</p>
                <button
                  onClick={() => {
                    setSelectedCategories([]);
                    setSelectedConditions([]);
                    setSearch('');
                    setActiveTab('all');
                  }}
                  className="text-green-600 hover:text-green-700 font-medium"
                >
                  Reset all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredHerbs.map((herb) => (
                  <HerbCard
                    key={herb.id}
                    herb={herb}
                    onEdit={handleEditHerb}
                    onDelete={deleteCustomHerb}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <HerbModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setHerbToEdit(null);
        }}
        onSave={handleSaveHerb}
        initialData={herbToEdit}
      />
    </div>
  );
}

export default App;