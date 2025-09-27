const responseMaker = require('../../../helpers/responseMaker');
const collegeModel = require('../../../models/collegeModel');

const getCollegeController = async (req, res) => {
  try {
    const fetchCollege = await collegeModel.find({}).sort({ collegeName: 1 });
    if (fetchCollege) {
      return responseMaker(res, 200, 'College List...!', fetchCollege, false);
    } else {
      return responseMaker(res, 200, 'Data not found...!', false);
    }
  } catch (error) {
    return responseMaker(res, 500, 'Internal Server Error...!', null, error);
  }
};

module.exports = getCollegeController;
