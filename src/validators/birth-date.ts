export class BirthDateValidator {
  public birthDate: string;
  public errors: string;

  public constructor(birthDate: string) {
    this.errors = '';
    this.birthDate = this.validator(birthDate);
  };

  private validator(birthDate: string): string {
    if(!birthDate) {
      console.log('birthdate validator');
      this.errors += '[Birth Date]: Birth Date is required';
      return '';
    };

    if(!new Date(birthDate).getTime()) {
      console.log('birthdate validator');

      this.errors += '[Birth Date]: Birth Date is not valid';
      return '';
    };

    return birthDate.trim();
  };
};
