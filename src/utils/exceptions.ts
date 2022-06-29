export class ExceptionsTreatment {
  public constructor (err: Error, statusCode = 500, message = "[Server]: Internal server error") {
    const [ statusCodeError ] = err.message.split(": ");

    if(Number(statusCodeError)) {
      throw err;
    } else {
      throw new Error(`${statusCode}: ${message}`);
    };
  };
};
