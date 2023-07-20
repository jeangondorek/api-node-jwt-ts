import { Router } from 'express';
import usersRouter from '../Controller/GetAllUserController';
import creatRouter from '../Controller/CreateUserController';
import deletetRouter from '../Controller/DeleteUserController';
import authRouter from '../Controller/AuthUserController';
import updateRouter from '../Controller/UpdateUserController';

const router = Router();
router.use('/users', usersRouter);
router.use('/users', creatRouter);
router.use('/users', deletetRouter);
router.use('/users', authRouter);
router.use('/users', updateRouter);

export default router;
