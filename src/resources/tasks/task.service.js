const Task = require('./task.model');

async function add(data) {
  const task = await Task.insert(data);
  return task;
}

async function get(id) {
  const task = await Task.findById(id);
  if (task === undefined) {
    throw new Error("task doesn't exists");
  }
  return task;
}

async function getAll(boardId) {
  return await Task.find(boardId);
}

async function update(data, id) {
  return await Task.findByIdAndUpdate(data, id);
}

async function del(id) {
  return await Task.findByIdAndDelete(id);
}

module.exports = {
  add,
  get,
  update,
  del,
  getAll
};
