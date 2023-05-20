"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _UserModel = require('../../Model/UserModel'); var _UserModel2 = _interopRequireDefault(_UserModel);
var _bcrypt = require('bcrypt'); var _bcrypt2 = _interopRequireDefault(_bcrypt);
var _AuthMidlleare = require('../../Middlewares/AuthMidlleare'); var _AuthMidlleare2 = _interopRequireDefault(_AuthMidlleare);
const router = _express2.default.Router();


/**
 * @swagger
 * /users:
 *   patch:
 *     summary: Atualiza a senha do usuário
 *     description: Atualiza a senha do usuário com o email fornecido.
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
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Senha atualizada com sucesso
 *       400:
 *         description: Dados insuficientes ou email não cadastrado
 *       500:
 *         description: Não foi possível atualizar a senha do usuário
 */
router.patch('/',_AuthMidlleare2.default, async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) return res.status(400).send({ error: 'Dados insuficientes' });
  
    try {
      const userExists = await _UserModel2.default.findOne({ email });
      if (!userExists) return res.status(400).send({ error: 'Email não cadastrado' });
  
      const hashedPassword = await _bcrypt2.default.hash(password, 10);
      await _UserModel2.default.updateOne({ email }, { password: hashedPassword });
      
      return res.status(200).send({ message: 'Senha atualizada com sucesso' });
    } catch (err) {
      return res.status(500).send({ error: 'Não foi possível atualizar a senha do usuário' });
    }
  });

  exports. default = router;