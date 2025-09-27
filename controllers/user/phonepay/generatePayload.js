const sha256 = require('sha256');

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

const dateRandom = new Date().getMilliseconds();

const generatePayload = async (amount, phone) => {
  const randomKey = generateRandomKey(10);
  const TransactionId = `phonpe-${randomKey}${dateRandom}`;
  const payload = {
    merchantId: process.env.PHONEPE_MERCHANT_ID,
    merchantTransactionId: TransactionId,
    merchantUserId: process.env.PHONEPE_MERCHANT_USER_ID,
    amount: amount * 100,
    redirectUrl: 'https://payment-complete-nonu.netlify.app/',
    redirectMode: 'REDIRECT',
    callbackUrl: process.env.PHONEPE_CALLBACK,
    mobileNumber: phone,
    paymentInstrument: {
      type: 'PAY_PAGE',
    },
  };

  const b64 = Buffer.from(JSON.stringify(payload)).toString('base64');
  const preformatter = `${b64}/pg/v1/pay${process.env.PHONEPE_KEY}`;
  let sha256Data = sha256(preformatter);
  sha256Data = `${sha256Data}###1`;

  return {
    x_verify: sha256Data,
    body: b64,
    TransactionId,
  };
};

module.exports = generatePayload;
