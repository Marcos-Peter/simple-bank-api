import { PostgresDB } from ".";
import { Deposit } from "../../../models";
import dotenv from 'dotenv';

dotenv.config();
const { Client } = require('pg');
import { v4 } from 'uuid';

export class DepositTable extends PostgresDB {
  public async insert (deposit: Deposit): Promise<Object>{
    const client = new Client();

    try {
      await client.connect();
      console.log('Connected to postgres');
      const selectBalanceQuery = `
        SELECT * FROM public.accounts
        WHERE
          cpf=$1 and
          agency=$2 and
          agency_digit=$3 and
          account=$4 and
          account_digit=$5
      `;

      const check = await client.query(selectBalanceQuery, [deposit.cpf, deposit.agency, deposit.agencyDigit, deposit.account, deposit.accountDigit]);
      let balance = check.rows[0];
      let id = balance.id;
      let atualBalance = parseFloat(balance.balance);
      let depositValue = parseFloat(deposit.value);

      let fee = (depositValue * 0.01);
      let newFee = depositValue - fee;
      let newValue = atualBalance + newFee;

      if(newValue >= 0){
        console.log('Entering')

        const insertDepositQuery = `
          INSERT INTO public.extracts
            (id, account_id, operation_id, value, created_at)
          VALUES
            ( $1, $2, $3, $4, NOW() ) RETURNING id
        `;

        const result = await client.query(insertDepositQuery, [
          deposit.id,
          id,
          '1',
          deposit.value
        ]);

        console.log(result.rows)
        if (result.rows.length !== 0) {
          console.log("primeiro ok");
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

        if (feeResult.rows.length !== 0){
          console.log("segundo ok");
        };

        const alterBalance = `
          UPDATE public.accounts SET balance = balance + $1
          WHERE
            cpf=$2 and
            agency=$3 and
            agency_digit=$4 and
            account=$5 and
            account_digit=$6
            RETURNING balance
        `;

        const final = await client.query(alterBalance, [
          newFee,
          deposit.cpf,
          deposit.agency,
          deposit.agencyDigit,
          deposit.account,
          deposit.accountDigit
        ]);

        const data = {
          deposit: {
            id: deposit.id,
            value:deposit.value,
            cpf: deposit.cpf,
            agency: deposit.agency,
            agencyDigit: deposit.agencyDigit,
            account: deposit.account,
            accountDigit: deposit.accountDigit
          },
          fee: {
            id: feeId,
            value: passFee
          }
        };

        await client.end();

        return data;
      }

      return false;
    } catch (error) {
      await client.end();
      throw new Error("503: service temporarily unavailable");
    };
  };
};
