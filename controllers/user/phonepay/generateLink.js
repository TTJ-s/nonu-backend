const axios = require('axios');

const generateLink = async (X_VERIFY, BODY) => {
  const options = {
    method: 'POST',
    url: process.env.PHONEPE_URL,
    headers: {
      'Content-Type': 'application/json',
      'X-VERIFY': X_VERIFY,
    },
    data: {
      request: BODY,
    },
  };
  try {
    const { data } = await axios.request(options, {
      data: {
        request: BODY,
      },
    });
    return data;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};

module.exports = generateLink;
