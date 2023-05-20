"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _UserModel = require('../../Model/UserModel'); var _UserModel2 = _interopRequireDefault(_UserModel);
var _bcrypt = require('bcrypt'); var _bcrypt2 = _interopRequireDefault(_bcrypt);
var _Token = require('../../Utils/Token'); var _Token2 = _interopRequireDefault(_Token);
const router = _express2.default.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       $ref: '../Model/user.ts#/definitions/User'
 * /auth:
 *  post:
 *    summary: Autentica um usuário.
 *    description: Autentica um usuário cadastrado na base de dados.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *                description: E-mail do usuário.
 *                example: john@example.com
 *              password:
 *                type: string
 *                description: Senha do usuário.
 *                example: 123456
 *    responses:
 *      '200':
 *        description: Usuário autenticado com sucesso.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                user:
 *                  type: object
 *                  $ref: '#/components/schemas/User'
 *                  description: Objeto do usuário autenticado.
 *                token:
 *                  type: string
 *                  description: Token de autenticação do usuário.
 *                  example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTE2MjM5MDIyfQ.3TxyxDjrxz
 *      '400':
 *        description: Requisição mal-formada.
 *      '401':
 *        description: Senha incorreta.
 *      '500':
 *        description: Erro interno do servidor.
 */
       

router.post('/', async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).send({ error: 'Dados insuficientes' });
    }
  
    try {
      const user = await _UserModel2.default.findOne({ email }).select('password');
      if (!user) return res.status(400).send({ error: 'Usuário não registrado' });
  
      const pass_ok = await _bcrypt2.default.compare(password, user.password);
      if (!pass_ok) return res.status(401).send({ error: 'Senha incorreta' });
  
      return res.send({ user, token: _Token2.default.call(void 0, user.id) });
    } catch (err) {
      return res.status(500).send({ error: 'Não foi possível buscar' });
    }
  });

  exports. default = router;