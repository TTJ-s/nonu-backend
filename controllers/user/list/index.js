const paginationHelper = require('../../../helpers/pagination');
const responseMaker = require('../../../helpers/responseMaker');
const eventModel = require('../../../models/eventModel');
const sessionModel = require('../../../models/sessionModel');

const userPaginationController = async (req, res) => {
  try {
    const { type, pageNo } = req.query;
    if (pageNo < 1)
      return responseMaker(
        res,
        400,
        'Page number must be greater than 1',
        null,
        false
      );
    if (type === 'event') {
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      const responseData = await paginationHelper(
        pageNo,
        { eventDate: { $gt: yesterday } },
        eventModel,
        null,
        null,
        true
      );
      if (responseData.error)
        return responseMaker(
          res,
          500,
          'Internal Server Error',
          responseData.error,
          responseData.error
        );
      return responseMaker(
        res,
        200,
        'List of Data',
        {
          dataCollection: responseData.data,
          totalCount: responseData.totalCount,
        },
        false
      );
    } else if (type === 'session') {
      const responseData = await paginationHelper(
        pageNo,
        { userId: res.locals.userkey, status: { $nin: ['progress'] } },
        sessionModel,
        'session',
        null,
        true
      );
      if (responseData.error)
        return responseMaker(
          res,
          500,
          'Internal Server Error',
          responseData.error,
          responseData.error
        );
      return responseMaker(
        res,
        200,
        'List of Data',
        {
          dataCollection: responseData.data,
          totalCount: responseData.totalCount,
        },
        false
      );
    }
  } catch (error) {
    return responseMaker(res, 500, 'Internal Server Error', null, error);
  }
};

module.exports = userPaginationController;
