import { DetailedHTMLProps, useEffect, useState } from "react";
import { cn } from "~/utils/cn";

import Button, { ButtonProps } from "./Button";

export type LinkProps = {
  srDescription?: string;
} & DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>;

export const Link = ({ href, srDescription, children, ...rest }: LinkProps) => {
  return (
    <a href={href} {...rest}>
      {srDescription && <span className="sr-only">{srDescription}</span>}
      {children}
    </a>
  );
};

export const LinkButton = ({
  srDescription,
  variant,
  className,
  href,
  ...rest
}: LinkProps & {
  variant?: ButtonProps["variant"];
  showActive?: boolean;
}) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handler = () => setIsActive(location.pathname === href);
    handler();
    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, [href]);

  return (
    <Button variant={variant ?? "link"} asChild>
      <Link
        href={href}
        className={cn(className, isActive && "underline underline-offset-2")}
        {...rest}
        srDescription={srDescription}
      />
    </Button>
  );
};
