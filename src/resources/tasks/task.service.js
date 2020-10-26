const Task = require('./task.model');
const { ErrorHandler } = require('../../helpers/customError.js');
const {
  Types: { ObjectId }
} = require('mongoose');

async function add(data) {
  const task = new Task(data);
  await task.save();
  return {
    id: task._id,
    order: task.order,
    title: task.title,
    description: task.description,
    userId: task.userId,
    boardId: task.boardId,
    columnId: task.columnId
  };
}

async function get(id) {
  const task = await Task.findById(id);
  if (task === null) {
    throw new ErrorHandler(404, "task doesn't exists");
  }
  return {
    id: task._id,
    order: task.order,
    title: task.title,
    description: task.description,
    userId: task.userId,
    boardId: task.boardId,
    columnId: task.columnId
  };
}

async function getAll(boardId) {
  return await Task.aggregate([
    { $match: { boardId: ObjectId(boardId) } },
    {
      $project: {
        _id: 0,
        id: '$_id',
        order: 1,
        title: 1,
        description: 1,
        userId: 1,
        boardId: 1,
        columnId: 1
      }
    }
  ]);
}

async function update(data, id) {
  const task = await Task.findByIdAndUpdate(id, data, {
    new: true
  });

  return {
    id: task._id,
    order: task.order,
    title: task.title,
    description: task.description,
    userId: task.userId,
    boardId: task.boardId,
    columnId: task.columnId
  };
}

async function del(id) {
  await Task.findByIdAndDelete(id);
  return { message: `task with id - ${id} was deleted` };
}

module.exports = {
  add,
  get,
  update,
  del,
  getAll
};
