const responseMaker = require('../../../helpers/responseMaker');
const userModel = require('../../../models/userModel');

const updateUserController = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId)
      return responseMaker(res, 400, 'User id is required...!', null, false);
    const updateUser = await userModel.findOneAndUpdate(
      { _id: userId },
      req.body,
      { new: true }
    );
    if (updateUser)
      return responseMaker(res, 200, 'User Data Updated', updateUser, false);
  } catch (error) {
    return responseMaker(res, 500, 'Internal Server Error...!', null, error);
  }
};

module.exports = updateUserController;
