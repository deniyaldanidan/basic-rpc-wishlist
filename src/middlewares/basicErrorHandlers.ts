import type { ErrorRequestHandler, RequestHandler } from "express";
import z from "zod";
import { methods } from "../methods/methods";
import {
  BADREQUESTSTATUS,
  INVALIDREQCODE,
  JSONPARSEERRORCODE,
  METHODNOTFOUNDCODE,
} from "../helpers/constants";
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

const basicRpcParser = z.object({
  jsonrpc: z.literal("2.0"),
  id: z.union([z.string().min(1), z.number()]),
  method: z.string().min(1),
});

export const invalidRequestHandler: RequestHandler = (req, res, next) => {
  const parseResult = basicRpcParser.safeParse(req.body);
  if (!parseResult.success) {
    const errObj = new ErrorResponse(null, INVALIDREQCODE, "Invalid Request");
    return res.status(BADREQUESTSTATUS).json(errObj);
  }
  next();
};

export const unknownMethodErrorHandler: RequestHandler = (req, res, next) => {
  const { method, id }: { method: string; id: string | number } = req.body;
  // const validMethods = Object.keys(methods);

  if (!(method in methods)) {
    const errObj = new ErrorResponse(
      id,
      METHODNOTFOUNDCODE,
      "Method not found",
    );
    return res.status(BADREQUESTSTATUS).json(errObj);
  }
  next();
};
