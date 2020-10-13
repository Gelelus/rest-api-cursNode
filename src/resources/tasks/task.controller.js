const service = require('./task.service');

class TaskController {
  static async addTask(req, res, next) {
    try {
      const result = await service.add({
        ...req.body,
        boardId: req.params.boardId
      });

      res.status(200).send(result);
    } catch (e) {
      next(e);
      return;
    }
  }

  static async deleteTask(req, res, next) {
    try {
      const result = await service.del(req.params.id);
      res.status(200).send(result);
    } catch (e) {
      next(e);
      return;
    }
  }

  static async updateTask(req, res, next) {
    try {
      const result = await service.update(
        {
          ...req.body,
          boardId: req.params.boardId
        },
        req.params.id
      );
      res.status(200).send(result);
    } catch (e) {
      next(e);
      return;
    }
  }

  static async getTask(req, res, next) {
    try {
      const result = await service.get(req.params.id);
      res.status(200).send(result);
    } catch (e) {
      next(e);
      return;
    }
  }

  static async getAllTasks(req, res, next) {
    try {
      const result = await service.getAll(req.params.boardId);
      res.status(200).send(result);
    } catch (e) {
      next(e);
      return;
    }
  }
}

module.exports = TaskController;
