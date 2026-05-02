import express from "express";
import { jsonParserErrorHandler } from "./middlewares/basicErrorHandlers";
import batchRequestHandler from "./handlers/batchRequestHandler";
import singleRequestHandler from "./handlers/singelRequestHandler";

const app = express();
const PORT = 3000;

// * We're only accepting application/json
app.use(express.json(), jsonParserErrorHandler);

app.post("/api", (req, res) => {
  const isBatch = Array.isArray(req.body);

  let result: any;
  if (isBatch) {
    result = batchRequestHandler(req.body);
  } else {
    result = singleRequestHandler(req.body);
  }
  return res.json(result);
});

app.listen(PORT, () => {
  console.log(`API IS UP AND RUNNING IN PORT: ${PORT}`);
});
