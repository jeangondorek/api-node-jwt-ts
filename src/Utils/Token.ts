import jwt from 'jsonwebtoken';
import config from '../Config/config';

const creatToken = (userId: string) => {
    return jwt.sign({ id: userId }, config.jwt_pass, { expiresIn: config.jwt_expires });
};

export default creatToken;