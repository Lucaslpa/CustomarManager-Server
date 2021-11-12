import { Request, Response } from 'express';
import { clientsModel } from '../../models';
import { ClientsTypes } from '../../types/Clients';

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

    const newClient = await clientsModel.add({
      address,
      cpf,
      birthday,
      email,
      name,
      phone,
      surname,
    });

    res.status(200).json({ newClient });
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

      res.status(200).json({ success: `customer ${name} was updated` });
    } catch (e) {
      res.status(500).json({
        error: 'something was wrong. Maybe this customer not exists',
      });
    }
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    try {
      await clientsModel.delete(id);
      res.status(200).json({ success: 'customer was deleted' });
    } catch (e) {
      res
        .status(500)
        .json({ error: 'something was wrong. Maybe this customer not exists' });
    }
  }

  async get(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const client = await clientsModel.get(id);

      if (!client) {
        res.status(404).json({ error: 'Customer not found' });
      }

      res.status(200).json({ client });
    } catch (err) {
      res.status(500).json({ error: 'something was wrong' });
    }
  }

  async getMany(req: Request, res: Response) {
    const { page } = req.params;

    try {
      const clients = await clientsModel.getMany(Number(page));
      if (!clients) {
        res.status(404).json({ error: 'clients not founded' });
      }

      res.status(200).json({ clients });
    } catch (err) {
      res.status(500).json({ error: 'something was wrong' });
    }
  }

  async deleteMany(req: Request, res: Response) {
    const { ids } = req.body;

    if (!ids || !ids.length) {
      res.status(400).json({ error: 'none id was provided' });
    }

    try {
      const clients = await clientsModel.deleteMany(ids);

      if (!clients) {
        res.status(500).json({ error: 'nothing deleted' });
      }

      res.status(200).json({ clients });
    } catch (err) {
      res.status(500).json({ error: 'something was wrong' });
    }
  }
}
