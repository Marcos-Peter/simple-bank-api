import { APIResponse, User, Account } from '../models';
import { UserDataValidator } from '../validators';
import { ExceptionsTreatment } from "../utils";
import { UserTable } from '../client/dao/postgres/user-account';
import { AccountTable } from '../client/dao/postgres/account';
import { SearchUser } from '../client/dao/postgres/search-user';
import { CreateAccount } from '../utils';
import { v4 } from 'uuid';
import { RandomPassword } from '../utils/generate-password';

export class CreateUserService {
  private createAccount = CreateAccount;
  private userDataValidator = UserDataValidator;
  private userTable = UserTable;
  private accountTable = AccountTable;


  public async execute(user: User): Promise<APIResponse> {
    try {
      let insertUser;
      const validUserData = new this.userDataValidator(user);
      const newAccount = new this.createAccount(user.cpf);

      if(validUserData.errors) {
        throw new Error(`400: ${validUserData.errors}`);
      };

      validUserData.user.id = v4();
      validUserData.user.password = new RandomPassword(8).generate();
      const searchUser = await SearchUser(user.cpf);
      console.log(searchUser);

      if(!searchUser) {
        console.log('insertUser');
        insertUser = await new this.userTable().insert(validUserData.user as User, newAccount as unknown as Account);
      } else {
        insertUser = await new this.accountTable().insert(newAccount as unknown as Account);
        validUserData.user.id = searchUser;
      };

      if(insertUser) {
        return {
          data: {user: validUserData.user,
          account: newAccount},
          messages: []
        } as APIResponse;
      };

      return {
        data: {},
        messages: [ "[User]: An error occurred while creating the user" ]
      } as APIResponse;
    } catch(error) {
      throw new ExceptionsTreatment(
        error as Error,
        500,
        "[User]: An error occurred while inserting user on database"
      );
    };
  };
};
