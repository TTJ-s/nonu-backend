const responseMaker = require('../../../helpers/responseMaker');
const ratingModel = require('../../../models/ratingModel');

const getRatingController = async (req, res) => {
  try {
    const { therapistId } = req.params;
    if (!therapistId)
      return responseMaker(
        res,
        400,
        'therapistId is required...!',
        null,
        false
      );

    const ratings = await ratingModel.find({ therapistId });
    if (ratings.length > 0) {
      let totalRating = 0;
      // eslint-disable-next-line no-restricted-syntax
      for (const rating of ratings) {
        totalRating += rating.rate;
      }
      const averageRating = totalRating / ratings.length;
      return responseMaker(res, 200, 'Rating', { averageRating }, false);
    } else {
      return responseMaker(res, 200, 'No Rating available', null, false);
    }
  } catch (error) {
    return responseMaker(res, 500, 'Internal Server Error...!', null, error);
  }
};

module.exports = getRatingController;
