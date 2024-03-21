import { type ActionFunctionArgs, type MetaFunction } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import DemoForm from "~/components/forms/DemoForm/root";

export const meta: MetaFunction = () => {
  return [
    { title: "Forms - TailwindCSS v4 + Remix.js" },
    { name: "description", content: "Welcome to TailwindCSS v4!" },
  ];
};

export async function action({ request }: ActionFunctionArgs) {
  const body = await request.formData();

  return {
    email: body.get("email"),
    firstname: body.get("firstname"),
    lastname: body.get("lastname"),
  };
}

const FormPage = () => {
  const actionData = useActionData<typeof action>();

  return (
    <div className="inset-0 flex flex-col gap-10 min-h-screen items-center justify-center px-4 font-sans">
      <section className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-lg font-semibold">Forms</h1>
        <p className="max-w-sm text-balance text-center opacity-80">
          On this page there are some examples of WCAG compliant Form setups.
          Keep in mind that there are more options than just one with regards to
          headless primitive components (ie. HeadlessUI, React-Aria and RadixUI)
        </p>
      </section>

      {actionData && (
        <pre className="w-full max-w-md p-4 bg-contrast-5 rounded-md">
          {JSON.stringify(actionData, null, 2)}
        </pre>
      )}

      <section className="flex flex-col items-center justify-center gap-4 w-full">
        <h1 className="text-lg font-semibold">Form (Simple)</h1>
        <DemoForm method="post" className="w-full max-w-md" />
      </section>
    </div>
  );
};
export default FormPage;
