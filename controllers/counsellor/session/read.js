const responseMaker = require('../../../helpers/responseMaker');
const sessionModel = require('../../../models/sessionModel');

const readUserSessionController = async (req, res) => {
  try {
    const getUserSessions = await sessionModel
      .find({
        therapistId: res.locals.therapistId,
        paymentCompleted: true,
      })
      .populate('userId');

    // Create a Map to store unique user sessions
    const uniqueUserSessionsMap = new Map();

    for (let i = 0; i < getUserSessions.length; i++) {
      const { userId } = getUserSessions[i];
      // Check if the user session has not been added to the Map yet
      if (!uniqueUserSessionsMap.has(userId)) {
        uniqueUserSessionsMap.set(userId, getUserSessions[i]);
      }
    }

    // Convert the Map values (unique user sessions) back to an array
    const uniqueUserSessions = Array.from(uniqueUserSessionsMap.values());

    if (uniqueUserSessions.length > 0) {
      return responseMaker(
        res,
        200,
        'User sessions found..!',
        uniqueUserSessions,
        false
      );
    } else {
      return responseMaker(res, 200, 'No sessions found', null, false);
    }
  } catch (error) {
    return responseMaker(res, 500, 'Internal Server Error', null, error);
  }
};

module.exports = readUserSessionController;
