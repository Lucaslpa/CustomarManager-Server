import mongoose from 'mongoose';

export function AdministratorSchema(mongooseWithDB: typeof mongoose) {
  const { Schema, model } = mongooseWithDB;

  const Administrator = new Schema({
    username: String,
    password: String,
  });

  return model('Administrator', Administrator);
}
