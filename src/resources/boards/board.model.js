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
boardSchema.pre('remove', async function(next) {
  await Task.deleteMany({ boardId: this._id });
  next();
});

const Board = model('Board', boardSchema);
module.exports = Board;
