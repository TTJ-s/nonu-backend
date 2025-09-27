const responseMaker = require('../../../helpers/responseMaker');
const therapistModel = require('../../../models/therapistModel');

const readTherapistController = async (req, res) => {
  try {
    const { therapistId } = req.params;
    if (!therapistId)
      return responseMaker(res, 400, 'Therapist id not found..!', null, false);
    const therapistDetails = await therapistModel.findOne({ _id: therapistId });
    if (therapistDetails) {
      return responseMaker(
        res,
        200,
        'Therapist details..!',
        therapistDetails,
        false
      );
    } else {
      return responseMaker(
        res,
        200,
        'Therapist details not found..!',
        null,
        false
      );
    }
  } catch (error) {
    return responseMaker(res, 500, 'Internal Server Error...!', null, error);
  }
};

module.exports = readTherapistController;
