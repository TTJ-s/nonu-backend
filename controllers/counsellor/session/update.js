const responseMaker = require('../../../helpers/responseMaker');
const { updateReqSessionSchema } = require('../../../helpers/schemaValidator');
const sessionModel = require('../../../models/sessionModel');

const updateReqSessionController = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const updateReqSessionValidator = updateReqSessionSchema.validate(
      req.body,
      {
        abortEarly: true,
      }
    );
    if (updateReqSessionValidator.error)
      return responseMaker(
        res,
        400,
        'Invalid Input',
        updateReqSessionValidator.error,
        false
      );
    const today = new Date();
    const sessionDate = new Date(req.body.sessionDate);

    if (sessionDate < today) {
      return responseMaker(
        res,
        400,
        'Cannot schedule on this date...!',
        null,
        false
      );
    }

    const updateSession = await sessionModel.findOneAndUpdate(
      { _id: sessionId, therapistId: res.locals.therapistId },
      req.body,
      { new: true }
    );
    if (!updateSession) {
      return responseMaker(
        res,
        400,
        'No session found to this therapist..!',
        null,
        false
      );
    } else {
      return responseMaker(
        res,
        200,
        'User Session Updated',
        updateSession,
        false
      );
    }
  } catch (error) {
    return responseMaker(res, 500, 'Internal Server Error', null, error);
  }
};

module.exports = updateReqSessionController;
