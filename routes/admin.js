// Import required modules and libraries
const express = require('express');
const multer = require('multer');
const adminValidator = require('../middlewares/auth/adminValidator');
const {
  adminLoginController,
  adminSignupController,
  createCollegeController,
  createTherapistController,
  createEventController,
  adminUploadController,
  createUniversityController,
  getUserController,
  updateUserController,
  updateTherapistController,
  updateSessionController,
  refundController,
  paginationController,
  searchController,
  analyticsController,
  getUniversityController,
  eventNotifyController,
  changeAdminPasswordController,
  paymentAcceptController,
  refundCallback,
  createDescriptionController,
  getDescriptionController,
  deleteEventController,
} = require('../controllers');

const adminRoute = express.Router();
// Define a filter function for multer file uploads
const filter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
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
adminRoute.post(
  '/upload',
  upload.single('document'),
  adminValidator,
  adminUploadController
); // ? AdminUploadController
adminRoute.post('/login', adminLoginController); // ? AdminLoginController
adminRoute.post('/signup', adminSignupController); // ? AdminSignupController
adminRoute.post('/college', adminValidator, createCollegeController); // ? CreateCollegeController
adminRoute.post('/university', adminValidator, createUniversityController); // ? CreateUniversityController
adminRoute.get('/university', adminValidator, getUniversityController); // ? getUniversityController
adminRoute.get('/list', adminValidator, paginationController); // ? PaginationController
adminRoute.post('/therapist', adminValidator, createTherapistController); // ? PaginationController
adminRoute.post('/event', adminValidator, createEventController); // ? EventController
adminRoute.get('/user/:userId', adminValidator, getUserController); // ? getUserController
adminRoute.patch('/user/:userId', adminValidator, updateUserController); // ? updateUserController
adminRoute.patch(
  '/therapist/:therapistId',
  adminValidator,
  updateTherapistController
); // ? updateTherapistController
adminRoute.patch(
  '/session/:sessionId',
  adminValidator,
  updateSessionController
); // ? updateSessionController
adminRoute.post('/refund/:userId', adminValidator, refundController); // ? paymentRefundController
adminRoute.get('/search', adminValidator, searchController); // ? searchController
adminRoute.get('/analytics', adminValidator, analyticsController); // ? analyticsController
adminRoute.post('/event/notify', adminValidator, eventNotifyController); // ? eventnotifyController
adminRoute.patch(
  '/changepassword',
  adminValidator,
  changeAdminPasswordController
); // ? changeAdminPasswordController
adminRoute.post('/accept/:userId', adminValidator, paymentAcceptController); // ? paymentAcceptController
adminRoute.post('/callback', refundCallback); // ? phonepeRefundCallback
adminRoute.post('/description', adminValidator, createDescriptionController); // ? descriptionController
adminRoute.get('/description', adminValidator, getDescriptionController); // ? getDescriptionController
adminRoute.patch('/event/:eventId', adminValidator, deleteEventController); // ? deleteEventController

module.exports = adminRoute;
