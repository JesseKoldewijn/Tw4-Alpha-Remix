import { memo } from "react";
import { LuMoon, LuSun } from "react-icons/lu";
import { useTheme } from "~/providers/ThemeProvider";

import Button from "./ui/Button";

const Themes = [
  {
    theme: "light",
    icon: <LuMoon height={15} width={15} className="h-5 w-auto" />,
    label: "Switch from light mode",
  },
  {
    theme: "dark",
    icon: <LuSun height={15} width={15} className="h-5 w-auto" />,
    label: "Switch from dark mode",
  },
  // {
  //   theme: "nightly",
  //   icon: <LuStar height={15} width={15} className="h-5 w-auto" />,
  //   label: "Switch to from nightly mode",
  // },
];

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  const handleThemeToggle = () => {
    toggleTheme();
  };

  return (
    <Button onClick={handleThemeToggle} className="py-1 px-2">
      <ThemeIcon theme={theme} />
    </Button>
  );
};

export default ThemeToggle;

const ThemeIcon = memo(
  ({ theme }: { theme: string }) => {
    if (!theme) return null;

    const currentTheme = Themes.find((t) => t.theme === theme) ?? Themes[1];

    return (
      <>
        <span className="sr-only">{currentTheme.label}</span>
        {currentTheme.icon}
      </>
    );
  },
  (prevProps, nextProps) => prevProps.theme === nextProps.theme,
);
ThemeIcon.displayName = "ThemeIcon";
