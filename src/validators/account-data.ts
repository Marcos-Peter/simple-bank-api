import { Account } from '../models';
import { AccountDigitValidator, AccountValidator, AgencyDigitValidator, AgencyValidator, BalanceValidator, CPFValidator, PasswordValidator } from '.';

export class AccountDataValidator {
  public account: Partial<Account>;
  public errors: string;

  private accountValidator = AccountValidator;
  private accountDigitValidator = AccountDigitValidator;
  private agencyValidator = AgencyValidator;
  private agencyDigitValidator = AgencyDigitValidator;
  private balanceValidator = BalanceValidator;
  private cpfValidator = CPFValidator;
  private passwordValidator = PasswordValidator;

  public constructor(account: Account) {
    this.account = this.validator(account);
    this.errors = '';
  };

  private validator(account: Account): Partial<Account> {
    const validAccount = new this.accountValidator(account.account);
    const validCpf = new this.cpfValidator(account.cpf);
    const validPassword = new this.passwordValidator(account.password);
    const validAccountDigit = new this.accountDigitValidator(account.accountDigit);
    const validAgency = new this.agencyValidator(account.agency);
    const validAgencyDigit = new this.agencyDigitValidator(account.agencyDigit);
    const validBalance = new this.balanceValidator(account.balance);

    this.errors = this.errors
      .concat(`${validAccount.errors}${validCpf.errors}${validPassword.errors}${validAccountDigit.errors}${validAgency.errors}${validAgencyDigit.errors}${validBalance.errors}`);

    const accountData: Partial<Account> = {
      account: validAccount.account,
      cpf: validCpf.cpf,
      password: validPassword.password,
      accountDigit: validAccountDigit.accountDigit,
      agency: validAgency.agency,
      agencyDigit: validAgencyDigit.agencyDigit,
      balance: validBalance.balance
    };

    return accountData;
  };
};
