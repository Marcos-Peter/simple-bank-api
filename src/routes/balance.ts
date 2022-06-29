import { VerifyBalance } from '../controllers';
import { Router } from 'express';

const route = Router();

route.route('/balance')
  .post(new VerifyBalance().handle.bind(new VerifyBalance()));

export default route;
