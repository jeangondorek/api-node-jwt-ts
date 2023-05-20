"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _UserModel = require('../../Model/UserModel'); var _UserModel2 = _interopRequireDefault(_UserModel);
const router = _express2.default.Router();
var _AuthMidlleare = require('../../Middlewares/AuthMidlleare'); var _AuthMidlleare2 = _interopRequireDefault(_AuthMidlleare);


/**
 * @swagger
 * components:
 *  schemas:
 *   User:
 *     $ref: '../../Model/user.ts'
 *  responses:
 *   UnauthorizedError:
 *     description: Unauthorized access
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: Unauthorized
 *             errors:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: Invalid credentials
 *                   field:
 *                     type: string
 *                     example: password
 * /users:
 *   get:
 *     summary: Retorna todos os usuários cadastrados
 *     description: Endpoint para obter a lista completa de usuários cadastrados
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       500:
 *         description: Erro na consulta de usuários
 */


router.get('/', _AuthMidlleare2.default, async (req, res) => {
  try {
    const users = await _UserModel2.default.find({});
    return res.send(users);
  } catch (err) {
    return res.status(500).send({ error: 'Erro na consulta de usuários' });
  }
});

exports. default = router;
