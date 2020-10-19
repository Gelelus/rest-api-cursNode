module.exports = () => {
  process.on('unhandledRejection', (err, promise) => {
    console.error(
      'Unhandled rejection (promise: ',
      promise,
      ', reason: ',
      err,
      ').'
    );
  });

  process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION ');
    console.log(
      `[Inside 'uncaughtException' event] ${err.stack}` || err.message
    );
  });
};
