class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

const handleError = (err, res) => {
  const { statusCode, message } = err;
  if (statusCode) {
    res.status(statusCode).json({
      status: 'error',
      statusCode,
      message
    });
  } else {
    res.status(500).json({
      status: 'error',
      statusCode: 500,
      message
    });
  }
};

module.exports = {
  ErrorHandler,
  handleError
};
