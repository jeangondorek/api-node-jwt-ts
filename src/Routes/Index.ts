import express, { Router, Request, Response } from 'express';
import authMiddleware from '../Middlewares/AuthMidlleare';

const router: Router = express.Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: Rota de teste para a raiz da API
 *     description: Rota de teste para verificar se a API está online
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/', authMiddleware, (req: Request, res: Response) => {
  return res.status(200).send({ message: `Tudo OK GET na raiz` });
});

/**
 * @swagger
 * /:
 *   post:
 *     summary: Rota de teste para a raiz da API
 *     description: Rota de teste para verificar se a API está online
 *     responses:
 *       200:
 *         description: OK
 */
router.post('/', authMiddleware, (req: Request, res: Response) => {
  return res.status(200).send({ message: `Tudo OK POST na raiz` });
});

export default router;
