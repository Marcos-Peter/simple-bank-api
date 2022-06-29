import { APIResponse, Transference } from '../models';
import { TransferenceDataValidator } from '../validators';
import { ExceptionsTreatment } from "../utils";
import { TransferenceTable } from '../client/dao/postgres/transference';
import { v4 } from 'uuid';

export class CreateTransferenceService {
  private transferenceDataValidator = TransferenceDataValidator;
  private transferenceTable = TransferenceTable;

  public async execute(transfer: Transference): Promise<APIResponse> {

    try {
      const validTransferData = new this.transferenceDataValidator(transfer);

      if(validTransferData.errors) {
        throw new Error(`400: ${validTransferData.errors}`);
      };

      validTransferData.transference.id = v4();

      const makeTransfer = await new this.transferenceTable().insert(validTransferData.transference as Transference);

      if(makeTransfer) {
        return {
          data: makeTransfer,
          messages: []
        } as APIResponse;
      };

      return {
        data: {},
        messages: [ "[Transference]: An error occurred while making the transaction." ]
      } as APIResponse;
    } catch(error) {
      throw new ExceptionsTreatment(
        error as Error,
        500,
        "[Transference]: An error occurred while making the transaction."
      );
    };
  };
};
