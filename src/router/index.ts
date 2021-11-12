import { Router } from 'express';
import AdministratorRouter from './Administrator';
import CustomersRouter from './Customer';

const router = Router();

router.use(AdministratorRouter);
router.use(CustomersRouter);

export default router;
