const responseMaker = require('../../../helpers/responseMaker');
const { createEventSchema } = require('../../../helpers/schemaValidator');
const EventModel = require('../../../models/eventModel');

const createEventController = async (req, res) => {
  try {
    const createEventValidator = createEventSchema.validate(req.body, {
      abortEarly: true,
    });
    if (createEventValidator.error)
      return responseMaker(
        res,
        400,
        'Invalid Input',
        createEventValidator.error,
        false
      );
    const checkEvent = await EventModel.findOne(req.body);
    if (checkEvent)
      return responseMaker(res, 400, 'Event already exists', null, false);
    const dataMaker = await new EventModel(req.body);
    const saveData = await dataMaker.save();
    if (saveData) responseMaker(res, 200, 'Event Data Added', saveData, false);
  } catch (error) {
    return responseMaker(res, 500, 'Internal Server Error', null, error);
  }
};

module.exports = createEventController;
