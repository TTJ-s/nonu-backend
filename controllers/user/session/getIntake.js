const responseMaker = require('../../../helpers/responseMaker');
const sessionModel = require('../../../models/sessionModel');

const getIntakeController = async (req, res) => {
  try {
    const userId = res.locals.userkey;
    if (!userId)
      return responseMaker(res, 400, 'User id not found..!', null, false);
    const intakeDetails = await sessionModel
      .findOne({
        status: 'completed',
        userId,
        isInTake: true,
      })
      .populate('recommendedTherapist', {
        therapistName: 1,
        img: 1,
        times: 1,
        amount: 1,
      });
    if (intakeDetails) {
      return responseMaker(res, 200, 'Intake details..!', intakeDetails, false);
    } else {
      return responseMaker(
        res,
        200,
        'Intake details not found..!',
        null,
        false
      );
    }
  } catch (error) {
    return responseMaker(res, 500, 'Internal Server Error...!', null, error);
  }
};

module.exports = getIntakeController;
