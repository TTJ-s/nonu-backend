const responseMaker = require('../../../helpers/responseMaker');
const { profileEditSchema } = require('../../../helpers/schemaValidator');
const userModel = require('../../../models/userModel');

const editProfileController = async (req, res) => {
  try {
    const { userkey } = res.locals;
    const editProfileSchemaValidator = profileEditSchema.validate(req.body, {
      abortEarly: true,
    });
    if (editProfileSchemaValidator.error)
      return responseMaker(
        res,
        400,
        'Invalid Inputs',
        editProfileSchemaValidator.error,
        false
      );
    const findUser = await userModel.findOne({ _id: userkey });
    if (!findUser)
      return responseMaker(
        res,
        404,
        'User with the id is not found',
        null,
        false
      );
    if (findUser.isVerified) {
      if (req.body.idCard) {
        return responseMaker(
          res,
          400,
          'Profile is already verified with the id card',
          null,
          false
        );
      }
    }
    const updateUser = await userModel.findOneAndUpdate(
      { _id: userkey },
      req.body,
      { new: true }
    );
    if (updateUser)
      return responseMaker(res, 200, 'User Data Updated', updateUser, false);
  } catch (error) {
    return responseMaker(res, 500, 'Internal Server Error...!', null, error);
  }
};

module.exports = editProfileController;
