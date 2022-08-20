export class TankerkoenigError extends Error {
  code?: number;
  message: string;

  constructor(code: number, message: string) {
    super();
    this.code = code;
    this.message = message;
    this.stack = new Error().stack;
  }
}

export class ErrorAPIBadRequest extends TankerkoenigError {
  constructor(code: number, message: string) {
    super(code, message);
  }
}

export class ErrorAPIUnauthorizedRequest extends TankerkoenigError {
  constructor(code: number, message: string) {
    super(code, message);
  }
}

export class ErrorAPINotFound extends TankerkoenigError {
  constructor() {
    super(404, "Not Found");
  }
}

export class ErrorAPIKeyMissing extends TankerkoenigError {
  constructor() {
    super(0, "API key missing");
  }
}

export class ErrorAPIInternalServerError extends TankerkoenigError {
  constructor(code: number, message: string) {
    super(code, message);
  }
}

export class ErrorAPIServiceUnavailable extends TankerkoenigError {
  constructor(code: number, message: string) {
    super(code, message);
  }
}

export class ErrorAPIGenericError extends TankerkoenigError {
  constructor(code: number, message: string) {
    super(code, message);
  }
}
