import express from "express";
import {
  jsonParserErrorHandler,
  invalidRequestHandler,
  unknownMethodErrorHandler,
} from "./middlewares/basicErrorHandlers";
import { SuccessResponse } from "./helpers/ResponseClasses";
import { GOODREQUESTSTATUS } from "./helpers/constants";
import { methods } from "./methods/methods";

const app = express();
const PORT = 3000;

// * We're only accepting application/json
app.use(express.json(), jsonParserErrorHandler);
// * Validate Request
app.use(invalidRequestHandler);
// * Unknown method handler
app.use(unknownMethodErrorHandler);
// * Validate METHOD Params
// app.use()

// * handle methods
app.post("/api", (req, res) => {
  const {
    method,
    params,
    id,
  }: { method: string; params: any; id: string | number } = req.body;

  //   sanitize the req.body before calling the methods

  const result = methods[`${method}`](params[0]);
  const successObj = new SuccessResponse(id, result);
  res.status(GOODREQUESTSTATUS).json(successObj);
});

// Error Handlers:
// app.use(jsonParserErrorHandler);

app.listen(PORT, () => {
  console.log(`API IS UP AND RUNNING IN PORT: ${PORT}`);
});
