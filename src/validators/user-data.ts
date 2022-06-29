import { NameValidator, EmailValidator, BirthDateValidator, CPFValidator } from '.';
import { User } from '../models';

export class UserDataValidator {
  public user: Partial<User>;
  public errors: string;

  private nameValidator = NameValidator;
  private emailValidator = EmailValidator;
  private birthDateValidator = BirthDateValidator;
  private cpfValidator = CPFValidator;

  public constructor(User: User) {
    this.errors = '';
    this.user = this.validator(User);
  };

  private validator(User: User): Partial<User> {
    const validName = new this.nameValidator(User.name);
    const validEmail = new this.emailValidator(User.email);
    const validBirthDate = new this.birthDateValidator(User.birthDate);
    const validCpf = new this.cpfValidator(User.cpf);

    this.errors = this.errors
      .concat(`${validName.errors}${validEmail.errors}${validBirthDate.errors}${validCpf.errors}`);

    const UserData: Partial<User> = {
      name: validName.name,
      email: validEmail.email,
      birthDate: validBirthDate.birthDate,
      cpf: validCpf.cpf
    };

    return UserData;
  };
};
