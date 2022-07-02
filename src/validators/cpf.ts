import { validate } from "cpf-check";

export class CPFValidator {
  public cpf: string;
  public errors: string;

  public constructor(cpf: string) {
    this.errors = '';
    this.cpf = this.validator(cpf);
  };

  private validator(cpf: string): string {
    console.log("CPFValidator");
    cpf = cpf.replace(/[^\d]+/g, '');

    if(cpf.length === 0) {
      this.errors += '[CPF]: CPF is required.|';
      return '';
    };

    if(cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) {
      this.errors += '[CPF]: Invalid CPF length.|';
      return '';
    };

    if(!validate(cpf)) {
      this.errors += '[CPF]: Invalid CPF.|';
      return '';
    };

    return cpf.trim();
  };
};

