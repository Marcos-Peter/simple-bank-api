import { AccountDigitValidator, AccountValidator, AgencyDigitValidator, AgencyValidator, CPFValidator, PasswordValidator } from '.';
import { Extract } from '../models';

export class ExtractDataValidator {
  public errors: string;
  public extract: Partial<Extract>;

  private accountValidator = AccountValidator;
  private accountDigitValidator = AccountDigitValidator;
  private agencyValidator = AgencyValidator;
  private agencyDigitValidator = AgencyDigitValidator;
  private cpfValidator = CPFValidator;
  private passwordValidator = PasswordValidator;

  public constructor(extract: Extract) {
    this.errors = '';
    this.extract = this.validator(extract);
  };

  private validator(extract: Extract): Partial<Extract> {
    const validAccount = new this.accountValidator(extract.account);
    const validPassword = new this.passwordValidator(extract.password);
    const validCpf = new this.cpfValidator(extract.cpf);
    const validAccountDigit = new this.accountDigitValidator(extract.accountDigit);
    const validAgency = new this.agencyValidator(extract.agency);
    const validAgencyDigit = new this.agencyDigitValidator(extract.agencyDigit);

    this.errors = this.errors
      .concat(`${validAccount.errors}${validPassword.errors}${validCpf.errors}${validAccountDigit.errors}${validAgency.errors}${validAgencyDigit.errors}`);

    const extractData: Partial<Extract> = {
      account: validAccount.account,
      password: validPassword.password,
      cpf: validCpf.cpf,
      accountDigit: validAccountDigit.accountDigit,
      agency: validAgency.agency,
      agencyDigit: validAgencyDigit.agencyDigit
    };

    return extractData;
  };
};
