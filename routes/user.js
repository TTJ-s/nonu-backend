// Import required modules and libraries
const express = require('express');
const multer = require('multer');
const userValidator = require('../middlewares/auth/userValidator');
const {
  profileRegController,
  editProfileController,
  userTestController,
  uploadController,
  reqSessionController,
  editReqSessionController,
  getProfileController,
  razorpayCallbackController,
  displaySessionController,
  listSessionController,
  cancelSessionController,
  userPaginationController,
  createRatingController,
  getRatingController,
  userTokenController,
  eventAttendingController,
  getEventAttendingController,
  sessionTimesController,
  getUserSessionController,
  readTherapistController,
  getIntakeController,
  deleteProfileController,
  phonepeCallback,
  readDescriptionController,
  getSessionRatingController,
  createUserCollegeController,
  fetchUniversityController,
  getCollegeController,
} = require('../controllers/index');
const { loginController } = require('../controllers/user/login');

const userRoute = express.Router();
// Define a filter function for multer file uploads
const filter = (req, file, cb) => {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'application/pdf'
  ) {
    cb(null, true);
  } else {
    cb(
      new Error('Invalid file type, only JPEG, PNG and PDF is allowed!'),
      false
    );
  }
};
// Create a multer instance with the defined filter
const upload = multer({ fileFilter: filter });
// Define the routes and associate them with their respective controllers
userRoute.post('/login', loginController);
userRoute.get('/test', userValidator, userTestController); // ? UserValidator testController
userRoute.get('/profile', userValidator, getProfileController); // ? GetUserProfileController
userRoute.post('/profile', userValidator, profileRegController); // ? UserRegisterController
userRoute.patch('/profile', userValidator, editProfileController); // ? UserProfileEditController
userRoute.post(
  '/upload',
  upload.single('document'),
  userValidator,
  uploadController
); // ? UserDocumentUploadController
userRoute.post('/session', userValidator, reqSessionController); // ? UserSessionRequestController
userRoute.get('/session', userValidator, displaySessionController); // ? UserSessionDisplayController
userRoute.patch('/session/:sessionId', userValidator, editReqSessionController); // ? UserSessionEditController
userRoute.get('/session/:sessionId', userValidator, getUserSessionController); // ? getUserSessionController
userRoute.post('/callback', razorpayCallbackController); // ? UserRazorpayCallbackController
userRoute.get('/list/session', userValidator, listSessionController); // ? UserSessionListController
userRoute.post('/cancel', userValidator, cancelSessionController); // ? UserSessionCancelController
userRoute.get('/list', userValidator, userPaginationController); // ? UserPaginationController
userRoute.post('/rating', userValidator, createRatingController); // ? UserRatingController
userRoute.get('/rating/:therapistId', userValidator, getRatingController); // ? UserRatingController
userRoute.post('/device', userValidator, userTokenController); // ? UserDeviceTokenController
userRoute.post('/event/attend', userValidator, eventAttendingController); // ? EventAttendingController
userRoute.get(
  '/event/attend/:eventId',
  userValidator,
  getEventAttendingController
); // ? EventAttendingController
userRoute.get('/session/times', userValidator, sessionTimesController); // ? SessionTimesController
// userRoute.get(
//   '/therapist/:therapistId',
//   userValidator,
//   readTherapistController
// ); // ? UsertherapistIdController
userRoute.get('/intake', userValidator, getIntakeController); // ? userIntakeController
userRoute.patch('/delete', userValidator, deleteProfileController); // ? deleteProfileController
userRoute.post('/phonepe/callback', phonepeCallback); // ? phonepeCallback
userRoute.get('/description', userValidator, readDescriptionController); // ? getDescriptionController
userRoute.get(
  '/session/rating/:sessionId',
  userValidator,
  getSessionRatingController
); // ? getSessionRatingController
userRoute.post('/college', userValidator, createUserCollegeController); // ? CreateCollegeController
userRoute.get('/university', userValidator, fetchUniversityController); // ? fetchUniversityController
userRoute.get('/college', userValidator, getCollegeController); // ? getCollegeController

module.exports = userRoute;
