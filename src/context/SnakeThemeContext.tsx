import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { CategorysList } from '../models/CategoryModel';

export type SnakeThemeContextValue = {
  categoryIndex: number;
  competenceIndex: number;
  selectCategory: (index: number) => void;
  selectCompetence: (index: number) => void;
  /** Cor da categoria — listra ímpar (0, 2, 4…) */
  stripeA: string;
  /** Cor da competência — listra par */
  stripeB: string;
};

const SnakeThemeContext = createContext<SnakeThemeContextValue | null>(null);

export function SnakeThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [competenceIndex, setCompetenceIndex] = useState(0);

  const selectCategory = useCallback((index: number) => {
    setCategoryIndex(index);
    setCompetenceIndex(0);
  }, []);

  const selectCompetence = useCallback((index: number) => {
    setCompetenceIndex(index);
  }, []);

  const value = useMemo((): SnakeThemeContextValue => {
    const cat = CategorysList[categoryIndex] ?? CategorysList[0];
    const comps = cat.competences;
    const comp = comps[competenceIndex] ?? comps[0];
    const stripeB = comp?.color ?? cat.color;

    return {
      categoryIndex,
      competenceIndex,
      selectCategory,
      selectCompetence,
      stripeA: cat.color,
      stripeB,
    };
  }, [
    categoryIndex,
    competenceIndex,
    selectCategory,
    selectCompetence,
  ]);

  return (
    <SnakeThemeContext.Provider value={value}>
      {children}
    </SnakeThemeContext.Provider>
  );
}

export function useSnakeTheme(): SnakeThemeContextValue {
  const ctx = useContext(SnakeThemeContext);
  if (!ctx) {
    throw new Error('useSnakeTheme must be used within SnakeThemeProvider');
  }
  return ctx;
}
