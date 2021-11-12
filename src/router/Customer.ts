import { Router } from 'express';
import { ClientsController } from '../controllers';
import {
  VerifyCustomerValues,
  VerifyCustomerAlreadyExist,
} from '../middlewares/validates';

const router = Router();

router.post(
  '/clients',
  VerifyCustomerValues,
  VerifyCustomerAlreadyExist,
  ClientsController.create
);

router.get('/client/:id', ClientsController.get);
router.delete('/client/:id', ClientsController.delete);
router.put('/client/:id', ClientsController.update);
router.delete('/clients', ClientsController.deleteMany);
router.get('/clients/:page', ClientsController.getMany);

export default router;
