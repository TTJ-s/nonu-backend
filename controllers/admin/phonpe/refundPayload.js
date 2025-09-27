const sha256 = require('sha256');

const refundPayload = async (userId, transactionId, amount) => {
  const payload = {
    merchantId: process.env.PHONEPE_MERCHANT_ID,
    merchantUserId: userId,
    originalTransactionId: transactionId,
    merchantTransactionId: transactionId,
    amount,
    callbackUrl: process.env.PHONEPE_REFUND_CALLBACK,
  };
  const b64 = Buffer.from(JSON.stringify(payload)).toString('base64');
  const preformatter = `${b64}/pg/v1/refund${process.env.PHONEPE_KEY}`;
  let sha256Data = sha256(preformatter);
  sha256Data = `${sha256Data}###1`;

  return {
    x_verify: sha256Data,
    body: b64,
    transactionId,
  };
};

module.exports = refundPayload;
