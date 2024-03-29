import { createContext, useContext, useState } from "react";
import { useBrowserLayoutEffect } from "~/utils/ssr-layout-effect";

export const RouterContext = createContext<Location | undefined>(undefined);

/**
 * The `RouterProvider` component in TypeScript React manages the router location based on window
 * popstate events and provides the current location to its children through context.
 * @param  - The `RouterProvider` component is used to provide routing functionality to its children
 * components. It takes two props:
 * @returns The `RouterProvider` component is being returned. It takes in props `initialRoute` and
 * `children`, sets up a state for `routerLocation` using `useState`, and listens for changes in the
 * browser's location using `useLayoutEffect`. It then provides the current location value to the
 * `RouterContext.Provider` component along with the children components.
 */
export const RouterProvider = ({
  initialRoute,
  children,
}: {
  initialRoute: string;
  children: React.ReactNode;
}) => {
  const [routerLocation, setRouterLocation] = useState<Location | undefined>(
    undefined,
  );

  useBrowserLayoutEffect(() => {
    const handleLocationChange = () => {
      setRouterLocation(window.location);
    };

    window.addEventListener("popstate", handleLocationChange);
    handleLocationChange();

    return () => {
      window.removeEventListener("popstate", handleLocationChange);
    };
  }, [initialRoute]);

  const value = routerLocation ?? ({ pathname: initialRoute } as Location);

  return (
    <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
  );
};

export const useLocation = () => {
  const location = useContext(RouterContext);

  if (!location) {
    throw new Error("useLocation must be used within a RouterProvider");
  }

  return location;
};
