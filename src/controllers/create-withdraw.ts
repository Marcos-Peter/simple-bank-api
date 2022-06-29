import { Request, Response } from 'express';
import { CreateWithdrawService } from '../services';
import { CreateResponse } from '../utils';

export class CreateWithdraw {
  private withdrawService = CreateWithdrawService;
  private createResponse = CreateResponse;

  public async handle(req: Request, res: Response) {
    try {
      const response = await new this.withdrawService().execute(req.body);
      this.createResponse.success(res, 201, response);
    } catch(err) {
      this.createResponse.error(res, err as Error);
    };
  };
};
