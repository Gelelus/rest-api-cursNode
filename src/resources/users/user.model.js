const { Schema, model } = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { JWT_SECRET_KEY } = require('../../common/config');

const Task = require('../tasks/task.model.js');

const userSchema = new Schema(
  {
    name: {
      type: String,
      default: 'Nameless',
      trim: true
    },
    login: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    versionKey: false
  }
);

userSchema.statics.findByCredentials = async (login, password) => {
  const user = await User.findOne({ login });

  if (!user) {
    throw new Error('Unable user');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error('Unable to login');
  }

  return user;
};

// eslint-disable-next-line space-before-function-paren ,func-names
userSchema.methods.generateAuthToken = async function() {
  const user = this;
  const token = jwt.sign(
    {
      userId: user._id.toString(),
      login: user.login
    },
    JWT_SECRET_KEY
  );
  return token;
};

// eslint-disable-next-line space-before-function-paren ,func-names
userSchema.pre('findOneAndDelete', async function(next) {
  const userId = this._conditions._id;
  await Task.updateMany(
    { userId },
    { $set: { userId: null } },
    { multi: true }
  );
  next();
});

// eslint-disable-next-line space-before-function-paren ,func-names
userSchema.pre('save', async function(next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = model('User', userSchema);
module.exports = User;
