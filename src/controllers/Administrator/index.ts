import { Request, Response } from 'express';
import { httpResponse } from '../../utils/httpResponses';
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
    const isRepeated = await administratorModel.get(username);

    if (!username) {
      return httpResponse(400, { error: 'error: without username' }, res);
    }

    if (!password) {
      return httpResponse(400, { error: 'error: without password' }, res);
    }

    if (isRepeated) {
      return httpResponse(
        400,
        { error: 'error: this administrator already exist' },
        res
      );
    }

    if (typeof passwordEncrypted === 'string') {
      const administrator = await administratorModel.add({
        username,
        password: passwordEncrypted,
      });
      return httpResponse(200, { administrator }, res);
    }

    return httpResponse(500, { error: 'unknown error' }, res);
  }

  async login(req: Request, res: Response) {
    const { username, password }: AdministratorTypes = req.body;
    const admFromDB = await administratorModel.get(username);

    if (!username) {
      return httpResponse(400, { error: 'error: without username' }, res);
    }

    if (!password) {
      return httpResponse(400, { error: 'error: without password' }, res);
    }

    if (!admFromDB) {
      return httpResponse(
        400,
        { error: 'error: this administrator none exist' },
        res
      );
    }
    const passwordIsCorrect = await bcrypt.compare(password, admFromDB.password);

    if (!passwordIsCorrect) {
      return httpResponse(400, { error: 'error: incorrect password' }, res);
    }

    const token = jwt.generateToken({
      id: admFromDB._id,
      username: admFromDB.username,
    });
    return httpResponse(200, { token }, res);
  }
}
