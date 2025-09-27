/* eslint-disable object-shorthand */
const logger = require('../logData');

const responseMaker = (res, status, message, data, logdata) => {
  if (logdata && res === null) {
    logger.info({ info: message, data, details: logdata });
    return;
  }
  if (status === 200) {
    // Inside responseMaker function
    const structure = {
      status,
      message,
      data,
    };
    logger.info({ info: message, data, details: logdata });
    return res.status(200).json(structure);
  }
  if (status !== 500) {
    const structure = {
      status,
      error: message,
      data,
    };
    if (logdata) {
      logger.warn({ warn: message, data, details: logdata });
    }
    return res.status(status).json(structure);
  } else {
    logger.error(logdata);
    const structure = {
      status,
      error: message,
      data,
    };
    return res.status(500).json(structure);
  }
};

module.exports = responseMaker;
