const bcrypt = require('bcrypt');
const responseMaker = require('../../../helpers/responseMaker');
const therapistModel = require('../../../models/therapistModel');

const forgotPasswordController = async (req, res) => {
  try {
    const { uid, phone, password } = req.body;
    const fetchTherapist = await therapistModel.findOne({ phone, uid });
    if (!fetchTherapist)
      return responseMaker(
        res,
        400,
        'Profile not found..!',
        null,
        false,
        false
      );
    const newPassword = await bcrypt.hash(password, 13);
    const updateTherapist = await therapistModel.findOneAndUpdate(
      { uid, phone },
      { password: newPassword },
      { new: true }
    );
    if (updateTherapist)
      return responseMaker(
        res,
        200,
        'Password updated successfully..!',
        null,
        false
      );
  } catch (error) {
    return responseMaker(res, 500, 'Internal Server Error', null, error);
  }
};

module.exports = forgotPasswordController;
