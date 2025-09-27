const responseMaker = require('../../../helpers/responseMaker');
const therapistModel = require('../../../models/therapistModel');

const updateTherapistController = async (req, res) => {
  try {
    const { therapistId } = req.params;
    if (!therapistId)
      return responseMaker(
        res,
        400,
        'Therapist id is required...!',
        null,
        false
      );
    const updateUser = await therapistModel.findOneAndUpdate(
      { _id: therapistId },
      req.body,
      { new: true }
    );
    if (updateUser)
      return responseMaker(
        res,
        200,
        'Therapist Data Updated',
        updateUser,
        false
      );
  } catch (error) {
    return responseMaker(res, 500, 'Internal Server Error...!', null, error);
  }
};

module.exports = updateTherapistController;
