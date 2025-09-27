const mongoose = require('mongoose');

const formSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      ref: 'user',
    },
    therapistId: {
      type: String,
      ref: 'therapist',
    },
    sessionId: {
      type: String,
      ref: 'session',
    },
    userName: {
      type: String,
    },
    relationship: {
      type: String,
    },
    phone: {
      type: String,
    },
    primaryLanguage: {
      type: String,
    },
    preferredLanguage: {
      type: String,
    },
    profession: {
      type: String,
    },
    student: {
      type: String,
      enum: ['yes', 'no'],
    },
    institutionName: {
      type: String,
    },
    healthInsurance: {
      type: String,
      enum: ['yes', 'no'],
    },
    subsidizedSessions: {
      type: String,
      enum: ['yes', 'no'],
    },
    incomeLevel: {
      type: String,
    },
    familyAnnualIncome: {
      type: String,
    },
    reliableSupport: {
      type: String,
    },
    selfHarm: {
      type: String,
    },
    historySymptoms: {
      type: String,
    },
    previouslyDiagnosed: {
      type: String,
      enum: ['yes', 'no'],
    },
    diagnosedDescription: {
      type: String,
    },
    hospitalized: {
      type: String,
      enum: ['yes', 'no'],
    },
    hospitalizedDescription: {
      type: String,
    },
    medication: {
      type: String,
      enum: ['yes', 'no'],
    },
    medicationDescription: {
      type: String,
    },
    familyHistory: {
      type: String,
    },
    mensturalHistory: {
      type: String,
    },
    substanceUse: {
      type: String,
    },
    bodyWeight: {
      type: String,
    },
    provisionalDiagonsis: {
      type: String,
    },
    remarks: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const formModel = mongoose.model('form', formSchema);
module.exports = formModel;
