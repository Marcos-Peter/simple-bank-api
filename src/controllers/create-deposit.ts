import { Request, Response } from 'express';
import { CreateDepositService } from '../services';
import { CreateResponse } from '../utils';

export class CreateDeposit {
  private depositService = CreateDepositService;
  private createResponse = CreateResponse;

  public async handle(req: Request, res: Response){
    try {
      console.log("create-deposit-controller")
      const response = await new this.depositService().execute(req.body);
      this.createResponse.success(res, 201, response);
    } catch(err) {
      console.log("error create-deposit-controller");
      this.createResponse.error(res, err as Error);
    };
  };
};
