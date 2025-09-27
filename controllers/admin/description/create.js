const responseMaker = require('../../../helpers/responseMaker');
const { createDescriptionSchema } = require('../../../helpers/schemaValidator');
const TextModel = require('../../../models/textModel');

const createDescriptionController = async (req, res) => {
  try {
    const createDescriptionValidator = createDescriptionSchema.validate(
      req.body,
      {
        abortEarly: true,
      }
    );
    if (createDescriptionValidator.error)
      return responseMaker(
        res,
        400,
        'Invalid Input',
        createDescriptionValidator.error,
        false
      );
    const dataMaker = await new TextModel(req.body);
    const saveData = await dataMaker.save();
    if (saveData)
      return responseMaker(res, 200, 'Description Data Added', saveData, false);
  } catch (error) {
    return responseMaker(res, 500, 'Internal Server Error', null, error);
  }
};

module.exports = createDescriptionController;
