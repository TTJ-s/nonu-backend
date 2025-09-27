const responseMaker = require('../../../helpers/responseMaker');
const therapistModel = require('../../../models/therapistModel');

const verifiedController = async (req, res) => {
  try {
    const { therapistId } = res.locals;
    if (Object.keys(req.body).length > 0) {
      const { uid, phone } = req.body;
      const checkPhone = await therapistModel.findOne({
        _id: therapistId,
        phone,
      });
      if (!checkPhone)
        return responseMaker(
          res,
          400,
          'No user found with this phone...!',
          null,
          false
        );
      const updateTherapist = await therapistModel.findOneAndUpdate(
        { _id: therapistId, phone },
        { uid },
        { new: true }
      );
      if (updateTherapist)
        return responseMaker(
          res,
          200,
          'Therapist verified successfully..!',
          null,
          false
        );
    }
    const fetchTherapist = await therapistModel
      .findOne({ _id: therapistId })
      .select('uid');
    if (fetchTherapist.uid) {
      return responseMaker(res, 200, 'Therapist is verified..!', null, false);
    } else {
      return responseMaker(
        res,
        400,
        'Therapist is not verified..!',
        null,
        false
      );
    }
  } catch (error) {
    return responseMaker(res, 500, 'Internal Server Error', null, error);
  }
};

module.exports = verifiedController;
