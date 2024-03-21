import { type VariantProps, cva } from "class-variance-authority";
import { forwardRef } from "react";
import {
  TextField as TextFieldAria,
  type TextFieldProps as TextFieldAriaProps,
  type ValidationResult,
} from "react-aria-components";
import { FieldError, Input, Label, Text } from "react-aria-components";
import { cn } from "~/utils/cn";

const textFieldVariants = cva(
  "inline-flex flex-col [&>input]:px-2 cursor-pointer items-start gap-2 justify-center [&>label]:text-elipsis whitespace-nowrap [&>input]:rounded-md text-sm font-medium [&>input]:ring-offset-background transition-colors [&>input]:focus-visible:outline-none [&>input]:focus-visible:ring [&>input]:focus-visible:ring-ring [&>input]:focus-visible:ring-offset [&>input]:disabled:pointer-events-none [&>input]:disabled:opacity-50",
  {
    variants: {
      variant: {
        default: cn(
          "[&>input]:border [&>input]:border-neutral-400 [&>input]:dark:border-neutral-600",
          "[&>.react-aria-Text]:opacity-80 [&>.react-aria-Text]:italic",
        ),
        outline: cn(
          "[&>input]:border [&>input]:border-neutral-400 [&>input]:hover:border-neutral-800 [&>input]:dark:border-neutral-600 [&>input]:bg-transparant [&>input]:dark:hover:border-neutral-950",
          "[&>.react-aria-Text]:opacity-80 [&>.react-aria-Text]:italic",
        ),
      },
      size: {
        default: "[&>input]:w-full w-full [&>label]:w-full",
        full: "[&>input]:w-full w-full [&>label]:w-full",
        half: "w-1/2",
        quarter: "w-1/4",
        auto: "w-auto",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

interface TextFieldProps
  extends TextFieldAriaProps,
    VariantProps<typeof textFieldVariants> {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    { label, description, errorMessage, className, variant, size, ...rest },
    ref,
  ) => {
    return (
      <TextFieldAria
        ref={ref}
        className={cn(textFieldVariants({ variant, size, className }))}
        {...rest}
      >
        <Label>{label}</Label>
        <Input />
        {description && <Text slot="description">{description}</Text>}
        <FieldError>{errorMessage}</FieldError>
      </TextFieldAria>
    );
  },
);
TextField.displayName = "TextField";

export default TextField;
