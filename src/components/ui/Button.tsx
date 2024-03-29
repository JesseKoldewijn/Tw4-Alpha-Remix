"use client";

import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import type React from "react";
import { forwardRef } from "react";
import { Button as AriaButton } from "react-aria-components";
import { useTheme } from "~/providers/ThemeProvider";
import { cn } from "~/utils/cn";

const buttonVariants = cva(
  "ring-offset-background focus-visible:ring-ring focus-visible:ring-offset inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors transition-colors duration-200 ease-linear focus-visible:ring focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border-foreground/40 text-background data-[theme=dark]:border-foreground/60 data-[theme=nightly]:hover:border-foreground data-[theme=nightly]:border-accent/60 data-[theme=dark]:text-background data-[theme=nightly]:hover:text-foreground bg-foreground hover:bg-foreground/80 data-[theme=dark]:bg-foreground/80 data-[theme=nightly]:bg-accent/20 data-[theme=dark]:hover:text-foreground data-[theme=dark]:hover:bg-foreground/10 data-[theme=nightly]:hover:bg-foreground/20 data-[theme=nightly]:text-foreground/90 border",
        outline:
          "border-foreground text-foreground data-[theme=nightly]:border-accent/60 data-[theme=nightly]:text-accent border hover:ring",
        link: "border-0 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 rounded-lg py-2 px-4",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ButtonAriaInteropt = forwardRef<HTMLButtonElement, any>((props, ref) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { onClick, ...rest } = props;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  return <AriaButton ref={ref} onPress={onClick} {...rest} />;
});
ButtonAriaInteropt.displayName = "ButtonAriaInteropt";

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild, ...props }, ref) => {
    // passing to child if prop asChild is true
    const Comp = asChild ? Slot : ButtonAriaInteropt;

    const { theme } = useTheme();

    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        data-theme={theme}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export default Button;
