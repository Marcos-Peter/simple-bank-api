import dotenv from 'dotenv';
dotenv.config();

const { Client } = require('pg');

export async function VerifyExtract(cpf: string, password:string, agency: string, agency_digit: string, account: string, account_digit:string) {
  const clientSelect = new Client();

  try {
    console.log('search');
    await clientSelect.connect();
    console.log('conectado ao banco');

    const selectBalanceQuery = `
      SELECT * FROM public.accounts
      WHERE
        owner_cpf=$1 and
        password=$2 and
        agency=$3 and
        agency_digit=$4 and
        account=$5 and
        account_digit=$6
    `;

    const check = await clientSelect.query(selectBalanceQuery, [cpf, password, agency, agency_digit, account, account_digit]);
    let id = check.rows[0].id;
    console.log(id)

    const selectExtractQuery = `
      SELECT * FROM public.extracts
      WHERE
        account_id=$1
    `;

    const check2 = await clientSelect.query(selectExtractQuery, [id]);
    let extract = check2.rows;
    console.log(check2.rows);
    console.log(extract, 'aqui');
    await clientSelect.end();

    if (check.rows.length !== 0) {
        return extract;
    };
    console.log(check2.rows)

    return false;
  } catch (error) {
      await clientSelect.end();
      return false;
  };
};
