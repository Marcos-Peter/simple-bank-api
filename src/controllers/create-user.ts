import { Request, Response } from 'express';
import { CreateUserService } from '../services';
import { CreateResponse } from '../utils';

export class CreateUser {
  private userService = CreateUserService;
  private createResponse = CreateResponse;

  public async handle(req: Request, res: Response) {
    try {
      const response = await new this.userService().execute(req.body);
      this.createResponse.success(res, 201, response);
    } catch(err) {
      this.createResponse.error(res, err as Error);
    };
  };
};
