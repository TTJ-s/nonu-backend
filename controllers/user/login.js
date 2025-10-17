const admin = require('firebase-admin');
const responseMaker = require('../../helpers/responseMaker');
const userModel = require('../../models/userModel');
const generateToken = require('../../helpers/generateJWT');

exports.loginController = async (req, res) => {
  try {
    const authToken = req.body.authtoken;
    if (!authToken)
      return responseMaker(res, 400, 'Missing tokens', null, false);
    const decodedToken = await admin.auth().verifyIdToken(authToken);
    if (!decodedToken)
      return responseMaker(res, 403, 'Unauthorized', null, false);
    let user = await userModel.findOne({
      phone: decodedToken.phone_number,
      status: { $ne: 'deleted' },
    });
    if (user) {
      const token = await generateToken(user._id);
      return responseMaker(res, 200, 'Login successful', token, false);
    } else {
      user = await userModel.create({
        phone: decodedToken.phone_number,
        uuid: decodedToken.uid,
      });
      const token = await generateToken(user._id);
      return responseMaker(res, 200, 'Login successful', token, false);
    }
  } catch (error) {
    return responseMaker(res, 500, 'Internal Server Error...!', null, error);
  }
};
