import cookies from "js-cookie";
import { cookieKeys } from "~/config/cookies";
import { themes } from "~/config/themes";

export const switchTheme = () => {
  try {
    const themeCookie = cookies.get(cookieKeys.theme);

    // get index of current theme
    const currentThemeIdx = themes.findIndex((t) => t === themeCookie);
    // get next theme
    const newCookieTheme = themes.at(currentThemeIdx + 1) || themes.at(0)!;

    cookies.set(cookieKeys.theme, newCookieTheme, {
      sameSite: "strict",
      domain: new URL(window.location.href).hostname,
    });
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
