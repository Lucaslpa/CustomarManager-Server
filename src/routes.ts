import { Router } from 'express';
import { AdministratorController, ClientsController } from './controllers';

const router = Router();

router.post('/administrator/create', AdministratorController.create);
router.post('/administrator/login', AdministratorController.login);

router.post('/clients', ClientsController.create);
router.get('/clients/:id', ClientsController.get);
router.delete('/clients/:id', ClientsController.delete);
router.put('/clients/:id', ClientsController.update);
router.get('/clients', ClientsController.getMany);
router.delete('/clients', ClientsController.deleteMany);

export default router;
