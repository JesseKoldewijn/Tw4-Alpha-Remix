"use client";

import { type VariantProps, cva } from "class-variance-authority";
import { forwardRef } from "react";
import {
  TextField as TextFieldAria,
  type TextFieldProps as TextFieldAriaProps,
  type ValidationResult,
} from "react-aria-components";
import { FieldError, Input, Label, Text } from "react-aria-components";
import { useTheme } from "~/providers/ThemeProvider";
import { cn } from "~/utils/cn";

const textFieldVariants = cva(
  "inline-flex flex-col [&>input]:px-2 [&>input]:min-h-[40px] cursor-pointer items-start gap-2 justify-center [&>label]:text-elipsis whitespace-nowrap [&>input]:rounded-md text-sm font-medium [&>input]:ring-offset-background transition-colors [&>input]:focus-visible:outline-none [&>input]:focus-visible:ring [&>input]:focus-visible:ring-ring [&>input]:focus-visible:ring-offset [&>input]:disabled:pointer-events-none [&>input]:disabled:opacity-50",
  {
    variants: {
      variant: {
        default: cn(
          "[&>input]:border [&>input]:border-neutral-400 [&>input]:data-[theme=nightly]:border-neutral-600 [&>input]:data-[theme=dark]:border-neutral-600",
          "[&>.react-aria-Text]:italic [&>.react-aria-Text]:opacity-80",
        ),
        outline: cn(
          "[&>input]:bg-transparant [&>input]:border [&>input]:border-neutral-400 [&>input]:hover:border-neutral-800 [&>input]:data-[theme=nightly]:border-neutral-600 [&>input]:data-[theme=nightly]:hover:border-neutral-950 [&>input]:data-[theme=dark]:border-neutral-600 [&>input]:data-[theme=dark]:hover:border-neutral-950",
          "[&>.react-aria-Text]:italic [&>.react-aria-Text]:opacity-80",
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
  placeholder?: string;
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      label,
      description,
      errorMessage,
      placeholder,
      className,
      variant,
      size,
      ...rest
    },
    ref,
  ) => {
    const { theme } = useTheme();
    return (
      <TextFieldAria
        ref={ref}
        className={cn(textFieldVariants({ variant, size, className }))}
        data-theme={theme}
        {...rest}
      >
        <Label>{label}</Label>
        <Input placeholder={placeholder} />
        {description && <Text slot="description">{description}</Text>}
        <FieldError>
          {(err) => (
            <FieldErrorDisplay
              fieldName={rest.name}
              errorMessage={errorMessage}
              {...err}
            />
          )}
        </FieldError>
      </TextFieldAria>
    );
  },
);
TextField.displayName = "TextField";

export default TextField;

const FieldErrorDisplay = ({
  fieldName,
  validationDetails,
  errorMessage,
}: {
  fieldName?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
} & ValidationResult) => {
  if (!!errorMessage) return <>{errorMessage}</>;
  if (validationDetails.valueMissing) {
    return fieldName
      ? `Please enter a ${fieldName}.`
      : "Please fill out this field.";
  }
  return <></>;
};
