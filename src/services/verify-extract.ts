import { APIResponse, Extract } from '../models';
import { ExtractDataValidator } from '../validators';
import { ExceptionsTreatment } from "../utils";
import { CheckExtract } from '../client/dao/postgres/extract';


export class VerifyExtractService {
  private extractDataValidator = ExtractDataValidator;
  private extractTable = CheckExtract;

  public async execute(extract: Extract): Promise<APIResponse> {
    try {
      const validExtractData = new this.extractDataValidator(extract);

      if(validExtractData.errors) {
        throw new Error(`400: ${validExtractData.errors}`);
      };

      const verifyExtract = await this.extractTable(extract.cpf, extract.password, extract.agency, extract.agencyDigit, extract.account, extract.accountDigit);
      console.log(verifyExtract);

      if(verifyExtract) {
        return {
          data: verifyExtract,
          messages: []
        } as APIResponse;
      };

      return {
        data: {},
        messages: [ "[Extract]: An error occurred while trying to find the specified account." ]
      } as APIResponse;
    } catch(error) {
      throw new ExceptionsTreatment(
        error as Error,
        500,
        "[Extract]: Internal server error."
      );
    };
  };
};
