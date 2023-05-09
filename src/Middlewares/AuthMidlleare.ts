import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../Config/config';

const auth = (req: Request, res: Response, next: NextFunction): void => {
  const tokenHeader = req.headers.auth;

  if (!tokenHeader) return void res.status(401).send({ error: 'Token não fornecido pelo cliente.' });

  jwt.verify(tokenHeader as string, config.jwt_pass, (err, decoded) => {
    if (err) return res.status(401).send({ error: 'Token inválido.' });

    req.user_id = (decoded as { id: string }).id;
    next();
  });
};

export default auth;
