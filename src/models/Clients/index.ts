import { ClientsTypes } from '../../types/Clients';
import { Model } from '../../db/Schemas/Clients';

export class ClientsModel {
  private clientsModel;

  constructor(model: Model) {
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

  async get(id?: string, cpf?: string) {
    const query = id ? { _id: id } : { cpf };
    const res = await this.clientsModel.findOne(query);
    return res;
  }

  async getMany(page: number) {
    const options = {
      page,
      limit: 10,
      customLabels: { totalPages: 'pageCount' },
    };
    const res = await this.clientsModel.paginate({}, options);
    return res;
  }

  async deleteMany(ids: string[]) {
    const res = await this.clientsModel.deleteMany({ _id: { $in: ids } });
    return res;
  }
}
