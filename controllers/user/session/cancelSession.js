const Razorpay = require('razorpay');
const responseMaker = require('../../../helpers/responseMaker');
const paymentModel = require('../../../models/paymentModel');
const sessionModel = require('../../../models/sessionModel');
const RefundModel = require('../../../models/refundModel');

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_ID_KEY,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});
const cancelSessionController = async (req, res) => {
  try {
    const userId = res.locals.userkey;
    const { sessionId, amount } = req.body;
    if (!sessionId)
      return responseMaker(res, 400, 'Session Id is required', null, false);
    if (!amount)
      return responseMaker(res, 400, 'Amount is required', null, false);
    const fetchSession = await sessionModel.findOne({
      _id: sessionId,
      userId,
      amount,
    });
    const fetchPayment = await paymentModel.findOne({
      _id: fetchSession.paymentId,
      userId,
      sessionId,
      amount,
    });
    if (!fetchPayment) {
      return responseMaker(res, 400, 'No payment found...!', null, false);
    } else {
      const refundData = {
        userId,
        sessionId,
        amount,
        paymentId: fetchPayment.paymentId,
      };
      const checkRefundReq = await RefundModel.findOne({
        userId,
        sessionId,
        amount,
      });
      if (checkRefundReq)
        return responseMaker(
          res,
          400,
          'Refund request already submitted',
          null,
          false
        );
      const refundPayment = await new RefundModel(refundData);
      const saveData = await refundPayment.save();
      if (saveData)
        return responseMaker(
          res,
          200,
          'Your session cancel request send successfully',
          { saveData },
          false
        );
    }
  } catch (error) {
    return responseMaker(res, 500, 'Internal Server Error...!', null, error);
  }
};

module.exports = cancelSessionController;
