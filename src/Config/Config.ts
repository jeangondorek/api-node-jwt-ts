import 'dotenv/config';

const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'dev';
const bd_string = process.env.URL || 'mongodb://localhost:27017/';
const jwt_pass = process.env.JWT_PASS || '123';
const jwt_expires = process.env.JWT_EXPIRES || '7d';

const config = (): { bd_string: string, jwt_pass: string, jwt_expires: string, port: number } =>{
    switch (env){
        case 'dev':
        return{
            bd_string,
            jwt_pass,
            jwt_expires,
            port
        }
        default:
        return{
            bd_string,
            jwt_pass,
            jwt_expires,
            port
        }
    }
}

console.log(`iniciado api em ambiente ${env.toUpperCase()}`);

export default config();