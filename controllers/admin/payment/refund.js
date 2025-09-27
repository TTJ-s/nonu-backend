const Razorpay = require('razorpay');
const responseMaker = require('../../../helpers/responseMaker');
const refundModel = require('../../../models/refundModel');
const paymentModel = require('../../../models/paymentModel');
const sessionModel = require('../../../models/sessionModel');
const refundPayload = require('../phonpe/refundPayload');
const refundLink = require('../phonpe/refundLink');

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_ID_KEY,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});
const refundController = async (req, res) => {
  try {
    const { userId } = req.params;
    const { amount, paymentId, sessionId } = req.body;
    const { type } = req.query;
    const mode = 'Phonepe';
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
    const fetchPayment = await paymentModel.findOne({
      userId,
      paymentId,
      sessionId,
      amount,
    });
    if (type === 'refund') {
      if (mode === 'Razorpay') {
        if (fetchPayment) {
          instance.payments.refund(
            paymentId,
            { amount: amount * 100, speed: 'optimum' },
            async (error, refund) => {
              if (refund) {
                const refundData = {
                  razorpayId: refund.id,
                  paymentId: refund.payment_id,
                  entity: refund.entity,
                  amount: refund.amount / 100,
                  currency: refund.currency,
                  status: refund.status,
                };
                const refundPayment = await refundModel.findOneAndUpdate(
                  { userId, sessionId, amount },
                  refundData,
                  { new: true }
                );
                const cancelSession = await sessionModel.findOneAndUpdate(
                  {
                    _id: sessionId,
                    userId,
                  },
                  { status: 'cancelled' },
                  { new: true }
                );
                if (refundPayment)
                  return responseMaker(
                    res,
                    200,
                    'Refund added successfully',
                    { refundPayment, cancelSession },
                    false
                  );
              } else {
                return responseMaker(
                  res,
                  400,
                  `Something went wrong ${error}`,
                  null,
                  false
                );
              }
            }
          );
        }
      } else if (mode === 'Phonepe') {
        if (fetchPayment) {
          const phonepayRefundPayload = await refundPayload(
            userId,
            paymentId,
            amount
          );
          const refund = await refundLink(
            phonepayRefundPayload.x_verify,
            phonepayRefundPayload.body
          );
          const refundData = {
            razorpayId: refund.data.transactionId,
            paymentId,
            entity: 'refund',
            amount,
            currency: 'INR',
            status: 'pending',
          };
          const refundPayment = await refundModel.findOneAndUpdate(
            { userId, sessionId, amount },
            refundData,
            { new: true }
          );
          return responseMaker(
            res,
            200,
            'Refund created successfully',
            refundPayment,
            false
          );
        }
      }
    } else if (type === 'reject') {
      const rejectData = {
        status: 'rejected',
      };
      const rejectPayment = await refundModel.findOneAndUpdate(
        { userId, sessionId },
        rejectData,
        { new: true }
      );
      if (rejectPayment)
        return responseMaker(
          res,
          200,
          'Refund data rejected',
          { rejectPayment },
          false
        );
    }
  } catch (error) {
    return responseMaker(res, 500, 'Internal Server Error...!', null, error);
  }
};

module.exports = refundController;
