import { useState, useEffect } from 'react';
import type { HerbCombination, SavedCombination, UserNote } from '../types/combination';
import { combinations as initialCombinations } from '../data/combinations';

export function useCombinations() {
  const [combinations, setCombinations] = useState<HerbCombination[]>(() => {
    const saved = localStorage.getItem('combinations');
    return saved ? JSON.parse(saved) : initialCombinations;
  });

  const [savedCombinations, setSavedCombinations] = useState<SavedCombination[]>(() => {
    const saved = localStorage.getItem('savedCombinations');
    return saved ? JSON.parse(saved) : [];
  });

  const [userNotes, setUserNotes] = useState<UserNote[]>(() => {
    const saved = localStorage.getItem('combinationNotes');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('combinations', JSON.stringify(combinations));
  }, [combinations]);

  useEffect(() => {
    localStorage.setItem('savedCombinations', JSON.stringify(savedCombinations));
  }, [savedCombinations]);

  useEffect(() => {
    localStorage.setItem('combinationNotes', JSON.stringify(userNotes));
  }, [userNotes]);

  const addCombination = (combination: Omit<HerbCombination, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newCombination: HerbCombination = {
      ...combination,
      id: `combination-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setCombinations(prev => [...prev, newCombination]);
  };

  const updateCombination = (id: string, data: Partial<HerbCombination>) => {
    setCombinations(prev =>
      prev.map(combination =>
        combination.id === id
          ? { ...combination, ...data, updatedAt: new Date().toISOString() }
          : combination
      )
    );
  };

  const deleteCombination = (id: string) => {
    setCombinations(prev => prev.filter(combination => combination.id !== id));
    setSavedCombinations(prev => prev.filter(saved => saved.combinationId !== id));
    setUserNotes(prev => prev.filter(note => note.combinationId !== id));
  };

  const toggleSavedCombination = (combinationId: string, userId: string) => {
    setSavedCombinations(prev => {
      const exists = prev.find(
        saved => saved.combinationId === combinationId && saved.userId === userId
      );
      
      if (exists) {
        return prev.filter(saved => saved.combinationId !== combinationId || saved.userId !== userId);
      }

      return [...prev, {
        combinationId,
        userId,
        savedAt: new Date().toISOString(),
        personalNotes: ''
      }];
    });
  };

  const updateNote = (combinationId: string, userId: string, note: string) => {
    setUserNotes(prev => {
      const existingNote = prev.find(
        n => n.combinationId === combinationId && n.userId === userId
      );

      if (existingNote) {
        return prev.map(n =>
          n.combinationId === combinationId && n.userId === userId
            ? { ...n, note, updatedAt: new Date().toISOString() }
            : n
        );
      }

      return [...prev, {
        id: `note-${Date.now()}`,
        combinationId,
        userId,
        note,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }];
    });
  };

  return {
    combinations,
    savedCombinations,
    userNotes,
    addCombination,
    updateCombination,
    deleteCombination,
    toggleSavedCombination,
    updateNote
  };
}