import { ClientsModel } from '.';
import { ConnectToDB } from '../../db/connectDB';
import { ClientsSchema } from '../../db/Schemas/Clients';

const client = {
  address: '2',
  birthday: 'papel',
  cpf: '223',
  email: 'dsd',
  name: 'dfsvds',
  phone: 'dsfdsf',
  surname: 'dsafsdf',
};
const dbConnect = ConnectToDB(`${process.env.MONGODB_URL_TEST}`);
const Schema = ClientsSchema(dbConnect);
const model = new ClientsModel(Schema);

describe('ClientsModel', () => {
  afterAll(async () => {
    await Schema.deleteMany({ cpf: client.cpf });
    dbConnect.disconnect();
  });

  it('should add a client to Client database', async () => {
    const res = await model.add(client);
    expect(res.cpf).toBe(client.cpf);
  });
  it('should delete a client from Client database', async () => {
    const clientToDelete = await model.add(client);
    const res = await model.delete(clientToDelete._id);

    expect(res.deletedCount).toBe(1);
  });

  it('should update a client from Client database', async () => {
    const newClient = {
      ...client,
      name: 'julio',
    };
    const clientToDelete = await model.add(client);
    const res = await model.update(clientToDelete._id, newClient);

    expect(res.modifiedCount).toBe(1);
  });

  it('should get a client from Client database', async () => {
    const clientToDelete = await model.add(client);
    const res = await model.get(clientToDelete._id);
    expect(res.cpf).toBe(clientToDelete.cpf);
  });
});
