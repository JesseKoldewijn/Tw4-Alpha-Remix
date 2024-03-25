import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "TailwindCSS v4 + Remix.js" },
    { name: "description", content: "Welcome to TailwindCSS v4!" },
  ];
};

const HomePage = () => {
  return (
    <div className="inset-0 flex min-h-screen items-center justify-center px-4 font-sans">
      <section className="border-accent flex flex-col items-center justify-center gap-4 border-b-2 pb-4">
        <h1 className="text-lg font-semibold">Welcome to TailwindCSS 4🔥</h1>
        <p className="max-w-sm text-balance text-center opacity-80">
          In this project, I&apos;m experimenting with TailwindCSS&apos;s v4
          Alpha releases combined with Remix.js
        </p>
        <p className="max-w-sm text-balance text-center opacity-80">
          One of the things displayed in this project is the use of WCAG
          compliant components. Meaning I&apos;m using React-Aria here combined
          with tailwind to build an UI-Library inside of this project.
        </p>
      </section>
    </div>
  );
};
export default HomePage;
