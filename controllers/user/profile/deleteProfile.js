const responseMaker = require('../../../helpers/responseMaker');
const userModel = require('../../../models/userModel');

const deleteProfileController = async (req, res) => {
  try {
    const { userkey } = res.locals;
    const findUser = await userModel.findOne({ _id: userkey });
    if (!findUser)
      return responseMaker(
        res,
        404,
        'User with the id is not found',
        null,
        false
      );
    const deleteUser = await userModel.findOneAndUpdate(
      { _id: userkey },
      { status: 'deleted' },
      { new: true }
    );
    if (deleteUser)
      return responseMaker(res, 200, 'User Data deleted', deleteUser, false);
  } catch (error) {
    return responseMaker(res, 500, 'Internal Server Error...!', null, error);
  }
};

module.exports = deleteProfileController;
