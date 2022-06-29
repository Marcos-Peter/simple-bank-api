import { APIResponse, Deposit } from '../models';
import { DepositDataValidator } from '../validators';
import { ExceptionsTreatment } from "../utils";
import { DepositTable } from '../client/dao/postgres/deposit';
import { v4 } from 'uuid';

export class CreateDepositService {
  private depositDataValidator = DepositDataValidator;
  private depositTable = DepositTable;

  public async execute(deposit: Deposit): Promise<APIResponse> {
    try {
      const validDepositData = new this.depositDataValidator(deposit);

      if(validDepositData.errors) {
        throw new Error(`400: ${validDepositData.errors}`);
      };

      validDepositData.deposit.id = v4();

      const makeDeposit = await new this.depositTable().insert(validDepositData.deposit as Deposit);

      if(makeDeposit) {
        return {
          data: makeDeposit,
          messages: []
        } as APIResponse;
      };

      return {
        data: {},
        messages: [ "[Deposit]: An error occurred while making the deposit." ]
      } as APIResponse;
    } catch(error) {
      throw new ExceptionsTreatment(
        error as Error,
        500,
        "[Deposit]: An error occurred while making the deposit"
      );
    };
  };
};
