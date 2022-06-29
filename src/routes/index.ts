import Owner from './owner';
import Account from './account';
import Balance from './balance';
import Deposit from './deposit';
import express from 'express';
import Withdraw from './withdraw';
import Extract from './extract';
import Transfer from './transfer';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(Owner);
app.use(Account);
app.use(Balance);
app.use(Deposit);
app.use(Withdraw); 
app.use(Extract); 
app.use(Transfer);

export default app;