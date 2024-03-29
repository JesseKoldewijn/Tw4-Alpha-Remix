import { Suspense, memo, useState } from "react";
import { useBrowserLayoutEffect } from "~/utils/ssr-layout-effect";

import type ButtonType from "./Button";
import type { ButtonProps } from "./Button";

const Loading = () => {
  return <></>;
};

const LazyButton = memo(
  (props: ButtonProps) => {
    const [Component, setComponent] = useState<typeof ButtonType>();

    const getComponent = async () => {
      const module = await import("./Button");
      setComponent(module.default);
    };

    useBrowserLayoutEffect(() => {
      if (Component) return;

      void getComponent();
    }, [Component]);

    if (!Component) {
      return <Loading />;
    }

    return (
      <Suspense fallback={<Loading />}>
        <Component {...props} />
      </Suspense>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.onClick === nextProps.onClick;
  },
);
LazyButton.displayName = "Button";
export const Button = LazyButton;
