module.exports = (req, res, next) => {
  console.log(`request url: ${req.method} ${req.url} 
request body: ${JSON.stringify(req.body)}
request query: ${JSON.stringify(req.query)}
----------------------------------------------------------------------------------------------------------------`);
  next();
};
