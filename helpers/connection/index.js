const mongoose = require('mongoose');

const { MONGO_URL } = process.env;

mongoose
  .connect(MONGO_URL)
  .then(() => {
    /* eslint-disable */
    console.log('Mongoose connection established..!');
  })
  .catch((error) => {
    /* eslint-disable */
    console.log(error);
  });
