const bcrypt = require('bcrypt');
const responseMaker = require('../../../helpers/responseMaker');
const { adminSignupSchema } = require('../../../helpers/schemaValidator');
const AdminModel = require('../../../models/adminModel');

const adminSignupController = async (req, res) => {
  try {
    const adminSignupValidator = adminSignupSchema.validate(req.body);
    if (adminSignupValidator.error)
      return responseMaker(
        res,
        400,
        'Invalid Input',
        adminSignupValidator.error,
        false
      );
    req.body.adminStatus = true;
    req.body.adminPassword = await bcrypt.hash(req.body.adminPassword, 13);
    const dataMaker = await new AdminModel(req.body);
    const saveData = await dataMaker.save();
    if (saveData)
      return responseMaker(res, 200, 'Admin Data Added', saveData, false);
  } catch (error) {
    return responseMaker(
      res,
      500,
      `Internal Server Error ${error}`,
      null,
      error
    );
  }
};

module.exports = adminSignupController;
