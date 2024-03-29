/**
 * By default, Remix will handle hydrating your app on the client for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.client
 */
import { RemixBrowser } from "@remix-run/react";
import { StrictMode, startTransition } from "react";
import { hydrateRoot } from "react-dom/client";

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <RemixBrowser />
    </StrictMode>,
  );
});

const startAxe = async () => {
  /**
   * Wrapping the code below in this way to prevent
   * it from being included in prod bundle
   */
  if (import.meta.env.NODE_ENV === "development") {
    const asyncStartAxe = await import("~/utils/axe-a11y").then(
      (mod) => mod.default,
    );
    void asyncStartAxe();
  }
};
void startAxe();
