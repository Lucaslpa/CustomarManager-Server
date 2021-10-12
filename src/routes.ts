import { Router } from 'express';
import { AdministratorController } from './controllers';

const router = Router();

router.get('/', AdministratorController.callTest);

export default router;
