import { type LoaderFunctionArgs } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  json,
  useLoaderData,
} from "@remix-run/react";
import { cookieKeys, getTheme } from "~/config/cookies";
import RootLayout from "~/layout/RootLayout";
import "~/styles/tailwind.css";

/* eslint-disable @typescript-eslint/require-await */

// loader to get theme cookie
export const loader = async ({ request }: LoaderFunctionArgs) => {
  const cookies = request.headers.get("Cookie");

  const theme = getTheme(cookies);

  if (theme.isDefaulted) {
    const newThemeCookie = `${cookieKeys.theme}=${theme.theme}; Path=/; SameSite=Strict;`;

    return json(
      { themeObj: theme },
      {
        status: 200,
        headers: {
          "Set-Cookie": newThemeCookie,
        },
      },
    );
  }

  return json({ themeObj: theme });
};

export function Layout({ children }: { children: React.ReactNode }) {
  const data = useLoaderData<typeof loader>();

  return (
    <html lang="en" data-theme={data ? data.themeObj.theme : "dark"}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <RootLayout initialTheme={data.themeObj.theme}>{children}</RootLayout>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
