import { forwardRef } from "react";
import { Form, type FormProps } from "react-aria-components";
import PlainTextInputGroup from "./sections/PlainTextInput";
import Button from "~/components/ui/Button";

const DemoForm = forwardRef<
  HTMLFormElement,
  FormProps & React.RefAttributes<HTMLFormElement>
>(({ className, ...rest }, ref) => {
  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        console.log("Form submitted");
      }}
      ref={ref}
      className={className}
      {...rest}
    >
      <PlainTextInputGroup />
      <Button type="submit" className="mt-4">
        Submit
      </Button>
    </Form>
  );
});
DemoForm.displayName = "DemoForm";

export default DemoForm;
