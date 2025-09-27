const responseMaker = require('../../../helpers/responseMaker');
const { profileRegSchema } = require('../../../helpers/schemaValidator');
const UserModel = require('../../../models/userModel');

const profileRegController = async (req, res) => {
  try {
    const userKey = res.locals.userkey;
    req.body.uuid = userKey;
    const { phone } = req.body;
    const profileRegSchemaValidator = profileRegSchema.validate(req.body, {
      abortEarly: true,
    });
    if (profileRegSchemaValidator.error)
      return responseMaker(
        res,
        400,
        'Invalid Inputs',
        profileRegSchemaValidator.error,
        false
      );
    if (req.body.institutionStart >= req.body.institutionEnd) {
      return responseMaker(
        res,
        400,
        'Institution start is greater than end year..!',
        null,
        false
      );
    }
    const findUser = await UserModel.findOne({
      uuid: userKey,
      phone,
      status: { $ne: 'deleted' },
    });

    if (findUser)
      return responseMaker(
        res,
        400,
        'User already added with this id',
        null,
        false
      );
    const dataMaker = await new UserModel(req.body);
    const saveData = await dataMaker.save();
    if (saveData)
      return responseMaker(res, 200, 'User Data Added', saveData, false);
  } catch (error) {
    return responseMaker(res, 500, 'Internal Server Error...!', null, error);
  }
};

module.exports = profileRegController;
