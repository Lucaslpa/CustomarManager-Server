import mongoose from 'mongoose';
import { ClientsTypes } from '../../types/Clients';

export class ClientsModel {
  private clientsModel;

  constructor(model: typeof mongoose.Model) {
    this.clientsModel = model;
  }

  async add(client: ClientsTypes) {
    const res = await this.clientsModel.create(client);
    return res;
  }

  async delete(id: string) {
    const res = await this.clientsModel.deleteOne({ _id: id });
    return res;
  }

  async update(id: string, newClient: ClientsTypes) {
    const res = await this.clientsModel.updateOne({ _id: id }, newClient);
    return res;
  }

  async get(cpf: string) {
    const res = await this.clientsModel.findOne({ cpf });
    return res;
  }
}
