const {
  unhandledRejectionLogger,
  uncaughtExceptionLogger
} = require('./logger');

module.exports = () => {
  process.on('unhandledRejection', unhandledRejectionLogger);
  process.on('uncaughtException', uncaughtExceptionLogger);
};
