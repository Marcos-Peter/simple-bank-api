import { Account } from '../models';
import { v4 } from 'uuid';
import { RandomPassword } from './generate-password';

export class CreateAccount {
  id: string;
  cpf: string;
  agency: string;
  agencyDigit: string;
  account: string;
  accountDigit: string;
  balance: string;

  public constructor (cpf: string) {
    this.id = v4();
    this.cpf = cpf;
    this.agency = String(Math.floor(Math.random() * 99999));
    this.agencyDigit = String(Math.floor(Math.random() * 9));
    this.account = String(Math.floor(Math.random() * 99999));
    this.accountDigit = String(Math.floor(Math.random() * 9));
    this.balance = String(0);
  };

  generate() {
    const accountData: Account = {
      id: this.id,
      cpf: this.cpf,
      account: this.account,
      accountDigit: this.accountDigit,
      agency: this.agency,
      agencyDigit: this.agencyDigit,
      balance: this.balance
    };

    return accountData;
  };
};
