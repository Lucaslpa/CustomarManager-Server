import mongoose from 'mongoose';
import { AdministratorTypes } from '../../types/Administrator';

export class AdministratorModel {
  private administratorModel;

  constructor(model: typeof mongoose.Model) {
    this.administratorModel = model;
  }

  async add(Administrator: AdministratorTypes) {
    const res = await this.administratorModel.create(Administrator);
    return res;
  }

  async get(username: string) {
    const res = await this.administratorModel.findOne({ username });
    return res;
  }
}
