const responseMaker = require('../../../helpers/responseMaker');
const { createCollegeSchema } = require('../../../helpers/schemaValidator');
const CollegeModel = require('../../../models/collegeModel');

const createUserCollegeController = async (req, res) => {
  try {
    const createCollegeValidator = createCollegeSchema.validate(req.body, {
      abortEarly: true,
    });
    if (createCollegeValidator.error)
      return responseMaker(
        res,
        400,
        'Invalid Input',
        createCollegeValidator.error,
        false
      );
    const checkCollege = await CollegeModel.findOne({
      collegeName: req.body.collegeName,
    });
    if (checkCollege)
      return responseMaker(res, 400, 'College already exists', null, false);
    const dataMaker = await new CollegeModel(req.body);
    const saveData = await dataMaker.save();
    if (saveData)
      return responseMaker(res, 200, 'College Data Added', saveData, false);
  } catch (error) {
    return responseMaker(res, 500, 'Internal Server Error', null, error);
  }
};

module.exports = createUserCollegeController;
