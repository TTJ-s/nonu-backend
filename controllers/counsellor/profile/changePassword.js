const bcrypt = require('bcrypt');
const therapistModel = require('../../../models/therapistModel');
const responseMaker = require('../../../helpers/responseMaker');

const changeTherapistPasswordController = async (req, res) => {
  try {
    const { therapistId } = res.locals;
    const { oldPassword, newPassword } = req.body;
    const fetchTherapist = await therapistModel.findOne({ _id: therapistId });
    const validateTherapist = await bcrypt.compare(
      oldPassword,
      fetchTherapist.password
    );
    if (validateTherapist) {
      const password = await bcrypt.hash(newPassword, 13);
      const updateTherapist = await therapistModel.findOneAndUpdate(
        { _id: therapistId },
        { password },
        { new: true }
      );
      if (updateTherapist)
        return responseMaker(
          res,
          200,
          'Password updated successfully..!',
          updateTherapist,
          false
        );
    } else {
      return responseMaker(
        res,
        400,
        'Old password is incorrect..!',
        null,
        false
      );
    }
  } catch (error) {
    return responseMaker(res, 500, 'Internal Server Error', null, error);
  }
};

module.exports = changeTherapistPasswordController;
