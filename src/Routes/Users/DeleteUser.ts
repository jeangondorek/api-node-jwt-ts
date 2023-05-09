import express, { Request, Response, Router } from 'express';
import Users, { IUser } from '../../Model/UserModel';
import authMiddleware from '../../Middlewares/AuthMidlleare';
const router: Router = express.Router();

/**
 * @swagger
 * /users:
 *   delete:
 *     summary: Remove um usuário
 *     description: Rota para remover um usuário da base de dados
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email do usuário a ser removido
 *             example:
 *               email: user@example.com
 *     responses:
 *       200:
 *         description: Usuário removido com sucesso
 *       400:
 *         description: Dados insuficientes ou email não cadastrado
 *       500:
 *         description: Não foi possível excluir o usuário
 */
router.delete('/',authMiddleware, async (req: Request, res: Response) => {
    const { email } = req.body;
  
    if (!email) return res.status(400).send({ error: 'Dados insuficientes' });
  
    try {
      const userExists: IUser | null = await Users.findOne({ email });
      if (!userExists) return res.status(400).send({ error: 'Email não cadastrado' });
      
      await Users.deleteOne({ email });
      return res.status(200).send({ message: 'Usuário removido com sucesso' });
    } catch (err) {
      return res.status(500).send({ error: 'Não foi possível excluir o usuário' });
    }
  });

  export default router;