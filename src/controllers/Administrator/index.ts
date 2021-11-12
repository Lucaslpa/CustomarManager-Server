import { Request, Response } from 'express';
import { administratorModel } from '../../models';
import { AdministratorTypes } from '../../types/Administrator';
import { BCRYPT } from '../../utils/bcrypt';
import { JWT } from '../../utils/jwt/Jwt';

const bcrypt = new BCRYPT();
const jwt = new JWT();

export class Administrator {
  async create(req: Request, res: Response) {
    const { username, password }: AdministratorTypes = req.body;
    const passwordEncrypted = await bcrypt.encrypt(password);
    const passwordIsEncrypted = typeof passwordEncrypted === 'string';

    if (!passwordIsEncrypted) {
      res.status(500).json({ error: 'something was wrong' });
      return;
    }

    const administrator = await administratorModel.add({
      username,
      password: passwordEncrypted,
    });
    res.status(200).json({ administrator });
  }

  async login(req: Request, res: Response) {
    const token = jwt.generateToken({
      id: res.locals.administrator._id,
      username: res.locals.administrator.username,
    });
    res.status(200).json({ token });
  }
}
