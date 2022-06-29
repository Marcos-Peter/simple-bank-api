import { APIResponse } from "../models";
import { Response } from "express";

export class CreateResponse {
  public static error (res: Response, err: Error): void {
    const [ statusCode, messages ] = err.message.split(": ");

    if(Number(statusCode)) {
      res.status(Number(statusCode)).json({
        data: {},
        messages: messages.split("|").filter((message: string) => message !== "")
      } as APIResponse);
    } else {
      res.status(500).json({
        data: {},
        messages: ["[Srever]: Internal server error"]
      } as APIResponse);
    };
  };

  public static success (res: Response, statusCode: number, response: APIResponse): void {
    res.status(statusCode).json(response);
  };
};
