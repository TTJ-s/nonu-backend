const bcrypt = require('bcrypt');
const responseMaker = require('../../../helpers/responseMaker');
const { createTherapistSchema } = require('../../../helpers/schemaValidator');
const TherapistModel = require('../../../models/therapistModel');

const createTherapistController = async (req, res) => {
  try {
    const createTherapistValidator = createTherapistSchema.validate(req.body, {
      abortEarly: true,
    });
    if (createTherapistValidator.error)
      return responseMaker(
        res,
        400,
        'Invalid Input',
        createTherapistValidator.error,
        false
      );
    req.body.password = req.body.phone;
    req.body.password = await bcrypt.hash(req.body.password, 13);
    const checkTherapist = await TherapistModel.findOne(req.body);
    if (checkTherapist)
      return responseMaker(res, 400, 'Therapist already exists', null, false);
    const dataMaker = await new TherapistModel(req.body);
    const saveData = await dataMaker.save();
    if (saveData)
      return responseMaker(res, 200, 'Therapist Data Added', saveData, false);
  } catch (error) {
    return responseMaker(res, 500, 'Internal Server Error', null, error);
  }
};

module.exports = createTherapistController;
