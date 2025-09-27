const responseMaker = require('../../../helpers/responseMaker');
const therapistModel = require('../../../models/therapistModel');

const readTimeController = async (req, res) => {
  try {
    const { day } = req.query;
    const { therapistId } = res.locals;
    const fetchTime = await therapistModel
      .findOne({
        _id: therapistId,
        'times.day': day,
      })
      .select('times');
    if (fetchTime) {
      const timeForDay = fetchTime.times.filter((item) => item.day === day);
      return responseMaker(
        res,
        200,
        'Times fetched successfully..!',
        timeForDay,
        false
      );
    } else {
      return responseMaker(res, 200, 'No times added..!', null, false);
    }
  } catch (error) {
    return responseMaker(res, 500, 'Internal Server Error...!', null, error);
  }
};

module.exports = readTimeController;
