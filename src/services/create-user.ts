import { APIResponse, User, Account } from '../models';
import { UserDataValidator } from '../validators';
import { ExceptionsTreatment } from "../utils";
import { UserTable } from '../client/dao/postgres/owner_and_account';
import { AccountTable } from '../client/dao/postgres/account';
import { SearchOwner } from '../client/dao/postgres/search_owner';
import { CreateAccount } from '../utils';
import { v4 } from 'uuid';

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
      const searchOwner = await SearchOwner(user.cpf);
      console.log(searchOwner);

      if(!searchOwner) {
        console.log('insertOwner');
        insertUser = await new this.userTable().insert(validUserData.user as User, newAccount as unknown as Account);
      } else {
        insertUser = await new this.accountTable().insert(newAccount as unknown as Account);
        validUserData.user.id = searchOwner;
      };

      if(insertUser) {
        return {
          data: {owner: validUserData.user,
          account: newAccount},
          messages: []
        } as APIResponse;
      };

      return {
        data: {},
        messages: [ "an error occurred while creating the owner" ]
      } as APIResponse;
    } catch(error) {
      throw new ExceptionsTreatment(
        error as Error,
        500,
        "an error occurred while inserting owner on database"
      );
    };
  };
};
