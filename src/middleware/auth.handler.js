const jwt = require('jsonwebtoken');
const User = require('../resources/users/user.model');
const { JWT_SECRET_KEY } = require('../common/config');

const auth = async (req, res, next) => {
  try {
    const header = req.header('Authorization');
    if (!header) {
      throw new Error();
    }

    const token = header.replace('Bearer ', '');

    const decoded = jwt.verify(token, JWT_SECRET_KEY);

    const user = await User.findOne({ _id: decoded.userId });

    if (user === null) {
      throw new Error();
    }

    // eslint-disable-next-line require-atomic-updates
    req.user = user;
    next();
    return;
  } catch (e) {
    res.status(401).send({ error: 'Please autentificate' });
  }
};

module.exports = auth;
