import express, { Request, Response, Router } from 'express';
import Users, { IUser } from '../Model/UserModel';
const router: Router = express.Router();
import authMiddleware from '../Middlewares/AuthMidlleare';

/**
 * @swagger
 * components:
 *  schemas:
 *   User:
 *     $ref: '../../Model/user.ts'
 *  responses:
 *   UnauthorizedError:
 *     description: Unauthorized access
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Unauthorized
 *             errors:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Invalid credentials
 *                   field:
 *                     type: string
 *                     example: password
 * /users:
 *   get:
 *     summary: Retorna todos os usuários cadastrados
 *     description: Endpoint para obter a lista completa de usuários cadastrados
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         description: Erro na consulta de usuários
 */

router.get('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const users: IUser[] = await Users.find({});
    return res.send(users);
  } catch (err) {
    return res.status(500).send({ error: 'Erro na consulta de usuários' });
  }
});

export default router;
