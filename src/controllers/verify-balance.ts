import { Request, Response } from 'express';
import { VerifyBalanceService } from '../services';
import { CreateResponse } from '../utils';

export class VerifyBalance {
  private balanceService = VerifyBalanceService;
  private createResponse = CreateResponse;

  public async handle(req: Request, res: Response) {
    try {
      const response = await new this.balanceService().execute(req.body);
      this.createResponse.success(res, 201, response);
    } catch(err) {
      this.createResponse.error(res, err as Error);
    };
  };
};
