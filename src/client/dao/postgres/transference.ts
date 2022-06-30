import { PostgresDB } from ".";
import { Transference } from "../../../models";
import dotenv from 'dotenv';
dotenv.config();

const { Client } = require('pg');
import { v4 } from 'uuid';

export class TransferenceTable extends PostgresDB {
  public async insert (transference: Transference): Promise<Object> {
    const client = new Client();

    try {
      await client.connect();
      console.log('conectado ao banco transference');

      const selectOwnerBalanceQuery = `
        SELECT * FROM public.accounts
        WHERE
          owner_cpf=$1 and
          agency=$2 and
          agency_digit=$3 and
          account=$4 and
          account_digit=$5 and
          password=$6
      `;

      const check = await client.query(selectOwnerBalanceQuery, [transference.originCPF, transference.originAgency, transference.originAgencyDigit, transference.originAccount, transference.originAccountDigit, transference.originPassword]);
      console.log('conectado ao banco transference');
      console.log(check.rows);
      let originBalance = check.rows[0];
      let originId = originBalance.id;
      const selectBalanceQuery = `
      SELECT * FROM public.accounts
      WHERE
          origin_cpf=$1 and
          agency=$2 and
          agency_digit=$3 and
          account=$4 and
          account_digit=$5
      `;
      const transferenceCheck = await client.query(selectBalanceQuery, [transference.destinyCPF, transference.destinyAgency, transference.destinyAgencyDigit, transference.destinyAccount, transference.destinyAccountDigit]);
      let transferenceBalance = transferenceCheck.rows[0];
      let transferenceId = transferenceBalance.id;

      if(!transferenceId || !originId){
          return false;
      }

      let ownerAtualBalance = parseFloat(originBalance.balance);
      let transferenceValue = parseFloat(transference.value);

      let fee = 1;
      let newFee = transferenceValue + fee;
      let newValue = ownerAtualBalance - newFee;

      if(newValue >= 0) {
        console.log('entrou')

        const insertTransferenceQuery = `
          INSERT INTO public.extracts
            (id, account_id, operation_id, value, created_at)
          VALUES
            ( $1, $2, $3, $4, NOW() ) RETURNING id
        `;

        const result = await client.query(insertTransferenceQuery, [
            transference.id,
            originId,
            '3',
            -transference.value
        ]);

        console.log(result.rows)
        if (result.rows.length !== 0) {
          console.log("primeiro ok");
        };

        const insertTransferenceExtract = `
          INSERT INTO public.extracts
            (id, account_id, operation_id, value, created_at)
          VALUES
            ( $1, $2, $3, $4, NOW() ) RETURNING id
        `;
        const transferenceTableId = v4();

        const depositResult = await client.query(insertTransferenceExtract, [
          transferenceTableId,
          transferenceId,
          '3',
          transference.value
        ]);

        console.log(result.rows);

        if (depositResult.rows.length !== 0) {
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
          originId,
          '5',
          passFee
        ]);

        console.log(feeResult.rows);

        if (feeResult.rows.length !== 0){
          console.log("segundo ok")
        };

        const alterBalanceOrigin = `
          UPDATE public.accounts SET balance = balance - $1
          WHERE
            cpf=$2 and
            password=$3 and
            agency=$4 and
            agency_digit=$5 and
            account=$6 and
            account_digit=$7
            RETURNING balance
        `;

        const originBalance = await client.query(alterBalanceOrigin, [
          newFee,
          transference.originCPF,
          transference.originPassword,
          transference.originAgency,
          transference.originAgencyDigit,
          transference.originAccount,
          transference.originAccountDigit
        ]);

        const alterBalanceDestiny = `
          UPDATE public.accounts SET balance = balance + $1
          WHERE
            cpf=$2 and
            agency=$3 and
            agency_digit=$4 and
            account=$5 and
            account_digit=$6
            RETURNING balance
        `;

        const destinyBalance = await client.query(alterBalanceDestiny, [
          newFee,
          transference.destinyCPF,
          transference.destinyAgency,
          transference.destinyAgencyDigit,
          transference.destinyAccount,
          transference.destinyAccountDigit
        ]);

        const data = {
          transference_out: {
            id: transferenceId.id,
            value:transference.value,
            cpf: transference.originCPF,
            agency: transference.originAgency,
            agencyDigit: transference.originAgencyDigit,
            account: transference.originAccount,
            accountDigit: transference.originAccountDigit
          },
          transference_in: {
            id: transferenceTableId,
            cpf: transference.destinyCPF,
            agency: transference.destinyAgency,
            agencyDigit: transference.destinyAgencyDigit,
            account: transference.destinyAccount,
            accountDigit: transference.destinyAccountDigit
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
