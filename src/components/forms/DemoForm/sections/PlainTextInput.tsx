import TextField from "~/components/ui/TextField";

const PlainTextInputGroup = () => {
  return (
    <div className="form-group w-full flex flex-col">
      <TextField label="test 1" description="This field is just a text input" />
    </div>
  );
};

export default PlainTextInputGroup;
