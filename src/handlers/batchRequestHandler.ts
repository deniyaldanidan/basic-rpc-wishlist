import singleRequestHandler from "./singelRequestHandler";

export default function batchRequestHandler(body: any[]) {
  const response: any[] = [];
  body.forEach((dt) => response.push(singleRequestHandler(dt)));
  return response;
}
