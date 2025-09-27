const responseMaker = require('../../../helpers/responseMaker');
const therapistModel = require('../../../models/therapistModel');

const deleteCounsellorProfileController = async (req, res) => {
  try {
    const { therapistId } = res.locals;
    const findTherapist = await therapistModel.findOne({ _id: therapistId });
    if (!findTherapist)
      return responseMaker(
        res,
        404,
        'User with the id is not found',
        null,
        false
      );
    const deleteTherapist = await therapistModel.findOneAndUpdate(
      { _id: therapistId },
      { status: 'deleted' },
      { new: true }
    );
    if (deleteTherapist)
      return responseMaker(
        res,
        200,
        'Therapist Data deleted',
        deleteTherapist,
        false
      );
  } catch (error) {
    return responseMaker(
      res,
      500,
      `Internal Server Error...!' ${error}`,
      null,
      error
    );
  }
};

module.exports = deleteCounsellorProfileController;
