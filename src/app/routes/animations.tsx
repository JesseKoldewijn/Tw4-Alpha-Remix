import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Animations | TailwindCSS v4 + Remix.js" },
    { name: "description", content: "Welcome to TailwindCSS v4!" },
  ];
};

const HomePage = () => {
  return (
    <div className="inset-0 flex min-h-screen items-center justify-center px-4 font-sans">
      <section className="border-accent flex flex-col items-center justify-center gap-4 border-b-2 pb-4">
        <h1 className="text-lg font-semibold">Animations!🔥</h1>
        <p className="max-w-sm text-balance text-center opacity-80">
          Lets play around with some Framer Motion!
        </p>
        <p className="max-w-sm text-balance text-center opacity-80">
          Yes! Framer Motion is really cool!🚀 But you shouldn&apos;t overdo it,
          it can be a bit much for your users.🤯 Both in terms of UX and JS
          load.
        </p>
      </section>
    </div>
  );
};
export default HomePage;
