const User = require('./user.model');

async function add(data) {
  const user = await User.insert(data);
  return {
    id: user.id,
    name: user.name,
    login: user.login
  };
}

async function get(id) {
  const user = await User.findById(id);
  if (user === undefined) {
    throw new Error("user doesn't exists");
  }
  return {
    id: user.id,
    name: user.name,
    login: user.login
  };
}

async function getAll() {
  return await User.find();
}

async function update(data, id) {
  const user = await User.findByIdAndUpdate(data, id);
  return {
    id: user.id,
    name: user.name,
    login: user.login
  };
}

async function del(id) {
  return await User.findByIdAndDelete(id);
}

module.exports = {
  add,
  get,
  update,
  del,
  getAll
};
