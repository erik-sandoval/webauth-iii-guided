const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('../users/users-model.js');
const secret = require('../config/secrets');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secret.jwtSecret, (err, decoded) => {
      if (err) {
        res.status(500).json(err);
      } else {
        req.user = {roles: decoded.roles, username: decoded.username}
        next();
      }
    });
  } else {
    res.status(400).json({ message: 'No credentials provided' });
  }
};
