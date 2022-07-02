import { AccountDigitValidator, AccountValidator, AgencyDigitValidator, AgencyValidator, CPFValidator, PasswordValidator } from '.';
import { Balance } from '../models';

export class BalanceDataValidator {
  public errors: string;
  public balance: Balance;

  private accountValidator = AccountValidator;
  private accountDigitValidator = AccountDigitValidator;
  private agencyValidator = AgencyValidator;
  private agencyDigitValidator = AgencyDigitValidator;
  private cpfValidator = CPFValidator;
  private passwordValidator = PasswordValidator;

  public constructor(balance: Balance) {
    this.balance = this.validator(balance);
    this.errors = '';
  };

  private validator(balance: Balance): Balance {
    const validAccount = new this.accountValidator(balance.account);
    const validCpf = new this.cpfValidator(balance.cpf);
    const validPassword = new this.passwordValidator(balance.password);
    const validAccountDigit = new this.accountDigitValidator(balance.accountDigit);
    const validAgency = new this.agencyValidator(balance.agency);
    const validAgencyDigit = new this.agencyDigitValidator(balance.agencyDigit);

    this.errors = this.errors
      .concat(`${validAccount.errors}${validCpf.errors}${validPassword.errors}${validAccountDigit.errors}${validAgency.errors}${validAgencyDigit.errors}`);

    const balanceData: Balance = {
      account: validAccount.account,
      cpf: validCpf.cpf,
      password: validPassword.password,
      accountDigit: validAccountDigit.accountDigit,
      agency: validAgency.agency,
      agencyDigit: validAgencyDigit.agencyDigit
    };

    return balanceData;
  };
};
