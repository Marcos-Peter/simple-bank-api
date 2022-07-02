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
    this.errors = '';
    this.deposit = this.validator(deposit);
  };

  private validator(deposit: Deposit): Partial<Deposit> {
    console.log("DepositDataValidator");
    const validCpf = new this.cpfValidator(deposit.cpf);
    const validAgency = new this.agencyValidator(deposit.agency);
    const validAgencyDigit = new this.agencyDigitValidator(deposit.agencyDigit);
    const validAccount = new this.accountValidator(deposit.account);
    const validAccountDigit = new this.accountDigitValidator(deposit.accountDigit);
    const validValue = new this.valueValidator(deposit.value);

    this.errors = this.errors
      .concat(`${validAccount.errors}${validCpf.errors}${validValue.errors}${validAccountDigit.errors}${validAgency.errors}${validAgencyDigit.errors}`);

    const depositData: Partial<Deposit> = {
      cpf: validCpf.cpf,
      agency: validAgency.agency,
      agencyDigit: validAgencyDigit.agencyDigit,
      account: validAccount.account,
      accountDigit: validAccountDigit.accountDigit,
      value: validValue.value
    };

    console.log(depositData);

    return depositData;
  };
};
