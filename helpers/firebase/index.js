/* eslint-disable no-console */
const admin = require('firebase-admin');
const userModel = require('../../models/userModel');
const responseMaker = require('../responseMaker');

const getUserToken = async (userId) => {
  let userToken;
  const userDeviceInfo = await userModel.findOne(
    { _id: userId },
    { userDeviceToken: 1 }
  );
  if (userDeviceInfo && userDeviceInfo.userDeviceToken) {
    userToken = userDeviceInfo.userDeviceToken;
  } else {
    return false;
  }
  if (userToken) {
    return userToken;
  }
  return false;
};
// Subscribe
// all_user,contest_id,
const subscribeFirebase = async (userId, topic) => {
  const userToken = await getUserToken(userId);
  if (userToken) {
    admin
      .messaging()
      .subscribeToTopic(userToken, `/topics/${topic}`)
      .then((response) => {
        // eslint-disable-next-line no-console
        console.log(response);
        responseMaker(
          null,
          null,
          null,
          null,
          `${userId} Subscribed to topic ${topic}`
        );
      })
      .catch((error) => {
        console.log('error', error);
        responseMaker(
          null,
          null,
          null,
          null,
          `${userId} Subscribed to topic failed at ${topic} due to  ${error}`
        );
      });
  } else {
    return responseMaker(
      null,
      null,
      null,
      null,
      `${userId} Subscribed to topic failed at ${topic} due to Missing Token`
    );
  }
};
// Unsubscribe

const unsubscribeFirebase = async (userId, topic) => {
  const userToken = await getUserToken(userId);
  if (userToken) {
    admin
      .messaging()
      .unsubscribeFromTopic(userToken, `/topics/${topic}`)
      .then((response) => {
        responseMaker(
          null,
          null,
          null,
          null,
          `${userToken} UnSubscribed from topic ${topic}`
        );
        console.log('Successfully Unsubscribed from topic:', response);
        console.log(`${userToken} UnSubscribed from topic ${topic}`);
      })
      .catch((error) => {
        responseMaker(
          null,
          null,
          null,
          null,
          `${userToken} UnSubscribed from topic failed at ${topic} due to  ${error}`
        );
      });
  } else {
    return responseMaker(
      null,
      null,
      null,
      null,
      `${userToken} UnSubscribed from topic failed at ${topic} due to Missing Token`
    );
  }
};

// SendMessage
const sendNotificationTopic = async (topic, message) => {
  const notificationMessage = {
    notification: {
      title: message.title,
      body: message.body,
    },
    data: {
      type: message.type,
      id: message.id,
    },
  };
  admin
    .messaging()
    .sendToTopic(topic, notificationMessage)
    .then((response) => {
      console.log('Notiication to topic send', response);
    })
    .catch((error) => {
      console.log('Notiication to topic send failed', error);
    });
};
const sendNotificationFromPanel = async (topic, message) =>
  new Promise((resolve, reject) => {
    const notificationMessage = {
      notification: {
        title: message.title,
        body: message.message,
      },
      data: {
        type: message.type,
      },
    };
    admin
      .messaging()
      .sendToTopic(topic, notificationMessage)
      .then((response) => {
        resolve({
          success: 'Send Successfully',
        });
      })
      .catch((error) => {
        responseMaker(
          null,
          null,
          null,
          null,
          ` Notification from admin panel failed due to ${error} `
        );
        console.log(error);
        // eslint-disable-next-line prefer-promise-reject-errors
        reject({
          error: `Unable to Send Notification, Check Logs,${error}`,
        });
      });
  });

module.exports = {
  subscribeFirebase,
  sendNotificationTopic,
  unsubscribeFirebase,
  sendNotificationFromPanel,
};
