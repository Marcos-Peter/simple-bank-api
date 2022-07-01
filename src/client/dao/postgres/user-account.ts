import { PostgresDB } from ".";
import { User, Account } from "../../../models";
import { config } from "../../../config";
import dotenv from 'dotenv';

dotenv.config();
const { Client } = require('pg');

export class UserTable extends PostgresDB {
  public async insert (user: User, account: Account): Promise<boolean>{
    const client = new Client(config.POSTGRES);

    try {
      console.log("try");
      await client.connect();
      console.log('Connected to postgres');

      const insertUserQuery = `
        INSERT INTO public.users
          (id, name, email, cpf, birthdate, password)
        VALUES
          ($1, $2, $3, $4, $5, $6) RETURNING id
      `;

      console.log(user);

      const result = await client.query(insertUserQuery, [
        user.id,
        user.name,
        user.email,
        user.cpf,
        user.birthDate,
        user.password
      ]);

      if (result.rows.length !== 0) {
        const insertAccountQuery = `
          INSERT INTO public.accounts
            (id, userId, account, account_digit, agency, agency_digit, balance)
          VALUES
            ( $1, $2, $3, $4, $5, $6, $7 ) RETURNING id
          `;

        console.log(account);

        const result = await client.query(insertAccountQuery, [
          account.id,
          user.cpf,
          account.agency,
          account.agencyDigit,
          account.account,
          account.accountDigit,
          account.balance
        ]);

        await client.end();

        if (result.rows.length !== 0){
          return true;
        };

        return false;
      };
      return false;
    } catch (error) {
      console.log(error);
      await client.end();
      throw new Error("503: Service temporarily unavailable");
    };
  };
};
