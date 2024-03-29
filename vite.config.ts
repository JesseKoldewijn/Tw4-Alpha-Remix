import legacy from "@vitejs/plugin-legacy";
import { type UserConfig, defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

import { vitePlugin as remix } from "@remix-run/dev";
import { type VitePluginConfig } from "@remix-run/dev/dist/vite/plugin";
import { installGlobals } from "@remix-run/node";

import tailwindcss from "@tailwindcss/vite";

import { webmanifest } from "./src/config/webmanifest";

installGlobals();

const remixConfig: VitePluginConfig = {
  // Remix config
  appDirectory: "src/app",
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment
const remixPlugin = remix(remixConfig) as any;

const conf: UserConfig = {
  server: {
    port: 3000,
  },
  plugins: [
    tailwindcss(),
    VitePWA({
      injectRegister: "auto",
      registerType: "autoUpdate",
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
      },
      manifest: webmanifest,
    }),
    remixPlugin,
    legacy({
      targets: ["defaults", "not IE 11"],
    }),
  ],
  resolve: {
    alias: {
      "~": "/src",
    },
  },
  build: {
    minify: "esbuild",
    rollupOptions: {
      onLog(level, log, handler) {
        // workaround for upstream rollup issue
        const logCause = log.cause as {
          message: string;
        };
        if (
          logCause &&
          logCause.message === `Can't resolve original location of error.`
        ) {
          return;
        }
        handler(level, log);
      },
      output: {
        manualChunks: (id: string) => {
          if (id.includes("radix")) {
            return "radix";
          }
          if (id.includes("react-aria")) {
            return "react-aria";
          }
          if (id.includes("react-dom") || id.includes("react-router")) {
            return "react-dom";
          }
          if (id.includes("@remix-run") || id.includes("remix")) {
            return "remix";
          }
          if (id.includes("react-icons")) {
            return "react-icons";
          }
        },
      },
    },
  },
};

export default defineConfig(conf);
