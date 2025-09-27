const Joi = require('joi');

exports.profileRegSchema = Joi.object({
  uuid: Joi.string().required(),
  fullName: Joi.string().required(),
  age: Joi.number().required(),
  phone: Joi.string().required(),
});

exports.profileEditSchema = Joi.object({
  fullName: Joi.string(),
  age: Joi.number(),
  idCard: Joi.string(),
  institutionName: Joi.string(),
  institutionEmail: Joi.string(),
  institutionStart: Joi.string(),
  institutionEnd: Joi.string(),
  universityName: Joi.string(),
  department: Joi.string(),
});

exports.sessionReqSchema = Joi.object({
  sessionDate: Joi.date().required(),
  sessionTime: Joi.date().required(),
  amount: Joi.number().required(),
  remark: Joi.string(),
  status: Joi.string(),
  therapistId: Joi.string(),
  utr: Joi.string(),
  screenShot: Joi.string(),
});

exports.sessionEditSchema = Joi.object({
  sessionDate: Joi.date(),
  sessionTime: Joi.date(),
  sessionReschedule: Joi.array(),
});

exports.adminLoginSchema = Joi.object({
  adminName: Joi.string().required(),
  adminPassword: Joi.string().required(),
});

exports.adminSignupSchema = Joi.object({
  adminName: Joi.string().required(),
  adminPassword: Joi.string().required(),
  adminType: Joi.string().required(),
});

exports.createCollegeSchema = Joi.object({
  collegeName: Joi.string().required(),
  universityName: Joi.string().required(),
  district: Joi.string().required(),
  state: Joi.string().required(),
});

exports.createUniversitySchema = Joi.object({
  universityName: Joi.string().required(),
  universitySynonyms: Joi.array().required(),
});

exports.createTherapistSchema = Joi.object({
  therapistName: Joi.string().required(),
  qualification: Joi.string().required(),
  experience: Joi.number().required(),
  specialization: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  password: Joi.string(),
  img: Joi.string(),
  uid: Joi.string(),
});

exports.createEventSchema = Joi.object({
  eventName: Joi.string().required(),
  eventDate: Joi.date().required(),
  organizer: Joi.array()
    .items(Joi.object().keys({ name: Joi.string(), image: Joi.string() }))
    .required(),
  type: Joi.string().required(),
  bannerImage: Joi.string().required(),
  venue: Joi.string().required(),
  speaker: Joi.array()
    .items(Joi.object().keys({ name: Joi.string(), image: Joi.string() }))
    .required(),
  description: Joi.string().required(),
  meetLink: Joi.string().required(),
});

exports.therapistLoginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

exports.updateReqSessionSchema = Joi.object({
  status: Joi.string(),
  meetLink: Joi.string(),
  sessionDate: Joi.date(),
  sessionTime: Joi.date(),
  report: Joi.string(),
  recommendedTherapist: Joi.array(),
});

exports.ratingSchema = Joi.object({
  userId: Joi.string().required(),
  therapistId: Joi.string().required(),
  sessionId: Joi.string().required(),
  rate: Joi.number().required(),
});

exports.profileUpdateSchema = Joi.object({
  experience: Joi.number(),
  specialization: Joi.string(),
  qualification: Joi.string(),
});

exports.createDescriptionSchema = Joi.object({
  description: Joi.string().required(),
});
