const responseMaker = require('../../../helpers/responseMaker');
const { ratingSchema } = require('../../../helpers/schemaValidator');
const RatingModel = require('../../../models/ratingModel');

const createRatingController = async (req, res) => {
  try {
    const createRatingSchemaValidator = ratingSchema.validate(req.body, {
      abortEarly: true,
    });
    if (createRatingSchemaValidator.error)
      return responseMaker(
        res,
        400,
        'Invalid Inputs',
        createRatingSchemaValidator.error,
        false
      );
    const { userId, therapistId, sessionId } = req.body;
    const checkAlreadyRating = await RatingModel.findOne({
      userId,
      sessionId,
      therapistId,
    });
    if (checkAlreadyRating)
      return responseMaker(res, 400, 'User rating already exists', null, false);
    const dataMaker = await new RatingModel(req.body);
    const saveData = await dataMaker.save();
    if (saveData)
      return responseMaker(res, 200, 'User rating added', saveData, false);
  } catch (error) {
    return responseMaker(res, 500, 'Internal Server Error...!', null, error);
  }
};

module.exports = createRatingController;
