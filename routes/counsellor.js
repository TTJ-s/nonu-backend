// Import required modules and libraries
const express = require('express');
const multer = require('multer');

const {
  counsellorSignupController,
  counsellorLoginController,
  updateReqSessionController,
  counsellorPaginationController,
  counsellorSearchController,
  readUserSessionController,
  userSessionsController,
  timesController,
  sessionFormController,
  readTimeController,
  deleteTimeController,
  fetchProfileController,
  updateProfileController,
  counsellorUploadController,
  getSessionController,
  getSessionFormController,
  deleteCounsellorProfileController,
  rescheduleSessionController,
  changeTherapistPasswordController,
  forgotPasswordController,
  verifiedController,
} = require('../controllers');
const counsellorValidator = require('../middlewares/auth/counsellorValidator');

const counsellorRoute = express.Router();
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
counsellorRoute.post('/signup', counsellorSignupController); // ? counsellorSignupController
counsellorRoute.post('/login', counsellorLoginController); // ? counsellorLoginController
counsellorRoute.post(
  '/upload',
  upload.single('document'),
  counsellorUploadController
); // ? UserDocumentUploadController
counsellorRoute.patch(
  '/session/:sessionId',
  counsellorValidator,
  updateReqSessionController
); // ? updateReqSessionController
counsellorRoute.get(
  '/list',
  counsellorValidator,
  counsellorPaginationController
); // ? listController
counsellorRoute.get('/search', counsellorValidator, counsellorSearchController); // ? searchController
counsellorRoute.get('/session', counsellorValidator, readUserSessionController); // ? readUserSessionController
counsellorRoute.get(
  '/session/:userId',
  counsellorValidator,
  userSessionsController
); // ? readUserSessionController
counsellorRoute.patch('/times', counsellorValidator, timesController); // ? timesController
counsellorRoute.post(
  '/session/form',
  counsellorValidator,
  sessionFormController
); // ? sessionFormController
counsellorRoute.get('/times', counsellorValidator, readTimeController); // ? readTimeController
counsellorRoute.patch(
  '/times/:timeId',
  counsellorValidator,
  deleteTimeController
); // ? deleteTimeController
counsellorRoute.get('/profile', counsellorValidator, fetchProfileController); // ? counsellorProfileController
counsellorRoute.patch('/profile', counsellorValidator, updateProfileController); // ? counsellorProfileController
counsellorRoute.get(
  '/single/session/:sessionId',
  counsellorValidator,
  getSessionController
); // ? getSessionController
counsellorRoute.get('/form', counsellorValidator, getSessionFormController); // ? getSessionFormController
counsellorRoute.patch(
  '/delete',
  counsellorValidator,
  deleteCounsellorProfileController
); // ? deleteCounsellorProfileController
counsellorRoute.patch(
  '/reschedule/:sessionId',
  counsellorValidator,
  rescheduleSessionController
); // ? rescheduleSessionController
counsellorRoute.patch(
  '/changepassword',
  counsellorValidator,
  changeTherapistPasswordController
); // ? changeTherapistPasswordController
counsellorRoute.patch('/forgotpassword', forgotPasswordController); // ? forgotPasswordController
counsellorRoute.patch('/verification', counsellorValidator, verifiedController); // ? verifyCounsellorController

module.exports = counsellorRoute;
