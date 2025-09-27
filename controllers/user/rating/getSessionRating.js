const responseMaker = require('../../../helpers/responseMaker');
const ratingModel = require('../../../models/ratingModel');

const getSessionRatingController = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const userId = res.locals.userkey;
    if (!sessionId)
      return responseMaker(res, 400, 'sessionId is required...!', null, false);
    const fetchSession = await ratingModel.findOne({ sessionId, userId });
    if (fetchSession) {
      return responseMaker(
        res,
        200,
        'Session rating found..!',
        fetchSession,
        false
      );
    } else {
      return responseMaker(
        res,
        200,
        'Session rating not found..!',
        null,
        false
      );
    }
  } catch (error) {
    return responseMaker(res, 500, 'Internal Server Error...!', null, error);
  }
};

module.exports = getSessionRatingController;
