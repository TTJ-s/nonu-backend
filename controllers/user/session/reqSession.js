/* eslint-disable no-param-reassign */
const Razorpay = require('razorpay');
const responseMaker = require('../../../helpers/responseMaker');
const { sessionReqSchema } = require('../../../helpers/schemaValidator');
const SessionModel = require('../../../models/sessionModel');
const PaymentModel = require('../../../models/paymentModel');
const userModel = require('../../../models/userModel');
const therapistModel = require('../../../models/therapistModel');
const generatePayload = require('../phonepay/generatePayload');
const generateLink = require('../phonepay/generateLink');

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_ID_KEY,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});
const reqSessionController = async (req, res) => {
  try {
    const mode = 'Phonepe';
    const sessionReqSchemaValidator = sessionReqSchema.validate(req.body, {
      abortEarly: true,
    });
    if (sessionReqSchemaValidator.error)
      return responseMaker(
        res,
        400,
        'Invalid Inputs',
        sessionReqSchemaValidator.error,
        false
      );
    const sessionDate = new Date(req.body.sessionDate);
    const currentDate = new Date();
    if (sessionDate < currentDate) {
      return responseMaker(
        res,
        400,
        'Selected date is out of range',
        null,
        false
      );
    }
    const userId = res.locals.userkey;
    const checkVerified = await userModel.findOne({
      _id: userId,
      status: 'accepted',
    });
    if (!checkVerified)
      return responseMaker(
        res,
        400,
        'User id card is not verified...!',
        null,
        false
      );
    const checkSession = await SessionModel.findOne({
      userId,
      status: 'progress',
      paymentCompleted: true,
    });
    if (checkSession)
      return responseMaker(
        res,
        400,
        'You alredy request a session',
        null,
        false
      );
    req.body.userId = userId;
    const checkIntake = await SessionModel.find({
      userId,
      paymentCompleted: true,
      status: ['accepted', 'completed'],
    });
    // ? check is it intake or not and checking the lowest count of session holding therapist and assign the intake to that therapist
    if (checkIntake.length <= 0) {
      req.body.isInTake = true;
      const findTherapist = await therapistModel.find({
        isIntake: true,
        status: 'accepted',
      });
      const therapistIdArray = [];
      findTherapist.forEach((therapist) => {
        // eslint-disable-next-line no-underscore-dangle
        therapistIdArray.push(therapist._id);
      });
      let minSessions = 20;
      let therapistWithMinSessions;
      for (let i = 0; i < therapistIdArray.length; i++) {
        // eslint-disable-next-line no-await-in-loop
        const checkSessions = await SessionModel.find({
          status: 'progress',
          therapistId: therapistIdArray[i],
          paymentCompleted: true,
        });
        const sessionCount = checkSessions.length;
        if (sessionCount < minSessions) {
          minSessions = sessionCount;
          therapistWithMinSessions = therapistIdArray[i];
        }
      }
      req.body.therapistId = therapistWithMinSessions;
    }
    const dateRandom = new Date().getTime();
    const { amount } = req.body;
    if (mode === 'Razorpay') {
      const options = {
        amount: amount * 100,
        currency: 'INR',
        receipt: `order_id${dateRandom}`,
      };
      instance.orders.create(options, async (error, order) => {
        // eslint-disable-next-line no-console
        if (order) {
          const dataMaker = await new SessionModel(req.body);
          const saveData = await dataMaker.save();
          const paymentData = {
            razorpayId: order.id,
            userId,
            // eslint-disable-next-line no-underscore-dangle
            sessionId: saveData._id,
            entity: order.entity,
            amount: order.amount / 100,
            amountDue: order.amount_due / 100,
            amountPaid: order.amount_paid,
            currency: order.currency,
            status: order.status,
            receipt: order.receipt,
            attempts: order.attempts,
          };
          const paymentMaker = await new PaymentModel(paymentData);
          const savePayment = await paymentMaker.save();
          if (saveData)
            return responseMaker(
              res,
              200,
              'Your session request send successfully',
              { saveData, savePayment },
              false
            );
        }
        if (error) {
          return responseMaker(
            res,
            400,
            `Something went wrong ${error}`,
            null,
            false
          );
        }
      });
    } else if (mode === 'Screenshot') {
      const dataMaker = await new SessionModel(req.body);
      const saveData = await dataMaker.save();
      const paymentData = {
        razorpayId: `screenshot-${dateRandom}`,
        userId,
        // eslint-disable-next-line no-underscore-dangle
        sessionId: saveData._id,
        entity: 'screenshot',
        amount: req.body.amount,
        amountDue: 0,
        amountPaid: req.body.amount,
        currency: 'INR',
        status: 'pending',
        receipt: `order_id${dateRandom}`,
        attempts: 1,
        screenShot: req.body.screenShot,
        utr: req.body.utr,
      };
      const paymentMaker = await new PaymentModel(paymentData);
      const savePayment = await paymentMaker.save();
      if (saveData)
        return responseMaker(
          res,
          200,
          'Your session request send successfully and your payment data is in review...!',
          { saveData, savePayment },
          false
        );
    } else {
      const phonepayPayload = await generatePayload(
        req.body.amount,
        9876543210
      );
      const paymentLinkGenerate = await generateLink(
        phonepayPayload.x_verify,
        phonepayPayload.body
      );
      if (paymentLinkGenerate.success) {
        const dataMaker = await new SessionModel(req.body);
        const saveData = await dataMaker.save();
        const paymentData = {
          razorpayId: phonepayPayload.TransactionId,
          userId,
          // eslint-disable-next-line no-underscore-dangle
          sessionId: saveData._id,
          entity: 'phonepe',
          amount: req.body.amount,
          amountDue: 0,
          amountPaid: req.body.amount,
          currency: 'INR',
          status: 'created',
          receipt: `order_id${dateRandom}`,
          attempts: 1,
        };
        const paymentMaker = await new PaymentModel(paymentData);
        const savePayment = await paymentMaker.save();
        const updateSession = await SessionModel.findOneAndUpdate(
          // eslint-disable-next-line no-underscore-dangle
          { _id: saveData._id },
          // eslint-disable-next-line no-underscore-dangle
          { paymentId: savePayment._id }
        );
        return responseMaker(
          res,
          200,
          'Payment created successfully',
          paymentLinkGenerate,
          false
        );
      }
    }
  } catch (error) {
    return responseMaker(res, 500, 'Internal Server Error...!', null, error);
  }
};

module.exports = reqSessionController;
