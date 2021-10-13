import { Request, Response } from 'express';
import { httpResponse } from '../../utils/httpResponses';
import { clientsModel } from '../../models';
import { ClientsTypes } from '../../types/Clients';
import { JWT } from '../../utils/jwt/Jwt';

const jwt = new JWT();

export class Clients {
  async create(req: Request, res: Response) {
    const {
      address,
      cpf,
      birthday,
      email,
      name,
      phone,
      surname,
    }: ClientsTypes = req.body;

    const { authorization } = req.headers;

    if (
      !address ||
      !cpf ||
      !birthday ||
      !email ||
      !name ||
      !phone ||
      !surname
    ) {
      return httpResponse(400, { error: 'error: without some data' }, res);
    }
    if (!authorization) {
      return httpResponse(401, { error: 'error: unauthorized' }, res);
    }
    const isRepeated = await clientsModel.get(cpf);

    const token = authorization.split(' ')[1];
    const tokenIsValid = jwt.verifyToken(`${token}`);

    if (!tokenIsValid) {
      return httpResponse(401, { error: 'error: unauthorized' }, res);
    }

    if (isRepeated) {
      return httpResponse(400, { error: 'error: client already exist' }, res);
    }

    const newClient = await clientsModel.add({
      address,
      cpf,
      birthday,
      email,
      name,
      phone,
      surname,
    });

    return httpResponse(200, { newClient }, res);
  }

  async update(req: Request, res: Response) {
    const {
      address,
      cpf,
      birthday,
      email,
      name,
      phone,
      surname,
    }: ClientsTypes = req.body;
    const { id } = req.params;
    const { authorization } = req.headers;

    if (
      !id ||
      !address ||
      !cpf ||
      !birthday ||
      !email ||
      !name ||
      !phone ||
      !surname
    ) {
      return httpResponse(400, { error: 'error: without some data' }, res);
    }

    if (!authorization) {
      return httpResponse(401, { error: 'error: unauthorized' }, res);
    }

    const token = authorization.split(' ')[1];
    const tokenIsValid = jwt.verifyToken(`${token}`);

    if (!tokenIsValid) {
      return httpResponse(401, { error: 'error: unauthorized' }, res);
    }

    try {
      await clientsModel.update(id, {
        address,
        cpf,
        birthday,
        email,
        name,
        phone,
        surname,
      });
    } catch (e) {
      return httpResponse(500, { error: 'something was wrong' }, res);
    }

    return httpResponse(200, { success: `${name} was updated` }, res);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const { authorization } = req.headers;

    if (!authorization) {
      return httpResponse(401, { error: 'error: unauthorized' }, res);
    }

    const token = authorization.split(' ')[1];
    const tokenIsValid = jwt.verifyToken(`${token}`);

    if (!tokenIsValid) {
      return httpResponse(401, { error: 'error: unauthorized' }, res);
    }

    try {
      await clientsModel.delete(id);
    } catch (e) {
      return httpResponse(500, { error: 'something was wrong' }, res);
    }

    return httpResponse(200, { success: `id ${id} was deleted` }, res);
  }

  async get(req: Request, res: Response) {
    const { cpf } = req.params;

    const { authorization } = req.headers;

    if (!authorization) {
      return httpResponse(401, { error: 'error: unauthorized' }, res);
    }

    const token = authorization.split(' ')[1];
    const tokenIsValid = jwt.verifyToken(`${token}`);
    if (!tokenIsValid) {
      return httpResponse(401, { error: 'error: unauthorized' }, res);
    }

    const client = await clientsModel.get(cpf);

    if (!client) { return httpResponse(404, { error: 'error: client not found' }, res); }

    return httpResponse(200, { client }, res);
  }
}
