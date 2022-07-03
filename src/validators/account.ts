export class AccountValidator {
  public account: string;
  public errors: string;

  constructor(account: string) {
    this.errors = '';
    this.account = this.validator(account);
  };

  private validator(account: string): string {
    if(!account) {
      this.errors += '[Account]: Account is required.|';
      return '';
    };

    if(account.trim().length < 5) {
      this.errors += '[Account]: Account must have at least 5 characters.|';
      return '';
    };

    if(!account.trim) {
      this.errors += '[Account]: Account cannot be null|';
      return '';
    };

    return account.trim();
  };
};
