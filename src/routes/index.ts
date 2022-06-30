import User from './user';
import Account from './account';
import Balance from './balance';
import Deposit from './deposit';
import express from 'express';
import Withdraw from './withdraw';
import Extract from './extract';
import Transfer from './transfer';

const server = express();

server.use(express.urlencoded({ extended: false }));
server.use(express.json());
server.use(User);
server.use(Account);
server.use(Balance);
server.use(Deposit);
server.use(Withdraw);
server.use(Extract);
server.use(Transfer);

export default server;
