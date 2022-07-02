import { AccountDigitValidator, AccountValidator, AgencyDigitValidator, AgencyValidator, ValueValidator, CPFValidator, PasswordValidator } from '.';
import { Transference } from '../models';

export class TransferenceDataValidator {
  public errors: string;
  public transference: Partial<Transference>;

  private cpfValidator = CPFValidator;
  private passwordValidator = PasswordValidator;
  private agencyValidator = AgencyValidator;
  private agencyDigitValidator = AgencyDigitValidator;
  private accountValidator = AccountValidator;
  private accountDigitValidator = AccountDigitValidator;
  private valueValidator = ValueValidator;

  public constructor(transfer: Transference) {
    this.errors = '';
    this.transference = this.validator(transfer);
  };

  private validator(transference: Transference): Partial<Transference> {
    const validOriginCPF = new this.cpfValidator(transference.originCPF);
    const validOriginPassword = new this.passwordValidator(transference.originPassword);
    const validOriginAgency = new this.agencyValidator(transference.originAgency);
    const validOriginAgencyDigit = new this.agencyDigitValidator(transference.originAgencyDigit);
    const validOriginAccount = new this.accountValidator(transference.originAccount);
    const validOriginAccountDigit = new this.accountDigitValidator(transference.originAccountDigit);
    const validDestinyCpf = new this.cpfValidator(transference.originCPF);
    const validDestinyAgency = new this.agencyValidator(transference.destinyAgency);
    const validDestinyAgencyDigit = new this.agencyDigitValidator(transference.destinyAgencyDigit);
    const validDestinyAccount = new this.accountValidator(transference.destinyAccount);
    const validDestinyAccountDigit = new this.accountDigitValidator(transference.destinyAccountDigit);
    const validValue = new this.valueValidator(transference.value);

    this.errors = this.errors
      .concat(`${validOriginCPF.errors}${validOriginPassword.errors}${validOriginAgency.errors}${validOriginAgencyDigit.errors}${validOriginAccount.errors}${validOriginAccountDigit.errors}${validDestinyCpf.errors}${validDestinyAgency.errors}${validDestinyAgencyDigit.errors}${validDestinyAccount.errors}${validDestinyAccountDigit.errors}${validValue.errors}`);

    const transferenceData: Partial<Transference> = {
      originCPF: validOriginCPF.cpf,
      originPassword: validOriginPassword.password,
      originAgency: validOriginAgency.agency,
      originAgencyDigit: validOriginAgencyDigit.agencyDigit,
      originAccount: validOriginAccount.account,
      originAccountDigit: validOriginAccountDigit.accountDigit,
      destinyCPF: validDestinyCpf.cpf,
      destinyAgency: validDestinyAgency.agency,
      destinyAgencyDigit: validDestinyAgencyDigit.agencyDigit,
      destinyAccount: validDestinyAccount.account,
      destinyAccountDigit: validDestinyAccountDigit.accountDigit,
      value: validValue.value
    };

    return transferenceData;
  };
};
