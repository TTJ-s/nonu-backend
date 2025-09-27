const bcrypt = require('bcrypt');
const responseMaker = require('../../../helpers/responseMaker');
const adminModel = require('../../../models/adminModel');

const changeAdminPasswordController = async (req, res) => {
  try {
    const { adminId } = res.locals;
    const { oldPassword, newPassword } = req.body;
    const fetchAdmin = await adminModel.findOne({ _id: adminId });
    const validateTherapist = await bcrypt.compare(
      oldPassword,
      fetchAdmin.adminPassword
    );
    if (validateTherapist) {
      const password = await bcrypt.hash(newPassword, 13);
      const updateTherapist = await adminModel.findOneAndUpdate(
        { _id: adminId },
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

module.exports = changeAdminPasswordController;
