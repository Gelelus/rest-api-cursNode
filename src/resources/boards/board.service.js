const Board = require('./board.model');
const { ErrorHandler } = require('../../helpers/customError.js');

async function add(data) {
  const board = new Board(data);
  await board.save();
  return { id: board._id, title: board.title, columns: board.columns };
}

async function get(id) {
  const board = await Board.findById(id);
  if (board === null) {
    throw new ErrorHandler(404, "board doesn't exists");
  }
  return { id: board._id, title: board.title, columns: board.columns };
}

async function getAll() {
  return await Board.aggregate([
    { $project: { _id: 0, id: '$_id', title: 1, columns: 1 } }
  ]);
}

async function update({ title, columns }, id) {
  // поменять
  const columnWithoutId = columns.map(a => ({
    title: a.title,
    order: a.order
  }));
  const board = await Board.findByIdAndUpdate(
    id,
    { title, columnWithoutId },
    {
      new: true
    }
  );
  return { id: board._id, title: board.title, columns: board.columns };
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
