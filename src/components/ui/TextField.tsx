"use client";

import { type VariantProps, cva } from "class-variance-authority";
import { forwardRef, useEffect, useRef } from "react";
import {
  TextField as TextFieldAria,
  type TextFieldProps as TextFieldAriaProps,
  type ValidationResult,
} from "react-aria-components";
import { FieldError, Input, Label, Text } from "react-aria-components";
import { useTheme } from "~/providers/ThemeProvider";
import { cn } from "~/utils/cn";

const textFieldVariants = cva(
  "[&>label]:text-elipsis [&>input]:ring-offset-background [&>input]:focus-visible:ring-ring [&>input]:focus-visible:ring-offset inline-flex cursor-pointer flex-col items-start justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors transition-colors duration-200 ease-linear [&>input]:min-h-[40px] [&>input]:rounded-md [&>input]:px-2 [&>input]:focus-visible:ring [&>input]:focus-visible:outline-none [&>input]:disabled:pointer-events-none [&>input]:disabled:opacity-50",
  {
    variants: {
      variant: {
        default: cn(
          "[&>input]:border [&>input]:border-neutral-400 [&>input]:data-[theme=dark]:border-neutral-600 [&>input]:data-[theme=nightly]:border-neutral-600",
          "[&>.react-aria-Text]:italic [&>.react-aria-Text]:opacity-90",
          "[&>.react-aria-Error]:text-red-500 [&>.react-aria-Error]:data-[theme=dark]:text-red-400 [&>.react-aria-Error]:data-[theme=dark]:text-red-600",
        ),
        outline: cn(
          "[&>input]:bg-transparant [&>input]:border [&>input]:border-neutral-400 [&>input]:hover:border-neutral-800 [&>input]:data-[theme=dark]:border-neutral-600 [&>input]:data-[theme=dark]:hover:border-neutral-950 [&>input]:data-[theme=nightly]:border-neutral-600 [&>input]:data-[theme=nightly]:hover:border-neutral-950",
          "[&>.react-aria-Text]:italic [&>.react-aria-Text]:opacity-90",
        ),
      },
      size: {
        default: "w-full [&>input]:w-full [&>label]:w-full",
        full: "w-full [&>input]:w-full [&>label]:w-full",
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
  title?: string;
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
    const elemRef = useRef<HTMLInputElement | null>(null);

    const { theme } = useTheme();

    const getDescribeBy = () => {
      const describeBy = elemRef.current?.getAttribute("aria-describedby");

      if (describeBy) {
        const describeByNames = describeBy.split(" ");
        const findErrText = describeByNames.find((name) => {
          const elem = document.getElementById(name);
          return elem?.classList.contains("react-aria-Error");
        });
        return findErrText;
      }
      return undefined;
    };

    useEffect(() => {
      const el = elemRef.current;

      if (el) {
        const blurHandler = () => {
          const describeBy = getDescribeBy();
          if (describeBy) {
            elemRef.current?.setAttribute("aria-errormessage", describeBy);
          }
        };
        el.addEventListener("focus", blurHandler);
        el.addEventListener("change", blurHandler);

        return () => {
          if (el) {
            el.removeEventListener("focusout", () => blurHandler);
            el.removeEventListener("change", () => blurHandler);
          }
        };
      }
    }, []);

    return (
      <TextFieldAria
        ref={ref}
        className={cn(textFieldVariants({ variant, size, className }))}
        data-theme={theme}
        {...rest}
      >
        <Label>{label}</Label>
        <Input
          ref={elemRef}
          title={rest.title ?? rest.name}
          placeholder={placeholder}
          aria-errormessage={getDescribeBy()}
        />
        {description && <Text slot="description">{description}</Text>}
        <FieldError className="react-aria-Error">
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
  isInvalid,
  validationErrors,
}: {
  fieldName?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
} & ValidationResult) => {
  if (!!errorMessage && typeof errorMessage === "function") {
    return (
      <>{errorMessage({ validationDetails, isInvalid, validationErrors })}</>
    );
  }
  if (!!errorMessage && typeof errorMessage === "string") {
    return <>{errorMessage}</>;
  }
  if (validationDetails.valueMissing) {
    return fieldName
      ? `Please enter a ${fieldName}.`
      : "Please fill out this field.";
  }

  if (validationErrors?.length > 0) {
    return <>{validationErrors.join(" ")}</>;
  }

  return <></>;
};
