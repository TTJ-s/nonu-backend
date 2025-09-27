const responseMaker = require('../../../helpers/responseMaker');
const formModel = require('../../../models/formModel');

const getSessionFormController = async (req, res) => {
  try {
    const { therapistId } = res.locals;
    const { userId, sessionId } = req.query;
    if (!userId || !sessionId)
      return responseMaker(
        res,
        400,
        'userid and sessionid is required',
        null,
        false
      );
    const fetchForm = await formModel.find({
      userId,
      sessionId,
      therapistId,
    });
    if (fetchForm)
      return responseMaker(
        res,
        200,
        'Form details fetched successfully...!',
        fetchForm,
        false
      );
  } catch (error) {
    return responseMaker(res, 500, 'Internal Server Error...!', null, error);
  }
};

module.exports = getSessionFormController;
