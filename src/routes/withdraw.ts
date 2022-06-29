import { CreateWithdraw } from '../controllers';
import { Router } from 'express';

const route = Router();

route.route('/withdraw')
  .post(new CreateWithdraw().handle.bind(new CreateWithdraw()));

export default route;
