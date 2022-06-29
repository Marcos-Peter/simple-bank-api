import { Request, Response } from 'express';
import { CreateAccountService } from '../services';
import { CreateResponse } from '../utils';

export class CreateAccount {
  private accountService = CreateAccountService;
  private createResponse = CreateResponse;

  public handle(req: Request, res: Response) {
    try {
      const response = new this.accountService().execute(req.body);
      this.createResponse.success(res, 201, response);
    } catch(err) {
      this.createResponse.error(res, err as Error);
    };
  };
};
