const { Schema, model } = require('mongoose');
const Task = require('../tasks/task.model.js');
const bcrypt = require('bcryptjs');

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
      unique: true,
      trim: true
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

// eslint-disable-next-line space-before-function-paren ,func-names
userSchema.pre('remove', async function(next) {
  await Task.updateMany(
    { userId: this._id },
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
