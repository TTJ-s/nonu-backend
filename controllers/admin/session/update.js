const responseMaker = require('../../../helpers/responseMaker');
const sessionModel = require('../../../models/sessionModel');

const updateSessionController = async (req, res) => {
  try {
    const { sessionId } = req.params;
    if (!sessionId)
      return responseMaker(
        res,
        400,
        'Therapist id is required...!',
        null,
        false
      );
    const updateUser = await sessionModel.findOneAndUpdate(
      { _id: sessionId },
      req.body,
      { new: true }
    );
    if (updateUser)
      return responseMaker(res, 200, 'Session Data Updated', updateUser, false);
  } catch (error) {
    return responseMaker(res, 500, 'Internal Server Error...!', null, error);
  }
};

module.exports = updateSessionController;
