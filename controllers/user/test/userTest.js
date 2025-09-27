const responseMaker = require('../../../helpers/responseMaker');

const userTestController = async (req, res) => {
  try {
    return responseMaker(res, 200, 'Test successful', null, false);
  } catch (error) {
    return responseMaker(res, 400, 'Test fail', null, false);
  }
};

module.exports = userTestController;
