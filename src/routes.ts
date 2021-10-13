import { Router } from 'express';
import { AdministratorController, ClientsController } from './controllers';

const router = Router();

router.put('/administrator/create', AdministratorController.create);
router.get('/administrator/login', AdministratorController.login);

router.put('/clients/create', ClientsController.create);
router.get('/clients/:cpf', ClientsController.get);
router.delete('/clients/:id', ClientsController.delete);
router.post('/clients/:id', ClientsController.update);

export default router;
