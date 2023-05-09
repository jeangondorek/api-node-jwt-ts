import express, { Router, Request, Response } from 'express';
import authMiddleware from '../Middlewares/auth';

const router: Router = express.Router();

router.get('/', authMiddleware, (req: Request, res: Response) => {
  return res.status(200).send({ message: `Tudo OK GET na raiz` });
});

router.post('/', authMiddleware, (req: Request, res: Response) => {
  return res.status(200).send({ message: `Tudo OK POST na raiz` });
});

export default router;
