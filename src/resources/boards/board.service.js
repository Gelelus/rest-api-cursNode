const Board = require('./board.model');
const { ErrorHandler } = require('../../helpers/customError.js');

async function add(data) {
  const board = new Board(data);
  await board.save();
  return board;
}

async function get(id) {
  const board = await Board.findById(id);
  if (board) {
    throw new ErrorHandler(404, "board doesn't exists");
  }
  return board;
}

async function getAll() {
  return await Board.find();
}

async function update(data, id) {
  return await Board.findByIdAndUpdate(data, id, {
    new: true
  });
}

async function del(id) {
  await Board.findByIdAndDelete(id);
  return { message: `board with id - ${id} was deleted` };
}

module.exports = {
  add,
  get,
  update,
  del,
  getAll
};
