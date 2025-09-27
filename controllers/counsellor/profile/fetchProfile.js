const responseMaker = require('../../../helpers/responseMaker');
const therapistModel = require('../../../models/therapistModel');

const fetchProfileController = async (req, res) => {
  try {
    const { therapistId } = res.locals;
    const updateTherapist = await therapistModel.findOne({ _id: therapistId });
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

module.exports = fetchProfileController;
