import { type ManifestOptions } from "vite-plugin-pwa";

export const webmanifest: Partial<ManifestOptions> = {
  name: "My Awesome App",
  short_name: "MyApp",
  description: "My Awesome App description",
  theme_color: "#ffffff",
  icons: [
    {
      src: "pwa-192x192.png",
      sizes: "192x192",
      type: "image/png",
    },
    {
      src: "pwa-512x512.png",
      sizes: "512x512",
      type: "image/png",
    },
    {
      src: "pwa-192x192.png",
      sizes: "192x192",
      type: "image/png",
      purpose: "any",
    },
    {
      src: "pwa-512x512.png",
      sizes: "512x512",
      type: "image/png",
      purpose: "maskable",
    },
  ],
};
