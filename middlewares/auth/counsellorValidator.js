const jwt = require('jsonwebtoken');
const responseMaker = require('../../helpers/responseMaker');
const therapistModel = require('../../models/therapistModel');

const counsellorValidator = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const jwtToken = authHeader && authHeader.split(' ')[1];
  if (jwtToken == null)
    return responseMaker(res, 403, 'Missing JWT token', null, false);
  else {
    try {
      jwt.verify(jwtToken, process.env.JWT_SECRET, async (error, auth) => {
        if (error)
          return responseMaker(res, 403, 'Inavalid JWT token', null, false);
        const fetchTherapist = await therapistModel.findOne({ _id: auth.id });
        if (fetchTherapist) {
          if (fetchTherapist.status === 'accepted') {
            // eslint-disable-next-line no-underscore-dangle
            res.locals.therapistId = fetchTherapist._id;
            return next();
          } else {
            return responseMaker(
              res,
              403,
              `Therapist status is ${fetchTherapist.status}`,
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

module.exports = counsellorValidator;
