import { Request, Response } from 'express';

class Administrator {
  create(req: Request, res: Response) {
    res.send(process.env.MONGODB_URL);
  }
}

export default Administrator;
