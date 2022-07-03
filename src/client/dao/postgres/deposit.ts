import { config } from "../../../config";
import { Deposit } from "../../../models";
import dotenv from 'dotenv';
import { PostgresDB } from ".";
import { v4 } from 'uuid';
dotenv.config();
const { Client } = require('pg');

export class DepositTable extends PostgresDB {
  public async insert (deposit: Deposit): Promise<Object>{
    const client = new Client(config.POSTGRES);

    try {
      await client.connect();
      console.log('Connected to postgres');
      const selectBalanceQuery = `
        SELECT * FROM public.accounts
        WHERE
          userid=$1 and
          agency=$2 and
          agency_digit=$3 and
          account=$4 and
          account_digit=$5
      `;

      const check = await client.query(selectBalanceQuery, [
        deposit.cpf,
        deposit.agency,
        deposit.agencyDigit,
        deposit.account,
        deposit.accountDigit
      ]);

      let balance = check.rows[0];
      let id = balance.id;
      let atualBalance = parseFloat(balance.balance);
      let depositValue = parseFloat(deposit.value);

      let fee = (depositValue * 0.01);
      let newFee = depositValue - fee;
      let newValue = atualBalance + newFee;

      if(newValue >= 0){
        const insertQuery = `
          INSERT INTO public.operations
            (id, account, operation, value, description)
          VALUES
            ($1, $2, $3, $4, $5) RETURNING id
        `;

        const result = await client.query(insertQuery, [
          deposit.id,
          id,
          '1',
          deposit.value,
          'Deposit'
        ]);

        console.log(result.rows)
        if (result.rows.length !== 0) {
          console.log("Deposit query success");
        };

        const feeId = v4();
        const passFee = String(fee);

        console.log(balance);

        const feeResult = await client.query(insertQuery, [
          feeId,
          id,
          '5',
          parseInt(passFee),
          'Deposit Fee'
        ]);

        if (feeResult.rows.length !== 0){
          console.log("Fee query success");
        };

        const alterBalance = `
          UPDATE public.accounts SET balance = balance + $1
          WHERE
            userid=$2 and
            agency=$3 and
            agency_digit=$4 and
            account=$5 and
            account_digit=$6
            RETURNING balance
        `;

        console.log(typeof newFee);
        const finalBalance = await client.query(alterBalance, [
          parseInt(newFee),
          deposit.cpf,
          deposit.agency,
          deposit.agencyDigit,
          deposit.account,
          deposit.accountDigit
        ]);

        if (finalBalance.rows.length !== 0){
          console.log("Balance updated!");
        };

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
