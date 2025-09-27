/* eslint-disable no-param-reassign */
const paginationHelper = async (
  pageNo,
  query,
  databaseModel,
  populate,
  pageSize = 10,
  totalCount = false
) => {
  try {
    if (pageSize === null) pageSize = 10;
    pageNo -= 1;
    if (populate) {
      if (populate === 'userId') {
        const details = await databaseModel
          .find(query)
          .populate('userId')
          .limit(pageSize)
          .skip(pageSize * pageNo)
          .sort({ _id: -1 });
        totalCount = await databaseModel.find(query).count();
        return {
          success: 'Data Fetched',
          data: details,
          totalCount,
        };
      } else if (populate === 'session') {
        const details = await databaseModel
          .find(query)
          .populate('userId', {
            fullName: 1,
            age: 1,
            department: 1,
            institutionEnd: 1,
            institutionName: 1,
            institutionStart: 1,
          })
          .populate('therapistId', { therapistName: 1, img: 1 })
          .populate('recommendedTherapist', { therapistName: 1, img: 1 })
          .limit(pageSize)
          .skip(pageSize * pageNo)
          .sort({ _id: -1 });
        totalCount = await databaseModel.find(query).count();
        return {
          success: 'Data Fetched',
          data: details,
          totalCount,
        };
      } else if (populate === 'payment') {
        const details = await databaseModel
          .find(query)
          .populate('userId', { fullName: 1 })
          .populate({
            path: 'sessionId',
            select: 'therapistId',
            populate: { path: 'therapistId', select: 'therapistName amount' },
          })
          .limit(pageSize)
          .skip(pageSize * pageNo)
          .sort({ _id: -1 });
        totalCount = await databaseModel.find(query).count();
        return {
          success: 'Data Fetched',
          data: details,
          totalCount,
        };
      } else if (populate === 'refund') {
        const details = await databaseModel
          .find(query)
          .populate('sessionId', { sessionDate: 1 })
          .populate('userId', { fullName: 1 })
          .limit(pageSize)
          .skip(pageSize * pageNo)
          .sort({ _id: -1 });
        totalCount = await databaseModel.find(query).count();
        return {
          success: 'Data Fetched',
          data: details,
          totalCount,
        };
      }
    } else {
      const details = await databaseModel
        .find(query)
        .limit(pageSize)
        .skip(pageSize * pageNo)
        .sort({ createdAt: -1 })
        .lean();
      return {
        success: 'Data Fetched',
        data: details,
        totalCount,
      };
    }
  } catch (error) {
    // eslint-disable-next-line no-throw-literal
    throw {
      error: 'Something Went Wrong',
      data: error,
      totalCount,
    };
  }
};

module.exports = paginationHelper;
