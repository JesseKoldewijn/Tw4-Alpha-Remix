import { createContext, useContext, useState } from "react";
import { Theme, Themes, defaultTheme, themes } from "~/config/themes";
import { switchTheme } from "~/utils/theme";

type ThemeContextType = {
	theme?: Theme;
	availableThemes: Themes;
	toggleTheme: () => void;
};

const themeContext = createContext<ThemeContextType>({
	theme: defaultTheme,
	availableThemes: themes,
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

	const setNewTheme = () => {
		const newTheme = switchTheme();

		if (newTheme.error || !newTheme.theme) {
			console.error(newTheme.error);
			return;
		}

		const h = document.querySelector("html");

		if (h && !newTheme.error && newTheme.theme) {
			themes.flatMap((t) => h.classList.remove(t));
			h.classList.add(newTheme.theme);
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
