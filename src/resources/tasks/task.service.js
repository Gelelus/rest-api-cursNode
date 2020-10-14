const Task = require('./task.model');
const { ErrorHandler } = require('../../helpers/customError.js');

async function add(data) {
  const task = new Task(data);
  await task.save();
  return task;
}

async function get(id) {
  const task = await Task.findById(id);
  if (task) {
    throw new ErrorHandler(404, "task doesn't exists");
  }
  return task;
}

async function getAll(boardId) {
  return await Task.aggregate([
    { $match: { boardId } },
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
  return await Task.findByIdAndUpdate(id, data, {
    new: true
  });
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
