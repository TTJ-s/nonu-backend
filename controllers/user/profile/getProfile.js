const responseMaker = require('../../../helpers/responseMaker');
const userModel = require('../../../models/userModel');

const getProfileController = async (req, res) => {
  try {
    const uniqueKey = req.headers.userkey; // ? userkey from firebase
    if (!uniqueKey)
      return responseMaker(res, 403, 'User key is required', null, false);
    const findUser = await userModel.findOne({ uuid: uniqueKey });
    if (!findUser) {
      return responseMaker(
        res,
        201,
        'User not found with this key',
        null,
        false
      );
    } else {
      return responseMaker(res, 200, 'User found...!', findUser, false);
    }
  } catch (error) {
    return responseMaker(res, 500, 'Internal Server Error...!', null, error);
  }
};

module.exports = getProfileController;
