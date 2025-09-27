const Razorpay = require('razorpay');
const crypto = require('crypto');
const responseMaker = require('../../../helpers/responseMaker');
const paymentModel = require('../../../models/paymentModel');
const SessionModel = require('../../../models/sessionModel');

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_ID_KEY,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});
const razorpayCallbackController = async (req, res) => {
  try {
    const { paymentId } = req.query;
    if (!paymentId)
      return responseMaker(res, 400, 'Payment id is required...!', null, false);
    const { razorpayPaymentId, razorpayOrderId, razorpaySignature } = req.body;
    const getDoc = await paymentModel.findOne({
      _id: paymentId,
      razorpayId: razorpayOrderId,
    });
    if (getDoc) {
      const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET_KEY);
      const data = hmac.update(`${razorpayOrderId}|${razorpayPaymentId}`);
      const generatedSignature = data.digest('hex');
      if (generatedSignature === razorpaySignature) {
        const fetchOrderData = await instance.orders.fetch(razorpayOrderId);
        const fetchPay = await instance.orders.fetchPayments(razorpayOrderId);
        if (fetchOrderData.status) {
          delete fetchOrderData.id;
          const updatePayment = await paymentModel.findOneAndUpdate(
            { _id: paymentId },
            {
              paymentId: fetchPay.items[0].id,
              amount: fetchOrderData.amount / 100,
              amountPaid: fetchOrderData.amount_paid / 100,
              amountDue: fetchOrderData.amount_due,
              status: fetchOrderData.status,
              attempts: fetchOrderData.attempts,
            },
            { new: true }
          );
          await SessionModel.findOneAndUpdate(
            { _id: getDoc.sessionId },
            // eslint-disable-next-line no-underscore-dangle
            { paymentCompleted: true, paymentId }
          );
          return responseMaker(
            res,
            200,
            'Status:Attempted If the attempt was successful, Amount will be reflected in your account in a short while',
            null,
            `${updatePayment.userId} has paid for a session with ${fetchOrderData.amount}`
          );
        }
      }
      return responseMaker(
        res,
        400,
        'Unable to verify the signature ! Contact Team now',
        null,
        false
      );
    }
    return responseMaker(res, 400, 'Payment Failed...!', null, false);
  } catch (error) {
    return responseMaker(res, 500, 'Internal Server Error...!', null, error);
  }
};

module.exports = razorpayCallbackController;
