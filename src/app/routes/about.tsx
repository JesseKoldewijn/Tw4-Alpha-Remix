import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
	return [
		{ title: "About - TailwindCSS v4 + Remix.js" },
		{ name: "description", content: "Welcome to TailwindCSS v4!" },
	];
};

export default function Index() {
	return (
		<div className="font-sans px-4 inset-0 flex min-h-screen items-center justify-center">
			<section className="flex flex-col items-center justify-center gap-4">
				<h1 className="font-semibold text-lg">About TailwindCSS 4🔥</h1>
				<p className="opacity-80 text-center text-balance max-w-sm">{`
				In this project, I'm experimenting with TailwindCSS's v4 
				Alpha releases combined with Remix.js
				`}</p>
			</section>
		</div>
	);
}
