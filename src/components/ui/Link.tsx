import { type DetailedHTMLProps, forwardRef } from "react";
import { useLocation } from "~/providers/RouterProvider";
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
      <a ref={ref} href={href} {...rest}>
        {srDescription && <span className="sr-only">{srDescription}</span>}
        {children}
      </a>
    );
  },
);
Link.displayName = "LinkComponent";

export const LinkButton = forwardRef<
  HTMLButtonElement,
  LinkProps & {
    variant?: ButtonProps["variant"];
    showActive?: boolean;
  }
>(
  (
    { srDescription, variant, className, href, showActive = true, ...rest },
    ref,
  ) => {
    const loc = useLocation();

    const matchHref = (href?: string) => {
      if (!href) return false;
      const hrefIsPathname = href.startsWith("/");

      if (hrefIsPathname) {
        return loc.pathname === href;
      } else {
        return loc.href === href;
      }
    };

    return (
      <Button ref={ref} variant={variant ?? "link"} asChild>
        <Link
          href={href}
          className={cn(
            className,
            showActive && matchHref(href) && "underline underline-offset-2",
          )}
          {...rest}
          srDescription={srDescription}
        />
      </Button>
    );
  },
);
LinkButton.displayName = "LinkButtonComponent";
