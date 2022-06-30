import { PostgresDB } from ".";
import { User, Account } from "../../../models";
import dotenv from 'dotenv';

dotenv.config();
const { Client } = require('pg');

export class UserTable extends PostgresDB {
  public async insert (user: User, account: Account): Promise<boolean>{
    const client = new Client();

    try {
      await client.connect();
      console.log('conectado ao banco');

      const insertUserQuery = `
        INSERT INTO public.users
          (id, cpf, name, email, birthDate)
        VALUES
          ( $1, $2, $3, $4, $5 ) RETURNING id
      `;

      const result = await client.query(insertUserQuery, [
        user.id,
        user.cpf,
        user.name,
        user.email,
        user.birthDate
      ]);

      if (result.rows.length !== 0) {
        const insertAccountQuery = `
          INSERT INTO public.accounts
            (id, cpf, password, agency, agency_digit, account, account_digit, balance)
          VALUES
            ( $1, $2, $3, $4, $5, $6, $7, $8 ) RETURNING id
        `;

        const result = await client.query(insertAccountQuery, [
          account.id,
          account.cpf,
          account.password,
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
      await client.end();
      throw new Error("503: service temporarily unavailable");
    };
  };
};
