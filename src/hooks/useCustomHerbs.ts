import { useState, useEffect } from 'react';
import type { CustomHerb } from '../types/herb';

export function useCustomHerbs() {
  const [customHerbs, setCustomHerbs] = useState<CustomHerb[]>(() => {
    const saved = localStorage.getItem('customHerbs');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('customHerbs', JSON.stringify(customHerbs));
  }, [customHerbs]);

  const addCustomHerb = (herbData: Omit<CustomHerb, 'id' | 'isCustom'>) => {
    const newHerb: CustomHerb = {
      ...herbData,
      id: `custom-${Date.now()}`,
      isCustom: true,
    };
    setCustomHerbs((prev) => [...prev, newHerb]);
  };

  const updateCustomHerb = (
    id: string,
    herbData: Omit<CustomHerb, 'id' | 'isCustom'>
  ) => {
    setCustomHerbs((prev) =>
      prev.map((herb) =>
        herb.id === id
          ? {
              ...herbData,
              id,
              isCustom: true,
            }
          : herb
      )
    );
  };

  const deleteCustomHerb = (id: string) => {
    setCustomHerbs((prev) => prev.filter((herb) => herb.id !== id));
  };

  return {
    customHerbs,
    addCustomHerb,
    updateCustomHerb,
    deleteCustomHerb,
  };
}