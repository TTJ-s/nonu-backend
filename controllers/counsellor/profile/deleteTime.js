const responseMaker = require('../../../helpers/responseMaker');
const therapistModel = require('../../../models/therapistModel');

const deleteTimeController = async (req, res) => {
  try {
    const { therapistId } = res.locals;
    const { timeId } = req.params;

    const deletedTime = await therapistModel.updateOne(
      { _id: therapistId },
      { $pull: { times: { _id: timeId } } }
    );

    if (deletedTime.modifiedCount === 1) {
      return responseMaker(res, 200, 'Time deleted successfully', null, false);
    } else {
      return responseMaker(
        res,
        404,
        'Time not found or could not be deleted',
        null,
        false
      );
    }
  } catch (error) {
    return responseMaker(res, 500, 'Internal Server Error...!', null, error);
  }
};

module.exports = deleteTimeController;
