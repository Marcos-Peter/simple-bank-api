import env from 'dotenv';
env.config();

export const config = {
  port: process.env.PORT,
  POSTGRES: {
    CONNECTION_STRING: process.env.CONNECTION_STRING,
  },
};
