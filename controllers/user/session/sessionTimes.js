const responseMaker = require('../../../helpers/responseMaker');
const therapistModel = require('../../../models/therapistModel');

const sessionTimesController = async (req, res) => {
  try {
    const { therapistId } = req.body;
    if (!therapistId)
      return responseMaker(res, 400, 'Therapist id is required', null, false);
    const sessionTimes = await therapistModel
      .findOne({ _id: therapistId })
      .select('times');
    if (sessionTimes) {
      return responseMaker(res, 200, 'Session times', sessionTimes, false);
    }
  } catch (error) {
    return responseMaker(res, 500, 'Internal Server Error...!', null, error);
  }
};

module.exports = sessionTimesController;
