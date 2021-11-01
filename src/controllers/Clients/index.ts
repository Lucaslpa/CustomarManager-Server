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
      return httpResponse(400, { error: 'Wrong request' }, res);
    }
    if (!authorization) {
      return httpResponse(401, { error: 'Unauthorized' }, res);
    }
    const isRepeated = await clientsModel.get('', cpf);
    const token = authorization.split(' ')[1];
    const tokenIsValid = jwt.verifyToken(`${token}`);

    if (!tokenIsValid) {
      return httpResponse(401, { error: 'Unauthorized' }, res);
    }

    if (isRepeated) {
      return httpResponse(409, { error: 'Customer already exist' }, res);
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

    if (!authorization) {
      return httpResponse(401, { error: 'Unauthorized' }, res);
    }

    const token = authorization.split(' ')[1];
    const tokenIsValid = jwt.verifyToken(`${token}`);

    if (!tokenIsValid) {
      return httpResponse(401, { error: 'Unauthorized' }, res);
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
      return httpResponse(500, { error: 'Something Was wrong' }, res);
    }

    return httpResponse(200, { success: `Customer ${name} updated` }, res);
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

    const client = await clientsModel.get(id);

    if (!client) {
      return httpResponse(404, { error: 'error: client not found' }, res);
    }

    return httpResponse(200, { client }, res);
  }

  async getMany(req: Request, res: Response) {
    const { page } = req.query;

    const { authorization } = req.headers;

    if (!authorization) {
      return httpResponse(401, { error: 'error: unauthorized' }, res);
    }

    const token = authorization.split(' ')[1];
    const tokenIsValid = jwt.verifyToken(`${token}`);
    if (!tokenIsValid) {
      return httpResponse(401, { error: 'error: unauthorized' }, res);
    }

    const clients = await clientsModel.getMany(Number(page));

    if (!clients) {
      return httpResponse(404, { error: 'error: client not found' }, res);
    }

    return httpResponse(200, { clients }, res);
  }

  async deleteMany(req: Request, res: Response) {
    const { ids } = req.body;

    const { authorization } = req.headers;

    if (!authorization) {
      return httpResponse(401, { error: 'error: unauthorized' }, res);
    }

    const token = authorization.split(' ')[1];
    const tokenIsValid = jwt.verifyToken(`${token}`);
    if (!tokenIsValid) {
      return httpResponse(401, { error: 'error: unauthorized' }, res);
    }

    const clients = await clientsModel.deleteMany(ids);

    if (!clients) {
      return httpResponse(404, { error: 'error: client not found' }, res);
    }

    return httpResponse(200, { clients }, res);
  }
}
