"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _UserModel = require('../../Model/UserModel'); var _UserModel2 = _interopRequireDefault(_UserModel);
var _Token = require('../../Utils/Token'); var _Token2 = _interopRequireDefault(_Token);
const router = _express2.default.Router();

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Cria um novo usuário
 *     description: Cria um novo usuário com as informações fornecidas no corpo da requisição
 *     parameters:
 *       - name: email
 *         description: Endereço de email do usuário a ser criado
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: Senha do usuário a ser criado
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         schema:
 *           type: object
 *           properties:
 *             user:
 *               $ref: '#/definitions/User'
 *             token:
 *               type: string
 *         example:
 *           user:
 *             _id: 610a1fe9c0b0d76b6a1a3c7d
 *             email: john.doe@example.com
 *           token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMGEzZmU5YzBiMGQ3NmI2YTFhM2M3ZCIsImlhdCI6MTYyMzA5MjA2NiwiZXhwIjoxNjIzMTc4NDY2fQ.yaKpKvJukdK4DMDXPzQ3sFpPJYISLdFq8MQ0GjH9LTw
 *       400:
 *         description: Dados insuficientes ou email já cadastrado
 *       500:
 *         description: Erro ao criar o usuário
 * 
 * definitions:
 *   User:
 *     type: object
 *     properties:
 *       _id:
 *         type: string
 *         example: 610a1fe9c0b0d76b6a1a3c7d
 *       email:
 *         type: string
 *         example: john.doe@example.com
 */


router.post('/', async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) return res.status(400).send({ error: 'Dados insuficientes' });
  
    try {
      const userExists = await _UserModel2.default.findOne({ email });
      if (userExists) return res.status(400).send({ error: 'Email já cadastrado' });
  
      const user = await _UserModel2.default.create(req.body);
      
      return res.status(201).send({ user, token: _Token2.default.call(void 0, user.id) });
    } catch (err) {
      return res.status(500).send({ error: 'Não foi possível buscar' });
    }
  });

  exports. default = router;