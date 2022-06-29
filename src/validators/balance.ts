export class BalanceValidator {
  public balance: string;
  public errors: string;

  public constructor(balance: string) {
    this.balance = this.validator(balance);
    this.errors = '';
  };

  private validator(balance: string): string {
    if(!balance) {
      this.errors += '[Balance]: Balance is required';
      return '';
    };

    if(!balance.trim()) {
      this.errors += '[Balance]: Balance cannot be null';
      return '';
    };

    if(!parseFloat(balance)) {
      this.errors += '[Balance]: Balance must be a number';
      return '';
    };

    if(parseFloat(balance) < 0) {
      this.errors += '[Balance]: Balance must be greater than 0';
      return '';
    };

    return balance;
  };
};
