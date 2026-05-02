import type { ErrorRequestHandler } from "express";
import { BADREQUESTSTATUS, JSONPARSEERRORCODE } from "../helpers/constants";
import { ErrorResponse } from "../helpers/ResponseClasses";

export const jsonParserErrorHandler: ErrorRequestHandler = (
  err,
  _,
  res,
  next,
) => {
  if (err instanceof SyntaxError) {
    const errObj = new ErrorResponse(
      null,
      JSONPARSEERRORCODE,
      "Parse Error: Invalid Json",
    );
    return res.status(BADREQUESTSTATUS).json(errObj);
  }
  next(err);
};
