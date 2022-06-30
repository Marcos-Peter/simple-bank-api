import env from 'dotenv';
env.config();

export const config = {
  PORT: process.env.PORT || 3030,
  POSTGRES: {
    CONNECTION_STRING: process.env.CONNECTION_STRING,
  },
};
