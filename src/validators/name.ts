export class NameValidator {
  public errors: string;
  public name: string;

  public constructor(name: string) {
    this.errors = '';
    this.name = this.validator(name);
  };

  private validator(name: string): string {
    if(!name) {
      this.errors += '[Name]: Name is required.|';
      return '';
    };

    if(name.trim().length < 5) {
      this.errors += '[Name]: Name must be at least 5 characters.|';
      return '';
    };

    if(name.length > 64) {
      this.errors += '[Name]: Name must be less than 60 characters.|';
    };

    if(!name.trim()) {
      this.errors += '[Name]: Name cannot be null.|';
      return '';
    };

    return name.trim();
  };
};
