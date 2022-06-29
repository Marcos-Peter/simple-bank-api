export class EmailValidator {
  public email: string;
  public errors: string;

  private regex = /^(\S+)@((?:(?:(?!-)[a-zA-Z0-9-]{1,62}[a-zA-Z0-9])\.)+[a-zA-Z0-9]{2,12})$/;

  public constructor(email: string) {
    this.email = this.validator(email);
    this.errors = '';
  };

  private validator(email:string): string {
      if(email.length === 0) {
          this.errors += '[Email]: Email is required.|';
          return '';
      };

      if(!this.regex.test(email)) {
          this.errors += '[Email]: Invalid Email.|';
          return '';
      };

      return email.trim();
  };
};
