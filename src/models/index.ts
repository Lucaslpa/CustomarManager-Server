import { AdministratorModel } from './Administrator';
import { AdministratorSchema } from '../db/Schemas/Administrator';
import { ClientsModel } from './Clients';
import { ClientsSchema } from '../db/Schemas/Clients';
import { ConnectToDB } from '../db/connectDB';

require('dotenv').config();

const dbConnect = ConnectToDB(`${process.env.MONGODB_URL}`);

export const administratorModel = new AdministratorModel(
  AdministratorSchema(dbConnect)
);

export const clientsModel = new ClientsModel(ClientsSchema(dbConnect));
