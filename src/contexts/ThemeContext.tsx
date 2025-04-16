
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { toast } from "@/components/ui/use-toast";

interface ThemeOptions {
  color: string;
  font: string;
  fontSize: string;
}

interface ThemeContextType {
  theme: ThemeOptions;
  setThemeOption: (key: keyof ThemeOptions, value: string) => void;
  saveTheme: () => void;
}

const defaultTheme: ThemeOptions = {
  color: 'green',
  font: 'Roboto',
  fontSize: 'medium'
};

// Create the context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Custom hook to use the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Provider component
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<ThemeOptions>(() => {
    // Load saved theme from localStorage on initial render
    const savedTheme = localStorage.getItem('manmulshop-theme');
    return savedTheme ? JSON.parse(savedTheme) : defaultTheme;
  });

  // Apply theme when it changes
  useEffect(() => {
    // Apply color theme
    document.documentElement.style.setProperty('--primary', getThemeColorValue(theme.color));
    
    // Apply font family
    document.documentElement.style.setProperty('--font-family', theme.font);
    
    // Apply font size
    applyFontSize(theme.fontSize);
    
  }, [theme]);

  // Set individual theme option
  const setThemeOption = (key: keyof ThemeOptions, value: string) => {
    setTheme(prev => ({ ...prev, [key]: value }));
  };

  // Save theme to localStorage
  const saveTheme = () => {
    localStorage.setItem('manmulshop-theme', JSON.stringify(theme));
    toast({
      title: "Theme saved",
      description: "Your theme preferences have been saved",
    });
  };

  return (
    <ThemeContext.Provider value={{
      theme,
      setThemeOption,
      saveTheme
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Helper function to get CSS variable value for a theme color
function getThemeColorValue(color: string): string {
  switch (color) {
    case 'green':
      return '142 76% 36%';
    case 'blue':
      return '210 100% 50%';
    case 'purple':
      return '270 76% 50%';
    case 'red':
      return '0 100% 50%';
    case 'orange':
      return '30 100% 50%';
    default:
      return '142 76% 36%'; // Default green
  }
}

// Helper function to apply font size
function applyFontSize(size: string): void {
  const htmlElement = document.documentElement;
  
  switch (size) {
    case 'small':
      htmlElement.style.fontSize = '14px';
      break;
    case 'medium':
      htmlElement.style.fontSize = '16px';
      break;
    case 'large':
      htmlElement.style.fontSize = '18px';
      break;
    case 'x-large':
      htmlElement.style.fontSize = '20px';
      break;
    default:
      htmlElement.style.fontSize = '16px';
  }
}
