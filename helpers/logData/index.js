const devLog = require('./devLog');
const prodLog = require('./prodLog');

let logger = null;
if (process.env.NODE_ENV === 'development') {
  logger = devLog();
} else {
  logger = prodLog();
}
module.exports = logger;
