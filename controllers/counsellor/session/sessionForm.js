const responseMaker = require('../../../helpers/responseMaker');
const FormModel = require('../../../models/formModel');

const sessionFormController = async (req, res) => {
  try {
    const { therapistId } = res.locals;
    req.body.therapistId = therapistId;
    const { formId } = req.body;
    if (formId) {
      const updateForm = await FormModel.findOneAndUpdate(
        { _id: formId },
        req.body,
        { new: true }
      );
      if (updateForm)
        return responseMaker(
          res,
          200,
          'Session Form Data Updated',
          updateForm,
          false
        );
    } else {
      const dataMaker = await new FormModel(req.body);
      const saveData = await dataMaker.save();
      if (saveData)
        return responseMaker(
          res,
          200,
          'Session Form Data Added',
          saveData,
          false
        );
    }
  } catch (error) {
    return responseMaker(res, 500, 'Internal Server Error...!', null, error);
  }
};

module.exports = sessionFormController;
