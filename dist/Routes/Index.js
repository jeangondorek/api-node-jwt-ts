"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _AuthMidlleare = require('../Middlewares/AuthMidlleare'); var _AuthMidlleare2 = _interopRequireDefault(_AuthMidlleare);

const router = _express2.default.Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: Rota de teste para a raiz da API
 *     description: Rota de teste para verificar se a API está online
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/', _AuthMidlleare2.default, (req, res) => {
  return res.status(200).send({ message: `Tudo OK GET na raiz` });
});

/**
 * @swagger
 * /:
 *   post:
 *     summary: Rota de teste para a raiz da API
 *     description: Rota de teste para verificar se a API está online
 *     responses:
 *       200:
 *         description: OK
 */
router.post('/', _AuthMidlleare2.default, (req, res) => {
  return res.status(200).send({ message: `Tudo OK POST na raiz` });
});

exports. default = router;
