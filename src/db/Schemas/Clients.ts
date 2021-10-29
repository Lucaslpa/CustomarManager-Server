import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

export function ClientsSchema(mongooseWithDB: typeof mongoose) {
  const { Schema, model } = mongooseWithDB;
  const Clients = new Schema({
    address: String,
    birthday: String,
    cpf: String,
    email: String,
    name: String,
    phone: String,
    surname: String,
  });

  Clients.plugin(mongoosePaginate);

  return model('Clients', Clients);
}

export type Model = ReturnType<typeof ClientsSchema>;
