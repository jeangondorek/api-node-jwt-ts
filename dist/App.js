"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _swaggeruiexpress = require('swagger-ui-express'); var _swaggeruiexpress2 = _interopRequireDefault(_swaggeruiexpress);
var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _bodyparser = require('body-parser'); var _bodyparser2 = _interopRequireDefault(_bodyparser);
var _config = require('./Config/config'); var _config2 = _interopRequireDefault(_config);
var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);
var _Index = require('./Routes/Index'); var _Index2 = _interopRequireDefault(_Index);
var _UserController = require('./Controller/UserController'); var _UserController2 = _interopRequireDefault(_UserController);
var _swaggerjsdoc = require('swagger-jsdoc'); var _swaggerjsdoc2 = _interopRequireDefault(_swaggerjsdoc);


const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
    },
  },
  apis: ['./src/Routes/**/*.ts','./src/Routes/*.ts', '../../Models/*.ts'], // caminho para os arquivos de rota
};

const swaggerSpec = _swaggerjsdoc2.default.call(void 0, swaggerOptions);
const app = _express2.default.call(void 0, );
const port = 3000;
const url = _config2.default.bd_string;

_mongoose2.default.connect(url);

_mongoose2.default.connection.on("error", (err) => {
  console.log("Erro na conexão", +err);
});

_mongoose2.default.connection.on("disconnected", () => {
  console.log("App desconectada");
});

_mongoose2.default.connection.on("connected", () => {
  console.log("App conectada");
});

app.use('/api-docs', _swaggeruiexpress2.default.serve, _swaggeruiexpress2.default.setup(swaggerSpec));

app.use(_bodyparser2.default.urlencoded({ extended: false }));
app.use(_bodyparser2.default.json());

app.use("/", _Index2.default);
app.use(_UserController2.default);

app.listen(port, () => {
  console.log(`App rodando na porta ${port}`);
});

exports. default = app;
