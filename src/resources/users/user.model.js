const uuid = require('uuid');

const { ErrorHandler } = require('../../helpers/customError.js');
const Task = require('../tasks/task.model');

const usersMemory = [
  // {
  //   id: 'testId123',
  //   name: 'testName',
  //   login: 'testLogin',
  //   password: 'test12456789'
  // }
];

class User {
  constructor(
    { name = 'noName', login = 'noName', password = '123', id },
    update = false
  ) {
    if (update) {
      this.id = id;
    } else {
      this.id = uuid();
    }

    this.name = name;
    this.login = login;
    this.password = password;
  }

  static find() {
    return usersMemory.map(a => ({
      id: a.id,
      name: a.name,
      login: a.login
    }));
  }

  static findById(id) {
    return usersMemory.find(a => {
      return a.id === id;
    });
  }

  static findByIdAndUpdate(data, id) {
    for (let i = 0; i < usersMemory.length; i++) {
      if (usersMemory[i].id === id) {
        usersMemory[i] = new User({ ...data, id }, true);
        return usersMemory[i];
      }
    }

    throw new ErrorHandler(404, "user doesn't exist");
  }

  static findByIdAndDelete(id) {
    for (let i = 0; i < usersMemory.length; i++) {
      if (usersMemory[i].id === id) {
        usersMemory.splice(i, 1);
        Task.deleteUserRelationship(id);
        return { message: `user with id - ${id} was deleted` };
      }
    }

    throw new ErrorHandler(404, "user doesn't exist");
  }

  static insert(obj) {
    const user = new User(obj);
    usersMemory.push(user);
    return user;
  }
}

module.exports = User;
