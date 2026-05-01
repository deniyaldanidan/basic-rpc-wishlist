import express from "express";
import {
  jsonParserErrorHandler,
  invalidRequestHandler,
  unknownMethodErrorHandler,
} from "./middlewares/basicErrorHandlers";
import { ErrorResponse, SuccessResponse } from "./helpers/ResponseClasses";
import {
  BADREQUESTSTATUS,
  GOODREQUESTSTATUS,
  INVALIDPARAMSCODE,
} from "./helpers/constants";
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
  const parsedResult = methods[`${method}`].parser.safeParse(params);
  if (!parsedResult.success) {
    return res
      .status(BADREQUESTSTATUS)
      .json(new ErrorResponse(id, INVALIDPARAMSCODE, "Invalid params"));
  }

  const result = methods[`${method}`].method(parsedResult.data);
  const successObj = new SuccessResponse(id, result);
  res.status(GOODREQUESTSTATUS).json(successObj);
});

app.listen(PORT, () => {
  console.log(`API IS UP AND RUNNING IN PORT: ${PORT}`);
});
