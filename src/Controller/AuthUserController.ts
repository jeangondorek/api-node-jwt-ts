import express, { Request, Response, Router } from 'express';
import Users, { IUser } from '../Model/UserModel';
import bcrypt from 'bcrypt';
import creatToken from '../Utils/Token'
const router: Router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       $ref: '../Model/user.ts#/definitions/User'
 * /auth:
 *  post:
 *    summary: Autentica um usuário.
 *    description: Autentica um usuário cadastrado na base de dados.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *                description: E-mail do usuário.
 *                example: john@example.com
 *              password:
 *                type: string
 *                description: Senha do usuário.
 *                example: 123456
 *    responses:
 *      '200':
 *        description: Usuário autenticado com sucesso.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                user:
 *                  type: object
 *                  $ref: '#/components/schemas/User'
 *                  description: Objeto do usuário autenticado.
 *                token:
 *                  type: string
 *                  description: Token de autenticação do usuário.
 *                  example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTE2MjM5MDIyfQ.3TxyxDjrxz
 *      '400':
 *        description: Requisição mal-formada.
 *      '401':
 *        description: Senha incorreta.
 *      '500':
 *        description: Erro interno do servidor.
 */

router.post('/auth', async (req: Request, res: Response) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).send({ error: 'Dados insuficientes' });
    }
  
    try {
      const user: IUser = await Users.findOne({ email }).select('password');
      if (!user) return res.status(400).send({ error: 'Usuário não registrado' });
  
      const pass_ok: boolean = await bcrypt.compare(password, user.password);
      if (!pass_ok) return res.status(401).send({ error: 'Senha incorreta' });
  
      return res.send({ user, token: creatToken(user.id) });
    } catch (err) {
      return res.status(500).send({ error: 'Não foi possível buscar' });
    }
  });

  export default router;
  