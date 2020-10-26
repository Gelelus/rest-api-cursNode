const { Schema, model } = require('mongoose');

const taskSchema = new Schema(
  {
    title: {
      type: String,
      default: 'Titleless',
      trim: true
    },
    order: {
      type: Number,
      default: 'orderless',
      trim: true
    },
    description: {
      type: String,
      default: '',
      trim: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: null
    },
    boardId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Board'
    },
    columnId: {
      type: Schema.Types.ObjectId,
      ref: 'Column',
      default: null
    }
  },
  {
    versionKey: false
  }
);

const Task = model('Task', taskSchema);
module.exports = Task;
