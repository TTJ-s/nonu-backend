const userModel = require('../../../models/userModel');
const responseMaker = require('../../../helpers/responseMaker');
const { subscribeFirebase } = require('../../../helpers/firebase');

const userTokenController = async (req, res) => {
  try {
    const { deviceToken } = req.body;

    const fetchOldToken = await userModel.findOne(
      { _id: res.locals.userkey },
      { userDeviceToken: 1 }
    );

    if (fetchOldToken && fetchOldToken.userDeviceToken) {
      const oldToken = fetchOldToken.userDeviceToken;
      if (oldToken === deviceToken) {
        return responseMaker(
          res,
          200,
          'Old token needs no update ! Thanks',
          null,
          false
        );
      }
    }

    const updateRegToken = await userModel.findOneAndUpdate(
      { _id: res.locals.userkey },
      { userDeviceToken: deviceToken },
      { new: true }
    );

    if (updateRegToken) {
      subscribeFirebase(res.locals.userkey, 'all_users');
      return responseMaker(res, 200, 'User token updated', null, false);
    } else {
      return responseMaker(res, 400, 'Unable to update token', null, false);
    }
  } catch (error) {
    return responseMaker(
      res,
      500,
      'Internal Server Error !logged',
      null,
      error
    );
  }
};

module.exports = userTokenController;
