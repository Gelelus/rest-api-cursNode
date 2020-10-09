const uuid = require('uuid');

const Task = require('../tasks/task.model');

const boardsMemory = [
  // {
  //   id: 'testID123',
  //   title: 'testTitle123',
  //   columns: [{id:string, title: string, order: integer}]
  // }
];

class Board {
  constructor({ title = 'testTitle', columns = [], id }, update = false) {
    if (update) {
      this.id = id;
      this.columns = columns;
    } else {
      this.id = uuid();
      this.columns = columns.map(a => {
        a.id = uuid();
        return a;
      });
    }

    this.title = title;
  }

  static find() {
    return boardsMemory;
  }

  static findById(id) {
    return boardsMemory.find(a => {
      return a.id === id;
    });
  }

  static findByIdAndUpdate(data, id) {
    for (let i = 0; i < boardsMemory.length; i++) {
      if (boardsMemory[i].id === id) {
        boardsMemory[i] = new Board({ ...data, id }, true);
        return boardsMemory[i];
      }
    }

    throw new Error("board doesn't exist");
  }

  static findByIdAndDelete(id) {
    for (let i = 0; i < boardsMemory.length; i++) {
      if (boardsMemory[i].id === id) {
        boardsMemory.splice(i, 1);
        Task.deleteTasksWithBoardID(id);
        return { message: `board with id - ${id} was deleted` };
      }
    }

    throw new Error("board doesn't exist");
  }

  static insert(obj) {
    const board = new Board(obj);
    console.log(board);
    boardsMemory.push(board);
    return board;
  }
}

module.exports = Board;
