import { createContext, useContext, useState } from "react";
import { type Theme, type Themes, defaultTheme, themes } from "~/config/themes";
import { switchTheme } from "~/utils/theme";

interface ThemeContextType {
  theme?: Theme;
  availableThemes: Themes;
  toggleTheme: (themeOverride?: Theme) => void;
}

const themeContext = createContext<ThemeContextType>({
  theme: defaultTheme,
  availableThemes: themes,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggleTheme: () => {},
});

export const ThemeProvider = ({
  initialTheme,
  children,
}: {
  initialTheme: Theme;
  children: React.ReactNode;
}) => {
  const [theme, setTheme] = useState<Theme>(initialTheme);

  const setNewTheme = (themeOverride?: Theme) => {
    const newTheme = switchTheme(themeOverride);

    if (newTheme.error ?? !newTheme.theme) {
      console.error(newTheme.error);
      return;
    }

    const h = document.querySelector("html");

    if (h && !newTheme.error && newTheme.theme) {
      h.dataset.theme = newTheme.theme;
    }

    setTheme(newTheme.theme);
  };

  const value: ThemeContextType = {
    theme,
    availableThemes: themes,
    toggleTheme: setNewTheme,
  };

  return (
    <themeContext.Provider value={value}>{children}</themeContext.Provider>
  );
};

export function useTheme() {
  const { theme, availableThemes, toggleTheme } = useContext(themeContext);

  if (!theme || !toggleTheme) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return { theme, availableThemes, toggleTheme };
}
