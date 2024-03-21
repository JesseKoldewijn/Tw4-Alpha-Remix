import { useTheme } from "~/providers/ThemeProvider";
import { cn } from "~/utils/cn";

import ThemeToggle from "../ThemeToggle";
import { LinkButton } from "../ui/Link";

const Navbar = () => {
  const { theme } = useTheme();
  return (
    <div
      role="navigation"
      className="fixed inset-x-0 inline-flex w-full items-center justify-between p-4"
    >
      <div
        className={cn(
          "absolute inset-0 -z-10 opacity-70 blur-xl backdrop-blur-xl",
          theme == "dark" && "bg-neutral-950/25",
          theme == "light" && "bg-neutral-100/25",
        )}
      ></div>
      <div>Remix TailwindCSS 4🔥</div>
      <div className="relative flex items-center justify-center gap-5">
        <div className="hidden flex-row sm:flex">
          <LinkButton href="/">Home</LinkButton>
          <LinkButton href="/forms">Forms</LinkButton>
        </div>
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Navbar;
