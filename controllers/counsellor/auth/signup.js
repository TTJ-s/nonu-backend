const bcrypt = require('bcrypt');
const responseMaker = require('../../../helpers/responseMaker');
const TherapistModel = require('../../../models/therapistModel');
const { createTherapistSchema } = require('../../../helpers/schemaValidator');

const counsellorSignupController = async (req, res) => {
  try {
    const counsellorSignupValidator = createTherapistSchema.validate(req.body);
    if (!req.body.password)
      return responseMaker(res, 400, 'Password is required...!', null, false);
    if (counsellorSignupValidator.error)
      return responseMaker(
        res,
        400,
        `Invalid Input ${counsellorSignupValidator.error}`,
        counsellorSignupValidator.error,
        false
      );
    const { phone } = req.body;
    const findTherapist = await TherapistModel.findOne({
      phone,
      status: { $ne: 'deleted' },
    });
    if (findTherapist)
      return responseMaker(
        res,
        400,
        'Therapist is already exists...!',
        null,
        false
      );
    req.body.password = await bcrypt.hash(req.body.password, 13);
    const dataMaker = await new TherapistModel(req.body);
    const saveData = await dataMaker.save();
    if (saveData)
      return responseMaker(res, 200, 'Therapist Data Added', saveData, false);
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

module.exports = counsellorSignupController;
