import express, { Request, Response, Router } from 'express';
import Users, { IUser } from '../Model/UserModel';
import bcrypt from 'bcrypt';
import authMiddleware from '../Middlewares/AuthMidlleare';
const router: Router = express.Router();

/**
 * @swagger
 * /users:
 *   patch:
 *     summary: Atualiza a senha do usuário
 *     description: Atualiza a senha do usuário com o email fornecido.
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
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Senha atualizada com sucesso
 *       400:
 *         description: Dados insuficientes ou email não cadastrado
 *       500:
 *         description: Não foi possível atualizar a senha do usuário
 */

router.patch('/',authMiddleware, async (req: Request, res: Response) => {
    const { email, password } = req.body;
  
    if (!email || !password) return res.status(400).send({ error: 'Dados insuficientes' });
  
    try {
      const userExists: IUser | null = await Users.findOne({ email });
      if (!userExists) return res.status(400).send({ error: 'Email não cadastrado' });
  
      const hashedPassword = await bcrypt.hash(password, 10);
      await Users.updateOne({ email }, { password: hashedPassword });
      
      return res.status(200).send({ message: 'Senha atualizada com sucesso' });
    } catch (err) {
      return res.status(500).send({ error: 'Não foi possível atualizar a senha do usuário' });
    }
  });

  export default router;