import { APIResponse, Withdraw } from '../models';
import { WithdrawDataValidator } from '../validators';
import { ExceptionsTreatment } from "../utils";
import { WithdrawTable } from '../client/dao/postgres/withdraw';
import { v4 } from 'uuid';

export class CreateWithdrawService {
  private withdrawDataValidator = WithdrawDataValidator;
  private withdrawTable = WithdrawTable;

  public async execute(withdraw: Withdraw): Promise<APIResponse> {
    try {
      const validWithdrawData = new this.withdrawDataValidator(withdraw);

      if(validWithdrawData.errors) {
        throw new Error(`400: ${validWithdrawData.errors}`);
      };

      validWithdrawData.withdraw.id = v4();

      const makeWithdraw = await new this.withdrawTable().insert(validWithdrawData.withdraw as Withdraw);

      if(makeWithdraw) {
        return {
          data: makeWithdraw,
          messages: []
        } as APIResponse;
      }

      return {
        data: {},
        messages: [ "[Withdraw]: An error occurred while making the withdraw" ]
      } as APIResponse;

  } catch(error) {
      throw new ExceptionsTreatment(
        error as Error,
        500,
        "[Withdraw]: An error occurred while making the withdraw"
      );
    };
  };
};
