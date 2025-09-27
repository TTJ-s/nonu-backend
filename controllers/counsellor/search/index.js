const responseMaker = require('../../../helpers/responseMaker');
const sessionModel = require('../../../models/sessionModel');

const counsellorSearchController = async (req, res) => {
  try {
    const { type, query, user } = req.query;
    if (!type)
      return responseMaker(res, 400, 'Type is not specified..!', null, false);
    const perPage = 10;
    if (type === 'session') {
      const result = await sessionModel
        .find({
          therapistId: res.locals.therapistId,
          paymentCompleted: true,
          status: { $ne: 'rejected' },
        })
        .populate({
          path: 'userId',
          select: 'fullName',
          match: {
            fullName: { $regex: query, $options: 'i' },
          },
        })
        .populate('therapistId', { therapistName: 1 })
        .limit(perPage);
      const filteredResult = result.filter(
        (session) => session.userId !== null
      );
      if (result.length > 0) {
        return responseMaker(
          res,
          200,
          'Data fetched successfully',
          filteredResult,
          false
        );
      } else {
        return responseMaker(res, 200, 'No results found...!', null, false);
      }
    } else if (type === 'user-sessions') {
      const result = await sessionModel
        .find({
          therapistId: res.locals.therapistId,
          status: 'completed',
          paymentCompleted: true,
        })
        .populate({
          path: 'userId',
          select: 'fullName age',
          match: {
            fullName: { $regex: query, $options: 'i' },
          },
        })
        .limit(perPage)
        .lean();

      const uniqueUserIds = new Set();
      const uniqueResults = [];

      for (let i = 0; i < result.length; i++) {
        const { userId } = result[i];

        if (userId && !uniqueUserIds.has(userId)) {
          uniqueUserIds.add(userId);
          uniqueResults.push(result[i]);
        }
      }

      if (result.length > 0) {
        return responseMaker(
          res,
          200,
          'Data fetched successfully',
          uniqueResults,
          false
        );
      } else {
        return responseMaker(res, 200, 'No results found...!', null, false);
      }
    } else if (type === 'single-user') {
      const result = await sessionModel
        .find({
          therapistId: res.locals.therapistId,
          userId: user,
          paymentCompleted: true,
          status: { $ne: 'rejected' },
        })
        .populate({
          path: 'userId',
          select: 'fullName',
          match: {
            fullName: { $regex: query, $options: 'i' },
          },
        })
        .populate('therapistId', { therapistName: 1 })
        .limit(perPage);
      const filteredResult = result.filter(
        (session) => session.userId !== null
      );
      if (result.length > 0) {
        return responseMaker(
          res,
          200,
          'Data fetched successfully',
          filteredResult,
          false
        );
      } else {
        return responseMaker(res, 200, 'No results found...!', null, false);
      }
    }
  } catch (error) {
    return responseMaker(
      res,
      500,
      `Internal Server Error ${error}`,
      null,
      error
    );
  }
};

module.exports = counsellorSearchController;
