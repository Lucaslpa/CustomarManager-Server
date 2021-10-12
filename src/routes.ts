import { Router } from 'express';
import { AdministratorController } from './controllers';

const router = Router();

router.put('/administrator/create', AdministratorController.create);

export default router;
