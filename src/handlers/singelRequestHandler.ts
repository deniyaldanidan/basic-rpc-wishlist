import z from "zod";
import {
  INVALIDPARAMSCODE,
  INVALIDREQCODE,
  METHODNOTFOUNDCODE,
} from "../helpers/constants";
import { ErrorResponse, SuccessResponse } from "../helpers/ResponseClasses";
import { methods } from "../methods/methods";

const basicRpcParser = z.object({
  jsonrpc: z.literal("2.0"),
  id: z.union([z.string().min(1), z.number()]),
  method: z.string().min(1),
});

export default function singleRequestHandler(body: any) {
  // Validate the request
  const parsedBody = basicRpcParser.safeParse(body);
  if (!parsedBody.success) {
    const bodyErrObj = new ErrorResponse(
      null,
      INVALIDREQCODE,
      "Invalid Request",
    );
    return bodyErrObj;
  }
  //   Check if the method exists?
  const { method, id } = parsedBody.data;

  if (!(method in methods)) {
    const methodErrObj = new ErrorResponse(
      id,
      METHODNOTFOUNDCODE,
      "Method not found",
    );
    return methodErrObj;
  }
  const hasParams = methods[`${method}`].params;

  let parsedParams: any;
  if (hasParams) {
    //   Validate the Params
    const { params } = body;

    //   sanitize the req.body before calling the methods
    parsedParams = methods[`${method}`].parser.safeParse(params);
    if (!parsedParams.success) {
      return new ErrorResponse(id, INVALIDPARAMSCODE, "Invalid params");
    }
  }

  // Execute the request
  const result = methods[`${method}`].method(
    hasParams ? parsedParams.data : undefined,
  );
  const successObj = new SuccessResponse(id, result);
  return successObj;
}
