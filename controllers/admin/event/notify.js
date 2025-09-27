const { sendNotificationFromPanel } = require('../../../helpers/firebase');
const responseMaker = require('../../../helpers/responseMaker');

const eventNotifyController = async (req, res) => {
  try {
    const { title, message, type, eventId } = req.body;
    if (!title || !message || !type || !eventId)
      return responseMaker(
        res,
        400,
        'title, message, type, eventId is required',
        null,
        false
      );
    const response = await sendNotificationFromPanel(eventId, req.body);
    if (response.success) {
      return responseMaker(
        res,
        200,
        'Notification sent successfully',
        null,
        false
      );
    } else {
      return responseMaker(res, 400, 'Notification failed', null, false);
    }
  } catch (error) {
    return responseMaker(res, 500, 'Internal Server Error...!', null, error);
  }
};

module.exports = eventNotifyController;
