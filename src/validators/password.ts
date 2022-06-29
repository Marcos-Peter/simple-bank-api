export class PasswordValidator {
  public errors: string;
  public password: string;

  constructor(password: string) {
    this.errors = '';
    this.password = this.validator(password);
  };

  private validator(password: string): string {
    if(!password) {
      this.errors += '[Password]: Password is required.|';
      return '';
    };

    if(password.trim().length < 8) {
      this.errors += '[Password]: Password must be at least 8 characters.|';
      return '';
    };

    if(!password.trim) {
      this.errors += '[Password]: Password cannot be null.|';
      return '';
    };

    return password.trim();
  };
};
