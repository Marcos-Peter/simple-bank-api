import dotenv from 'dotenv';
dotenv.config();

const { Client } = require('pg');

export async function SearchUser(cpf: string) {
  const clientSelect = new Client();

  try {
    console.log('search');
    await clientSelect.connect();
    console.log('conectado ao banco');

    const selectOwnerQuery = `
      SELECT cpf, id FROM public.owners
        WHERE cpf = $1
    `;

    const check = await clientSelect.query(selectOwnerQuery, [cpf]);
    let id = check.rows[0].id;
    await clientSelect.end();

    if (check.rows.length !== 0) {
      return id;
    };

    return false
  } catch (error) {
    await clientSelect.end();
    return false;
  };
};
