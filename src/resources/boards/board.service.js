const Board = require('./board.model');

async function add(data) {
  const task = await Board.insert(data);
  return task;
}

async function get(id) {
  const task = await Board.findById(id);
  if (task === undefined) {
    throw new Error("board doesn't exists");
  }
  return task;
}

async function getAll() {
  return await Board.find();
}

async function update(data, id) {
  return await Board.findByIdAndUpdate(data, id);
}

async function del(id) {
  return await Board.findByIdAndDelete(id);
}

module.exports = {
  add,
  get,
  update,
  del,
  getAll
};
