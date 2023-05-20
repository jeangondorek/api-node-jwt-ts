"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _mongoose = require('mongoose'); var _mongoose2 = _interopRequireDefault(_mongoose);
var _bcrypt = require('bcrypt'); var _bcrypt2 = _interopRequireDefault(_bcrypt);







const UserSchema = new (0, _mongoose.Schema)({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, select: false },
  createdAt: { type: Date, default: Date.now },
});

UserSchema.pre('save', function (next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }

  _bcrypt2.default.hash(user.password, 10, (err, encrypted) => {
    if (err) {
      return next(err);
    }

    user.password = encrypted;
    return next();
  });
});

exports. default = _mongoose2.default.model('User', UserSchema);
