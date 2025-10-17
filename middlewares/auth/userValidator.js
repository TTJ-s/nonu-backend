const jwt = require('jsonwebtoken');
const responseMaker = require('../../helpers/responseMaker');
const userModel = require('../../models/userModel');

const userValidator = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const jwtToken = authHeader && authHeader.split(' ')[1];
  if (jwtToken == null)
    return responseMaker(res, 403, 'Missing JWT token', null, false);
  else {
    try {
      jwt.verify(jwtToken, process.env.JWT_SECRET, async (error, auth) => {
        if (error)
          return responseMaker(res, 403, 'Inavalid JWT token', null, false);
        const fetchUser = await userModel.findOne({ _id: auth.userId });
        if (fetchUser) {
          // eslint-disable-next-line no-underscore-dangle
          res.locals.userId = fetchUser._id;
          res.locals.userkey = fetchUser.uuid;
          return next();
        }
      });
    } catch (error) {
      return responseMaker(res, 500, 'Internal Server Error', null, error);
    }
  }
};

module.exports = userValidator;
