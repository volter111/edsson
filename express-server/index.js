import express from "express";
import cors from "cors";

import layout from "./JSON/layout.json" assert {type: "json"};
import definition from "./JSON/definition.json" assert {type: "json"};


const app = express();

const port = 3500;

// how to start

// http://localhost:3500/layout
// node index.js
// node --experimental-json-modules index.js

app.use(cors());

app.get("/documentDefinition", (req, res) => {
  res.json(definition);
});

app.get("/layout", (req, res) => {
  res.json(layout);
});

app.listen(port, () => {
  console.log(`CURRENT PORT IS ${port}`);
});
