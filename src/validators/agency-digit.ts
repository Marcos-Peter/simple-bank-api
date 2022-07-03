export class AgencyDigitValidator {
  public agencyDigit: string;
  public errors: string;

  constructor(agencyDigit: string) {
    this.errors = '';
    this.agencyDigit = this.validator(agencyDigit);
  };

  private validator(agencyDigit: string): string {
    if(!agencyDigit) {
      this.errors += '[Agency Digit]: Agency Digit required|';
      return '';
    };

    if(agencyDigit.trim().length !== 1) {
      this.errors += '[Agency Digit]: Agency Digit must have 1 character|';
      return '';
    };

    if(!agencyDigit.trim) {
      this.errors += '[Agency Digit]: Agency Digit cannot be null|';
      return '';
    };

    return agencyDigit.trim();
  };
};
