import { APIResponse, Balance } from '../models';
import { BalanceDataValidator } from '../validators';
import { ExceptionsTreatment } from "../utils";
import { CheckBalance } from '../client/dao/postgres/balance';


export class VerifyBalanceService {
  private balanceDataValidator = BalanceDataValidator;
  private balanceTable = CheckBalance;

  public async execute(balance: Balance): Promise<APIResponse> {
    try {
      const validBalanceData = new this.balanceDataValidator(balance);

      if(validBalanceData.errors) {
        throw new Error(`400: ${validBalanceData.errors}`);
      };

      const verifyBalance = await this.balanceTable(balance.cpf, balance.password, balance.agency, balance.agencyDigit, balance.account, balance.accountDigit);
      console.log(verifyBalance);

      if(verifyBalance) {
        return {
          data: verifyBalance,
          messages: []
        } as APIResponse;
      };

      return {
        data: {},
        messages: [ "[Server]: An error occurred while trying to find the specified account." ]
      } as APIResponse;
    } catch(error) {
      throw new ExceptionsTreatment(
        error as Error,
        500,
        "[Server]: Internal server error."
      );
    };
  };
};
