import TextField from "~/components/ui/TextField";

const PlainTextInputGroup = () => {
  return (
    <div className="form-group flex w-full flex-col gap-4">
      <TextField
        type="email"
        name="email"
        label="email"
        placeholder="info@acme.com"
        description="This email is also used to sign in to your account."
        isRequired
      />
      <TextField
        type="text"
        name="firstname"
        label="Firstname"
        placeholder="John"
        isRequired
      />
      <TextField
        type="text"
        name="lastname"
        label="Lastname"
        placeholder="Doe"
        isRequired
      />
    </div>
  );
};

export default PlainTextInputGroup;
