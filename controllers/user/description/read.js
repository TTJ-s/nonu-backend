const responseMaker = require('../../../helpers/responseMaker');
const textModel = require('../../../models/textModel');

const readDescriptionController = async (req, res) => {
  try {
    const fetchData = await textModel.findOne({}).sort({ _id: -1 });
    if (fetchData)
      return responseMaker(
        res,
        200,
        'Description fetched successfully..!',
        fetchData,
        false
      );
  } catch (error) {
    return responseMaker(res, 500, 'Internal Server Error', null, error);
  }
};

module.exports = readDescriptionController;
