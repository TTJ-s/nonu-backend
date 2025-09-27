const responseMaker = require('../../../helpers/responseMaker');
const paymentModel = require('../../../models/paymentModel');
const RefundModel = require('../../../models/refundModel');
const sessionModel = require('../../../models/sessionModel');

function generateRandomKey(length) {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomKey = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomKey += characters.charAt(randomIndex);
  }
  return randomKey;
}
const paymentAcceptController = async (req, res) => {
  try {
    const { userId } = req.params;
    const { amount, paymentId, sessionId } = req.body;
    const { type } = req.query;
    if (!userId)
      return responseMaker(res, 400, 'User id is required', null, false);
    if (!amount || !paymentId || !sessionId)
      return responseMaker(
        res,
        400,
        'Amount, paymentId and sessionId is required',
        null,
        false
      );
    const today = new Date();
    if (type === 'accept') {
      const fetchSession = await sessionModel.findOne({
        _id: sessionId,
        sessionDate: { $lt: today },
      });
      if (fetchSession)
        return responseMaker(
          res,
          400,
          'Session date is expired..!',
          null,
          false
        );
      const acceptPayment = await paymentModel.findOneAndUpdate(
        {
          userId,
          _id: paymentId,
        },
        { status: 'paid' },
        { new: true }
      );
      const updateSession = await sessionModel.findOneAndUpdate(
        {
          _id: sessionId,
          userId,
        },
        { paymentCompleted: true },
        { new: true }
      );
      if (acceptPayment && updateSession)
        return responseMaker(
          res,
          200,
          'Payment accepted..!',
          { acceptPayment, updateSession },
          false
        );
    } else {
      const randomKey = generateRandomKey(10);
      const dateRandom = new Date().getMilliseconds();
      const refundData = {
        razorpayId: `screenshot-${randomKey}${dateRandom}`,
        paymentId,
        entity: 'screenshot',
        amount,
        currency: 'INR',
        status: 'processed',
      };
      const refundMaker = await new RefundModel(refundData);
      const saveRefund = await refundMaker.save();
      const cancelSession = await sessionModel.findOneAndUpdate(
        {
          _id: sessionId,
          userId,
        },
        { status: 'cancelled' },
        { new: true }
      );
      if (saveRefund)
        return responseMaker(
          res,
          200,
          'Refund added and session cancelled..!',
          { saveRefund, cancelSession },
          false
        );
    }
  } catch (error) {
    return responseMaker(res, 500, 'Internal Server Error...!', null, error);
  }
};

module.exports = paymentAcceptController;
