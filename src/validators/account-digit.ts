export class AccountDigitValidator {
  public accountDigit: string;
  public errors: string;

  constructor(accountDigit: string) {
    this.errors = '';
    this.accountDigit = this.validator(accountDigit);
  };

  private validator(accountDigit: string): string {
    console.log(accountDigit);
    if(!accountDigit) {
      this.errors += '[Account Digit]: Account Digit required|';
      return '';
    };

    if(accountDigit.trim().length !== 1) {
      this.errors += '[Account Digit]: Account Digit must have 1 character|';
      return '';
    };

    if(!accountDigit.trim) {
      this.errors += '[Account Digit]: Account Digit cannot be null|';
      return '';
    };

    return accountDigit.trim();
  };
};
