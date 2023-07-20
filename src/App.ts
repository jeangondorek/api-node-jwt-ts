import swaggerUi from 'swagger-ui-express';
import express from 'express';
import bodyParser from 'body-parser';
import config from './Config/Config';
import mongoose from 'mongoose';
import indexRoute from './Routes/Index';
import router from './Routes/User';
import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
    },
  },
  apis: ['./src/Routes/**/*.ts','./src/Routes/*.ts','./src/Controller/*.ts', '../../Models/*.ts'], // caminho para os arquivos de rota
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
const app = express();
const port = config.port;
const url = config.bd_string;

mongoose.connect(url);

mongoose.connection.on('error', (err) => {
  console.log('Erro na conexão', +err);
});

mongoose.connection.on('disconnected', () => {
  console.log('App desconectada');
});

mongoose.connection.on('connected', () => {
  console.log('App conectada');
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', indexRoute);
app.use(router);

app.listen(port, () => {
  console.log(`App rodando na porta ${port}`);
});

export default app;
