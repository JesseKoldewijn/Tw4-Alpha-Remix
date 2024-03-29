const asyncStartAxe = async () => {
  if (import.meta.env.PROD) return;

  // importing react to pass instance to Axe
  const react = await import("react");
  const reactDOM = await import("react-dom");
  const axe = await import("@axe-core/react")
    .then((mod) => mod.default)
    .finally(() => {
      console.debug("Axe loaded");
    });

  // pass react and react-dom instances to axe
  void axe(
    react,
    reactDOM,
    1000,
    {
      // Configuration
      // specs: https://github.com/dequelabs/axe-core/blob/master/doc/API.md#api-name-axeconfigure
      disableDeduplicate: true,
    },
    {
      // CTX
      // specs: https://github.com/dequelabs/axe-core/blob/master/doc/API.md#context-parameter
      include: [["#__remix"], ["body"], ["html"]],
    },
  );
};
export default asyncStartAxe;
