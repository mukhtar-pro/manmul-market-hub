
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark' | 'system';
type Font = 'default' | 'serif' | 'mono' | 'rounded';

interface ThemeContextType {
  theme: Theme;
  font: Font;
  setTheme: (theme: Theme) => void;
  setFont: (font: Font) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light');
  const [font, setFontState] = useState<Font>('default');

  useEffect(() => {
    // Load theme preference from localStorage
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    const savedFont = localStorage.getItem('font') as Font | null;
    
    if (savedTheme) {
      setThemeState(savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setThemeState('dark');
    }
    
    if (savedFont) {
      setFontState(savedFont);
    }
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove all theme classes
    root.classList.remove('light', 'dark');
    
    // Add the current theme class
    if (theme === 'system') {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        root.classList.add('dark');
      } else {
        root.classList.add('light');
      }
    } else {
      root.classList.add(theme);
    }
    
    // Save theme preference to localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove all font classes
    root.classList.remove('font-sans', 'font-serif', 'font-mono', 'font-rounded');
    
    // Add the current font class
    switch (font) {
      case 'serif':
        root.classList.add('font-serif');
        break;
      case 'mono':
        root.classList.add('font-mono');
        break;
      case 'rounded':
        root.classList.add('font-rounded');
        break;
      default:
        root.classList.add('font-sans');
        break;
    }
    
    // Save font preference to localStorage
    localStorage.setItem('font', font);
  }, [font]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const setFont = (newFont: Font) => {
    setFontState(newFont);
  };

  return (
    <ThemeContext.Provider value={{ theme, font, setTheme, setFont }}>
      {children}
    </ThemeContext.Provider>
  );
}
