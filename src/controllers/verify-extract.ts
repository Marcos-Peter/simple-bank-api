import { Request, Response } from 'express';
import { VerifyExtractService } from '../services';
import { CreateResponse } from '../utils';

export class VerifyExtract {
  private extractService = VerifyExtractService;
  private createResponse = CreateResponse;

  public async handle(req: Request, res: Response) {
    try {
      const response = await new this.extractService().execute(req.body);
      this.createResponse.success(res, 201, response);
    } catch(err) {
      this.createResponse.error(res, err as Error);
    };
  };
};
