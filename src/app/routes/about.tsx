import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "About - TailwindCSS v4 + Remix.js" },
    { name: "description", content: "Welcome to TailwindCSS v4!" },
  ];
};

export default function Index() {
  return (
    <div className="inset-0 flex min-h-screen items-center justify-center px-4 font-sans">
      <section className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-lg font-semibold">About TailwindCSS 4🔥</h1>
        <p className="max-w-sm text-balance text-center opacity-80">{`
				In this project, I'm experimenting with TailwindCSS's v4 
				Alpha releases combined with Remix.js
				`}</p>
      </section>
    </div>
  );
}
