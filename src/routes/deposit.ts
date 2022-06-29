import { CreateDeposit } from '../controllers';
import { Router } from 'express';

const route = Router();

route.route('/deposit')
  .post(new CreateDeposit().handle.bind(new CreateDeposit()));

export default route;
