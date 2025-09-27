const responseMaker = require('../../../helpers/responseMaker');
const refundModel = require('../../../models/refundModel');

const rejectController = async (req, res) => {
  try {
    const { userId } = req.params;
    const { amount, sessionId } = req.body;
    const rejectData = {
      amount,
      status: 'rejected',
    };
    const rejectPayment = await refundModel.findOneAndUpdate(
      { userId, sessionId, amount },
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
  } catch (error) {
    responseMaker(res, 500, 'Internal Server Error...!', null, error);
  }
};

module.exports = rejectController;
