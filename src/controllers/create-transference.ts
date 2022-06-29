import { Request, Response } from 'express';
import { CreateTransferenceService } from '../services';
import { CreateResponse } from '../utils';

export class CreateTransference {
  private transferenceService = CreateTransferenceService;
  private createResponse = CreateResponse;

  public async handle(req: Request, res: Response) {
    try {
      const response = await new this.transferenceService().execute(req.body);
      this.createResponse.success(res, 201, response);
    } catch(err) {
      this.createResponse.error(res, err as Error);
    };
  };
};
