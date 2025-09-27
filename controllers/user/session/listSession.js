const responseMaker = require('../../../helpers/responseMaker');
const sessionModel = require('../../../models/sessionModel');

const listSessionController = async (req, res) => {
  try {
    const userId = res.locals.userkey;
    const getSession = await sessionModel.find({ userId });
    if (getSession) {
      return responseMaker(res, 200, 'Session found...!', getSession, false);
    } else {
      return responseMaker(res, 400, 'Session not found...!', null, false);
    }
  } catch (error) {
    return responseMaker(res, 500, 'Internal Server Error...!', null, error);
  }
};

module.exports = listSessionController;
