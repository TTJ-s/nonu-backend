const paginationHelper = require('../../../helpers/pagination');
const responseMaker = require('../../../helpers/responseMaker');
const collegeModel = require('../../../models/collegeModel');
const eventModel = require('../../../models/eventModel');
const paymentModel = require('../../../models/paymentModel');
const refundModel = require('../../../models/refundModel');
const sessionModel = require('../../../models/sessionModel');
const therapistModel = require('../../../models/therapistModel');
const universityModel = require('../../../models/universityModel');
const userModel = require('../../../models/userModel');

const paginationController = async (req, res) => {
  try {
    const { type, pageNo, status } = req.query;
    if (pageNo < 1)
      return responseMaker(
        res,
        400,
        'Page number must be greater than 1',
        null,
        false
      );
    if (type === 'college') {
      const responseData = await paginationHelper(
        pageNo,
        {},
        collegeModel,
        null,
        null,
        true
      );

      if (responseData.error) {
        return responseMaker(
          res,
          500,
          'Internal Server Error',
          responseData.error,
          responseData.error
        );
      }

      const dataWithStudentCount = [];

      // eslint-disable-next-line no-restricted-syntax
      for (const data of responseData.data) {
        const { collegeName, universityName } = data;
        const institutionName = collegeName;
        // eslint-disable-next-line no-await-in-loop
        const studentCount = await userModel.countDocuments({
          universityName,
          institutionName,
        });

        dataWithStudentCount.push({
          // eslint-disable-next-line node/no-unsupported-features/es-syntax
          ...data,
          studentCount,
        });
      }

      return responseMaker(
        res,
        200,
        'List of Data',
        {
          dataCollection: dataWithStudentCount,
          totalCount: responseData.totalCount,
        },
        false
      );
    } else if (type === 'therapist') {
      const responseData = await paginationHelper(
        pageNo,
        {},
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
    } else if (type === 'university') {
      const responseData = await paginationHelper(
        pageNo,
        {},
        universityModel,
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
        { paymentCompleted: true, status },
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
    } else if (type === 'payment') {
      const responseData = await paginationHelper(
        pageNo,
        { status },
        paymentModel,
        'payment',
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
    } else if (type === 'refund') {
      const responseData = await paginationHelper(
        pageNo,
        {},
        refundModel,
        'refund',
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
    } else if (type === 'user') {
      const responseData = await paginationHelper(
        pageNo,
        {},
        userModel,
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
    } else if (type === 'event') {
      const responseData = await paginationHelper(
        pageNo,
        {},
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
    }
  } catch (error) {
    return responseMaker(res, 500, 'Internal Server Error', null, error);
  }
};

module.exports = paginationController;
