const responseMaker = require('../../../helpers/responseMaker');
const { profileUpdateSchema } = require('../../../helpers/schemaValidator');
const therapistModel = require('../../../models/therapistModel');

const updateProfileController = async (req, res) => {
  try {
    const { therapistId } = res.locals;
    const editProfileSchemaValidator = profileUpdateSchema.validate(req.body, {
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
    const updateTherapist = await therapistModel.findOneAndUpdate(
      { _id: therapistId },
      req.body,
      { new: true }
    );
    if (updateTherapist)
      return responseMaker(
        res,
        200,
        'User Session Updated',
        updateTherapist,
        false
      );
  } catch (error) {
    return responseMaker(res, 500, 'Internal Server Error...!', null, error);
  }
};

module.exports = updateProfileController;
