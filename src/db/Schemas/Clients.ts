import mongoose from 'mongoose';

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

  return model('Clients', Clients);
}
