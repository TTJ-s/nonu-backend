const responseMaker = require('../../../helpers/responseMaker');
const universityModel = require('../../../models/universityModel');

const fetchUniversityController = async (req, res) => {
  try {
    const fetchUniversity = await universityModel
      .find({})
      .sort({ universityName: 1 });
    if (fetchUniversity) {
      return responseMaker(
        res,
        200,
        'University List...!',
        fetchUniversity,
        false
      );
    } else {
      return responseMaker(res, 200, 'Data not found...!', false);
    }
  } catch (error) {
    return responseMaker(res, 500, 'Internal Server Error...!', null, error);
  }
};

module.exports = fetchUniversityController;
