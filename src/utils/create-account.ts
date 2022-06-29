import { Account } from '../models';
import { v4 } from 'uuid';
import { RandomPassword } from './generate-password';

export class CreateAccount {
  accountId: string;
  cpf: string;
  password: string;
  agency: string;
  agencyDigit: string;
  newAccount: string;
  accountDigit: string;
  balance: string;

  public constructor (cpf: string) {
    this.accountId = v4();
    this.cpf = cpf;
    this.password = new RandomPassword(8).generate();
    this.agency = String(Math.floor(Math.random() * 99999));
    this.agencyDigit = String(Math.floor(Math.random() * 9));
    this.newAccount = String(Math.floor(Math.random() * 99999));
    this.accountDigit = String(Math.floor(Math.random() * 9));
    this.balance = String(0);
  };

  generate() {
    const accountData: Account = {
      id: this.accountId,
      cpf: this.cpf,
      password: this.password,
      account: this.newAccount,
      accountDigit: this.accountDigit,
      agency: this.agency,
      agencyDigit: this.agencyDigit,
      balance: this.balance
    };

    return accountData;
  };
};
