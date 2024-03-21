import { forwardRef } from "react";
import { Form, type FormProps } from "react-aria-components";
import PlainTextInputGroup from "./sections/PlainTextInput";
import Button from "~/components/ui/Button";
import { cn } from "~/utils/cn";

const DemoForm = forwardRef<
  HTMLFormElement,
  FormProps & React.RefAttributes<HTMLFormElement>
>(({ className, ...rest }, ref) => {
  return (
    <Form ref={ref} className={cn("flex flex-col gap-4", className)} {...rest}>
      <PlainTextInputGroup />

      <Button
        type="submit"
        className="w-max max-w-md text-ellipsis text-nowrap whitespace-nowrap"
      >
        Signup
      </Button>
    </Form>
  );
});
DemoForm.displayName = "DemoForm";

export default DemoForm;
