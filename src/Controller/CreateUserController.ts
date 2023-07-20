import express, { Request, Response, Router } from 'express';
import Users, { IUser } from '../Model/UserModel';
import creatToken from '../Utils/Token'
const router: Router = express.Router();

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Cria um novo usuário
 *     description: Cria um novo usuário com as informações fornecidas no corpo da requisição
 *     parameters:
 *       - name: email
 *         description: Endereço de email do usuário a ser criado
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: Senha do usuário a ser criado
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         schema:
 *           type: object
 *           properties:
 *             user:
 *               $ref: '#/definitions/User'
 *             token:
 *               type: string
 *         example:
 *           user:
 *             _id: 610a1fe9c0b0d76b6a1a3c7d
 *             email: john.doe@example.com
 *           token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMGEzZmU5YzBiMGQ3NmI2YTFhM2M3ZCIsImlhdCI6MTYyMzA5MjA2NiwiZXhwIjoxNjIzMTc4NDY2fQ.yaKpKvJukdK4DMDXPzQ3sFpPJYISLdFq8MQ0GjH9LTw
 *       400:
 *         description: Dados insuficientes ou email já cadastrado
 *       500:
 *         description: Erro ao criar o usuário
 * 
 * definitions:
 *   User:
 *     type: object
 *     properties:
 *       _id:
 *         type: string
 *         example: 610a1fe9c0b0d76b6a1a3c7d
 *       email:
 *         type: string
 *         example: john.doe@example.com
 */

router.post('/', async (req: Request, res: Response) => {
    const { email, password } = req.body;
  
    if (!email || !password) return res.status(400).send({ error: 'Dados insuficientes' });
  
    try {
      const userExists: IUser | null = await Users.findOne({ email });
      if (userExists) return res.status(400).send({ error: 'Email já cadastrado' });
  
      const user: IUser = await Users.create(req.body);
      
      return res.status(201).send({ user, token: creatToken(user.id) });
    } catch (err) {
      return res.status(500).send({ error: 'Não foi possível buscar' });
    }
  });

  export default router;
