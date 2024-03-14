import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
	return [
		{ title: "New Remix App" },
		{ name: "description", content: "Welcome to Remix!" },
	];
};

export default function Index() {
	return (
		<div className="font-sans px-4">
			<h1>Welcome to TailwindCSS 4🔥</h1>
		</div>
	);
}
