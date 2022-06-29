import { AccountDigitValidator, AccountValidator, AgencyDigitValidator, AgencyValidator, CPFValidator, ValueValidator } from '.';
import { Deposit } from '../models';

export class DepositDataValidator {
  public deposit: Partial<Deposit>;
  public errors: string;

  private accountValidator = AccountValidator;
  private accountDigitValidator = AccountDigitValidator;
  private agencyValidator = AgencyValidator;
  private agencyDigitValidator = AgencyDigitValidator;
  private cpfValidator = CPFValidator;
  private valueValidator = ValueValidator;

  public constructor(deposit: Deposit) {
    this.deposit = this.validator(deposit);
    this.errors = '';
  };

  private validator(deposit: Deposit): Partial<Deposit> {
    const validAccount = new this.accountValidator(deposit.account);
    const validCpf = new this.cpfValidator(deposit.cpf);
    const validValue = new this.valueValidator(deposit.value);
    const validAccountDigit = new this.accountDigitValidator(deposit.accountDigit);
    const validAgency = new this.agencyValidator(deposit.agency);
    const validAgencyDigit = new this.agencyDigitValidator(deposit.agencyDigit);

    this.errors = this.errors
      .concat(`${validAccount.errors}${validCpf.errors}${validValue.errors}${validAccountDigit.errors}${validAgency.errors}${validAgencyDigit.errors}`);

    const depositData: Partial<Deposit> = {
      account: validAccount.account,
      cpf: validCpf.cpf,
      accountDigit: validAccountDigit.accountDigit,
      agency: validAgency.agency,
      agencyDigit: validAgencyDigit.agencyDigit,
      value: validValue.value
    };

    return depositData;
  };
};
