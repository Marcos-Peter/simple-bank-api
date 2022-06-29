import { AccountDigitValidator, PasswordValidator, AccountValidator, AgencyDigitValidator, AgencyValidator, CPFValidator, ValueValidator } from '.';
import { Withdraw } from '../models';

export class WithdrawDataValidator {
  public errors: string;
  public withdraw: Partial<Withdraw>;

  private accountValidator = AccountValidator;
  private passwordValidator = PasswordValidator;
  private accountDigitValidator = AccountDigitValidator;
  private agencyValidator = AgencyValidator;
  private agencyDigitValidator = AgencyDigitValidator;
  private cpfValidator = CPFValidator;
  private valueValidator = ValueValidator;

  public constructor(withdraw: Withdraw) {
    this.errors = '';
    this.withdraw = this.validator(withdraw);
  };

  private validator(withdraw: Withdraw): Partial<Withdraw> {
    const validAccount = new this.accountValidator(withdraw.account);
    const validPassword = new this.passwordValidator(withdraw.password);
    const validCpf = new this.cpfValidator(withdraw.cpf);
    const validValue = new this.valueValidator(withdraw.value);
    const validAccountDigit = new this.accountDigitValidator(withdraw.accountDigit);
    const validAgency = new this.agencyValidator(withdraw.agency);
    const validAgencyDigit = new this.agencyDigitValidator(withdraw.agencyDigit);

    this.errors = this.errors
      .concat(`${validAccount.errors}${validPassword.errors}${validCpf.errors}${validValue.errors}${validAccountDigit.errors}${validAgency.errors}${validAgencyDigit.errors}`);

    const withdrawData: Partial<Withdraw> = {
      account: validAccount.account,
      password: validPassword.password,
      cpf: validCpf.cpf,
      accountDigit: validAccountDigit.accountDigit,
      agency: validAgency.agency,
      agencyDigit: validAgencyDigit.agencyDigit,
      value: validValue.value
    };

    return withdrawData;
  };
};
