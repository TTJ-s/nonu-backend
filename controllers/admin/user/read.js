const responseMaker = require('../../../helpers/responseMaker');
const userModel = require('../../../models/userModel');

const getUserController = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId)
      return responseMaker(res, 400, 'User id is required...!', null, false);
    const fetchUser = await userModel.findOne({ _id: userId });
    if (fetchUser)
      return responseMaker(res, 200, 'User found...!', fetchUser, false);
  } catch (error) {
    return responseMaker(res, 500, 'Internal Server Error...!', null, error);
  }
};

module.exports = getUserController;
