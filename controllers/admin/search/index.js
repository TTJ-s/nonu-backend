const responseMaker = require('../../../helpers/responseMaker');
const collegeModel = require('../../../models/collegeModel');
const eventModel = require('../../../models/eventModel');
const paymentModel = require('../../../models/paymentModel');
const sessionModel = require('../../../models/sessionModel');
const therapistModel = require('../../../models/therapistModel');
const userModel = require('../../../models/userModel');
const refundModel = require('../../../models/refundModel');

const searchController = async (req, res) => {
  try {
    const { type, query, status } = req.query;
    if (!type)
      return responseMaker(res, 400, 'Type is not specified..!', null, false);
    const perPage = 10;
    if (type === 'college') {
      const result = await collegeModel
        .find({
          $or: [
            { collegeName: { $regex: query, $options: 'i' } },
            { universityName: { $regex: query, $options: 'i' } },
          ],
        })
        .limit(perPage);
      if (result.length > 0) {
        return responseMaker(
          res,
          200,
          'Data fetched successfully',
          result,
          false
        );
      } else {
        return responseMaker(res, 200, 'No results found...!', null, false);
      }
    } else if (type === 'user') {
      const result = await userModel
        .find({
          $or: [
            { fullName: { $regex: query, $options: 'i' } },
            { institutionName: { $regex: query, $options: 'i' } },
            { phone: { $regex: query, $options: 'i' } },
          ],
        })
        .limit(perPage);
      if (result.length > 0) {
        return responseMaker(
          res,
          200,
          'Data fetched successfully',
          result,
          false
        );
      } else {
        return responseMaker(res, 200, 'No results found...!', null, false);
      }
    } else if (type === 'therapist') {
      const result = await therapistModel
        .find({
          $or: [
            { therapistName: { $regex: query, $options: 'i' } },
            { specialization: { $regex: query, $options: 'i' } },
            { phone: { $regex: query, $options: 'i' } },
            { qualification: { $regex: query, $options: 'i' } },
          ],
        })
        .limit(perPage);
      if (result.length > 0) {
        return responseMaker(
          res,
          200,
          'Data fetched successfully',
          result,
          false
        );
      } else {
        return responseMaker(res, 200, 'No results found...!', null, false);
      }
    } else if (type === 'event') {
      const result = await eventModel
        .find({
          $or: [
            { eventName: { $regex: query, $options: 'i' } },
            { type: { $regex: query, $options: 'i' } },
          ],
        })
        .limit(perPage);
      if (result.length > 0) {
        return responseMaker(
          res,
          200,
          'Data fetched successfully',
          result,
          false
        );
      } else {
        return responseMaker(res, 200, 'No results found...!', null, false);
      }
    } else if (type === 'session') {
      const result = await sessionModel
        .find({
          $or: [
            { userId: { $regex: query, $options: 'i' } },
            { therapistName: { $regex: query, $options: 'i' } },
            { status: { $regex: query, $options: 'i' } },
          ],
        })
        .limit(perPage);
      if (result.length > 0) {
        return responseMaker(
          res,
          200,
          'Data fetched successfully',
          result,
          false
        );
      } else {
        return responseMaker(res, 200, 'No results found...!', null, false);
      }
    } else if (type === 'payment') {
      const result = await paymentModel
        .find({ status })
        .populate({
          path: 'userId',
          select: 'fullName',
          match: {
            fullName: { $regex: query, $options: 'i' },
          },
        })
        .populate({
          path: 'sessionId',
          populate: {
            path: 'therapistId',
            select: 'therapistName',
            match: {
              therapistName: { $regex: query, $options: 'i' },
            },
          },
        })
        .limit(perPage);
      if (result.length > 0) {
        return responseMaker(
          res,
          200,
          'Data fetched successfully',
          result,
          false
        );
      } else {
        return responseMaker(res, 200, 'No results found...!', null, false);
      }
    } else if (type === 'refund') {
      const result = await refundModel
        .find()
        .populate({
          path: 'userId',
          select: 'fullName',
          match: {
            fullName: { $regex: query, $options: 'i' },
          },
        })
        .limit(perPage);
      if (result.length > 0) {
        return responseMaker(
          res,
          200,
          'Data fetched successfully',
          result,
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

module.exports = searchController;
