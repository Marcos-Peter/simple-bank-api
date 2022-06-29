export class ValueValidator {
  public errors: string;
  public value: string;

  public constructor(value: string) {
    this.errors = '';
    this.value = this.validator(value);
  };

  private validator(value: string): string {
    if(!value) {
      this.errors += '[Value]: Value is required.|';
      return '';
    };
    if(!value.trim()) {
      this.errors += '[Value]: Value cannot be null|';
      return '';
    };

    if(!parseFloat(value)) {
      this.errors += '[Value]: Value must be a number.|';
      return '';
    };

    if(parseFloat(value) < 0) {
      this.errors += '[Value]: Value must be greater than 0.|';
      return '';
    };

    return value;
  };
};
