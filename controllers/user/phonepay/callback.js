const responseMaker = require('../../../helpers/responseMaker');
const paymentModel = require('../../../models/paymentModel');
const sessionModel = require('../../../models/sessionModel');

const phonepeCallback = async (req, res) => {
  try {
    const responseB64 = req.body.response;
    const decodedResponse = JSON.parse(
      Buffer.from(responseB64, 'base64').toString('utf8')
    );
    const transactionId = decodedResponse.data.merchantTransactionId;
    const phonepeTransactionId = decodedResponse.data.transactionId;
    if (decodedResponse.success) {
      if (decodedResponse.code === 'PAYMENT_SUCCESS') {
        const fetchPayment = await paymentModel.findOneAndUpdate(
          {
            razorpayId: transactionId,
          },
          {
            status: 'paid',
            paymentId: phonepeTransactionId,
          },
          { new: true }
        );
        const updateSession = await sessionModel.findOneAndUpdate(
          {
            // eslint-disable-next-line no-underscore-dangle
            paymentId: fetchPayment._id,
          },
          { paymentCompleted: true },
          { new: true }
        );
        if (fetchPayment && updateSession)
          return responseMaker(
            res,
            200,
            'Payment Added Successfully',
            null,
            false
          );
      }
    } else {
      return responseMaker(res, 400, 'Payment Adding Failed', null, false);
    }
  } catch (error) {
    return responseMaker(res, 500, 'Internal Server Error...!', null, error);
  }
};

module.exports = phonepeCallback;
