import { APIResponse, Account } from '../models';
import { AccountDataValidator } from '../validators';
import { v4 } from 'uuid';

export class CreateAccountService {
  private accountDataValidator = AccountDataValidator;

  public execute(account: Account): APIResponse {
    const validAccountData = new this.accountDataValidator(account);

    if(validAccountData.errors) {
      throw new Error(`400: ${validAccountData.errors}`);
    };

    validAccountData.account.id = v4();

    return {
      data: validAccountData.account,
      messages: []
    } as APIResponse;
  };
};
