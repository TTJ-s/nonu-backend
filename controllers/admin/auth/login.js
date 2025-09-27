const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const responseMaker = require('../../../helpers/responseMaker');
const { adminLoginSchema } = require('../../../helpers/schemaValidator');
const adminModel = require('../../../models/adminModel');

const adminLoginController = async (req, res) => {
  try {
    const { adminName, adminPassword } = req.body;
    const adminLoginValidator = adminLoginSchema.validate(req.body, {
      abortEarly: true,
    });
    if (adminLoginValidator.error)
      return responseMaker(
        res,
        400,
        'Invalid Input',
        adminLoginValidator.error,
        false
      );
    const fetchAdmin = await adminModel.findOne({ adminName });
    if (!fetchAdmin)
      return responseMaker(
        res,
        403,
        'Incorrect adminname / password',
        null,
        false
      );
    if (fetchAdmin.adminStatus === false)
      return responseMaker(
        res,
        403,
        'Admin is currently disabled',
        null,
        false
      );
    const validateAdmin = await bcrypt.compare(
      adminPassword,
      fetchAdmin.adminPassword
    );
    if (validateAdmin) {
      const payload = {
        // eslint-disable-next-line no-underscore-dangle
        id: fetchAdmin._id,
      };
      jwt.sign(payload, process.env.JWT_SECRET, async (error, token) => {
        if (error)
          return responseMaker(res, 500, 'Internal Server Error', null, error);
        if (token) {
          await adminModel.findOneAndUpdate(
            {
              adminName,
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

module.exports = adminLoginController;
