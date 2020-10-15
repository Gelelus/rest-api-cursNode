const User = require('./user.model');
const { ErrorHandler } = require('../../helpers/customError.js');

async function add(data) {
  const userTest = await User.findOne({ login: data.login });
  if (userTest) {
    throw new ErrorHandler(
      400,
      `user with login - ${data.login} already exists`
    );
  }

  const user = new User(data);
  await user.save();

  return {
    id: user._id,
    name: user.name,
    login: user.login
  };
}

async function get(id) {
  const user = await User.findById(id);
  if (user === null) {
    throw new ErrorHandler(404, "user doesn't exists");
  }
  return {
    id: user._id,
    name: user.name,
    login: user.login
  };
}

async function getAll() {
  return await User.aggregate([
    { $project: { _id: 0, id: '$_id', name: 1, login: 1 } }
  ]);
}

async function update({ userLogin, password, name }, user) {
  user.login = userLogin;
  user.name = name;
  user.password = password;

  await user.save();

  return {
    id: user._id,
    name: user.name,
    login: user.login
  };
}

async function del(id) {
  await User.findByIdAndDelete(id);
  return { message: `user with id - ${id} was deleted` };
}

async function login({ password, email }) {
  const user = await User.findByCredentials(email, password);

  const token = await user.generateAuthToken();

  return { token };
}

module.exports = {
  add,
  get,
  update,
  del,
  getAll,
  login
};
