"use client";

import { useTheme } from "~/providers/ThemeProvider";

import ThemeToggle from "../ThemeToggle";
import { LinkButton } from "../ui/Link";

const Navbar = () => {
  const { theme } = useTheme();

  return (
    <div
      role="navigation"
      className="bg-background/60 fixed inset-x-0 z-50 inline-flex w-full items-center justify-between p-4"
    >
      <div
        data-theme={theme}
        className={
          "absolute inset-0 bg-neutral-100/25 opacity-80 blur-lg backdrop-blur-lg data-[theme=dark]:bg-neutral-950/25 data-[theme=nightly]:bg-neutral-950/20"
        }
      ></div>
      <div className="z-10">Remix TailwindCSS 4🔥</div>
      <div className="relative z-10 flex items-center justify-center gap-5">
        <div className="hidden flex-row sm:flex">
          <LinkButton href="/">Home</LinkButton>
          <LinkButton href="/forms">Forms</LinkButton>
          <LinkButton href="/animations">Animations</LinkButton>
        </div>
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Navbar;
