const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
  const payload = {
    userId,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, {});
};

module.exports = generateToken;
