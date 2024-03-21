import { useTheme } from "~/providers/ThemeProvider";

import Button from "./ui/Button";
import { LuMoon, LuSun } from "react-icons/lu";
import { memo } from "react";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  const handleThemeToggle = async () => {
    void toggleTheme();
  };

  return (
    <Button onClick={() => void handleThemeToggle()} className="py-1 px-2">
      <ThemeIcon theme={theme} />
    </Button>
  );
};

export default ThemeToggle;

const ThemeIcon = memo(
  ({ theme }: { theme: string }) => {
    if (!theme) return null;

    return (
      <>
        {theme === "light" ? (
          <>
            <LuMoon height={15} width={15} className="h-5 w-auto" />
            <span className="sr-only">Switch to dark mode</span>
          </>
        ) : (
          <>
            <LuSun height={15} width={15} className="h-5 w-auto" />
            <span className="sr-only">Switch to light mode</span>
          </>
        )}
      </>
    );
  },
  (prevProps, nextProps) => prevProps.theme === nextProps.theme,
);
ThemeIcon.displayName = "ThemeIcon";
