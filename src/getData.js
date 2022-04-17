import axios from "axios";

const getData = async () => {
  const layoutPromise = axios.get("http://localhost:3500/layout");
  const definitionPromise = axios.get(
    "http://localhost:3500/documentDefinition"
  );

  const [layout, definition] = await Promise.all([
    layoutPromise,
    definitionPromise,
  ]);

  const result = { layout: layout.data, definition: definition.data };

  return result;
};

export default getData;
