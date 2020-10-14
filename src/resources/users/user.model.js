const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
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
});

// userSchema.pre("remove", function (next) {
//   Task.updateMany({ userId: this._id }, { $set: { userId: null } },{ multi: true }).exec();
//   next();
// });

userSchema.pre('save', async function test(next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;
