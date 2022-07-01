import env from 'dotenv';
env.config();

export const config = {
  PORT: process.env.PORT || 3030,
  POSTGRES: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
  },
};
