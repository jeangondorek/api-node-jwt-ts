import express, { Request, Response, Router } from 'express';
import Users, { IUser } from '../Model/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../Config/config';

const creatToken = (userId: string) => {
  return jwt.sign({ id: userId }, config.jwt_pass, { expiresIn: config.jwt_expires });
};

const router: Router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const users: IUser[] = await Users.find({});
    return res.send(users);
  } catch (err) {
    return res.status(500).send({ error: 'Erro na consulta de usuários' });
  }
});

router.post('/create', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).send({ error: 'Dados insuficientes' });

  try {
    const userExists: IUser | null = await Users.findOne({ email });
    if (userExists) return res.status(400).send({ error: 'Email já cadastrado' });

    const user: IUser = await Users.create(req.body);
    user.password = undefined;
    return res.status(201).send({ user, token: creatToken(user.id) });
  } catch (err) {
    return res.status(500).send({ error: 'Não foi possível buscar' });
  }
});

router.post('/auth', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ error: 'Dados insuficientes' });
  }

  try {
    const user: IUser | null = await Users.findOne({ email }).select('password');
    if (!user) return res.status(400).send({ error: 'Usuário não registrado' });

    const pass_ok: boolean = await bcrypt.compare(password, user.password);
    if (!pass_ok) return res.status(401).send({ error: 'Senha incorreta' });

    user.password = undefined;
    return res.send({ user, token: creatToken(user.id) });
  } catch (err) {
    return res.status(500).send({ error: 'Não foi possível buscar' });
  }
});

export default router;
