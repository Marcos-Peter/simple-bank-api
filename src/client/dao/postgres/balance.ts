import dotenv from 'dotenv';

dotenv.config();
const { Client } = require('pg');

export async function CheckBalance(cpf: string, password:string, agency: string, agency_digit: string, account: string, account_digit:string) {
  const clientSelect = new Client();

  try {
    console.log('search');
    await clientSelect.connect();
    console.log('conectado ao banco');

    const selectBalanceQuery = `
      SELECT * FROM public.accounts
      WHERE
        cpf=$1 and
        password=$2 and
        agency=$3 and
        agency_digit=$4 and
        account=$5 and
        account_digit=$6
    `;

    const check = await clientSelect.query(selectBalanceQuery, [cpf, password, agency, agency_digit, account, account_digit]);
    let balance = check.rows[0];
    await clientSelect.end();
    console.log(check.rows)

    if (check.rows.length !== 0) {
      return balance;
    };

    return false
  } catch (error) {
    await clientSelect.end();
    return false;
  };
};
