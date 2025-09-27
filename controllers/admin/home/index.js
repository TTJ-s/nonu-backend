const responseMaker = require('../../../helpers/responseMaker');
const collegeModel = require('../../../models/collegeModel');
const userModel = require('../../../models/userModel');
const eventModel = require('../../../models/eventModel');
const sessionModel = require('../../../models/sessionModel');
const therapistModel = require('../../../models/therapistModel');
const paymentModel = require('../../../models/paymentModel');

const analyticsController = async (req, res) => {
  try {
    const userCount = await userModel
      .find({
        status: 'accepted',
      })
      .count();
    const collegeCount = await collegeModel.count();
    const today = new Date();
    const completedEventCount = await eventModel
      .find({ eventDate: { $lt: today } })
      .count();
    const upcomingEventCount = await eventModel
      .find({
        eventDate: { $gt: today },
      })
      .count();
    const sessionCount = await sessionModel
      .find({ status: 'completed' })
      .count();
    const pychologistCount = await therapistModel
      .find({ status: 'accepted' })
      .count();
    const recentTransactions = await paymentModel
      .find({ status: 'paid' })
      .sort({ createdAt: -1 })
      .limit(10);
    let transactionTotal = 0;
    for (let i = 0; i < recentTransactions.length; i++) {
      transactionTotal += recentTransactions[i].amount;
    }
    const transactionData = { recentTransactions, transactionTotal };
    const upcomingEvents = await eventModel
      .find({ eventDate: { $gt: today } })
      .sort({ createdAt: -1 })
      .limit(4);
    const topPyschologists = await therapistModel
      .find({ status: 'accepted' })
      .select('therapistName img amount')
      .sort({ createdAt: 1 })
      .limit(5);
    return responseMaker(
      res,
      200,
      'Data collected successfully',
      {
        userCount,
        collegeCount,
        completedEventCount,
        upcomingEventCount,
        sessionCount,
        pychologistCount,
        transactionData,
        upcomingEvents,
        topPyschologists,
      },
      false
    );
  } catch (error) {
    return responseMaker(res, 500, 'Internal Server Error', null, error);
  }
};

module.exports = analyticsController;
