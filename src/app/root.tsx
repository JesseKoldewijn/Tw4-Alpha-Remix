import { Partytown } from "@builder.io/partytown/react";
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
import { RouterProvider } from "~/providers/RouterProvider";
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

  const pathName = request.url ? new URL(request.url).pathname : undefined;

  return json({
    pathName,
    themeObj: theme,
  });
};

const gtagID = import.meta.env.GA_ID as string;

export function Layout({ children }: { children: React.ReactNode }) {
  const data = useLoaderData<typeof loader>();

  // Remix.js doesnt propperly infer the type of the current loader
  const typeOverrideData = data as unknown as {
    pathName: string;
  };

  // bg-background text-foreground dont seem to get the valid values from the css themes
  return (
    <html
      lang="en"
      data-theme={data ? data.themeObj.theme : "dark"}
      className="bg-background text-foreground"
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Partytown debug={!import.meta.env.PROD} forward={["dataLayer.push"]} />
        {
          /* Google Analytics */
          import.meta.env.PROD && (
            <>
              <script
                type="text/partytown"
                src={`https://www.googletagmanager.com/gtag/js?id=${gtagID}`}
                defer
              />
              <script
                type="text/partytown"
                dangerouslySetInnerHTML={{
                  __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${gtagID}');
                    `,
                }}
                defer
              />
            </>
          )
        }
        <Meta />
        <Links />
      </head>
      <body>
        <RouterProvider initialRoute={typeOverrideData.pathName}>
          <RootLayout initialTheme={data.themeObj.theme}>{children}</RootLayout>
        </RouterProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
