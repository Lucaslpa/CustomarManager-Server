import { AdministratorModel } from '.';
import { ConnectToDB } from '../../db/connectDB';
import { AdministratorSchema } from '../../db/Schemas/Administrator';

const administrator = {
  username: 'adm1',
  password: '12334',
};
const dbConnect = ConnectToDB(`${process.env.MONGODB_URL_TEST}`);
const Schema = AdministratorSchema(dbConnect);
const model = new AdministratorModel(Schema);

describe('AdministratorModel', () => {
  afterAll(async () => {
    await Schema.deleteMany({ username: administrator.username });
    dbConnect.disconnect();
  });
  it('should add a Administrator to administrator database', async () => {
    const res = await model.add(administrator);
    expect(res.username).toBe(administrator.username);
  });
  it('should get a administrator from administrator database', async () => {
    const test = await model.add(administrator);
    const res = await model.get(administrator.username);
    expect(res.username).toBe(test.username);
  });
});
