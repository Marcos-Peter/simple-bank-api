import { CreateUser } from '../controllers';
import { Router } from 'express';

const route = Router();

route.route('/create')
  .post(new CreateUser().handle.bind(new CreateUser()));

export default route;
