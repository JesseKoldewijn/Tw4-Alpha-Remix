export const cookieKeys = {
	theme: "tw4-alpha-theme",
} as const;

export const themes = ["light", "dark"] as const;
export type Theme = (typeof themes)[number];

export type validCookieKeys = (typeof cookieKeys)[keyof typeof cookieKeys];

export function getTheme(cookies: string | null) {
	const themeCookie = cookies?.split(";").find((cookie: string) => {
		return cookie.includes(cookieKeys.theme);
	});

	const themeCookieFound = themeCookie || `${cookieKeys.theme}=dark`;
	const themeValue = themeCookieFound.split("=")[1] || "dark";

	return {
		theme: themeValue as Theme,
		isDefaulted: !themeCookie,
	};
}
