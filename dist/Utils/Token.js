"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _config = require('../Config/config'); var _config2 = _interopRequireDefault(_config);

const creatToken = (userId) => {
    return _jsonwebtoken2.default.sign({ id: userId }, _config2.default.jwt_pass, { expiresIn: _config2.default.jwt_expires });
};

exports. default = creatToken;