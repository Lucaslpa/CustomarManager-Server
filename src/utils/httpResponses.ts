import { Response } from 'express';

export const httpResponse = (status: number, data: any, res: Response) => {
  res.status(status).json({
    status,
    data,
  });
};
