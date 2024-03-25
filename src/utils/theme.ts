import cookies from "js-cookie";
import { cookieKeys } from "~/config/cookies";
import { type Theme, themes } from "~/config/themes";

export const switchTheme = (themeOverride?: Theme) => {
  try {
    const themeCookie = cookies.get(cookieKeys.theme);

    // get index of current theme
    const currentThemeIdx = themes.findIndex((t) => t === themeCookie);
    // get next theme
    const newCookieTheme =
      themeOverride ?? themes.at(currentThemeIdx + 1) ?? themes.at(0)!;

    cookies.set(cookieKeys.theme, newCookieTheme);
    return {
      success: true,
      theme: newCookieTheme,
      error: null,
    } as const;
  } catch (error) {
    const err = error as Error;
    return {
      success: false,
      theme: null,
      error: err.message,
    } as const;
  }
};
