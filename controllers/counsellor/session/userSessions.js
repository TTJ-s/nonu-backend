const responseMaker = require('../../../helpers/responseMaker');
const sessionModel = require('../../../models/sessionModel');

const userSessionsController = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId)
      return responseMaker(res, 400, 'User id is required', null, false);
    const userSessions = await sessionModel
      .find({
        userId,
        status: 'completed',
        therapistId: res.locals.therapistId,
      })
      .populate('userId', { fullName: 1 });
    if (userSessions.length > 0) {
      return responseMaker(res, 200, 'User sessions list', userSessions, false);
    } else {
      return responseMaker(
        res,
        200,
        'User sessions list not found',
        null,
        false
      );
    }
  } catch (error) {
    return responseMaker(res, 500, 'Internal Server Error', null, error);
  }
};

module.exports = userSessionsController;
