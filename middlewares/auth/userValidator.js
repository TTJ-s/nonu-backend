const admin = require('firebase-admin');
const responseMaker = require('../../helpers/responseMaker');
const userModel = require('../../models/userModel');

const userValidator = async (req, res, next) => {
  const authToken = req.headers.authtoken; // ? usertoken from firebase
  const uniqueKey = req.headers.userkey; // ? userkey from firebase
  if (authToken == null || uniqueKey == null) {
    return responseMaker(res, 403, 'Missing tokens', null, false);
  } else {
    const findUser = await userModel.findOne({ uuid: uniqueKey });
    admin
      .auth()
      .verifyIdToken(req.headers.authtoken)
      .then(() => {
        if (findUser) {
          // ! check if user exists or not
          // eslint-disable-next-line no-underscore-dangle
          res.locals.userkey = findUser._id; // ? if user exist set key from mongodb
        } else {
          res.locals.userkey = uniqueKey; // ? if user doesn't exist set key from firebase
        }
        next();
      })
      .catch((error) =>
        responseMaker(res, 403, `Unauthorized, ${error.message}`, null, false)
      );
  }
};

module.exports = userValidator;
