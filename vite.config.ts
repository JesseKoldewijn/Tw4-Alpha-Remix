import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

installGlobals();

export default defineConfig({
	server: {
		port: 3000,
	},
	plugins: [
		tailwindcss(),
		remix({
			// Remix config
			appDirectory: "src/app",
		}),
	],
	resolve: {
		alias: {
			"~": "/src",
		},
	},
});
