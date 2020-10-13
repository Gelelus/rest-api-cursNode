const service = require('./task.service');
const status = require('../../helpers/errorStatus');

class TaskController {
  static async addTask(req, res) {
    try {
      const result = await service.add({
        ...req.body,
        boardId: req.params.boardId
      });

      res.status(200).send(result);
    } catch (e) {
      res.status(status(e)).send({ error: e.message });
    }
  }

  static async deleteTask(req, res) {
    try {
      const result = await service.del(req.params.id);
      res.status(200).send(result);
    } catch (e) {
      res.status(status(e)).send({ error: e.message });
    }
  }

  static async updateTask(req, res) {
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
      res.status(status(e)).send({ error: e.message });
    }
  }

  static async getTask(req, res) {
    try {
      const result = await service.get(req.params.id);
      res.status(200).send(result);
    } catch (e) {
      res.status(status(e)).send({ error: e.message });
    }
  }

  static async getAllTasks(req, res) {
    try {
      const result = await service.getAll();
      res.status(200).send(result);
    } catch (e) {
      res.status(status(e)).send({ error: e.message });
    }
  }
}

module.exports = TaskController;
