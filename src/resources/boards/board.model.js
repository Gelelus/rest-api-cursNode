const { Schema, model } = require('mongoose');
const Task = require('../tasks/task.model.js');

const boardSchema = new Schema(
  {
    title: {
      type: String,
      default: 'titleLess',
      trim: true
    },
    columns: [{ title: String, order: Number }]
  },
  {
    versionKey: false
  }
);

// eslint-disable-next-line space-before-function-paren ,func-names
boardSchema.pre('findOneAndDelete', async function(next) {
  const boardId = this._conditions._id;
  await Task.deleteMany({ boardId });
  next();
});

const Board = model('Board', boardSchema);
module.exports = Board;
