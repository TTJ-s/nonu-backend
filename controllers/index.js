const changeAdminPasswordController = require('./admin/auth/changePassword');
const adminLoginController = require('./admin/auth/login');
const adminSignupController = require('./admin/auth/signup');
const createCollegeController = require('./admin/college/create');
const createEventController = require('./admin/event/create');
const eventNotifyController = require('./admin/event/notify');
const analyticsController = require('./admin/home');
const paginationController = require('./admin/list');
const paymentAcceptController = require('./admin/payment/accept');
const refundController = require('./admin/payment/refund');
const searchController = require('./admin/search');
const updateSessionController = require('./admin/session/update');
const createTherapistController = require('./admin/therapist/create');
const updateTherapistController = require('./admin/therapist/update');
const createUniversityController = require('./admin/university/create');
const getUniversityController = require('./admin/university/read');
const adminUploadController = require('./admin/upload/upload');
const getUserController = require('./admin/user/read');
const updateUserController = require('./admin/user/update');
const counsellorLoginController = require('./counsellor/auth/login');
const counsellorSignupController = require('./counsellor/auth/signup');
const counsellorPaginationController = require('./counsellor/list');
const changeTherapistPasswordController = require('./counsellor/profile/changePassword');
const deleteCounsellorProfileController = require('./counsellor/profile/deleteProfile');
const deleteTimeController = require('./counsellor/profile/deleteTime');
const fetchProfileController = require('./counsellor/profile/fetchProfile');
const readTimeController = require('./counsellor/profile/readTime');
const timesController = require('./counsellor/profile/times');
const updateProfileController = require('./counsellor/profile/updateProfile');
const counsellorSearchController = require('./counsellor/search');
const getSessionController = require('./counsellor/session/getSession');
const getSessionFormController = require('./counsellor/session/getSessionForm');
const readUserSessionController = require('./counsellor/session/read');
const rescheduleSessionController = require('./counsellor/session/rescheduleSession');
const sessionFormController = require('./counsellor/session/sessionForm');
const updateReqSessionController = require('./counsellor/session/update');
const userSessionsController = require('./counsellor/session/userSessions');
const counsellorUploadController = require('./counsellor/upload/upload');
const eventAttendingController = require('./user/event/attend');
const getEventAttendingController = require('./user/event/getAttending');
const userPaginationController = require('./user/list');
const phonepeCallback = require('./user/phonepay/callback');
const refundCallback = require('./admin/phonpe/refundCallback');
const deleteProfileController = require('./user/profile/deleteProfile');
const userTokenController = require('./user/profile/deviceToken');
const editProfileController = require('./user/profile/editProfile');
const getProfileController = require('./user/profile/getProfile');
const profileRegController = require('./user/profile/profileReg');
const uploadController = require('./user/profile/upload');
const createRatingController = require('./user/rating/createRating');
const getRatingController = require('./user/rating/getRating');
const razorpayCallbackController = require('./user/razorpay');
const cancelSessionController = require('./user/session/cancelSession');
const displaySessionController = require('./user/session/displaySession');
const editReqSessionController = require('./user/session/editReqSession');
const getIntakeController = require('./user/session/getIntake');
const getUserSessionController = require('./user/session/getUserSession');
const listSessionController = require('./user/session/listSession');
const reqSessionController = require('./user/session/reqSession');
const sessionTimesController = require('./user/session/sessionTimes');
const userTestController = require('./user/test/userTest');
const readTherapistController = require('./user/therapist/read');
const forgotPasswordController = require('./counsellor/profile/forgotPassword');
const verifiedController = require('./counsellor/profile/verified');
const createDescriptionController = require('./admin/description/create');
const readDescriptionController = require('./user/description/read');
const getDescriptionController = require('./admin/description/get');
const getSessionRatingController = require('./user/rating/getSessionRating');
const createUserCollegeController = require('./user/college/create');
const fetchUniversityController = require('./user/university/read');
const getCollegeController = require('./user/college/read');
const deleteEventController = require('./admin/event/delete');

module.exports = {
  getProfileController,
  editProfileController,
  profileRegController,
  userTestController,
  uploadController,
  reqSessionController,
  editReqSessionController,
  razorpayCallbackController,
  displaySessionController,
  listSessionController,
  cancelSessionController,
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
  counsellorSignupController,
  counsellorLoginController,
  updateReqSessionController,
  counsellorPaginationController,
  analyticsController,
  getUniversityController,
  counsellorSearchController,
  readUserSessionController,
  userSessionsController,
  userPaginationController,
  createRatingController,
  getRatingController,
  userTokenController,
  eventAttendingController,
  eventNotifyController,
  getEventAttendingController,
  timesController,
  sessionTimesController,
  sessionFormController,
  readTimeController,
  updateProfileController,
  deleteTimeController,
  fetchProfileController,
  counsellorUploadController,
  getSessionController,
  getSessionFormController,
  getUserSessionController,
  readTherapistController,
  getIntakeController,
  deleteProfileController,
  deleteCounsellorProfileController,
  rescheduleSessionController,
  changeTherapistPasswordController,
  changeAdminPasswordController,
  paymentAcceptController,
  phonepeCallback,
  refundCallback,
  forgotPasswordController,
  verifiedController,
  createDescriptionController,
  readDescriptionController,
  getDescriptionController,
  getSessionRatingController,
  createUserCollegeController,
  fetchUniversityController,
  getCollegeController,
  deleteEventController,
};
