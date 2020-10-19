const Board = require('./board.model');
const { ErrorHandler } = require('../../helpers/customError.js');

async function add(data) {
  const board = await Board.insert(data);
  return board;
}

async function get(id) {
  const board = await Board.findById(id);
  if (board === undefined) {
    throw new ErrorHandler(404, "board doesn't exists");
  }
  return board;
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

