const responseMaker = require('../../../helpers/responseMaker');
const therapistModel = require('../../../models/therapistModel');

const timesController = async (req, res) => {
  try {
    const { therapistId } = res.locals;
    if (!therapistId)
      return responseMaker(res, 400, 'Therapist id is required', null, false);

    const { times } = req.body;

    // eslint-disable-next-line no-restricted-syntax
    for (const { day, time } of times) {
      // eslint-disable-next-line no-await-in-loop
      const existingTime = await therapistModel.findOne({
        _id: therapistId,
        times: { $elemMatch: { day, time } },
      });

      if (existingTime) {
        return responseMaker(
          res,
          400,
          `Therapist already has an entry for ${day}`,
          null,
          false
        );
      }
    }

    const updateTimes = await therapistModel.findByIdAndUpdate(
      therapistId,
      { $push: { times: { $each: times } } },
      { new: true }
    );

    if (updateTimes) {
      return responseMaker(
        res,
        200,
        'Therapist times updated successfully..!',
        updateTimes,
        false
      );
    }
  } catch (error) {
    return responseMaker(res, 500, 'Internal Server Error...!', null, error);
  }
};

module.exports = timesController;
