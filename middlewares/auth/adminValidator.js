const jwt = require('jsonwebtoken');
const responseMaker = require('../../helpers/responseMaker');
const adminModel = require('../../models/adminModel');

const adminValidator = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const jwtToken = authHeader && authHeader.split(' ')[1];
  if (jwtToken == null)
    return responseMaker(res, 403, 'Missing JWT token', null, false);
  else {
    try {
      jwt.verify(jwtToken, process.env.JWT_SECRET, async (error, auth) => {
        if (error)
          return responseMaker(res, 403, 'Inavalid JWT token', null, false);
        const fetchAdmin = await adminModel.findOne({ _id: auth.id });
        if (fetchAdmin) {
          if (fetchAdmin.adminStatus === true) {
            // eslint-disable-next-line no-underscore-dangle
            res.locals.adminId = fetchAdmin._id;
            return next();
          } else {
            return responseMaker(
              res,
              403,
              `Admin status is ${fetchAdmin.adminStatus}`,
              null,
              false
            );
          }
        }
      });
    } catch (error) {
      return responseMaker(res, 500, 'Internal Server Error', null, error);
    }
  }
};

module.exports = adminValidator;
