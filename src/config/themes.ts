export const themes = ["light", "dark"] as const;
export const defaultTheme = "dark" as Theme;

export type Themes = typeof themes;
export type Theme = (typeof themes)[number];
