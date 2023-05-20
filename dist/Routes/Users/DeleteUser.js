"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _UserModel = require('../../Model/UserModel'); var _UserModel2 = _interopRequireDefault(_UserModel);
var _AuthMidlleare = require('../../Middlewares/AuthMidlleare'); var _AuthMidlleare2 = _interopRequireDefault(_AuthMidlleare);
const router = _express2.default.Router();

/**
 * @swagger
 * /users:
 *   delete:
 *     summary: Remove um usuário
 *     description: Rota para remover um usuário da base de dados
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email do usuário a ser removido
 *             example:
 *               email: user@example.com
 *     responses:
 *       200:
 *         description: Usuário removido com sucesso
 *       400:
 *         description: Dados insuficientes ou email não cadastrado
 *       500:
 *         description: Não foi possível excluir o usuário
 */
router.delete('/',_AuthMidlleare2.default, async (req, res) => {
    const { email } = req.body;
  
    if (!email) return res.status(400).send({ error: 'Dados insuficientes' });
  
    try {
      const userExists = await _UserModel2.default.findOne({ email });
      if (!userExists) return res.status(400).send({ error: 'Email não cadastrado' });
      
      await _UserModel2.default.deleteOne({ email });
      return res.status(200).send({ message: 'Usuário removido com sucesso' });
    } catch (err) {
      return res.status(500).send({ error: 'Não foi possível excluir o usuário' });
    }
  });

  exports. default = router;