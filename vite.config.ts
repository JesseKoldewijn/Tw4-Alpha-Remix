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
  ],
  resolve: {
    alias: {
      "~": "/src",
    },
  },
  build: {
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
    },
  },
};

export default defineConfig(conf);
