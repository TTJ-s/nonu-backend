const responseMaker = require('../../../helpers/responseMaker');
const sessionModel = require('../../../models/sessionModel');

const rescheduleSessionController = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { meetLink, status } = req.body;
    const checkSession = await sessionModel.findOne({ _id: sessionId }).lean();

    if (!checkSession)
      return responseMaker(res, 400, 'Session not found..!', null, false);

    let newSessionDate = '';
    let newSessionTime = '';
    let oldSessionDate = '';
    let oldSessionTime = '';
    for (let i = 0; i < checkSession.sessionReschedule.length; i++) {
      oldSessionDate = checkSession.sessionDate;
      oldSessionTime = checkSession.sessionTime;
      if (checkSession.sessionReschedule[i].status !== 'rescheduled') {
        newSessionDate = checkSession.sessionReschedule[i].sessionDate;
        newSessionTime = checkSession.sessionReschedule[i].sessionTime;
        checkSession.sessionReschedule[i].status = 'rescheduled';
        checkSession.sessionDate = newSessionDate;
        checkSession.sessionTime = newSessionTime;
        checkSession.meetLink = meetLink;
        checkSession.status = status;
        checkSession.sessionReschedule[i].sessionDate = oldSessionDate;
        checkSession.sessionReschedule[i].sessionTime = oldSessionTime;
      }
    }

    const reschedule = await sessionModel.findOneAndUpdate(
      { _id: sessionId },
      checkSession,
      { new: true }
    );

    return responseMaker(
      res,
      200,
      'Rescheduled successfully',
      reschedule,
      false
    );
  } catch (error) {
    return responseMaker(res, 500, 'Internal Server Error', null, error);
  }
};

module.exports = rescheduleSessionController;
