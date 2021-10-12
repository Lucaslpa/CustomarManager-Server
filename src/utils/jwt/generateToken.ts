import jwt from 'jsonwebtoken';

export const JWTgenerateToken = (payload: object) => {
  const token = jwt.sign(payload, `${process.env.SECRET_KEY}`);
  return token;
};
