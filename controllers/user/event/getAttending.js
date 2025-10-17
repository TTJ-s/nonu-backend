const responseMaker = require('../../../helpers/responseMaker');
const eventAttendModel = require('../../../models/eventAttendModel');

const getEventAttendingController = async (req, res) => {
  try {
    const { eventId } = req.params;
    if (!eventId)
      return responseMaker(res, 400, 'Event id is required', null, false);
    const checkAttending = await eventAttendModel.findOne({
      eventId,
      userId: res.locals.userId,
    });
    if (checkAttending) {
      return responseMaker(
        res,
        200,
        'User event attending...!',
        checkAttending,
        false
      );
    } else {
      return responseMaker(
        res,
        200,
        'User is not attending event...!',
        null,
        false
      );
    }
  } catch (error) {
    return responseMaker(res, 500, 'Internal Server Error...!', null, error);
  }
};

module.exports = getEventAttendingController;
