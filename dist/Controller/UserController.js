"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _GetAllUsers = require('../Routes/Users/GetAllUsers'); var _GetAllUsers2 = _interopRequireDefault(_GetAllUsers);
var _CreateUser = require('../Routes/Users/CreateUser'); var _CreateUser2 = _interopRequireDefault(_CreateUser);
var _DeleteUser = require('../Routes/Users/DeleteUser'); var _DeleteUser2 = _interopRequireDefault(_DeleteUser);
var _AuthUser = require('../Routes/Users/AuthUser'); var _AuthUser2 = _interopRequireDefault(_AuthUser);
var _UpdateUser = require('../Routes/Users/UpdateUser'); var _UpdateUser2 = _interopRequireDefault(_UpdateUser);

const router = _express.Router.call(void 0, );
router.use('/users', _GetAllUsers2.default);
router.use('/users', _CreateUser2.default);
router.use('/users', _DeleteUser2.default);
router.use('/users', _AuthUser2.default);
router.use('/users', _UpdateUser2.default);


exports. default = router;
