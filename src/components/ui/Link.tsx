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
    {
      srDescription,
      variant = "link",
      className,
      href,
      showActive = true,
      children,
      "aria-current": ariaCurrent,
      ...rest
    },
    ref,
  ) => {
    if (!href) return <></>;

    return (
      <Button ref={ref} variant={variant} asChild>
        <Link
          href={href}
          className={cn(
            className,
            MatchHref(href, showActive) && "underline underline-offset-2",
          )}
          aria-current={
            ariaCurrent ?? (showActive && MatchHref(href, showActive))
              ? "page"
              : undefined
          }
          srDescription={srDescription}
          {...rest}
        >
          {children}
          <ActiveLinkSrLabel href={href} />
        </Link>
      </Button>
    );
  },
);
LinkButton.displayName = "LinkButtonComponent";

/**
 * The MatchHref function compares the current location pathname or href with a given href string to
 * determine if they match.
 * @param {string} href - The `href` parameter is a string that represents either a pathname or a full
 * URL.
 * @returns The function `MatchHref` is returning a boolean value. It checks if the `href` parameter is
 * a pathname or a full URL and then compares it with the current location pathname or href. The
 * function returns `true` if there is a match and `false` if there is no match or if the `href`
 * parameter is empty.
 */
const MatchHref = (href: string, showActive?: boolean) => {
  const loc = useLocation();

  if (!showActive || !href) return false;

  const hrefIsPathname = href.startsWith("/");
  if (hrefIsPathname) return loc.pathname === href;

  return loc.href === href;
};

/**
 * The ActiveLinkSrLabel component renders a visually hidden message indicating that the current page
 * is being displayed.
 * @param  - The `ActiveLinkSrLabel` component takes a `href` prop of type string. It checks if the
 * `href` matches a certain condition using the `MatchHref` function and if the `href` is not empty. If
 * the conditions are met, it renders a `<span>` element with
 * @returns A span element with the text "This is the current page" inside, with a class name of
 * "sr-only".
 */
const ActiveLinkSrLabel = ({ href }: { href: string }) => {
  if (!MatchHref(href, true) || !href) return <></>;

  return <span className="sr-only">This is the current page</span>;
};
