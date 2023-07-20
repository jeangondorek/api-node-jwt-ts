import { Router } from 'express';
import usersRouter from '../Routes/Users/GetAllUsers';
import creatRouter from '../Routes/Users/CreateUser';
import deletetRouter from '../Routes/Users/DeleteUser';
import authRouter from '../Routes/Users/AuthUser';
import updateRouter from '../Routes/Users/UpdateUser';

const router = Router();
router.use('/users', usersRouter);
router.use('/users', creatRouter);
router.use('/users', deletetRouter);
router.use('/users', authRouter);
router.use('/users', updateRouter);

export default router;
