import { createContext, useState, useEffect, useContext } from 'react';
import { AccentColor, ThemeColor } from '../configs/app';

// Create the context
const ThemeContext = createContext<
  | {
      themeColor: ThemeColor;
      accentColor: AccentColor;
      handleTheme: (color: ThemeColor) => void;
      handleAccent: (color: AccentColor) => void;
    }
  | undefined
>(undefined);

// Create a provider component
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [accentColor, setAccentColor] = useState<AccentColor>(AccentColor.BLUE); // Default accent color
  const [themeColor, setThemeColor] = useState<ThemeColor>(ThemeColor.LIGHT); // Default theme color

  // Check for user's preference on component mount
  useEffect(() => {
    // Check local storage first
    const savedTheme = localStorage.getItem('theme');

    // Check system preference if no saved preference
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;

    const targetDiv = document.getElementById('themeProvider');

    if (savedTheme === null) {
      if (prefersDark) {
        setThemeColor(ThemeColor.SYSTEM);
        targetDiv?.classList.add(ThemeColor.DARK);
      } else {
        setThemeColor(ThemeColor.SYSTEM);
        targetDiv?.classList.add(ThemeColor.LIGHT);
      }
    }

    if (savedTheme === ThemeColor.SYSTEM) {
      if (prefersDark) {
        setThemeColor(ThemeColor.SYSTEM);
        targetDiv?.classList.add(ThemeColor.DARK);
      } else {
        setThemeColor(ThemeColor.SYSTEM);
        targetDiv?.classList.add(ThemeColor.LIGHT);
      }
    }

    if (savedTheme === 'dark') {
      setThemeColor(ThemeColor.DARK);
      const targetDiv = document.getElementById('themeProvider');
      targetDiv?.classList.add(ThemeColor.DARK);
    } else if (savedTheme === 'light') {
      setThemeColor(ThemeColor.LIGHT);
      const targetDiv = document.getElementById('themeProvider');
      targetDiv?.classList.add(ThemeColor.LIGHT);
    }
  }, []);

  // Toggle theme function
  const handleTheme = (color: ThemeColor) => {
    if (themeColor !== color) {
      setThemeColor((prevMode) => {
        const targetDiv = document.getElementById('themeProvider'); // This is the <div> with class="dark"
        const prefersDark = window.matchMedia(
          '(prefers-color-scheme: dark)'
        ).matches;

        if (prevMode === ThemeColor.SYSTEM) {
          if (prefersDark) {
            targetDiv?.classList.remove(ThemeColor.DARK);
          } else {
            targetDiv?.classList.remove(ThemeColor.LIGHT);
          }
        } else {
          targetDiv?.classList.remove(prevMode);
        }

        if (color === ThemeColor.SYSTEM) {
          if (prefersDark) {
            targetDiv?.classList.add(ThemeColor.DARK);
          } else {
            targetDiv?.classList.add(ThemeColor.LIGHT);
          }
        } else {
          targetDiv?.classList.add(color);
        }

        localStorage.setItem('theme', color);

        return color;
      });
    }
  };

  // Toggle accent color  function
  const handleAccent = (color: AccentColor) => {
    if (accentColor !== color) {
      setAccentColor((prevMode) => {
        const targetDiv = document.getElementById('themeProvider'); // This is the <div> with class="dark"
        targetDiv?.classList.remove(prevMode);
        targetDiv?.classList.add(color);
        localStorage.setItem('accentColor', color);

        return color;
      });
    }
  };

  // Values to be provided to consumers
  const value = {
    accentColor,
    themeColor,
    handleTheme,
    handleAccent,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

// Custom hook for consuming the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
