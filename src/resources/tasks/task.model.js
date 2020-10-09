const uuid = require('uuid');

let tasksMemory = [
  // {
  //   id: 'testID123',
  //   title: 'title123',
  //   order: '123',
  //   description: 'discript',
  //   userId: 'testId123',
  //   boardId: null,
  //   columnId: null
  // }
];

class Task {
  constructor(
    {
      title = 'noName',
      order = 'noName',
      description = '123',
      userId = null,
      boardId = null,
      columnId = null,
      id
    },
    update = false
  ) {
    if (update) {
      this.id = id;
    } else {
      this.id = uuid();
    }
    this.title = title;
    this.order = order;
    this.description = description;
    this.boardId = boardId;
    this.userId = userId;
    this.columnId = columnId;
  }

  static insert(obj) {
    const task = new Task(obj);
    tasksMemory.push(task);
    return task;
  }

  static find(boardId) {
    return tasksMemory.filter(a => a.boardId === boardId);
  }

  static findById(id) {
    return tasksMemory.find(a => {
      return a.id === id;
    });
  }

  static findByIdAndUpdate(data, id) {
    for (let i = 0; i < tasksMemory.length; i++) {
      if (tasksMemory[i].id === id) {
        tasksMemory[i] = new Task({ ...data, id }, true);
        return tasksMemory[i];
      }
    }

    throw new Error("task doesn't exist");
  }

  static findByIdAndDelete(id) {
    for (let i = 0; i < tasksMemory.length; i++) {
      if (tasksMemory[i].id === id) {
        tasksMemory.splice(i, 1);
        return { message: `task with id - ${id} was deleted` };
      }
    }

    throw new Error("task doesn't exist");
  }

  static deleteUserRelationship(userId) {
    for (let i = 0; i < tasksMemory.length; i++) {
      if (tasksMemory[i].userId === userId) {
        tasksMemory[i].userId = null;
      }
    }
    return;
  }

  static deleteTasksWithBoardID(boardId) {
    tasksMemory = tasksMemory.filter(a => a.boardId !== boardId);
    return;
  }
}

module.exports = Task;
