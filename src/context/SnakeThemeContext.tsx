import React, { createContext, useContext, useMemo, useState } from 'react';

export const DEFAULT_PRIMARY_COLOR = '#8B5CF6';
export const DEFAULT_SECONDARY_COLOR = '#61DAFB';

export type SnakeThemeContextValue = {
  primaryColor: string;
  secondaryColor: string;
  setPrimaryColor: (color: string) => void;
  setSecondaryColor: (color: string) => void;
};

const SnakeThemeContext = createContext<SnakeThemeContextValue | null>(null);

export function SnakeThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [primaryColor, setPrimaryColor] = useState(DEFAULT_PRIMARY_COLOR);
  const [secondaryColor, setSecondaryColor] = useState(DEFAULT_SECONDARY_COLOR);

  const value = useMemo(
    (): SnakeThemeContextValue => ({
      primaryColor,
      secondaryColor,
      setPrimaryColor,
      setSecondaryColor,
    }),
    [primaryColor, secondaryColor]
  );

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
