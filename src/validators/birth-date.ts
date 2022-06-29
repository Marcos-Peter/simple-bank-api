export class BirthDateValidator {
  public birthDate: string;
  public errors: string;

  public constructor(birthDate: string) {
    this.errors = '';
    this.birthDate = this.validation(birthDate);
  }

  private validation(birthDate: string): string {
    if(!birthDate) {
      this.errors += '[Birth Date]: Birth Date is required';
      return '';
    };

    if(!new Date(birthDate).getTime()) {
      this.errors += '[Birth Date]: Birth Date is not valid';
      return '';
    };

    return birthDate.trim();
  };
};
