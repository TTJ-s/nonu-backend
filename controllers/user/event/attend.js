const { subscribeFirebase } = require('../../../helpers/firebase');
const responseMaker = require('../../../helpers/responseMaker');
const EventAttendModel = require('../../../models/eventAttendModel');

const eventAttendingController = async (req, res) => {
  try {
    const { eventId } = req.body;
    const userId = res.locals.userkey;
    if (!eventId)
      return responseMaker(res, 400, 'Event id is required', null, false);
    const checkNotified = await EventAttendModel.findOne({ eventId, userId });
    if (checkNotified)
      return responseMaker(
        res,
        400,
        'User already attending the event',
        null,
        false
      );
    const subscribe = subscribeFirebase(userId, eventId);
    if (subscribe) {
      const dataMaker = {
        eventId,
        userId,
      };
      const eventData = await new EventAttendModel(dataMaker);
      const saveData = await eventData.save();
      if (saveData) {
        return responseMaker(
          res,
          200,
          'Event notification added',
          subscribe,
          false
        );
      }
    } else {
      return responseMaker(
        res,
        400,
        'Event notification added failed',
        null,
        false
      );
    }
  } catch (error) {
    return responseMaker(res, 500, 'Internal Server Error...!', null, error);
  }
};

module.exports = eventAttendingController;
