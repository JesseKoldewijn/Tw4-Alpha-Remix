import { type DetailedHTMLProps, forwardRef, useEffect, useState } from "react";
import { cn } from "~/utils/cn";

import Button, { type ButtonProps } from "./Button";

export type LinkProps = {
  srDescription?: string;
} & DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>;

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, srDescription, children, ...rest }, ref) => {
    return (
      <a href={href} {...rest}>
        {srDescription && <span className="sr-only">{srDescription}</span>}
        {children}
      </a>
    );
  },
);

export const LinkButton = forwardRef<
  HTMLButtonElement,
  LinkProps & {
    variant?: ButtonProps["variant"];
    showActive?: boolean;
  }
>(({ srDescription, variant, className, href, ...rest }, ref) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handler = () => setIsActive(location.pathname === href);
    handler();
    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, [href]);

  return (
    <Button ref={ref} variant={variant ?? "link"} asChild>
      <Link
        href={href}
        className={cn(className, isActive && "underline underline-offset-2")}
        {...rest}
        srDescription={srDescription}
      />
    </Button>
  );
});
