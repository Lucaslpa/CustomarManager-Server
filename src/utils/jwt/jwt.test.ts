import { JWTgenerateToken } from './generateToken';

describe('jwt', () => {
  it('should generate a token', () => {
    const payload = {
      id: 20,
      username: 50
    };
    const res = JWTgenerateToken(payload);
    console.log(res);
  });
});
