function requestLogger(req, res, next) {
  console.log(`----------------------------------------------------------------------------------------------------------------
request url: ${req.method} ${req.url} 
request body: ${JSON.stringify(req.body)}
request query: ${JSON.stringify(req.query)}`);
  next();
}

function errorLogger(err) {
  console.error('error: ', err.message);
}

function unhandledRejectionLogger(err, promise) {
  console.error(
    'Unhandled rejection (promise: ',
    promise,
    ', reason: ',
    err,
    ').'
  );
}

function uncaughtExceptionLogger(err) {
  console.error('UNCAUGHT EXCEPTION ');
  console.error(
    `[Inside 'uncaughtException' event] ${err.stack}` || err.message
  );
}

module.exports = {
  requestLogger,
  errorLogger,
  unhandledRejectionLogger,
  uncaughtExceptionLogger
};
