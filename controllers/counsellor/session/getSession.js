const responseMaker = require('../../../helpers/responseMaker');
const sessionModel = require('../../../models/sessionModel');

const getSessionController = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { therapistId } = res.locals;
    if (!sessionId)
      return responseMaker(res, 400, 'Session id is required', null, false);
    const getSession = await sessionModel.findOne({
      _id: sessionId,
      therapistId,
    });
    if (getSession) {
      return responseMaker(res, 200, 'Sessions found..!', getSession, false);
    } else {
      return responseMaker(res, 200, 'No sessions found', null, false);
    }
  } catch (error) {
    return responseMaker(res, 500, 'Internal Server Error', null, error);
  }
};

module.exports = getSessionController;
