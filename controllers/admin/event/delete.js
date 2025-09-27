const responseMaker = require('../../../helpers/responseMaker');
const eventModel = require('../../../models/eventModel');

const deleteEventController = async (req, res) => {
  try {
    const { eventId } = req.params;

    const deletedEvent = await eventModel.findByIdAndDelete(eventId);

    if (!deletedEvent) {
      return responseMaker(res, 404, 'Event not found', null, false);
    }

    return responseMaker(res, 200, 'Event deleted successfully', null, false);
  } catch (error) {
    return responseMaker(res, 500, 'Internal Server Error', null, error);
  }
};

module.exports = deleteEventController;
