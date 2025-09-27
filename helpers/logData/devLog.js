const { createLogger, format, transports } = require('winston');

const { combine, timestamp, errors } = format;

const devLog = () =>
  createLogger({
    format: combine(
      timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      errors({ stack: true }),
      format.json()
    ),
    transports: [
      new transports.File({ filename: './logs/error.log', level: 'error' }),
      new transports.File({ filename: './logs/warning.log', level: 'warn' }),
      new transports.File({ filename: './logs/combined.log', level: 'info' }),
    ],
  });

module.exports = devLog;
