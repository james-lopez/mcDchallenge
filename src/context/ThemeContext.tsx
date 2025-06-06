import React, { createContext, useContext, useState } from 'react';
import { useColorScheme } from 'react-native';

type ThemeContextType = {
  isDarkMode: boolean;
  toggleTheme: () => void;
  colors: typeof lightColors;
};

const lightColors = {
  background: '#FFFFFF',
  text: '#000000',
  primary: '#f04e23',
  secondary: '#4285f4',
  card: '#FFFFFF',
  border: '#EEEEEE',
  error: '#ff4444',
  headerBackground: '#FFFFFF',
  headerText: '#000000'
};

const darkColors = {
  background: '#121212',
  text: '#FFFFFF',
  primary: '#f04e23',
  secondary: '#4285f4',
  card: '#1E1E1E',
  border: '#333333',
  error: '#ff4444',
  headerBackground: '#1E1E1E',
  headerText: '#FFFFFF'
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemColorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === 'dark');

  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const colors = isDarkMode ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
} 