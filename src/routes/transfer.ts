import { CreateTransference } from '../controllers';
import { Router } from 'express';

const route = Router();

route.route('/transfer')
  .post(new CreateTransference().handle.bind(new CreateTransference()));

export default route;
