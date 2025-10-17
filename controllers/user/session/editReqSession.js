const responseMaker = require('../../../helpers/responseMaker');
const { sessionEditSchema } = require('../../../helpers/schemaValidator');
const sessionModel = require('../../../models/sessionModel');

const editReqSessionController = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const userId = res.locals.userId;
    const findSession = await sessionModel.findOne({
      _id: sessionId,
      userId,
    });
    if (!findSession)
      return responseMaker(res, 400, 'Session not found...!', null, false);
    const sessionEditSchemaValidator = sessionEditSchema.validate(req.body, {
      abortEarly: true,
    });
    if (sessionEditSchemaValidator.error)
      return responseMaker(
        res,
        400,
        'Invalid Inputs',
        sessionEditSchemaValidator.error,
        false
      );
    const checkStatus = await sessionModel
      .findOne({ _id: sessionId })
      .select('status');
    if (checkStatus.status === 'accepted') {
      const rescheduleStatus = await sessionModel
        .findOne({ _id: sessionId })
        .lean();
      for (let i = 0; i < rescheduleStatus.sessionReschedule.length; i++) {
        const check = rescheduleStatus.sessionReschedule[i].status;
        if (check === 'progress') {
          rescheduleStatus.sessionReschedule[i].sessionDate =
            req.body.sessionReschedule[0].sessionDate;
          rescheduleStatus.sessionReschedule[i].sessionTime =
            req.body.sessionReschedule[0].sessionTime;
          // eslint-disable-next-line no-await-in-loop
          const updateSession = await sessionModel.findOneAndUpdate(
            { _id: sessionId },
            rescheduleStatus,
            { new: true }
          );
          if (updateSession)
            return responseMaker(
              res,
              200,
              'User Session Reschedule requested...!',
              updateSession,
              false
            );
        }
      }
      const updateSession = await sessionModel.findOneAndUpdate(
        { _id: sessionId },
        { $push: { sessionReschedule: { $each: req.body.sessionReschedule } } },
        { new: true }
      );
      if (updateSession)
        return responseMaker(
          res,
          200,
          'User Session Reschedule requested...!',
          updateSession,
          false
        );
    }
    const dataMaker = {
      sessionDate: req.body.sessionReschedule[0].sessionDate,
      sessionTime: req.body.sessionReschedule[0].sessionTime,
    };
    const updateSession = await sessionModel.findOneAndUpdate(
      { _id: sessionId },
      dataMaker,
      { new: true }
    );
    if (updateSession)
      return responseMaker(
        res,
        200,
        'User Session Updated',
        updateSession,
        false
      );
  } catch (error) {
    return responseMaker(res, 500, 'Internal Server Error...!', null, error);
  }
};

module.exports = editReqSessionController;
