class BasicResponse {
  public jsonrpc: string;
  public id: string | number | null;
  constructor(id: string | number | null) {
    this.jsonrpc = "2.0";
    this.id = id;
  }
}

export class SuccessResponse extends BasicResponse {
  public result;
  constructor(id: string | number, result: {} | []) {
    super(id);
    this.result = result;
  }
}

export class ErrorResponse extends BasicResponse {
  public error: { code: number; message: string };
  constructor(id: number | string | null, errorCode: number, errorMsg: string) {
    super(id);
    this.error = {
      code: errorCode,
      message: errorMsg,
    };
  }
}
