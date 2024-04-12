/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  plugins: [
    "@trivago/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],
  // Import sorting
  importOrder: [
    "^next/(.*)$",
    "^@next/(.*)$",
    "^react/(.*)$",
    "^@remix-run/(.*)$",
    "^vite/(.*)$",
    "^@tailwindcss/(.*)$",
    "^@(.*)$",
    "^@/(.*)$",
    "^@/(.css)$",
    "^[./]",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  // Tailwind
  tailwindAttributes: ["className"],
  tailwindFunctions: ["clsx", "cn", "twMerge", "cva"],
};
module.exports = config;
