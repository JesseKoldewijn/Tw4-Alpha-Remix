import { vitePlugin as remix } from "@remix-run/dev";
import { type VitePluginConfig } from "@remix-run/dev/dist/vite/plugin";
import { installGlobals } from "@remix-run/node";
import tailwindcss from "@tailwindcss/vite";
import { UserConfig, defineConfig } from "vite";

installGlobals();

const remixConfig: VitePluginConfig = {
  // Remix config
  appDirectory: "src/app",
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const remixPlugin = remix(remixConfig) as any;

const conf: UserConfig = {
  server: {
    port: 3000,
  },
  plugins: [tailwindcss(), remixPlugin],
  resolve: {
    alias: {
      "~": "/src",
    },
  },
};

export default defineConfig(conf);
