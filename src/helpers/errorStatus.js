module.exports = function status(e) {
  return e.message.includes("doesn't exist") ? 404 : 400;
};
