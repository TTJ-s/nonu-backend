const paginationHelper = require('../../../helpers/pagination');
const responseMaker = require('../../../helpers/responseMaker');
const sessionModel = require('../../../models/sessionModel');
const therapistModel = require('../../../models/therapistModel');

const counsellorPaginationController = async (req, res) => {
  try {
    const { type, pageNo, status } = req.query;
    const { therapistId } = res.locals;
    if (pageNo < 1)
      return responseMaker(
        res,
        400,
        'Page number must be greater than 1',
        null,
        false
      );
    if (type === 'session') {
      let query;
      if (status === '') {
        query = {
          therapistId,
          paymentCompleted: true,
          status: { $ne: 'cancelled' },
        };
      } else {
        query = { status, therapistId, paymentCompleted: true };
      }
      const responseData = await paginationHelper(
        pageNo,
        query,
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
    } else if (type === 'rescheduled') {
      const query = {
        therapistId,
        'sessionReschedule.status': status,
        status: 'accepted',
      };
      const responseData = await paginationHelper(
        pageNo,
        query,
        sessionModel,
        'userId',
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
    } else if (type === 'therapist') {
      const responseData = await paginationHelper(
        pageNo,
        { status: 'accepted' },
        therapistModel,
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
    }
  } catch (error) {
    return responseMaker(res, 500, 'Internal Server Error', null, error);
  }
};

module.exports = counsellorPaginationController;
