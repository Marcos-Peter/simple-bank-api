import { VerifyExtract } from '../controllers';
import { Router } from 'express';

const route = Router();

route.route('/extract')
  .post(new VerifyExtract().handle.bind(new VerifyExtract()));

export default route;
