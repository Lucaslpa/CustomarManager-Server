import { Router } from 'express';
import { AdministratorController } from '../controllers';
import {
  VerifyIfPasswordIsCorrect,
  VerifyAdmValues,
  AdmNotFounded,
} from '../middlewares/validates';

const router = Router();

router.post(
  '/administrator/create',
  VerifyAdmValues,
  AdministratorController.create
);
router.post(
  '/administrator/login',
  VerifyAdmValues,
  AdmNotFounded,
  VerifyIfPasswordIsCorrect,
  AdministratorController.login
);

export default router;
