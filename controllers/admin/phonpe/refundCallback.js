const responseMaker = require('../../../helpers/responseMaker');
const paymentModel = require('../../../models/paymentModel');
const refundModel = require('../../../models/refundModel');
const sessionModel = require('../../../models/sessionModel');

const refundCallback = async (req, res) => {
  try {
    const responseB64 = req.body.response;
    const decodedResponse = JSON.parse(
      Buffer.from(responseB64, 'base64').toString('utf8')
    );
    const transactionId = decodedResponse.data.merchantTransactionId;
    if (decodedResponse.success) {
      if (decodedResponse.code === 'PAYMENT_SUCCESS') {
        const updateRefund = await refundModel.findOneAndUpdate(
          {
            paymentId: transactionId,
          },
          {
            status: 'processed',
          },
          { new: true }
        );
        const updatePayment = await paymentModel.findOneAndUpdate(
          {
            paymentId: transactionId,
          },
          {
            status: 'refunded',
          },
          { new: true }
        );
        const cancelSession = await sessionModel.findOneAndUpdate(
          {
            _id: updateRefund.sessionId,
            userId: updateRefund.userId,
          },
          { status: 'cancelled' },
          { new: true }
        );
        if (cancelSession) {
          return responseMaker(
            res,
            200,
            'Amount Refunded Successfully',
            updateRefund,
            false
          );
        } else {
          return responseMaker(res, 400, 'Something went wrong', null, false);
        }
      } else {
        return responseMaker(res, 400, 'Refund Failed', null, false);
      }
    }
  } catch (error) {
    return responseMaker(res, 500, 'Internal Server Error...!', null, error);
  }
};

module.exports = refundCallback;
