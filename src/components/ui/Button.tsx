import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import type React from "react";
import { forwardRef } from "react";
import { Button as AriaButton } from "react-aria-components";
import { cn } from "~/utils/cn";

const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring focus-visible:ring-ring focus-visible:ring-offset disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border border-neutral-400 dark:border-neutral-600 text-neutral-900 dark:text-neutral-100 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700",
        outline:
          "border border-neutral-400 hover:border-neutral-800 dark:border-neutral-600 bg-transparant dark:hover:border-neutral-950",
        link: "underline-offset-4 hover:underline border-0",
      },
      size: {
        default: "h-10 px-4 py-2 rounded-lg",
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

    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export default Button;
