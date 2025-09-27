const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const responseMaker = require('../../../helpers/responseMaker');
const { therapistLoginSchema } = require('../../../helpers/schemaValidator');
const therapistModel = require('../../../models/therapistModel');

const counsellorLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const therapistLoginValidator = therapistLoginSchema.validate(req.body, {
      abortEarly: true,
    });
    if (therapistLoginValidator.error)
      return responseMaker(
        res,
        400,
        'Invalid Input',
        therapistLoginValidator.error,
        false
      );
    const fetchTherapist = await therapistModel.findOne({ email });
    if (!fetchTherapist)
      return responseMaker(res, 403, 'No Account found..!', null, false);
    if (fetchTherapist.status !== 'accepted')
      return responseMaker(
        res,
        403,
        `Therapist status is currently ${fetchTherapist.status}`,
        null,
        false
      );
    const validateTherapist = await bcrypt.compare(
      password,
      fetchTherapist.password
    );
    if (validateTherapist) {
      const payload = {
        // eslint-disable-next-line no-underscore-dangle
        id: fetchTherapist._id,
      };
      jwt.sign(payload, process.env.JWT_SECRET, async (error, token) => {
        if (error)
          return responseMaker(res, 500, 'Internal Server Error', null, error);
        if (token) {
          await therapistModel.findOneAndUpdate(
            {
              email,
            },
            { lastLogin: new Date() },
            { new: true }
          );

          return responseMaker(
            res,
            200,
            'Logged in successfully',
            token,
            false
          );
        }
      });
    } else {
      return responseMaker(res, 400, 'Invalid credentials', null, false);
    }
  } catch (error) {
    return responseMaker(res, 500, 'Internal Server Error', null, error);
  }
};

module.exports = counsellorLoginController;
