import { PostgresDB } from ".";
import { Withdraw } from "../../../models";
import dotenv from 'dotenv';
dotenv.config();

const { Client } = require('pg');
import { v4 } from 'uuid';

export class WithdrawTable extends PostgresDB {
  public async insert (withdraw: Withdraw): Promise<Object>{
    const client = new Client();

    try {
      await client.connect();
      console.log('conectado ao banco');
      const selectBalanceQuery = `
      SELECT * FROM public.accounts
      WHERE
          owner_cpf=$1 and
          agency=$2 and
          agency_digit=$3 and
          account=$4 and
          account_digit=$5 and
          password=$6

      `;
      const check = await client.query(selectBalanceQuery, [withdraw.cpf, withdraw.agency, withdraw.agencyDigit, withdraw.account, withdraw.accountDigit, withdraw.password]);
      let balance = check.rows[0];
      let id = balance.id;
      let atualBalance = parseFloat(balance.balance);
      let withdrawValue = parseFloat(withdraw.value);

      let fee = 4;
      let newFee = withdrawValue + fee;
      let newValue = atualBalance - newFee;

      if(newValue >= 0){
        console.log('entrou')

        const insertWithdrawQuery = `
          INSERT INTO public.extracts
            (id, account_id, operation_id, value, created_at)
          VALUES
            ( $1, $2, $3, $4, NOW() ) RETURNING id
        `;

        const result = await client.query(insertWithdrawQuery, [
          withdraw.id,
          id,
          '4',
          withdraw.value
        ]);

        console.log(result.rows)

        if (result.rows.length !== 0) {
          console.log("primeiro ok")
        };

        const insertFeeQuery = `
          INSERT INTO public.extracts
            (id, account_id, operation_id, value, created_at)
          VALUES
            ( $1, $2, $3, $4, NOW() ) RETURNING id
        `;

        const passFee = String(fee);
        const feeId = v4();

        const feeResult = await client.query(insertFeeQuery, [
          feeId,
          id,
          '5',
          passFee
        ]);

        console.log(feeResult.rows);

        if (feeResult.rows.length !== 0) {
          console.log("segundo ok")
        };

        const alterBalance = `
          UPDATE public.accounts SET balance = balance - $1
          WHERE
            owner_cpf=$2 and
            password=$3 and
            agency=$4 and
            agency_digit=$5 and
            account=$6 and
            account_digit=$7
            RETURNING balance
        `;

        const final = await client.query(alterBalance, [
          newFee,
          withdraw.id,
          withdraw.cpf,
          withdraw.agency,
          withdraw.agencyDigit,
          withdraw.account,
          withdraw.accountDigit
        ]);

        const data = {
          withdraw: {
            id: withdraw.id,
            value:withdraw.value,
            cpf: withdraw.cpf,
            agency: withdraw.agency,
            agencyDigit: withdraw.agencyDigit,
            account: withdraw.account,
            accountDigit: withdraw.accountDigit
          },
          fee: {
            id: feeId,
            value: passFee
          }
        }

        await client.end();

        return data;
      };

      return false;
    } catch (error) {
      await client.end();
      throw new Error("503: service temporarily unavailable");
    };
  };
};
