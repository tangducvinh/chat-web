"use strict";

const StatusCode = {
  OK: 200,
  CREATED: 201,
  NOTFOUND: 404,
};

const ReasonStatusCode = {
  CREATED: "Created!",
  OK: "Success",
  NOTFOUND: "Not Found",
};

class SuccessResponse {
  constructor({
    message,
    statusCode = StatusCode.OK,
    reasonStatusCode = ReasonStatusCode.OK,
    metadata = {},
  }) {
    (this.message = message ? message : ReasonStatusCode.OK),
      (this.statusCode = statusCode),
      (this.metadata = metadata);
  }

  send(res, header = {}) {
    return res.status(this.statusCode).json(this);
  }
}

class OK extends SuccessResponse {
  constructor({ message, metadata }) {
    super(message, metadata);
  }
}

class CREATED extends SuccessResponse {
  constructor({
    message,
    statusCode = StatusCode.CREATED,
    reasonStatusCode = ReasonStatusCode.CREATED,
    metadata,
  }) {
    super({ message, statusCode, reasonStatusCode, metadata });
  }
}

module.exports = {
  SuccessResponse,
  OK,
  CREATED,
};
