const responseMaker = require('../../../helpers/responseMaker');
const { createUniversitySchema } = require('../../../helpers/schemaValidator');
const UniversityModel = require('../../../models/universityModel');

const createUniversityController = async (req, res) => {
  try {
    const createUniversityValidator = createUniversitySchema.validate(
      req.body,
      {
        abortEarly: true,
      }
    );
    if (createUniversityValidator.error)
      return responseMaker(
        res,
        400,
        'Invalid Input',
        createUniversityValidator.error,
        false
      );
    const checkUniversity = await UniversityModel.findOne(req.body);
    if (checkUniversity)
      return responseMaker(res, 400, 'University already exists', null, false);
    const { universityName, universitySynonyms } = req.body;
    const fetchUniversity = await UniversityModel.findOne({ universityName });
    if (fetchUniversity) {
      const updateUniversity = await UniversityModel.findOneAndUpdate(
        // eslint-disable-next-line no-underscore-dangle
        { _id: fetchUniversity._id },
        {
          $addToSet: {
            universitySynonyms: { $each: universitySynonyms },
          },
        },
        { new: true }
      );
      if (updateUniversity)
        return responseMaker(
          res,
          200,
          'University Synonyms Updated',
          updateUniversity,
          false
        );
    } else {
      const dataMaker = await new UniversityModel(req.body);
      const saveData = await dataMaker.save();
      if (saveData)
        return responseMaker(
          res,
          200,
          'University Data Added',
          saveData,
          false
        );
    }
  } catch (error) {
    return responseMaker(res, 500, 'Internal Server Error', null, error);
  }
};

module.exports = createUniversityController;
