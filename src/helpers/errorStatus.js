module.exports = function status(e) {
  if (typeof e.message === 'string') {
    return e.message.includes("doesn't exist") ? 404 : 400;
  }
  return 400;
};
