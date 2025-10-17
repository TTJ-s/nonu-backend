const responseMaker = require('../../../helpers/responseMaker');
const sessionModel = require('../../../models/sessionModel');
const therapistModel = require('../../../models/therapistModel');

const displaySessionController = async (req, res) => {
  try {
    const userId = res.locals.userId;
    const completedSessionCount = await sessionModel
      .find({ userId, status: 'completed' })
      .count();
    const getSession = await sessionModel
      .findOne({
        userId,
        paymentCompleted: true,
      })
      .populate('therapistId', {
        img: 1,
        therapistName: 1,
        times: 1,
        amount: 1,
      })
      .sort({ createdAt: -1 })
      .lean();
    if (getSession) {
      if (getSession.recommendedTherapist.length > 0) {
        const therapistData = await therapistModel.find(
          {
            _id: { $in: getSession.recommendedTherapist },
          },
          { therapistName: 1, times: 1, img: 1, amount: 1 }
        );
        getSession.recommendedTherapist = therapistData;
      }
      getSession.completedCount = completedSessionCount;
      return responseMaker(res, 200, 'Session found...!', getSession, false);
    } else {
      return responseMaker(res, 400, 'Session not found...!', null, false);
    }
  } catch (error) {
    return responseMaker(res, 500, 'Internal Server Error...!', null, error);
  }
};

module.exports = displaySessionController;
