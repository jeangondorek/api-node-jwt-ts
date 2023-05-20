"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _config = require('../Config/config'); var _config2 = _interopRequireDefault(_config);

const auth = (req, res, next) => {
  const tokenHeader = req.headers.auth;

  if (!tokenHeader) return void res.status(401).send({ error: 'Token não fornecido pelo cliente.' });

  _jsonwebtoken2.default.verify(tokenHeader , _config2.default.jwt_pass, (err, decoded) => {
    if (err) return res.status(401).send({ error: 'Token inválido.' });

    req.user_id = (decoded ).id;
    next();
  });
};

exports. default = auth;
