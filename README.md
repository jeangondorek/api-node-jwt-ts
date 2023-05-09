# Api with JWT

![MIT](https://img.shields.io/github/license/jeangondorek/api-rest-nodejs?style=for-the-badge)

## Tecnologias usadas

![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Nodemon](https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
![Swagger](https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white)
![Jsonwebtoken](https://img.shields.io/badge/json%20web%20tokens-323330?style=for-the-badge&logo=json-web-tokens&logoColor=pink)
![Sucrase](https://img.shields.io/badge/Sucrase-%23ED8B00.svg?style=for-the-badge&logo=Sucrase&logoColor=white)
![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

### Rodando o projeto

Necessário criar um arquivo na pasta `Config` chamado `config.js` com as seguntes configurações.

- `bd_string` - String de conexão com o mongo
- `jwt_pass` - Token/senha do jwt
- `jwt_expires` - Tempo de expiração do token

EXEMPLO: 
```
const env: string = process.env.NODE_ENV || 'dev';

const config = (): { bd_string: string, jwt_pass: string, jwt_expires: string } =>{
    switch (env){
        case 'dev':
        return{
            bd_string: "mongodb+srv://user:senha@cluster",
            jwt_pass: "123",
            jwt_expires: "7d"
        }
        default:
        return{
            bd_string: "",
            jwt_pass: "",
            jwt_expires: ""
        }
    }
}

console.log(`iniciado api em ambiente ${env.toUpperCase()}`);

export default config();

```

### Instalando dependencias

```
npm i
```

### Rodando projeto

```
npm start
```
