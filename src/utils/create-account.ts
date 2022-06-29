import { Account } from '../models';
import { v4 } from 'uuid';
import { RandomPassword } from './generate-password';

export class CreateAccount {
  accountId: string;
  cpf: string;
  password: string;
  agency: number;
  agencyDigit: number;
  newAccount: number;
  accountDigit: number;
  balance: number;

  private constructor (cpf: string) {
    this.accountId = v4();
    this.cpf = cpf;
    this.password = new RandomPassword(8).generate();
    this.agency = Math.floor(Math.random() * 99999);
    this.agencyDigit = Math.floor(Math.random() * 9);
    this.newAccount = Math.floor(Math.random() * 99999);
    this.accountDigit = Math.floor(Math.random() * 9);
    this.balance = 0;
  };

  generate() {
    const accountData: Partial<Account> = {
      id: this.accountId,
      cpf: this.cpf,
      password: this.password,
      account: this.newAccount,
      accountDigit: this.accountDigit,
      agency: this.agency,
      agencyDigit: this.agencyDigit,
      balance: this.balance
    };

    return accountData
  };
};
